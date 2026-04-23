import { keywords, categories } from '../data/keywords.js';
import { products } from '../data/products.js';
import { formatNumber, formatPercent } from '../utils/helpers.js';

export function renderNicho() {
  const container = document.getElementById('page-content');
  const cats = [...new Set(keywords.map(k => k.category))];

  container.innerHTML = `
    <div class="card animate-in mb-20">
      <div class="card-header">
        <h2 style="display:flex;align-items:center;gap:8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-6"/><path d="m21 3-9 9"/><path d="M3 3l9 9"/></svg>
          Selecione dois nichos para comparar
        </h2>
      </div>
      <div class="grid-2">
        <div>
          <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:8px">Nicho A</label>
          <select id="nicho-a" style="width:100%;padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-family:var(--font);font-size:14px;outline:none">
            ${cats.map((c, i) => `<option value="${c}" ${i === 0 ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:8px">Nicho B</label>
          <select id="nicho-b" style="width:100%;padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--border-color);background:var(--bg-primary);color:var(--text-primary);font-family:var(--font);font-size:14px;outline:none">
            ${cats.map((c, i) => `<option value="${c}" ${i === 1 ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>
      <button class="btn btn-primary" id="compare-btn" style="margin-top:16px">Comparar Nichos</button>
    </div>
    <div id="comparison-result"></div>
  `;

  function compare() {
    const catA = document.getElementById('nicho-a').value;
    const catB = document.getElementById('nicho-b').value;
    const kwA = keywords.filter(k => k.category === catA);
    const kwB = keywords.filter(k => k.category === catB);
    const prA = products.filter(p => p.category === catA);
    const prB = products.filter(p => p.category === catB);

    const metrics = (kws, prs) => ({
      totalKw: kws.length,
      totalVol: kws.reduce((s, k) => s + k.volume, 0),
      avgChange: kws.length ? kws.reduce((s, k) => s + k.change, 0) / kws.length : 0,
      totalSales: prs.reduce((s, p) => s + p.sales, 0),
      totalProducts: prs.length,
      highComp: kws.filter(k => k.competition === 'alta').length,
      lowComp: kws.filter(k => k.competition === 'baixa').length,
    });

    const mA = metrics(kwA, prA);
    const mB = metrics(kwB, prB);

    function row(label, vA, vB, fmt = formatNumber) {
      const winner = vA > vB ? 'A' : vB > vA ? 'B' : 'tie';
      return `<tr>
        <td style="font-weight:600;font-size:14px;color:${winner === 'A' ? 'var(--success)' : 'var(--text-primary)'}">${fmt(vA)}</td>
        <td style="text-align:center;font-size:13px;color:var(--text-secondary)">${label}</td>
        <td style="text-align:right;font-weight:600;font-size:14px;color:${winner === 'B' ? 'var(--success)' : 'var(--text-primary)'}">${fmt(vB)}</td>
      </tr>`;
    }

    document.getElementById('comparison-result').innerHTML = `
      <div class="card animate-in">
        <div class="card-header" style="justify-content:center;gap:20px">
          <span style="font-weight:700;color:var(--accent)">${catA}</span>
          <span style="font-size:13px;color:var(--text-muted);text-transform:uppercase">VS</span>
          <span style="font-weight:700;color:var(--accent)">${catB}</span>
        </div>
        <table class="data-table" style="max-width:600px;margin:0 auto">
          <tbody>
            ${row('Keywords', mA.totalKw, mB.totalKw, v => v)}
            ${row('Volume Total', mA.totalVol, mB.totalVol)}
            ${row('Crescimento Medio', mA.avgChange, mB.avgChange, v => formatPercent(v))}
            ${row('Total Vendas', mA.totalSales, mB.totalSales)}
            ${row('Produtos', mA.totalProducts, mB.totalProducts, v => v)}
            ${row('Alta Competicao', mA.highComp, mB.highComp, v => v)}
            ${row('Baixa Competicao', mA.lowComp, mB.lowComp, v => v)}
          </tbody>
        </table>
      </div>
    `;
  }

  document.getElementById('compare-btn').addEventListener('click', compare);
  compare();
}
