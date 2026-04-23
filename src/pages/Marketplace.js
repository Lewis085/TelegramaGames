import { marketplaces, getMarketplace, getMpLogo, getMpBadge } from '../data/marketplaces.js';
import { getKeywordsByMarketplace } from '../data/keywords.js';
import { getProductsByMarketplace, getProductImage } from '../data/products.js';
import { createBarChart, destroyChart } from '../components/TrendChart.js';
import { renderSparkline } from '../components/SparkLine.js';
import { formatNumber, formatPercent, formatCurrency } from '../utils/helpers.js';

let chart = null;

export function renderMarketplaces() {
  if (chart) destroyChart(chart);
  const container = document.getElementById('page-content');

  container.innerHTML = `
    <div class="mp-detail-grid animate-in" id="mp-grid"></div>
    <div id="mp-detail-section"></div>
  `;

  document.getElementById('mp-grid').innerHTML = marketplaces.map(m => {
    const growthClass = m.growth > 0 ? 'text-success' : 'text-danger';
    const arrow = m.growth > 0 ? '↑' : '↓';
    return `
      <div class="mp-detail-card" data-mp="${m.id}" style="border-top:3px solid ${m.color}">
        <div class="mp-icon" style="height:40px">${getMpLogo(m.id, 40)}</div>
        <div class="mp-name">${m.name}</div>
        <div class="mp-stat">${m.monthlySearches} buscas/mes</div>
        <div class="mp-stat ${growthClass}" style="font-weight:700;margin-top:4px">${arrow} ${formatPercent(Math.abs(m.growth))}</div>
      </div>
    `;
  }).join('');

  function showDetail(mpId) {
    const mp = getMarketplace(mpId);
    const kws = getKeywordsByMarketplace(mpId).sort((a, b) => b.change - a.change);
    const prods = getProductsByMarketplace(mpId).sort((a, b) => b.sales - a.sales);

    document.getElementById('mp-detail-section').innerHTML = `
      <div class="card animate-in mb-20" style="border-top:3px solid ${mp.color}">
        <div class="card-header">
          <div style="display:flex;align-items:center;gap:12px">
            ${getMpLogo(mp.id, 24)}
            <h2>${mp.name} — Detalhes</h2>
          </div>
          <span class="badge" style="background:${mp.bgLight};color:${mp.badgeText};font-size:14px">${mp.monthlySearches} buscas/mes</span>
        </div>
        <div class="grid-2">
          <div>
            <h3 style="margin-bottom:12px;font-size:15px;display:flex;align-items:center;gap:8px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Top Keywords
            </h3>
            <table class="data-table">
              <thead><tr><th>#</th><th>Keyword</th><th>Volume</th><th>Tendencia</th><th>Variacao</th></tr></thead>
              <tbody>
                ${kws.slice(0, 10).map((k, i) => {
                  const trendBadge = k.trend === 'up' ? 'badge-up' : k.trend === 'down' ? 'badge-down' : 'badge-stable';
                  const arrow = k.trend === 'up' ? '↑' : k.trend === 'down' ? '↓' : '→';
                  const sparkColor = k.trend === 'up' ? '#10b981' : k.trend === 'down' ? '#ef4444' : '#f59e0b';
                  return `<tr>
                    <td class="table-rank">${i + 1}</td>
                    <td><strong>${k.keyword}</strong></td>
                    <td>${formatNumber(k.volume)}</td>
                    <td>${renderSparkline(k.sparkData, sparkColor, 60, 20)}</td>
                    <td><span class="badge ${trendBadge}">${arrow} ${formatPercent(Math.abs(k.change))}</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
          <div>
            <h3 style="margin-bottom:12px;font-size:15px;display:flex;align-items:center;gap:8px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Produtos Mais Vendidos
            </h3>
            ${prods.slice(0, 6).map(p => {
              const img = getProductImage(p.imgType, p);
              return `
              <div class="growth-item" style="cursor:pointer" data-pid="${p.id}">
                <div style="width:36px;height:36px;border-radius:8px;background:${img.gradient};flex-shrink:0"></div>
                <div class="growth-info">
                  <div class="growth-name">${p.name}</div>
                  <div class="growth-volume">${formatCurrency(p.price)} · ${formatNumber(p.sales)} vendas</div>
                </div>
                <div class="growth-value text-success">+${p.change}%</div>
              </div>
            `}).join('')}
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('[data-pid]').forEach(el => {
      el.addEventListener('click', () => {
        const p = prods.find(pr => pr.id === parseInt(el.dataset.pid));
        if (p) window.dispatchEvent(new CustomEvent('openproduct', { detail: p }));
      });
    });
  }

  document.querySelectorAll('.mp-detail-card').forEach(card => {
    card.addEventListener('click', () => showDetail(card.dataset.mp));
  });

  showDetail('tiktok');
}
