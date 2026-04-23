import { renderKPICards } from '../components/KPICard.js';
import { createLineChart, createBarChart, destroyChart } from '../components/TrendChart.js';
import { getTopKeywords } from '../data/keywords.js';
import { getTopProducts, getProductImage } from '../data/products.js';
import { getTopCreatives } from '../data/creatives.js';
import { trendData } from '../data/trends.js';
import { getUnreadAlerts } from '../data/alerts.js';
import { marketplaces, getMarketplace, getMpBadge, getMpLogo } from '../data/marketplaces.js';
import { formatNumber, formatCurrency, formatPercent } from '../utils/helpers.js';

let charts = [];

export function renderDashboard() {
  charts.forEach(c => destroyChart(c));
  charts = [];

  const container = document.getElementById('page-content');
  container.innerHTML = `
    <div class="kpi-grid" id="kpi-grid"></div>
    <div class="grid-2">
      <div class="card animate-in">
        <div class="card-header">
          <h2>Evolucao de Tendencias</h2>
          <div class="period-selector">
            <button class="period-btn active">6M</button>
            <button class="period-btn">3M</button>
            <button class="period-btn">1M</button>
          </div>
        </div>
        <div class="chart-container" style="height:280px"><canvas id="trend-chart"></canvas></div>
      </div>
      <div class="card animate-in">
        <div class="card-header"><h2>Volume por Marketplace</h2></div>
        <div class="chart-container" style="height:280px"><canvas id="marketplace-chart"></canvas></div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card animate-in">
        <div class="card-header"><h2>Top Keywords em Alta</h2></div>
        <div id="top-keywords"></div>
      </div>
      <div class="card animate-in">
        <div class="card-header"><h2>Produtos Mais Vendidos</h2></div>
        <div id="top-products"></div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card animate-in">
        <div class="card-header"><h2>Criativos Top ROAS</h2></div>
        <div id="top-creatives"></div>
      </div>
      <div class="card animate-in">
        <div class="card-header"><h2>Alertas Recentes</h2></div>
        <div id="recent-alerts"></div>
      </div>
    </div>
  `;

  // KPIs
  renderKPICards(document.getElementById('kpi-grid'), [
    { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>', value: 55, label: 'Keywords Monitoradas', change: 12.3 },
    { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>', value: 34, label: 'Produtos Trending', change: 23.5 },
    { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>', value: '42.8%', label: 'Crescimento TikTok', change: 42.8 },
    { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>', value: getUnreadAlerts().length, label: 'Alertas Nao Lidos', change: 8.2 },
  ]);

  // Trend chart
  const mpColors = { mercadolivre: '#ffe600', amazon: '#ff9900', shopee: '#ee4d2d', tiktok: '#25F4EE', americanas: '#e60014', shein: '#888' };
  charts.push(createLineChart(document.getElementById('trend-chart'), trendData.labels,
    ['tiktok', 'shopee', 'mercadolivre', 'amazon'].map(id => ({
      label: getMarketplace(id).name, data: trendData.marketplaces[id],
      borderColor: mpColors[id], backgroundColor: mpColors[id] + '15', fill: true,
    }))
  ));

  // Marketplace bar chart
  charts.push(createBarChart(document.getElementById('marketplace-chart'),
    marketplaces.map(m => m.shortName),
    [{ label: 'Buscas Mensais (M)', data: marketplaces.map(m => parseFloat(m.monthlySearches)), backgroundColor: marketplaces.map(m => m.color + 'CC') }]
  ));

  // Top keywords
  const topKw = getTopKeywords(8);
  document.getElementById('top-keywords').innerHTML = `
    <table class="data-table">
      <thead><tr><th>#</th><th>Keyword</th><th>Marketplace</th><th>Variacao</th><th>Volume</th></tr></thead>
      <tbody>
        ${topKw.map((k, i) => {
          const mp = getMarketplace(k.marketplace);
          return `<tr><td class="table-rank">${i + 1}</td><td><strong>${k.keyword}</strong></td><td>${getMpBadge(mp)}</td><td><span class="badge badge-up">${formatPercent(k.change)}</span></td><td>${formatNumber(k.volume)}</td></tr>`;
        }).join('')}
      </tbody>
    </table>
  `;

  // Top products
  const topPr = getTopProducts(5);
  document.getElementById('top-products').innerHTML = topPr.map(p => {
    const mp = getMarketplace(p.marketplace);
    const img = getProductImage(p.imgType, p);
    return `<div class="growth-item" style="cursor:pointer" data-pid="${p.id}">
      <div style="width:36px;height:36px;border-radius:8px;background:${img.gradient};flex-shrink:0;overflow:hidden;position:relative">
        <img src="${img.img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.style.display='none'"/>
      </div>
      <div class="growth-info">
        <div class="growth-name">${p.name}</div>
        <div class="growth-volume">${getMpLogo(mp.id, 12)} ${mp.name} · ${formatCurrency(p.price)}</div>
      </div>
      <div class="growth-value text-success">+${p.change}%</div>
    </div>`;
  }).join('');

  document.querySelectorAll('[data-pid]').forEach(el => {
    el.addEventListener('click', () => {
      const p = topPr.find(pr => pr.id === parseInt(el.dataset.pid));
      if (p) window.dispatchEvent(new CustomEvent('openproduct', { detail: p }));
    });
  });

  // Top creatives
  const topCr = getTopCreatives(4);
  document.getElementById('top-creatives').innerHTML = topCr.map(c => {
    const mp = getMarketplace(c.marketplace);
    return `<div class="growth-item">
      <div style="width:36px;height:36px;border-radius:8px;background:${c.thumbnail};flex-shrink:0;display:flex;align-items:center;justify-content:center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(0,0,0,0.3)" stroke="none"><polygon points="10,8 18,12 10,16"/></svg>
      </div>
      <div class="growth-info">
        <div class="growth-name">${c.title}</div>
        <div class="growth-volume">${getMpLogo(mp.id, 12)} ${mp.name} · ${c.format}</div>
      </div>
      <div class="growth-value text-success">${c.roas}x</div>
    </div>`;
  }).join('');

  // Recent alerts
  const alertIcons = {
    explosive: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    trending: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    opportunity: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
    warning: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  };
  const alerts = getUnreadAlerts().slice(0, 3);
  document.getElementById('recent-alerts').innerHTML = alerts.map(a => `
    <div class="alert-item unread">
      <div class="alert-icon ${a.type}">${alertIcons[a.type]}</div>
      <div class="alert-body">
        <div class="alert-title">${a.title}</div>
        <div class="alert-desc">${a.description}</div>
        <div class="alert-time">${a.time}</div>
      </div>
      <span class="badge ${a.change > 0 ? 'badge-up' : 'badge-down'}">${a.change > 0 ? '+' : ''}${Math.abs(a.change)}%</span>
    </div>
  `).join('');
}
