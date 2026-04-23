import { creatives } from '../data/creatives.js';
import { marketplaces, getMarketplace, getMpBadge } from '../data/marketplaces.js';
import { formatNumber, formatCurrency , renderImage } from '../utils/helpers.js';

let filterMp = 'all';

export function renderCreatives() {
  const container = document.getElementById('page-content');

  container.innerHTML = `
    <div class="marketplace-filters mb-20" id="cr-mp-filters">
      <button class="mp-pill active" data-mp="all"><span class="mp-dot" style="background:var(--accent)"></span> Todos</button>
      ${marketplaces.map(m => `<button class="mp-pill" data-mp="${m.id}"><span class="mp-dot" style="background:${m.color}"></span> ${m.name}</button>`).join('')}
    </div>
    <div class="kpi-grid mb-28" id="cr-kpis"></div>
    <div class="card mb-28 animate-in">
      <div class="card-header">
        <h2>Anuncios que Mais Bombaram</h2>
        <span class="text-muted" style="font-size:13px">Ordenados por ROAS</span>
      </div>
      <div class="creatives-grid" id="cr-grid"></div>
    </div>
    <div class="card animate-in">
      <div class="card-header"><h2>Ranking de Performance</h2></div>
      <div style="overflow-x:auto">
        <table class="data-table" id="cr-table">
          <thead>
            <tr><th>#</th><th>Criativo</th><th>Marketplace</th><th>Formato</th><th>Impressoes</th><th>CTR</th><th>Conversoes</th><th>Gasto</th><th>Receita</th><th>ROAS</th><th>Status</th></tr>
          </thead>
          <tbody id="cr-tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  function render() {
    const data = filterMp === 'all' ? [...creatives] : creatives.filter(c => c.marketplace === filterMp);
    const sorted = [...data].sort((a, b) => b.roas - a.roas);

    // KPIs
    const totalSpend = data.reduce((s, c) => s + c.spend, 0);
    const totalRevenue = data.reduce((s, c) => s + c.revenue, 0);
    const avgRoas = data.length ? data.reduce((s, c) => s + c.roas, 0) / data.length : 0;
    const avgCtr = data.length ? data.reduce((s, c) => s + c.ctr, 0) / data.length : 0;

    document.getElementById('cr-kpis').innerHTML = `
      <div class="kpi-card animate-in stagger-1">
        <div class="kpi-icon" style="background:var(--accent-bg)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="m10 8 6 4-6 4V8z"/></svg></div>
        <div class="kpi-value">${data.length}</div>
        <div class="kpi-label">Criativos Ativos</div>
      </div>
      <div class="kpi-card animate-in stagger-2">
        <div class="kpi-icon" style="background:var(--warning-bg)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg></div>
        <div class="kpi-value">${formatCurrency(totalSpend)}</div>
        <div class="kpi-label">Investimento Total</div>
      </div>
      <div class="kpi-card animate-in stagger-3">
        <div class="kpi-icon" style="background:var(--success-bg)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg></div>
        <div class="kpi-value">${avgRoas.toFixed(1)}x</div>
        <div class="kpi-label">ROAS Medio</div>
      </div>
      <div class="kpi-card animate-in stagger-4">
        <div class="kpi-icon" style="background:rgba(139,92,246,0.1)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
        <div class="kpi-value">${avgCtr.toFixed(1)}%</div>
        <div class="kpi-label">CTR Medio</div>
      </div>
    `;

    // Creative cards
    document.getElementById('cr-grid').innerHTML = sorted.map(c => {
      const mp = getMarketplace(c.marketplace);
      return `
        <div class="creative-card animate-in">
          <div class="creative-thumb" style="overflow:hidden;position:relative">
            ${renderImage(c.thumbnailUrl || c.imageUrl, c.title)}
            ${c.type === 'video' ? '<div class="play-icon"></div>' : ''}
          </div>
          <div class="creative-body">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              ${getMpBadge(mp)}
              <span class="creative-status ${c.status}">${c.status === 'active' ? 'Ativo' : 'Pausado'}</span>
            </div>
            <div class="creative-title">${c.title}</div>
            <div class="creative-hook">"${c.hook}"</div>
            <div class="creative-metrics">
              <div class="creative-metric">
                <div class="creative-metric-value">${formatNumber(c.impressions)}</div>
                <div class="creative-metric-label">Impressoes</div>
              </div>
              <div class="creative-metric">
                <div class="creative-metric-value">${c.ctr}%</div>
                <div class="creative-metric-label">CTR</div>
              </div>
              <div class="creative-metric">
                <div class="creative-metric-value text-success">${c.roas}x</div>
                <div class="creative-metric-label">ROAS</div>
              </div>
              <div class="creative-metric">
                <div class="creative-metric-value">${formatNumber(c.conversions)}</div>
                <div class="creative-metric-label">Conversoes</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Table
    document.getElementById('cr-tbody').innerHTML = sorted.map((c, i) => {
      const mp = getMarketplace(c.marketplace);
      return `<tr>
        <td class="table-rank">${i + 1}</td>
        <td><strong>${c.title}</strong></td>
        <td>${getMpBadge(mp)}</td>
        <td style="font-size:13px">${c.format}</td>
        <td>${formatNumber(c.impressions)}</td>
        <td>${c.ctr}%</td>
        <td>${formatNumber(c.conversions)}</td>
        <td>${formatCurrency(c.spend)}</td>
        <td>${formatCurrency(c.revenue)}</td>
        <td><strong class="text-success">${c.roas}x</strong></td>
        <td><span class="creative-status ${c.status}">${c.status === 'active' ? 'Ativo' : 'Pausado'}</span></td>
      </tr>`;
    }).join('');
  }

  document.querySelectorAll('#cr-mp-filters .mp-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      filterMp = pill.dataset.mp;
      document.querySelectorAll('#cr-mp-filters .mp-pill').forEach(p => p.classList.toggle('active', p.dataset.mp === filterMp));
      render();
    });
  });

  render();
}
