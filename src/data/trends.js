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

const getIcon = (svg) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${svg}</svg>`;

export const categoryGrowth = [
  { category: 'Beleza & Skincare', growth: 67.3, volume: 4200000, icon: getIcon('<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M12 12v9"/>') },
  { category: 'Suplementos', growth: 45.8, volume: 3100000, icon: getIcon('<rect x="2" y="7" width="20" height="10" rx="5" ry="5"/><path d="M12 7v10"/>') },
  { category: 'Casa Inteligente', growth: 38.2, volume: 2800000, icon: getIcon('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>') },
  { category: 'Fitness', growth: 34.5, volume: 2500000, icon: getIcon('<path d="M14.4 14.4 9.6 9.6M18.6 5.4l-3.2 3.2M5.4 18.6l3.2-3.2M16 2l6 6M2 16l6 6M9 7l8 8M7 9l-8-8"/>') },
  { category: 'Celulares', growth: 28.9, volume: 5600000, icon: getIcon('<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>') },
  { category: 'Pet Shop', growth: 25.3, volume: 1800000, icon: getIcon('<path d="M12 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/><path d="M8 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/><path d="M16 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/><path d="M12 11c-2.5 0-5 2-5 5v1h10v-1c0-3-2.5-5-5-5z"/>') },
  { category: 'Decoração', growth: 22.1, volume: 1500000, icon: getIcon('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>') },
  { category: 'Games', growth: -5.2, volume: 2200000, icon: getIcon('<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><path d="M21 16v-4a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v4c0 1.5 1 4 3 4h14c2 0 3-2.5 3-4z"/>') },
  { category: 'Automotivo', growth: -8.7, volume: 980000, icon: getIcon('<path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM5 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/>') },
];
