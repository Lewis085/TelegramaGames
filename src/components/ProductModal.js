import { getMarketplace, getMpBadge, getMpLogo } from '../data/marketplaces.js';
import { getProductImage } from '../data/products.js';
import { formatCurrency, formatNumber , renderImage } from '../utils/helpers.js';

export function initProductModal() {
  // Add modal container to body
  const modalDiv = document.createElement('div');
  modalDiv.id = 'product-modal';
  modalDiv.innerHTML = '';
  document.body.appendChild(modalDiv);

  window.addEventListener('openproduct', (e) => {
    showProductModal(e.detail);
  });
}

export function showProductModal(product) {
  const modal = document.getElementById('product-modal');
  const mp = getMarketplace(product.marketplace);
  const img = getProductImage(product.imgType, product);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const lowestPrice = product.price * 0.92;
  const highestPrice = product.originalPrice * 1.05;

  modal.innerHTML = `
    <div class="product-modal-overlay" id="pm-overlay">
      <div class="product-modal" style="position:relative">
        <button class="product-modal-close" id="pm-close">X</button>
        <div class="product-modal-header">
          <div class="product-modal-img" style="background:${img.gradient};overflow:hidden">
            ${renderImage(product.imageUrl, product.title)}
          </div>
          <div class="product-modal-info">
            <div style="margin-bottom:8px">${getMpBadge(mp)}</div>
            <h2>${product.name}</h2>
            <div style="margin-top:8px">
              <span class="product-modal-price">${formatCurrency(product.price)}</span>
              <span class="product-modal-original">${formatCurrency(product.originalPrice)}</span>
              <span class="badge badge-up" style="margin-left:8px;font-size:12px">-${discount}%</span>
            </div>
            <div class="price-history">
              <span style="font-size:12px;color:var(--text-muted)">Historico:</span>
              <span class="price-tag lowest">Min ${formatCurrency(lowestPrice)}</span>
              <span class="price-tag highest">Max ${formatCurrency(highestPrice)}</span>
            </div>
          </div>
        </div>
        <div class="product-modal-body">
          <div class="product-modal-stats">
            <div class="pm-stat">
              <div class="pm-stat-value">${formatNumber(product.sales)}</div>
              <div class="pm-stat-label">Vendas</div>
            </div>
            <div class="pm-stat">
              <div class="pm-stat-value text-success">+${product.change}%</div>
              <div class="pm-stat-label">Crescimento</div>
            </div>
            <div class="pm-stat">
              <div class="pm-stat-value" style="color:var(--warning)">${product.rating}</div>
              <div class="pm-stat-label">Avaliacao</div>
            </div>
            <div class="pm-stat">
              <div class="pm-stat-value">${formatNumber(product.reviews)}</div>
              <div class="pm-stat-label">Reviews</div>
            </div>
          </div>
          <div class="product-modal-stats" style="grid-template-columns:1fr 1fr 1fr">
            <div class="pm-stat">
              <div class="pm-stat-value">${product.adSpend || 'N/A'}</div>
              <div class="pm-stat-label">Gasto Ads Estimado</div>
            </div>
            <div class="pm-stat">
              <div class="pm-stat-value">${product.views || 'N/A'}</div>
              <div class="pm-stat-label">Visualizacoes</div>
            </div>
            <div class="pm-stat">
              <div class="pm-stat-value">${formatCurrency(product.price * product.sales * 0.001)}</div>
              <div class="pm-stat-label">Receita Estimada</div>
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-top:16px">
            <button class="btn btn-primary" onclick="window.dispatchEvent(new Event('closeproduct'))">Monitorar Produto</button>
            <button class="btn-export" onclick="window.dispatchEvent(new Event('closeproduct'))">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Exportar Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('pm-close').addEventListener('click', closeModal);
  document.getElementById('pm-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'pm-overlay') closeModal();
  });
  window.addEventListener('closeproduct', closeModal);
  document.addEventListener('keydown', escHandler);
}

function escHandler(e) {
  if (e.key === 'Escape') closeModal();
}

function closeModal() {
  document.getElementById('product-modal').innerHTML = '';
  document.removeEventListener('keydown', escHandler);
}
