import { products, getProductImage } from '../data/products.js';
import { getMarketplace, getMpBadge, marketplaces } from '../data/marketplaces.js';
import { formatCurrency, formatNumber } from '../utils/helpers.js';

const phaseConfig = {
  explodindo: { label: '🔥 Explodindo', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', desc: 'Crescimento explosivo agora' },
  pico: { label: '⚡ No Pico', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', desc: 'Máximo de popularidade' },
  subindo: { label: '📈 Subindo', color: '#10b981', bg: 'rgba(16,185,129,0.12)', desc: 'Tendência de alta' },
  estavel: { label: '➡️ Estável', color: '#6366f1', bg: 'rgba(99,102,241,0.12)', desc: 'Demanda constante' },
  esfriando: { label: '📉 Esfriando', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', desc: 'Perdendo força' },
};

let activePhase = 'all';
let activeMp = 'all';

export function renderHypeRadar() {
  const container = document.getElementById('page-content');

  const sorted = [...products].sort((a, b) => b.hypeScore - a.hypeScore);
  const exploding = sorted.filter(p => p.hypePhase === 'explodindo' || p.hypePhase === 'pico');
  const rising = sorted.filter(p => p.hypePhase === 'subindo');

  container.innerHTML = `
    <div class="hype-hero animate-in">
      <div class="hype-hero-content">
        <div class="hype-hero-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div>
          <h2>Hype Radar</h2>
          <p>Detecte produtos que estão explodindo ou prestes a viralizar nos marketplaces</p>
        </div>
      </div>
      <div class="hype-hero-stats">
        <div class="hype-stat-pill"><span class="hype-stat-num">${exploding.length}</span> Explodindo agora</div>
        <div class="hype-stat-pill"><span class="hype-stat-num">${rising.length}</span> Em ascensão</div>
        <div class="hype-stat-pill"><span class="hype-stat-num">${sorted.length}</span> Monitorados</div>
      </div>
    </div>

    <div class="hype-filters animate-in">
      <div class="hype-filter-group">
        <span class="hype-filter-label">Fase:</span>
        <button class="hype-pill active" data-phase="all">Todos</button>
        ${Object.entries(phaseConfig).map(([k, v]) => `<button class="hype-pill" data-phase="${k}"><span style="color:${v.color}">${v.label}</span></button>`).join('')}
      </div>
      <div class="hype-filter-group">
        <span class="hype-filter-label">Marketplace:</span>
        <button class="mp-pill active" data-mp="all"><span class="mp-dot" style="background:var(--accent)"></span> Todos</button>
        ${marketplaces.map(m => `<button class="mp-pill" data-mp="${m.id}"><span class="mp-dot" style="background:${m.color}"></span> ${m.shortName}</button>`).join('')}
      </div>
    </div>

    <div id="hype-grid" class="hype-products-grid animate-in"></div>
  `;

  function renderGrid() {
    let data = [...products].sort((a, b) => b.hypeScore - a.hypeScore);
    if (activePhase !== 'all') data = data.filter(p => p.hypePhase === activePhase);
    if (activeMp !== 'all') data = data.filter(p => p.marketplace === activeMp);

    document.getElementById('hype-grid').innerHTML = data.length === 0
      ? '<div style="text-align:center;padding:60px;color:var(--text-muted)">Nenhum produto encontrado para esses filtros</div>'
      : data.map(p => {
        const mp = getMarketplace(p.marketplace);
        const img = getProductImage(p.imgType, p);
        const phase = phaseConfig[p.hypePhase];
        const scoreColor = p.hypeScore >= 80 ? '#ef4444' : p.hypeScore >= 60 ? '#f59e0b' : p.hypeScore >= 40 ? '#10b981' : '#6366f1';
        return `
          <div class="hype-card animate-in" data-product-id="${p.id}">
            <div class="hype-card-img" style="background:${img.gradient}">
              <img src="${img.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"/>
              <div class="hype-score-badge" style="background:${scoreColor}">${p.hypeScore}</div>
              <div class="hype-phase-tag" style="background:${phase.bg};color:${phase.color}">${phase.label}</div>
            </div>
            <div class="hype-card-body">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">${getMpBadge(mp)}</div>
              <div class="hype-card-name">${p.name}</div>
              <div class="hype-card-price">${formatCurrency(p.price)} <span class="hype-card-original">${formatCurrency(p.originalPrice)}</span></div>
              <div class="hype-card-stats">
                <div class="hype-mini-stat"><span class="hype-mini-val">${formatNumber(p.sales)}</span><span class="hype-mini-label">vendas</span></div>
                <div class="hype-mini-stat"><span class="hype-mini-val text-success">+${p.change}%</span><span class="hype-mini-label">crescimento</span></div>
                <div class="hype-mini-stat"><span class="hype-mini-val" style="color:var(--warning)">${p.rating}★</span><span class="hype-mini-label">avaliação</span></div>
              </div>
              <div class="hype-velocity">
                <div class="hype-velocity-bar"><div class="hype-velocity-fill" style="width:${Math.min(100, p.hypeScore)}%;background:${scoreColor}"></div></div>
                <span style="font-size:11px;color:var(--text-muted)">Hype ${p.hypeScore}/100</span>
              </div>
            </div>
          </div>`;
      }).join('');

    document.querySelectorAll('.hype-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.productId);
        const product = products.find(p => p.id === id);
        if (product) window.dispatchEvent(new CustomEvent('openproduct', { detail: product }));
      });
    });
  }

  container.querySelectorAll('.hype-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activePhase = pill.dataset.phase;
      container.querySelectorAll('.hype-pill').forEach(p => p.classList.toggle('active', p.dataset.phase === activePhase));
      renderGrid();
    });
  });

  container.querySelectorAll('.mp-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeMp = pill.dataset.mp;
      container.querySelectorAll('.mp-pill').forEach(p => p.classList.toggle('active', p.dataset.mp === activeMp));
      renderGrid();
    });
  });

  renderGrid();
}
