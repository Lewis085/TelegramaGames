const categories = [
  'Suplementos', 'Produtos de Beleza', 'Oportunidades Ocultas', 'Marcas Grandes',
  'Eletrônicos', 'Moda', 'Casa & Decoração', 'Esportes & Fitness',
  'Saúde', 'Games', 'Brinquedos', 'Pet Shop'
];

function generateSparkData(trend = 'up', length = 12) {
  const data = [];
  let value = 30 + Math.random() * 40;
  for (let i = 0; i < length; i++) {
    const change = trend === 'up' ? Math.random() * 10 - 2
      : trend === 'down' ? Math.random() * 4 - 8
      : Math.random() * 10 - 5;
    value = Math.max(5, Math.min(100, value + change));
    data.push(Math.round(value));
  }
  return data;
}

export const keywords = [
  // Mercado Livre
  { id: 1, keyword: 'airfryer', marketplace: 'mercadolivre', category: 'Eletrônicos', volume: 1850000, trend: 'up', change: 23.4, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 2, keyword: 'fone bluetooth', marketplace: 'mercadolivre', category: 'Eletrônicos', volume: 1420000, trend: 'up', change: 18.2, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 3, keyword: 'whey protein', marketplace: 'mercadolivre', category: 'Saúde', volume: 980000, trend: 'up', change: 31.5, competition: 'média', sparkData: generateSparkData('up') },
  { id: 4, keyword: 'creatina', marketplace: 'mercadolivre', category: 'Saúde', volume: 870000, trend: 'up', change: 45.2, competition: 'média', sparkData: generateSparkData('up') },
  { id: 5, keyword: 'smartwatch', marketplace: 'mercadolivre', category: 'Eletrônicos', volume: 760000, trend: 'stable', change: 3.1, competition: 'alta', sparkData: generateSparkData('stable') },
  { id: 6, keyword: 'cadeira gamer', marketplace: 'mercadolivre', category: 'Games', volume: 650000, trend: 'down', change: -8.3, competition: 'alta', sparkData: generateSparkData('down') },
  { id: 7, keyword: 'perfume importado', marketplace: 'mercadolivre', category: 'Beleza', volume: 540000, trend: 'up', change: 12.7, competition: 'média', sparkData: generateSparkData('up') },
  { id: 8, keyword: 'panela elétrica', marketplace: 'mercadolivre', category: 'Casa & Decoração', volume: 480000, trend: 'up', change: 28.9, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 9, keyword: 'tenis nike', marketplace: 'mercadolivre', category: 'Moda', volume: 1120000, trend: 'stable', change: 2.4, competition: 'alta', sparkData: generateSparkData('stable') },
  { id: 10, keyword: 'iphone 16', marketplace: 'mercadolivre', category: 'Celulares', volume: 2100000, trend: 'up', change: 67.3, competition: 'alta', sparkData: generateSparkData('up') },

  // Amazon
  { id: 11, keyword: 'kindle paperwhite', marketplace: 'amazon', category: 'Eletrônicos', volume: 920000, trend: 'up', change: 14.8, competition: 'média', sparkData: generateSparkData('up') },
  { id: 12, keyword: 'echo dot', marketplace: 'amazon', category: 'Eletrônicos', volume: 780000, trend: 'stable', change: -1.2, competition: 'baixa', sparkData: generateSparkData('stable') },
  { id: 13, keyword: 'suplemento vitamina d', marketplace: 'amazon', category: 'Saúde', volume: 560000, trend: 'up', change: 34.6, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 14, keyword: 'câmera de segurança', marketplace: 'amazon', category: 'Eletrônicos', volume: 490000, trend: 'up', change: 19.3, competition: 'média', sparkData: generateSparkData('up') },
  { id: 15, keyword: 'fire tv stick', marketplace: 'amazon', category: 'Eletrônicos', volume: 670000, trend: 'up', change: 8.9, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 16, keyword: 'colchão ortopédico', marketplace: 'amazon', category: 'Casa & Decoração', volume: 340000, trend: 'up', change: 22.1, competition: 'média', sparkData: generateSparkData('up') },
  { id: 17, keyword: 'headset gamer', marketplace: 'amazon', category: 'Games', volume: 410000, trend: 'up', change: 15.4, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 18, keyword: 'mousepad grande', marketplace: 'amazon', category: 'Informática', volume: 280000, trend: 'stable', change: 4.2, competition: 'baixa', sparkData: generateSparkData('stable') },

  // Shopee
  { id: 19, keyword: 'capa iphone', marketplace: 'shopee', category: 'Celulares', volume: 1340000, trend: 'stable', change: 5.7, competition: 'alta', sparkData: generateSparkData('stable') },
  { id: 20, keyword: 'ring light', marketplace: 'shopee', category: 'Eletrônicos', volume: 890000, trend: 'down', change: -12.3, competition: 'alta', sparkData: generateSparkData('down') },
  { id: 21, keyword: 'organizador maquiagem', marketplace: 'shopee', category: 'Beleza', volume: 670000, trend: 'up', change: 18.9, competition: 'média', sparkData: generateSparkData('up') },
  { id: 22, keyword: 'garrafa térmica', marketplace: 'shopee', category: 'Casa & Decoração', volume: 520000, trend: 'up', change: 42.1, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 23, keyword: 'fita led', marketplace: 'shopee', category: 'Casa & Decoração', volume: 780000, trend: 'stable', change: -2.8, competition: 'média', sparkData: generateSparkData('stable') },
  { id: 24, keyword: 'cílios postiços', marketplace: 'shopee', category: 'Beleza', volume: 450000, trend: 'up', change: 26.4, competition: 'média', sparkData: generateSparkData('up') },
  { id: 25, keyword: 'pelúcia kawaii', marketplace: 'shopee', category: 'Brinquedos', volume: 380000, trend: 'up', change: 55.2, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 26, keyword: 'mini projetor', marketplace: 'shopee', category: 'Eletrônicos', volume: 310000, trend: 'up', change: 38.7, competition: 'média', sparkData: generateSparkData('up') },

  // TikTok Shop
  { id: 27, keyword: 'sérum facial', marketplace: 'tiktok', category: 'Beleza', volume: 920000, trend: 'up', change: 78.3, competition: 'média', sparkData: generateSparkData('up') },
  { id: 28, keyword: 'lip tint', marketplace: 'tiktok', category: 'Beleza', volume: 850000, trend: 'up', change: 120.5, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 29, keyword: 'cinta modeladora', marketplace: 'tiktok', category: 'Moda', volume: 670000, trend: 'up', change: 95.2, competition: 'média', sparkData: generateSparkData('up') },
  { id: 30, keyword: 'escova alisadora', marketplace: 'tiktok', category: 'Beleza', volume: 540000, trend: 'up', change: 63.8, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 31, keyword: 'luminária led', marketplace: 'tiktok', category: 'Casa & Decoração', volume: 480000, trend: 'up', change: 87.1, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 32, keyword: 'difusor de ambiente', marketplace: 'tiktok', category: 'Casa & Decoração', volume: 390000, trend: 'up', change: 145.6, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 33, keyword: 'protetor solar facial', marketplace: 'tiktok', category: 'Beleza', volume: 720000, trend: 'up', change: 52.4, competition: 'média', sparkData: generateSparkData('up') },

  // Americanas
  { id: 34, keyword: 'notebook', marketplace: 'americanas', category: 'Informática', volume: 450000, trend: 'stable', change: 1.3, competition: 'alta', sparkData: generateSparkData('stable') },
  { id: 35, keyword: 'geladeira', marketplace: 'americanas', category: 'Eletrônicos', volume: 380000, trend: 'stable', change: -3.2, competition: 'alta', sparkData: generateSparkData('stable') },
  { id: 36, keyword: 'micro-ondas', marketplace: 'americanas', category: 'Eletrônicos', volume: 290000, trend: 'down', change: -7.8, competition: 'média', sparkData: generateSparkData('down') },
  { id: 37, keyword: 'máquina de lavar', marketplace: 'americanas', category: 'Eletrônicos', volume: 260000, trend: 'stable', change: 2.1, competition: 'média', sparkData: generateSparkData('stable') },
  { id: 38, keyword: 'smart tv 50', marketplace: 'americanas', category: 'Eletrônicos', volume: 520000, trend: 'up', change: 11.4, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 39, keyword: 'aspirador robô', marketplace: 'americanas', category: 'Eletrônicos', volume: 310000, trend: 'up', change: 28.6, competition: 'média', sparkData: generateSparkData('up') },

  // Shein
  { id: 40, keyword: 'vestido midi', marketplace: 'shein', category: 'Moda', volume: 980000, trend: 'up', change: 34.2, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 41, keyword: 'conjunto fitness', marketplace: 'shein', category: 'Moda', volume: 870000, trend: 'up', change: 45.8, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 42, keyword: 'biquini', marketplace: 'shein', category: 'Moda', volume: 1250000, trend: 'up', change: 28.3, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 43, keyword: 'bolsa crossbody', marketplace: 'shein', category: 'Moda', volume: 560000, trend: 'up', change: 67.1, competition: 'média', sparkData: generateSparkData('up') },
  { id: 44, keyword: 'óculos de sol', marketplace: 'shein', category: 'Moda', volume: 490000, trend: 'stable', change: 8.4, competition: 'média', sparkData: generateSparkData('stable') },
  { id: 45, keyword: 'jaqueta corta vento', marketplace: 'shein', category: 'Moda', volume: 420000, trend: 'up', change: 52.9, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 46, keyword: 'meia calça', marketplace: 'shein', category: 'Moda', volume: 380000, trend: 'down', change: -15.3, competition: 'baixa', sparkData: generateSparkData('down') },
  { id: 47, keyword: 'cropped', marketplace: 'shein', category: 'Moda', volume: 720000, trend: 'stable', change: 3.7, competition: 'alta', sparkData: generateSparkData('stable') },

  // More cross-platform popular keywords
  { id: 48, keyword: 'carregador turbo', marketplace: 'mercadolivre', category: 'Celulares', volume: 890000, trend: 'up', change: 16.5, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 49, keyword: 'drone com câmera', marketplace: 'amazon', category: 'Eletrônicos', volume: 340000, trend: 'up', change: 41.2, competition: 'média', sparkData: generateSparkData('up') },
  { id: 50, keyword: 'massageador', marketplace: 'shopee', category: 'Saúde', volume: 430000, trend: 'up', change: 33.8, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 51, keyword: 'colágeno', marketplace: 'tiktok', category: 'Saúde', volume: 610000, trend: 'up', change: 89.4, competition: 'média', sparkData: generateSparkData('up') },
  { id: 52, keyword: 'roupão', marketplace: 'shein', category: 'Moda', volume: 290000, trend: 'up', change: 21.6, competition: 'baixa', sparkData: generateSparkData('up') },
  { id: 53, keyword: 'ar condicionado', marketplace: 'americanas', category: 'Eletrônicos', volume: 680000, trend: 'up', change: 55.3, competition: 'alta', sparkData: generateSparkData('up') },
  { id: 54, keyword: 'SSD 1TB', marketplace: 'amazon', category: 'Informática', volume: 410000, trend: 'up', change: 19.8, competition: 'média', sparkData: generateSparkData('up') },
  { id: 55, keyword: 'kit skincare', marketplace: 'tiktok', category: 'Beleza', volume: 580000, trend: 'up', change: 102.3, competition: 'alta', sparkData: generateSparkData('up') },
];

export function getKeywordsByMarketplace(marketplaceId) {
  return keywords.filter(k => k.marketplace === marketplaceId);
}

export function getTopKeywords(limit = 10) {
  return [...keywords].sort((a, b) => b.change - a.change).slice(0, limit);
}

export function getKeywordsByCategory(category) {
  return keywords.filter(k => k.category === category);
}

export { categories };
