import { products, getProductImage } from '../data/products.js';
import { marketplaces, getMarketplace, getMpBadge } from '../data/marketplaces.js';
import { formatCurrency, formatNumber , renderImage } from '../utils/helpers.js';

let filterMp = 'all';

export function renderTrending() {
  const container = document.getElementById('page-content');

  container.innerHTML = `
    <div class="marketplace-filters mb-20" id="trend-mp-filters">
      <button class="mp-pill active" data-mp="all"><span class="mp-dot" style="background:var(--accent)"></span> Todos</button>
      ${marketplaces.map(m => `<button class="mp-pill" data-mp="${m.id}"><span class="mp-dot" style="background:${m.color}"></span> ${m.name}</button>`).join('')}
    </div>
    <div class="products-grid" id="products-grid"></div>
  `;

  function renderProducts() {
    let data = filterMp === 'all' ? [...products] : products.filter(p => p.marketplace === filterMp);
    data.sort((a, b) => b.change - a.change);

    document.getElementById('products-grid').innerHTML = data.map(p => {
      const mp = getMarketplace(p.marketplace);
      const img = getProductImage(p.imgType, p);
      const discount = Math.round((1 - p.price / p.originalPrice) * 100);
      return `
        <div class="product-card animate-in" data-product-id="${p.id}">
          <div class="product-image" style="background:${img.gradient}">
            ${renderImage(p.imageUrl, p.title, 'product-card-img')}
          </div>
          ${getMpBadge(mp)}
          <div class="product-name" style="margin-top:8px">${p.name}</div>
          <div class="product-price">${formatCurrency(p.price)}</div>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="product-original">${formatCurrency(p.originalPrice)}</span>
            <span class="badge badge-up" style="font-size:11px">-${discount}%</span>
          </div>
          <div class="product-meta">
            <div>
              <div class="product-sales">${formatNumber(p.sales)} vendas</div>
              <div class="product-rating" style="color:var(--warning)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--warning)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${p.rating} (${formatNumber(p.reviews)})
              </div>
            </div>
            <div class="product-change up">+${p.change}%</div>
          </div>
        </div>
      `;
    }).join('');

    // Click to open product modal
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.productId);
        const product = products.find(p => p.id === id);
        if (product) {
          window.dispatchEvent(new CustomEvent('openproduct', { detail: product }));
        }
      });
    });
  }

  document.querySelectorAll('#trend-mp-filters .mp-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      filterMp = pill.dataset.mp;
      document.querySelectorAll('#trend-mp-filters .mp-pill').forEach(p => p.classList.toggle('active', p.dataset.mp === filterMp));
      renderProducts();
    });
  });

  renderProducts();
}
