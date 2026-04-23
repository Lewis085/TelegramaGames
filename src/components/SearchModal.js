import { keywords } from '../data/keywords.js';
import { products } from '../data/products.js';
import { marketplaces } from '../data/marketplaces.js';
import { navigate } from '../utils/router.js';

export function initSearchModal() {
  const overlay = document.getElementById('search-modal-overlay');

  function open() {
    overlay.classList.remove('hidden');
    overlay.innerHTML = `
      <div class="search-modal">
        <input type="text" id="search-input" placeholder="Buscar keywords, produtos, marketplaces..." autofocus />
        <div class="search-results" id="search-results">
          <div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px">
            Digite para buscar...
          </div>
        </div>
      </div>
    `;
    setTimeout(() => document.getElementById('search-input')?.focus(), 50);

    document.getElementById('search-input').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        document.getElementById('search-results').innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px">Digite para buscar...</div>';
        return;
      }
      const kw = keywords.filter(k => k.keyword.toLowerCase().includes(q)).slice(0, 5);
      const pr = products.filter(p => p.name.toLowerCase().includes(q)).slice(0, 5);
      const mp = marketplaces.filter(m => m.name.toLowerCase().includes(q));
      let html = '';
      if (kw.length) {
        kw.forEach(k => { html += `<div class="search-result-item" data-action="keyword" data-id="${k.id}">🔍 ${k.keyword} <span class="search-result-type">keyword</span></div>`; });
      }
      if (pr.length) {
        pr.forEach(p => { html += `<div class="search-result-item" data-action="product">${p.image} ${p.name} <span class="search-result-type">produto</span></div>`; });
      }
      if (mp.length) {
        mp.forEach(m => { html += `<div class="search-result-item" data-action="marketplace" data-id="${m.id}">${m.icon} ${m.name} <span class="search-result-type">marketplace</span></div>`; });
      }
      if (!html) html = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px">Nenhum resultado encontrado</div>';
      document.getElementById('search-results').innerHTML = html;

      document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const action = item.dataset.action;
          if (action === 'keyword') navigate('/keywords');
          else if (action === 'product') navigate('/trending');
          else if (action === 'marketplace') navigate('/marketplaces');
          close();
        });
      });
    });

    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  function close() { overlay.classList.add('hidden'); overlay.innerHTML = ''; }

  window.addEventListener('opensearch', open);
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });
}
