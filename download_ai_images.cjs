const fs = require('fs');
const path = require('path');
const https = require('https');

const products = [
  { id: 1, name: 'Serum Vitamina C Principia' },
  { id: 2, name: 'Lip Tint Boca Rosa' },
  { id: 3, name: 'Escova Alisadora Mondial' },
  { id: 4, name: 'Difusor Aromatizador Ultrassonico' },
  { id: 5, name: 'Cinta Modeladora Slim' },
  { id: 6, name: 'Colageno Hidrolisado Max Titanium' },
  { id: 7, name: 'iPhone 15 Apple' },
  { id: 8, name: 'Air Fryer Mondial 5L' },
  { id: 9, name: 'Whey Protein Max Titanium 900g' },
  { id: 10, name: 'Fone Bluetooth JBL Tune 520BT' },
  { id: 11, name: 'Creatina Max Titanium 300g' },
  { id: 12, name: 'Smart Watch Serie 9 Ultra' },
  { id: 13, name: 'Kindle Paperwhite' },
  { id: 14, name: 'Echo Dot 5a Geracao' },
  { id: 15, name: 'Camera de Seguranca Intelbras' },
  { id: 16, name: 'SSD Kingston 1TB NVMe' },
  { id: 17, name: 'Headset HyperX Cloud' },
  { id: 18, name: 'Fire TV Stick 4K' },
  { id: 19, name: 'Capa iPhone 15 Pro MagSafe' },
  { id: 20, name: 'Garrafa Termica Stanley' },
  { id: 21, name: 'Organizador Maquiagem Acrilico' },
  { id: 22, name: 'Mini Projetor LED' },
  { id: 23, name: 'Fita LED RGB 5m' },
  { id: 24, name: 'Pelucia Capivara' },
  { id: 25, name: 'Smart TV Samsung 50 4K' },
  { id: 26, name: 'Notebook Lenovo IdeaPad 3i' },
  { id: 27, name: 'Aspirador Robo WAP' },
  { id: 28, name: 'Ar Condicionado Split LG' },
  { id: 29, name: 'Vestido Midi Floral' },
  { id: 30, name: 'Conjunto Fitness Feminino' },
  { id: 31, name: 'Biquini 3 Pecas' },
  { id: 32, name: 'Bolsa Crossbody Couro' },
  { id: 33, name: 'Jaqueta Corta Vento Unissex' },
  { id: 34, name: 'Oculos de Sol Vintage' },
];

const targetDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed with ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Baixando imagens otimizadas para o projeto...');
  
  let productsCode = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.js'), 'utf8');

  for (const item of products) {
    const filename = `${item.id}.jpg`;
    const filepath = path.join(targetDir, filename);
    const localUrl = `/images/products/${filename}`;

    console.log(`Baixando: ${item.name}...`);
    try {
      const query = encodeURIComponent(`${item.name} product photography highly detailed`);
      const imgUrl = `https://image.pollinations.ai/prompt/${query}?width=400&height=300&nologo=true`;
      
      await downloadImage(imgUrl, filepath);
      console.log(`✅ Salvo: ${filename}`);
      
      // Update the code string
      const regex = new RegExp(`(id:\\s*${item.id},.*?imageUrl:\\s*)'[^']+'`, 'g');
      productsCode = productsCode.replace(regex, `$1'${localUrl}'`);

      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`Erro no item ${item.id}:`, err.message);
    }
  }

  // Save the modified products.js
  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'products.js'), productsCode);
  console.log('products.js atualizado com os links locais da pasta public/images/products!');
}

run();
