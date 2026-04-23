import { keywords } from '../data/keywords.js';
import { products } from '../data/products.js';
import { formatNumber, formatPercent } from '../utils/helpers.js';

export function renderNichoExplorer() {
  const container = document.getElementById('page-content');

  // Build niche data
  const nicheMap = {};
  products.forEach(p => {
    const key = p.niche || p.category;
    if (!nicheMap[key]) nicheMap[key] = { name: key, products: [], totalSales: 0, avgChange: 0, maxHype: 0 };
    nicheMap[key].products.push(p);
    nicheMap[key].totalSales += p.sales;
    nicheMap[key].maxHype = Math.max(nicheMap[key].maxHype, p.hypeScore || 0);
  });

  const cats = [...new Set(keywords.map(k => k.category))];
  const nicheScores = cats.map(cat => {
    const kws = keywords.filter(k => k.category === cat);
    const prs = products.filter(p => p.category === cat);
    const avgVol = kws.reduce((s, k) => s + k.volume, 0) / (kws.length || 1);
    const avgGrowth = kws.reduce((s, k) => s + k.change, 0) / (kws.length || 1);
    const lowComp = kws.filter(k => k.competition === 'baixa').length;
    const medComp = kws.filter(k => k.competition === 'média').length;
    const highComp = kws.filter(k => k.competition === 'alta').length;
    const lowPct = lowComp / (kws.length || 1);
    const score = Math.round((avgGrowth * 0.35 + lowPct * 100 * 0.35 + (avgVol / 100000) * 0.3) * 10) / 10;
    const saturation = highComp / (kws.length || 1);
    const difficulty = saturation > 0.6 ? 'Difícil' : saturation > 0.3 ? 'Moderado' : 'Fácil';
    const diffColor = saturation > 0.6 ? 'var(--danger)' : saturation > 0.3 ? 'var(--warning)' : 'var(--success)';
    return {
      category: cat, score: Math.min(100, Math.max(0, score)), avgVol, avgGrowth, lowPct,
      kwCount: kws.length, prodCount: prs.length, lowComp, medComp, highComp,
      totalSales: prs.reduce((s, p) => s + p.sales, 0), difficulty, diffColor, saturation
    };
  }).sort((a, b) => b.score - a.score);

  const lowCompNiches = nicheScores.filter(n => n.lowPct > 0.3).sort((a, b) => b.lowPct - a.lowPct);
  const topGrowth = [...nicheScores].sort((a, b) => b.avgGrowth - a.avgGrowth).slice(0, 5);

  container.innerHTML = `
    <div class="nicho-hero animate-in">
      <div class="nicho-hero-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      </div>
      <div>
        <h2>Explorador de Nichos</h2>
        <p>Descubra nichos lucrativos com baixa competição e alta demanda</p>
      </div>
    </div>

    <div class="grid-3 animate-in">
      <div class="nicho-insight-card">
        <div class="nicho-insight-icon" style="background:var(--success-bg)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div class="nicho-insight-val">${lowCompNiches.length}</div>
        <div class="nicho-insight-label">Nichos Baixa Competição</div>
      </div>
      <div class="nicho-insight-card">
        <div class="nicho-insight-icon" style="background:var(--accent-bg)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <div class="nicho-insight-val">${topGrowth[0]?.category || '-'}</div>
        <div class="nicho-insight-label">Nicho Mais Quente</div>
      </div>
      <div class="nicho-insight-card">
        <div class="nicho-insight-icon" style="background:var(--warning-bg)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        <div class="nicho-insight-val">${nicheScores.length}</div>
        <div class="nicho-insight-label">Total de Nichos</div>
      </div>
    </div>

    <div class="ai-insight animate-in">
      <div class="ai-insight-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 7.27 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>
        🧠 Análise IA — Melhores Nichos para Entrar Agora
      </div>
      <p>Com base nos dados de <strong>${nicheScores.reduce((s, n) => s + n.kwCount, 0)} keywords</strong> e <strong>${products.length} produtos</strong> monitorados:</p>
      <ul>
        ${lowCompNiches.slice(0, 3).map(n => `<li><strong>${n.category}</strong> — ${Math.round(n.lowPct * 100)}% das keywords com baixa competição, crescimento de ${formatPercent(n.avgGrowth)}</li>`).join('')}
        ${topGrowth.slice(0, 2).map(n => `<li>🔥 <strong>${n.category}</strong> é o nicho mais quente com crescimento médio de ${formatPercent(n.avgGrowth)}</li>`).join('')}
      </ul>
    </div>

    <div class="card animate-in mb-28">
      <div class="card-header">
        <h2 style="display:flex;align-items:center;gap:8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          Ranking Completo de Nichos
        </h2>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Nicho</th><th>Score</th><th>Dificuldade</th><th>Keywords</th><th>Volume Médio</th><th>Crescimento</th><th>Baixa Comp.</th><th>Produtos</th><th>Vendas Total</th></tr>
          </thead>
          <tbody>
            ${nicheScores.map((s, i) => {
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
                <td><span class="badge" style="background:${s.diffColor}20;color:${s.diffColor}">${s.difficulty}</span></td>
                <td>${s.kwCount}</td>
                <td>${formatNumber(Math.round(s.avgVol))}</td>
                <td><span class="badge ${s.avgGrowth > 0 ? 'badge-up' : 'badge-down'}">${formatPercent(s.avgGrowth)}</span></td>
                <td>${Math.round(s.lowPct * 100)}%</td>
                <td>${s.prodCount}</td>
                <td>${formatNumber(s.totalSales)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card animate-in">
      <div class="card-header">
        <h2>🏆 Nichos com Menor Competição</h2>
      </div>
      <div class="nicho-cards-grid">
        ${lowCompNiches.map(n => `
          <div class="nicho-opportunity-card">
            <div class="nicho-opp-header">
              <span class="nicho-opp-name">${n.category}</span>
              <span class="badge badge-up" style="font-size:12px">${formatPercent(n.avgGrowth)}</span>
            </div>
            <div class="nicho-opp-score">
              <div class="nicho-opp-score-circle" style="--score:${Math.min(100, n.score * 2)};--color:var(--success)">
                <span>${n.score}</span>
              </div>
              <div>
                <div style="font-size:12px;color:var(--text-muted)">Score de Oportunidade</div>
                <div style="font-size:13px;font-weight:600;color:var(--success)">${n.difficulty}</div>
              </div>
            </div>
            <div class="nicho-opp-stats">
              <div><span>${n.kwCount}</span> Keywords</div>
              <div><span>${Math.round(n.lowPct * 100)}%</span> Baixa Comp.</div>
              <div><span>${formatNumber(Math.round(n.avgVol))}</span> Vol. Médio</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
