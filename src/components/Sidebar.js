import { navigate } from '../utils/router.js';
import { getUnreadAlerts } from '../data/alerts.js';

const navItems = [
  { label: 'Dashboard', icon: 'grid', route: '/' },
  { label: 'Keywords', icon: 'search', route: '/keywords' },
  { label: 'Trending', icon: 'flame', route: '/trending' },
  { label: 'Hype Radar', icon: 'zap', route: '/hype' },
  { label: 'Criativos', icon: 'play', route: '/creatives' },
  { label: 'Análise', icon: 'chart', route: '/analysis' },
  { label: 'Marketplaces', icon: 'store', route: '/marketplaces' },
  { label: 'Alertas', icon: 'bell', route: '/alerts' },
];

const tools = [
  { label: 'Comparador', icon: 'compare', route: '/nicho' },
  { label: 'Explorar Nichos', icon: 'compass', route: '/nichos' },
  { label: 'Oportunidades', icon: 'target', route: '/oportunidade' },
];

const icons = {
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="m10 8 6 4-6 4V8z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M2 7h20"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  compare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-6"/><path d="m21 3-9 9"/><path d="M3 3l9 9"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 7.27 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
};

const executionTools = [
  { label: 'Canal Certo', icon: 'target', route: '/canalcerto' },
  { label: 'Radar de Mercado', icon: 'compass', route: '/radarmercado' },
  { label: 'Validador de Produto', icon: 'checkCircle', route: '/validador' },
  { label: 'Kit de Oferta', icon: 'box', route: '/offerkit' },
  { label: 'Gerador de LP', icon: 'layout', route: '/landing' },
  { label: 'Simulador de Escala', icon: 'sliders', route: '/simulador' },
];

export function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  const unread = getUnreadAlerts().length;
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-icon">T</div>
      <span class="logo-text">TrendTracker</span>
      <span class="logo-badge">PRO</span>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-title">Menu</div>
      ${navItems.map(item => `
        <a class="nav-item" data-route="${item.route}">
          ${icons[item.icon]}
          <span>${item.label}</span>
          ${item.route === '/alerts' && unread > 0 ? `<span class="nav-badge">${unread}</span>` : ''}
        </a>
      `).join('')}
      <div class="nav-section-title">Descoberta</div>
      ${tools.map(t => `
        <a class="nav-item" data-route="${t.route}">${icons[t.icon]}<span>${t.label}</span></a>
      `).join('')}
      <div class="nav-section-title">Execução</div>
      ${executionTools.map(t => `
        <a class="nav-item" data-route="${t.route}">${icons[t.icon]}<span>${t.label}</span></a>
      `).join('')}
      <div class="nav-section-title">IA</div>
      <a class="nav-item nav-item-ai" data-route="/assistente">
        ${icons.bot}<span>TrendBot</span><span class="nav-ai-glow"></span>
      </a>
    </nav>
  `;

  sidebar.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(item.dataset.route);
      sidebar.classList.remove('open');
    });
  });
}
