import { keywords } from '../data/keywords.js';
import { products } from '../data/products.js';
import { formatNumber, formatPercent } from '../utils/helpers.js';

export function renderOportunidade() {
  const container = document.getElementById('page-content');

  // Calculate opportunity score per category
  const cats = [...new Set(keywords.map(k => k.category))];
  const scores = cats.map(cat => {
    const kws = keywords.filter(k => k.category === cat);
    const prs = products.filter(p => p.category === cat);
    const avgVol = kws.reduce((s, k) => s + k.volume, 0) / (kws.length || 1);
    const avgGrowth = kws.reduce((s, k) => s + k.change, 0) / (kws.length || 1);
    const lowCompPct = kws.filter(k => k.competition === 'baixa').length / (kws.length || 1);
    const score = Math.round((avgGrowth * 0.4 + lowCompPct * 100 * 0.3 + (avgVol / 100000) * 0.3) * 10) / 10;
    return { category: cat, score: Math.min(100, Math.max(0, score)), avgVol, avgGrowth, lowCompPct, kwCount: kws.length, prodCount: prs.length };
  }).sort((a, b) => b.score - a.score);

  container.innerHTML = `
    <div class="ai-insight animate-in">
      <div class="ai-insight-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        Como funciona o Score de Oportunidade
      </div>
      <p>O score e calculado com base em 3 fatores: <strong>Crescimento medio</strong> (40%), <strong>Baixa competicao</strong> (30%), e <strong>Volume de busca</strong> (30%). Quanto maior o score, melhor a oportunidade de entrada no nicho.</p>
    </div>
    <div class="card animate-in">
      <div class="card-header">
        <h2 style="display:flex;align-items:center;gap:8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          Ranking de Oportunidades por Nicho
        </h2>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>#</th><th>Categoria</th><th>Score</th><th>Keywords</th><th>Volume Medio</th><th>Crescimento</th><th>Baixa Compet.</th><th>Produtos</th></tr>
        </thead>
        <tbody>
          ${scores.map((s, i) => {
            const scoreColor = s.score > 30 ? 'var(--success)' : s.score > 15 ? 'var(--warning)' : 'var(--danger)';
            const barW = Math.min(100, s.score * 2);
            return `<tr>
              <td class="table-rank">${i + 1}</td>
              <td><strong>${s.category}</strong></td>
              <td>
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="width:80px;height:6px;border-radius:3px;background:var(--bg-primary);overflow:hidden">
                    <div style="width:${barW}%;height:100%;border-radius:3px;background:${scoreColor}"></div>
                  </div>
                  <span style="font-weight:700;color:${scoreColor}">${s.score}</span>
                </div>
              </td>
              <td>${s.kwCount}</td>
              <td>${formatNumber(Math.round(s.avgVol))}</td>
              <td><span class="badge ${s.avgGrowth > 0 ? 'badge-up' : 'badge-down'}">${formatPercent(s.avgGrowth)}</span></td>
              <td>${Math.round(s.lowCompPct * 100)}%</td>
              <td>${s.prodCount}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}
