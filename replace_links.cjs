const fs = require('fs');
let code = fs.readFileSync('src/data/products.js', 'utf8');

code = code.replace(/name: '([^']+)'(.*?)(imageUrl: ')([^']+)'/g, (match, name, middle, imgPrefix, oldUrl) => {
  const query = encodeURIComponent(name + ' product photography close up');
  const newUrl = `https://image.pollinations.ai/prompt/${query}?width=400&height=300&nologo=true`;
  return `name: '${name}'${middle}${imgPrefix}${newUrl}'`;
});

fs.writeFileSync('src/data/products.js', code);
console.log('Replaced successfully');
