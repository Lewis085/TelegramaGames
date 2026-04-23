import { alerts } from '../data/alerts.js';
import { getMarketplace, getMpBadge } from '../data/marketplaces.js';

let filterType = 'all';

export function renderAlerts() {
  const container = document.getElementById('page-content');

  container.innerHTML = `
    <div class="btn-group mb-20" id="alert-type-filters">
      <button class="btn btn-ghost btn-sm active" data-type="all">Todos</button>
      <button class="btn btn-ghost btn-sm" data-type="explosive">Explosivos</button>
      <button class="btn btn-ghost btn-sm" data-type="trending">Trending</button>
      <button class="btn btn-ghost btn-sm" data-type="opportunity">Oportunidades</button>
      <button class="btn btn-ghost btn-sm" data-type="warning">Avisos</button>
    </div>
    <div id="alerts-list"></div>
  `;

  const alertIcons = {
    explosive: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    trending: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    opportunity: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
    warning: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  };

  function renderList() {
    const data = filterType === 'all' ? alerts : alerts.filter(a => a.type === filterType);
    document.getElementById('alerts-list').innerHTML = data.map(a => {
      const mp = getMarketplace(a.marketplace);
      return `
        <div class="alert-item ${a.read ? '' : 'unread'} animate-in">
          <div class="alert-icon ${a.type}">${alertIcons[a.type]}</div>
          <div class="alert-body">
            <div class="alert-title">${a.title}</div>
            <div class="alert-desc">${a.description}</div>
            <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
              ${getMpBadge(mp)}
              <span class="text-muted" style="font-size:12px">${a.time}</span>
            </div>
          </div>
          <span class="badge ${a.change > 0 ? 'badge-up' : 'badge-down'}">${a.change > 0 ? '+' : ''}${Math.abs(a.change)}%</span>
        </div>
      `;
    }).join('') || '<div style="text-align:center;padding:40px;color:var(--text-muted)">Nenhum alerta encontrado</div>';
  }

  document.querySelectorAll('#alert-type-filters .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterType = btn.dataset.type;
      document.querySelectorAll('#alert-type-filters .btn').forEach(b => b.classList.toggle('active', b.dataset.type === filterType));
      renderList();
    });
  });

  renderList();
}
