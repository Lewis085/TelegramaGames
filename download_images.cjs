const fs = require('fs');
const path = require('path');

const products = [
  { id: 1, url: 'https://m.media-amazon.com/images/I/51rR5rM4y0L._AC_SL1000_.jpg' },
  { id: 2, url: 'https://m.media-amazon.com/images/I/51P+Q-fQ6lL._AC_SL1000_.jpg' },
  { id: 3, url: 'https://m.media-amazon.com/images/I/61I2a9PjL3L._AC_SL1500_.jpg' },
  { id: 4, url: 'https://m.media-amazon.com/images/I/61D2nB92gNL._AC_SL1500_.jpg' },
  { id: 5, url: 'https://m.media-amazon.com/images/I/61BndY5Gk8L._AC_SL1000_.jpg' },
  { id: 6, url: 'https://m.media-amazon.com/images/I/61Q65S+S65L._AC_SL1500_.jpg' },
  { id: 7, url: 'https://m.media-amazon.com/images/I/71xb2xkN5qL._AC_SL1500_.jpg' },
  { id: 8, url: 'https://m.media-amazon.com/images/I/71u3s1Yw4-L._AC_SL1500_.jpg' },
  { id: 9, url: 'https://m.media-amazon.com/images/I/51tW0Xp-y3L._AC_SL1000_.jpg' },
  { id: 10, url: 'https://m.media-amazon.com/images/I/51KwGJPW08L._AC_SL1000_.jpg' },
  { id: 11, url: 'https://m.media-amazon.com/images/I/51M3fG8jT1L._AC_SL1000_.jpg' },
  { id: 12, url: 'https://m.media-amazon.com/images/I/61ZjlBOp+rL._AC_SL1500_.jpg' },
  { id: 13, url: 'https://m.media-amazon.com/images/I/71B1wawlyoL._AC_SL1500_.jpg' },
  { id: 14, url: 'https://m.media-amazon.com/images/I/71W8hA+Y-2L._AC_SL1000_.jpg' },
  { id: 15, url: 'https://m.media-amazon.com/images/I/51tX3U-A-BL._AC_SL1000_.jpg' },
  { id: 16, url: 'https://m.media-amazon.com/images/I/61Kq-0Z47ML._AC_SL1500_.jpg' },
  { id: 17, url: 'https://m.media-amazon.com/images/I/7106gG6Hl-L._AC_SL1500_.jpg' },
  { id: 18, url: 'https://m.media-amazon.com/images/I/41OQG2U85WL._AC_SL1000_.jpg' },
  { id: 19, url: 'https://m.media-amazon.com/images/I/61nS1D1m0iL._AC_SL1500_.jpg' },
  { id: 20, url: 'https://m.media-amazon.com/images/I/51zJ8z2h8iL._AC_SL1500_.jpg' },
  { id: 21, url: 'https://m.media-amazon.com/images/I/71d1jN1jWXL._AC_SL1500_.jpg' },
  { id: 22, url: 'https://m.media-amazon.com/images/I/61J2m-4T1qL._AC_SL1500_.jpg' },
  { id: 23, url: 'https://m.media-amazon.com/images/I/71z7wYcO0iL._AC_SL1500_.jpg' },
  { id: 24, url: 'https://m.media-amazon.com/images/I/51bA-O8XjLL._AC_SL1000_.jpg' },
  { id: 25, url: 'https://m.media-amazon.com/images/I/71t+b-m+h1L._AC_SL1500_.jpg' },
  { id: 26, url: 'https://m.media-amazon.com/images/I/61x0p4m1QjL._AC_SL1500_.jpg' },
  { id: 27, url: 'https://m.media-amazon.com/images/I/61Gj3f0Z4OL._AC_SL1500_.jpg' },
  { id: 28, url: 'https://m.media-amazon.com/images/I/51G8K+M-T3L._AC_SL1000_.jpg' },
  { id: 29, url: 'https://m.media-amazon.com/images/I/61WfQ8g8HhL._AC_UY1000_.jpg' },
  { id: 30, url: 'https://m.media-amazon.com/images/I/61TfD1Z4X4L._AC_UX679_.jpg' },
  { id: 31, url: 'https://m.media-amazon.com/images/I/61y8B3F2j2L._AC_UX679_.jpg' },
  { id: 32, url: 'https://m.media-amazon.com/images/I/71N1r+9bFjL._AC_UY695_.jpg' },
  { id: 33, url: 'https://m.media-amazon.com/images/I/51QdD6V7kVL._AC_UX679_.jpg' },
  { id: 34, url: 'https://m.media-amazon.com/images/I/51Q0-Z4d9-L._AC_UX679_.jpg' },
];

const targetDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function run() {
  console.log('Starting downloads with fetch...');
  for (const item of products) {
    const filename = `${item.id}.jpg`;
    const filepath = path.join(targetDir, filename);
    
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${filename}, already exists.`);
      continue;
    }
    
    try {
      console.log(`Downloading ${filename} from ${item.url}...`);
      const response = await fetch(item.url, {
        headers: {
          'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'pragma': 'no-cache',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'cross-site',
          'Referer': 'https://www.amazon.com/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filepath, Buffer.from(buffer));
      console.log(`Success: ${filename}`);
      
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
  console.log('Done!');
}

run();
