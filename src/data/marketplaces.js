// SVG logos for each marketplace — clean text-based icons, no emojis
export const mpLogos = {
  mercadolivre: `<img src="/logos/ml.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="ML" />`,
  amazon: `<img src="/logos/amazon.jpg" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Amazon" />`,
  shopee: `<img src="/logos/shopee.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Shopee" />`,
  tiktok: `<img src="/logos/tiktok.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="TikTok" />`,
  americanas: `<img src="/logos/americanas.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Americanas" />`,
  shein: `<img src="/logos/shein.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Shein" />`,
};

export const marketplaces = [
  {
    id: 'mercadolivre', name: 'Mercado Livre', shortName: 'ML',
    color: '#ffe600', colorDark: '#c4b200', bgLight: 'rgba(255,230,0,0.12)',
    textOnBg: '#2D3277', badgeText: '#7a6d00',
    monthlySearches: '285M', growth: 12.3
  },
  {
    id: 'amazon', name: 'Amazon', shortName: 'AMZ',
    color: '#FF9900', colorDark: '#e68a00', bgLight: 'rgba(255,153,0,0.12)',
    textOnBg: '#fff', badgeText: '#b36b00',
    monthlySearches: '210M', growth: 8.7
  },
  {
    id: 'shopee', name: 'Shopee', shortName: 'SHP',
    color: '#EE4D2D', colorDark: '#d4401f', bgLight: 'rgba(238,77,45,0.1)',
    textOnBg: '#fff', badgeText: '#c4350f',
    monthlySearches: '195M', growth: 15.2
  },
  {
    id: 'tiktok', name: 'TikTok Shop', shortName: 'TT',
    color: '#25F4EE', colorSecondary: '#FE2C55', colorDark: '#1ac4bf',
    bgLight: 'rgba(37,244,238,0.1)', textOnBg: '#111', badgeText: '#0e807b',
    monthlySearches: '150M', growth: 42.8
  },
  {
    id: 'americanas', name: 'Americanas', shortName: 'AMR',
    color: '#E60014', colorDark: '#cc0012', bgLight: 'rgba(230,0,20,0.1)',
    textOnBg: '#fff', badgeText: '#b3000f',
    monthlySearches: '98M', growth: -2.1
  },
  {
    id: 'shein', name: 'Shein', shortName: 'SHN',
    color: '#222', colorDark: '#555', bgLight: 'rgba(0,0,0,0.07)',
    textOnBg: '#fff', badgeText: '#555',
    monthlySearches: '175M', growth: 22.5
  }
];

export function getMarketplace(id) {
  return marketplaces.find(m => m.id === id);
}

export function getMpLogo(id, size = 20) {
  const svg = mpLogos[id] || '';
  return `<span class="mp-logo" style="width:${size}px;height:${size}px;display:inline-flex">${svg}</span>`;
}

export function getMpBadge(mp) {
  return `<span class="badge badge-marketplace" style="background:${mp.bgLight};color:${mp.badgeText};border:1px solid ${mp.bgLight}">${getMpLogo(mp.id, 14)} ${mp.shortName}</span>`;
}
