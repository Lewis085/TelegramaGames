import { toggleTheme, getTheme } from '../utils/theme.js';
import { getUnreadAlerts } from '../data/alerts.js';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Visao geral das tendencias' },
  '/keywords': { title: 'Keywords', subtitle: 'Palavras-chave mais pesquisadas' },
  '/trending': { title: 'Produtos em Alta', subtitle: 'Os mais vendidos dos marketplaces' },
  '/creatives': { title: 'Criativos em Alta', subtitle: 'Anuncios e criativos que mais bombaram' },
  '/analysis': { title: 'Analise de Tendencias', subtitle: 'Insights e previsoes de mercado' },
  '/marketplaces': { title: 'Marketplaces', subtitle: 'Desempenho por plataforma' },
  '/alerts': { title: 'Alertas', subtitle: 'Notificacoes de tendencias' },
  '/nicho': { title: 'Comparador de Nicho', subtitle: 'Compare nichos lado a lado' },
  '/oportunidade': { title: 'Oportunidades', subtitle: 'Score de oportunidade por nicho' },
  '/hype': { title: 'Hype Radar', subtitle: 'Produtos explodindo e prestes a viralizar' },
  '/nichos': { title: 'Explorador de Nichos', subtitle: 'Descubra nichos lucrativos com baixa competição' },
  '/assistente': { title: 'TrendBot IA', subtitle: 'Seu assistente inteligente de mercado' },
};

export function renderHeader(route = '/') {
  const header = document.getElementById('header');
  const info = pageTitles[route] || pageTitles['/'];
  const unread = getUnreadAlerts().length;
  const isDark = getTheme() === 'dark';

  header.innerHTML = `
    <div class="header-left">
      <button class="mobile-menu-btn" id="mobile-menu-toggle">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <div class="header-title">
        <h1>${info.title}</h1>
        <p>${info.subtitle}</p>
      </div>
    </div>
    <div class="header-right">
      <button class="search-trigger" id="search-open">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span>Buscar...</span>
        <kbd>Ctrl+K</kbd>
      </button>
      <button class="header-btn theme-toggle" id="theme-toggle" title="Alternar tema">
        ${isDark
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
        }
      </button>
      <button class="header-btn" id="notif-btn" title="Notificacoes">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        ${unread > 0 ? '<span class="badge-dot"></span>' : ''}
      </button>
      <button class="btn-export" id="export-btn" title="Exportar relatorio">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Exportar
      </button>
      <div class="user-avatar" title="Minha Conta">B</div>
    </div>
  `;

  document.getElementById('theme-toggle').addEventListener('click', () => {
    toggleTheme();
    renderHeader(route);
    window.dispatchEvent(new Event('themechange'));
  });

  document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  document.getElementById('search-open')?.addEventListener('click', () => {
    window.dispatchEvent(new Event('opensearch'));
  });

  document.getElementById('export-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('export-btn');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Exportado!';
    btn.style.borderColor = 'var(--green)';
    btn.style.color = 'var(--green)';
    setTimeout(() => {
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Exportar';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 2000);
  });
}
