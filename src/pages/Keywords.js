import { keywords, categories } from '../data/keywords.js';
import { marketplaces, getMarketplace, getMpBadge } from '../data/marketplaces.js';
import { renderSparkline } from '../components/SparkLine.js';
import { createBarChart, destroyChart } from '../components/TrendChart.js';
import { formatNumber, formatPercent } from '../utils/helpers.js';

let chart = null;
let sortBy = 'change';
let sortDir = 'desc';
let filterMp = 'all';
let filterCat = 'all';

export function renderKeywords() {
  if (chart) destroyChart(chart);
  const container = document.getElementById('page-content');

  container.innerHTML = `
    <div class="card mb-20 animate-in">
      <div class="card-header">
        <h2>Filtros</h2>
      </div>
      <div class="marketplace-filters" id="mp-filters">
        <button class="mp-pill ${filterMp === 'all' ? 'active' : ''}" data-mp="all">
          <span class="mp-dot" style="background:var(--accent)"></span> Todos
        </button>
        ${marketplaces.map(m => `
          <button class="mp-pill ${filterMp === m.id ? 'active' : ''}" data-mp="${m.id}">
            <span class="mp-dot" style="background:${m.color}"></span> ${m.name}
          </button>
        `).join('')}
      </div>
      <div class="btn-group" id="cat-filters">
        <button class="btn btn-ghost btn-sm ${filterCat === 'all' ? 'active' : ''}" data-cat="all">Todas Categorias</button>
        ${categories.slice(0, 8).map(c => `<button class="btn btn-ghost btn-sm ${filterCat === c ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}
      </div>
    </div>

    <div class="grid-2">
      <div class="card animate-in" style="grid-column: 1 / -1">
        <div class="card-header">
          <h2>Keywords Mais Pesquisadas</h2>
          <span class="text-muted" id="kw-count"></span>
        </div>
        <div style="overflow-x:auto">
          <table class="data-table" id="kw-table">
            <thead>
              <tr>
                <th data-sort="rank">#</th>
                <th data-sort="keyword">Keyword</th>
                <th data-sort="marketplace">Marketplace</th>
                <th data-sort="category">Categoria</th>
                <th data-sort="volume">Volume</th>
                <th>Tendencia</th>
                <th data-sort="change">Variacao</th>
                <th data-sort="competition">Competicao</th>
              </tr>
            </thead>
            <tbody id="kw-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card animate-in">
      <div class="card-header"><h2>Volume por Marketplace</h2></div>
      <div class="chart-container" style="height:300px"><canvas id="kw-vol-chart"></canvas></div>
    </div>
  `;

  function getFiltered() {
    let data = [...keywords];
    if (filterMp !== 'all') data = data.filter(k => k.marketplace === filterMp);
    if (filterCat !== 'all') data = data.filter(k => k.category === filterCat);
    data.sort((a, b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      return sortDir === 'desc' ? (vb > va ? 1 : -1) : (va > vb ? 1 : -1);
    });
    return data;
  }

  function renderTable() {
    const data = getFiltered();
    document.getElementById('kw-count').textContent = `${data.length} keywords`;
    const compMap = { alta: 'competition-high', média: 'competition-medium', baixa: 'competition-low' };
    document.getElementById('kw-tbody').innerHTML = data.map((k, i) => {
      const mp = getMarketplace(k.marketplace);
      const trendBadge = k.trend === 'up' ? 'badge-up' : k.trend === 'down' ? 'badge-down' : 'badge-stable';
      const trendArrow = k.trend === 'up' ? '↑' : k.trend === 'down' ? '↓' : '→';
      const sparkColor = k.trend === 'up' ? '#10b981' : k.trend === 'down' ? '#ef4444' : '#f59e0b';
      return `<tr>
        <td class="table-rank">${i + 1}</td>
        <td><strong>${k.keyword}</strong></td>
        <td>${getMpBadge(mp)}</td>
        <td style="font-size:13px;color:var(--text-secondary)">${k.category}</td>
        <td>${formatNumber(k.volume)}</td>
        <td>${renderSparkline(k.sparkData, sparkColor)}</td>
        <td><span class="badge ${trendBadge}">${trendArrow} ${formatPercent(Math.abs(k.change))}</span></td>
        <td><span class="badge ${compMap[k.competition]}">${k.competition}</span></td>
      </tr>`;
    }).join('');
  }

  // Filters
  document.querySelectorAll('.mp-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      filterMp = pill.dataset.mp;
      document.querySelectorAll('.mp-pill').forEach(p => p.classList.toggle('active', p.dataset.mp === filterMp));
      renderTable();
    });
  });
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      filterCat = btn.dataset.cat;
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === filterCat));
      renderTable();
    });
  });

  // Sort
  document.querySelectorAll('[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (sortBy === col) sortDir = sortDir === 'desc' ? 'asc' : 'desc';
      else { sortBy = col; sortDir = 'desc'; }
      renderTable();
    });
  });

  renderTable();

  // Volume chart
  const volByMp = {};
  marketplaces.forEach(m => { volByMp[m.id] = 0; });
  keywords.forEach(k => { volByMp[k.marketplace] = (volByMp[k.marketplace] || 0) + k.volume; });
  chart = createBarChart(document.getElementById('kw-vol-chart'),
    marketplaces.map(m => m.name),
    [{ label: 'Volume Total', data: marketplaces.map(m => volByMp[m.id]), backgroundColor: marketplaces.map(m => m.color + 'CC') }]
  );
}
