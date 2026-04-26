// SVG logos for each marketplace — clean text-based icons, no emojis
export const mpLogos = {
  mercadolivre: `<img src="/logos/ml.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="ML" />`,
  amazon: `<img src="/logos/amazon.jpg" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Amazon" />`,
  shopee: `<img src="/logos/shopee.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Shopee" />`,
  tiktok: `<img src="/logos/tiktok.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="TikTok" />`,
  americanas: `<img src="/logos/americanas.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Americanas" />`,
  shein: `<img src="/logos/shein.png" style="width:100%;height:100%;object-fit:contain;border-radius:4px" alt="Shein" />`,
  google: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
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
    textOnBg: '#FF9900', badgeText: '#b36b00',
    monthlySearches: '180M', growth: 15.8
  },
  {
    id: 'shopee', name: 'Shopee', shortName: 'SHP',
    color: '#ee4d2d', colorDark: '#d83b1d', bgLight: 'rgba(238,77,45,0.12)',
    textOnBg: '#ee4d2d', badgeText: '#b32b10',
    monthlySearches: '210M', growth: 22.4
  },
  {
    id: 'tiktok', name: 'TikTok Shop', shortName: 'TTK',
    color: '#000000', colorDark: '#222222', bgLight: 'rgba(0,0,0,0.1)',
    textOnBg: '#00f2fe', badgeText: '#000000',
    monthlySearches: '1.2B', growth: 85.6
  },
  {
    id: 'google', name: 'Google Search', shortName: 'GOO',
    color: '#4285F4', colorDark: '#3367D6', bgLight: 'rgba(66,133,244,0.1)',
    textOnBg: '#4285F4', badgeText: '#4285F4',
    monthlySearches: '8.5B', growth: 5.2
  },
  {
    id: 'americanas', name: 'Americanas', shortName: 'AMR',
    color: '#E60014', colorDark: '#cc0011', bgLight: 'rgba(230,0,20,0.12)',
    textOnBg: '#E60014', badgeText: '#99000d',
    monthlySearches: '85M', growth: -5.2
  },
  {
    id: 'shein', name: 'Shein', shortName: 'SHN',
    color: '#222222', colorDark: '#000000', bgLight: 'rgba(34,34,34,0.12)',
    textOnBg: '#222222', badgeText: '#000000',
    monthlySearches: '150M', growth: 45.2
  }
];

export function getMarketplace(id) {
  return marketplaces.find(m => m.id === id) || marketplaces[0];
}

export function getMpLogo(id, size = 20) {
  const svg = mpLogos[id] || '';
  return `<span class="mp-logo" style="width:${size}px;height:${size}px;display:inline-flex">${svg}</span>`;
}

export function getMpBadge(mp) {
  return `<span class="badge badge-marketplace" style="background:${mp.bgLight};color:${mp.badgeText};border:1px solid ${mp.bgLight}">${getMpLogo(mp.id, 14)} ${mp.shortName}</span>`;
}
