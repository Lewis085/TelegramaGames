const months = ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'];

export const trendData = {
  labels: months,
  marketplaces: {
    mercadolivre: [82, 85, 91, 88, 93, 97],
    amazon: [70, 72, 78, 75, 79, 82],
    shopee: [65, 68, 72, 78, 82, 88],
    tiktok: [30, 42, 55, 68, 85, 98],
    americanas: [55, 52, 48, 50, 49, 47],
    shein: [60, 65, 70, 75, 82, 90]
  },
  categories: {
    'Beleza': [45, 52, 58, 65, 78, 92],
    'Saúde': [40, 45, 52, 58, 65, 75],
    'Eletrônicos': [80, 78, 82, 79, 85, 83],
    'Moda': [55, 58, 62, 68, 72, 78],
    'Casa & Decoração': [35, 38, 42, 48, 55, 62],
    'Games': [70, 65, 72, 68, 66, 64],
    'Celulares': [75, 78, 85, 82, 88, 90],
    'Informática': [50, 48, 52, 55, 58, 60],
  }
};

export const weeklyTrend = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  searches: [120000, 145000, 138000, 152000, 168000, 195000, 180000],
  sales: [85000, 92000, 88000, 98000, 112000, 135000, 125000]
};

export const categoryGrowth = [
  { category: 'Beleza & Skincare', growth: 67.3, volume: 4200000, icon: '💄' },
  { category: 'Suplementos', growth: 45.8, volume: 3100000, icon: '💊' },
  { category: 'Casa Inteligente', growth: 38.2, volume: 2800000, icon: '🏠' },
  { category: 'Fitness', growth: 34.5, volume: 2500000, icon: '🏋️' },
  { category: 'Celulares', growth: 28.9, volume: 5600000, icon: '📱' },
  { category: 'Pet Shop', growth: 25.3, volume: 1800000, icon: '🐕' },
  { category: 'Decoração', growth: 22.1, volume: 1500000, icon: '🏡' },
  { category: 'Games', growth: -5.2, volume: 2200000, icon: '🎮' },
  { category: 'Automotivo', growth: -8.7, volume: 980000, icon: '🚗' },
];
