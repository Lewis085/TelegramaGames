import { createLineChart, createBarChart, destroyChart } from '../components/TrendChart.js';
import { trendData, categoryGrowth } from '../data/trends.js';
import { marketplaces, getMarketplace } from '../data/marketplaces.js';
import { formatNumber, formatPercent } from '../utils/helpers.js';

let charts = [];

export function renderAnalysis() {
  charts.forEach(c => destroyChart(c));
  charts = [];

  const container = document.getElementById('page-content');
  container.innerHTML = `
    <div class="ai-insight animate-in">
      <div class="ai-insight-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 1.1-.9 2-2 2s-2-.9-2-2a2 2 0 0 1 2-2zm0 6a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0v-6a2 2 0 0 1 2-2z"/></svg>
        AI Insights — Resumo da Semana
      </div>
      <p>Com base na analise dos 6 marketplaces monitorados, identificamos os seguintes padroes:</p>
      <ul>
        <li><strong>TikTok Shop</strong> lidera o crescimento com +42.8%, impulsionado por produtos de beleza e skincare</li>
        <li><strong>Beleza & Skincare</strong> e a categoria com maior crescimento (+67.3%), puxada por videos virais</li>
        <li><strong>Suplementos</strong> mantem tendencia de alta consistente ha 4 meses (+45.8%)</li>
        <li><strong>Games</strong> e <strong>Automotivo</strong> mostram sinais de desaceleracao — considere redirecionar investimentos</li>
        <li>Oportunidade detectada: <strong>Casa Inteligente</strong> com alta demanda e baixa competicao na Shopee</li>
      </ul>
    </div>

    <div class="grid-2">
      <div class="card animate-in">
        <div class="card-header">
          <h2>Tendencia por Marketplace</h2>
          <div class="period-selector" id="period-sel">
            <button class="period-btn active" data-p="6m">6M</button>
            <button class="period-btn" data-p="3m">3M</button>
            <button class="period-btn" data-p="1m">1M</button>
          </div>
        </div>
        <div class="chart-container" style="height:300px"><canvas id="analysis-mp-chart"></canvas></div>
      </div>
      <div class="card animate-in">
        <div class="card-header"><h2>Tendencia por Categoria</h2></div>
        <div class="chart-container" style="height:300px"><canvas id="analysis-cat-chart"></canvas></div>
      </div>
    </div>

    <div class="card animate-in mb-28">
      <div class="card-header"><h2>Categorias em Crescimento</h2></div>
      <div id="category-growth"></div>
    </div>
  `;

  // Marketplace trend chart
  const mpColors = { mercadolivre: '#ffe600', amazon: '#ff9900', shopee: '#ee4d2d', tiktok: '#25F4EE', americanas: '#e60014', shein: '#888' };
  charts.push(createLineChart(document.getElementById('analysis-mp-chart'), trendData.labels,
    Object.keys(trendData.marketplaces).map(id => ({
      label: getMarketplace(id).name,
      data: trendData.marketplaces[id],
      borderColor: mpColors[id],
    }))
  ));

  // Category trend chart
  const catColors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'];
  const topCats = Object.keys(trendData.categories).slice(0, 5);
  charts.push(createLineChart(document.getElementById('analysis-cat-chart'), trendData.labels,
    topCats.map((cat, i) => ({
      label: cat,
      data: trendData.categories[cat],
      borderColor: catColors[i],
    }))
  ));

  // Category growth list
  const maxGrowth = Math.max(...categoryGrowth.map(c => Math.abs(c.growth)));
  document.getElementById('category-growth').innerHTML = categoryGrowth.map(c => {
    const barWidth = (Math.abs(c.growth) / maxGrowth * 100);
    const barColor = c.growth > 0 ? 'var(--success)' : 'var(--danger)';
    const textClass = c.growth > 0 ? 'text-success' : 'text-danger';
    return `
      <div class="growth-item">
        <div class="growth-icon" style="font-size:16px;color:var(--text-muted);font-weight:700">·</div>
        <div class="growth-info">
          <div class="growth-name">${c.category}</div>
          <div class="growth-volume">${formatNumber(c.volume)} buscas/mes</div>
        </div>
        <div class="growth-bar-wrap">
          <div class="growth-bar"><div class="growth-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
        </div>
        <div class="growth-value ${textClass}">${formatPercent(c.growth)}</div>
      </div>
    `;
  }).join('');

  // Period selector
  document.querySelectorAll('#period-sel .period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#period-sel .period-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
