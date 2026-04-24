import { products, getProductImage } from '../data/products.js';
import { formatNumber, formatCurrency, renderImage } from '../utils/helpers.js';

const catMap = [
  { id: 'beleza', label: 'Beleza', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>', cats: ['Beleza'] },
  { id: 'fitness', label: 'Fitness & Saúde', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>', cats: ['Saude'] },
  { id: 'moda', label: 'Moda', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2l3 5h6l3-5"/><rect x="4" y="7" width="16" height="15" rx="2"/></svg>', cats: ['Moda'] },
  { id: 'casa', label: 'Casa & Decoração', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>', cats: ['Casa & Decoracao'] },
  { id: 'tech', label: 'Tecnologia', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', cats: ['Eletronicos','Celulares','Informatica','Games'] },
  { id: 'pet', label: 'Mundo Pet', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>', cats: ['Brinquedos'] },
  { id: 'diversos', label: 'Diversos', icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>', cats: [] }
];

function getProductsForCat(cat) {
  if (!cat.cats.length) return [...products].sort((a,b) => b.hypeScore - a.hypeScore).slice(0, 5);
  return products.filter(p => cat.cats.some(c => p.category === c)).sort((a,b) => b.hypeScore - a.hypeScore).slice(0, 5);
}

function classify(p) {
  const visualNiches = ['skincare','maquiagem','cuidados-cabelo','modeladores','pelucias','iluminacao','moda-praia','bolsas','jaquetas','oculos','vestidos','roupas-fitness','organizacao','entretenimento','casa-inteligente'];
  const isVisual = visualNiches.includes(p.niche) || p.category === 'Moda' || p.category === 'Beleza';
  const isHighTicket = p.price > 300;
  const isYoung = ['tiktok','shopee','shein'].includes(p.marketplace);
  const hasSearch = p.sales > 20000;
  return { isVisual, isHighTicket, isYoung, hasSearch };
}

function score(p) {
  const c = classify(p);
  let ttk = 50, meta = 50, gg = 50;
  const tW = [], mW = [], gW = [];

  if (c.isVisual) { ttk += 25; tW.push('Produto visual com alto fator wow, perfeito para conteúdo nativo.'); meta += 15; mW.push('Criativos de antes/depois e unboxing funcionam bem no feed.'); gg -= 15; gW.push('Formato de busca não captura apelo visual.'); }
  if (c.isYoung) { ttk += 20; tW.push('Público jovem e engajado nessa plataforma.'); gg -= 10; gW.push('Público jovem pesquisa menos em buscadores tradicionais.'); }
  if (c.isHighTicket) { ttk -= 15; tW.push('Ticket alto dificulta compra por impulso.'); meta += 15; mW.push('Excelente para funil com remarketing e LTV.'); gg += 20; gW.push('Busca intencional favorece decisão racional de ticket alto.'); }
  else { ttk += 10; tW.push('Preço impulsivo favorece conversão rápida.'); }
  if (c.hasSearch) { gg += 25; gW.push('Demanda comprovada com alto volume de vendas.'); meta += 10; mW.push('Validação de mercado facilita criação de público sósia.'); }
  else { gg -= 10; gW.push('Volume de vendas ainda baixo para fundo de funil.'); meta += 10; mW.push('Produto precisa ser empurrado via descoberta.'); }

  if (p.hypeScore > 80) { ttk += 10; tW.push('Produto em momento viral — timing perfeito.'); }
  if (p.change > 100) { ttk += 5; meta += 5; }

  ttk = Math.min(99, Math.max(10, ttk));
  meta = Math.min(99, Math.max(10, meta));
  gg = Math.min(99, Math.max(10, gg));

  return [
    { name: 'TikTok Ads', score: ttk, color: '#22c55e', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-.71 4.46-2.1 6.13-1.6 1.91-4.04 3.07-6.52 3.01-2.94-.06-5.75-1.57-7.38-3.95-1.56-2.28-1.92-5.32-.9-7.9 1.04-2.61 3.51-4.55 6.31-5.11 1.25-.25 2.55-.26 3.82-.12V13.3c-1.3-.12-2.65-.07-3.85.45-1.47.63-2.62 1.95-3.04 3.51-.38 1.43-.17 3.03.62 4.29.83 1.33 2.37 2.15 3.96 2.18 1.63.03 3.23-.74 4.19-2.03 1.04-1.39 1.48-3.15 1.44-4.9-.04-4.83-.02-9.67-.03-14.5-.02-2.1-.03-4.2-.02-6.3h4.29z"/></svg>', why: tW.join(' ') },
    { name: 'Meta Ads', score: meta, color: 'var(--accent)', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>', why: mW.join(' ') },
    { name: 'Google Ads', score: gg, color: '#eab308', icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>', why: gW.join(' ') }
  ].sort((a,b) => b.score - a.score);
}

function kwGoogle(p) { return [`comprar ${p.name.toLowerCase()}`, `${p.name.toLowerCase()} vale a pena`, `melhor ${p.name.toLowerCase()} 2026`, `${p.name.toLowerCase()} preço`, `${p.niche} barato`]; }
function kwMeta(p) { return ['Compradores Engajados', 'Compras Online', p.category, p.niche.replace(/-/g,' '), 'Frete Grátis']; }
function kwTiktok(p) { return [`#${p.niche.replace(/-/g,'')}`, '#achados', '#tiktokfazcomprar', '#viral', `#${p.category.toLowerCase().replace(/ .*/,'')}`]; }

export function renderCanalCerto() {
  const container = document.getElementById('page-content');
  let step = 1, selCat = null, selProd = null;

  function render() {
    let h = `<div class="animate-in" style="max-width:1060px;margin:0 auto">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        <h2 style="margin:0">Canal Certo</h2>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:32px">Inteligência de Tráfego — descubra onde e como anunciar cada produto.</p>`;

    if (step === 1) {
      h += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px">
        ${catMap.map(c => `<div class="card cc-cat" data-id="${c.id}" style="cursor:pointer;padding:20px;display:flex;align-items:center;gap:12px;transition:border-color .2s">
          <span style="color:var(--accent)">${c.icon}</span><span style="font-weight:600;font-size:14px">${c.label}</span>
        </div>`).join('')}</div>`;
    } else if (step === 2) {
      const cat = catMap.find(c=>c.id===selCat);
      const prods = getProductsForCat(cat);
      h += `<button id="cc-back" class="btn btn-secondary" style="margin-bottom:20px;font-size:13px">← Voltar</button>
        <h3 style="margin-bottom:6px;font-size:16px">Produtos em alta — ${cat.label}</h3>
        <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px">Clique para ver a análise de canal.</p>
        <div style="display:flex;flex-direction:column;gap:12px">
        ${prods.map(p => {
          const img = getProductImage(p.imgType, p);
          const badge = p.hypeScore >= 80 ? ['Explodindo','var(--success)'] : p.hypeScore >= 50 ? ['Subindo','var(--warning)'] : ['Estável','var(--text-muted)'];
          return `<div class="card cc-prod" data-id="${p.id}" style="cursor:pointer;padding:16px;display:flex;gap:16px;align-items:center;transition:border-color .2s">
            <div style="width:56px;height:56px;border-radius:8px;overflow:hidden;flex-shrink:0;background:${img.gradient}">${renderImage(p.imageUrl, p.name)}</div>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;display:flex;gap:8px;flex-wrap:wrap">
                <span>${formatCurrency(p.price)}</span><span>·</span><span>${formatNumber(p.sales)} vendas</span><span>·</span><span style="color:${badge[1]}">${badge[0]}</span>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div style="font-size:20px;font-weight:800;color:var(--accent)">${p.hypeScore}</div>
              <div style="font-size:10px;color:var(--text-muted)">Hype</div>
            </div>
          </div>`}).join('')}</div>`;
    } else if (step === 3) {
      const p = products.find(x => x.id === selProd);
      const ranks = score(p);
      const img = getProductImage(p.imgType, p);
      const sat = p.hypeScore > 75 ? ['Baixa','var(--success)','Poucos anunciantes escalando'] : p.hypeScore > 40 ? ['Média','var(--warning)','Mercado competitivo mas com espaço'] : ['Alta','var(--danger)','Muitos anunciantes — risco de CPA alto'];
      const eng = p.change > 150 ? ['Viral','Retenção acima de 45% nos primeiros 3s'] : p.change > 50 ? ['Alto','Bom engajamento orgânico nas plataformas'] : ['Moderado','Engajamento estável, sem viralização'];

      h += `<button id="cc-back" class="btn btn-secondary" style="margin-bottom:20px;font-size:13px">← Voltar</button>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px">
          <div style="width:52px;height:52px;border-radius:10px;overflow:hidden;flex-shrink:0;background:${img.gradient}">${renderImage(p.imageUrl, p.name)}</div>
          <div><h2 style="margin:0;font-size:20px">${p.name}</h2><div style="color:var(--text-secondary);font-size:13px">${p.category} · ${formatCurrency(p.price)} · ${formatNumber(p.sales)} vendas</div></div>
        </div>

        <div style="display:grid;grid-template-columns:5fr 3fr;gap:20px">
          <div style="display:flex;flex-direction:column;gap:20px">
            <div class="card" style="padding:24px">
              <h3 style="font-size:15px;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid var(--border)">Ranking de Canais</h3>
              <div style="display:flex;flex-direction:column;gap:24px">
                ${ranks.map((r,i) => `<div style="display:flex;gap:14px;align-items:flex-start">
                  <div style="font-size:28px;line-height:1">${['🥇','🥈','🥉'][i]}</div>
                  <div style="flex:1">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                      <span style="font-weight:700;font-size:15px">${r.name}</span>
                      <span style="font-weight:800;font-size:17px;color:${r.color}">${r.score}/100</span>
                    </div>
                    <div style="height:5px;background:var(--bg-1);border-radius:3px;overflow:hidden;margin-bottom:10px"><div style="width:${r.score}%;height:100%;background:${r.color};border-radius:3px;transition:width .6s ease"></div></div>
                    <p style="font-size:12px;color:var(--text-secondary);line-height:1.5;margin:0">${r.why}</p>
                  </div>
                </div>`).join('')}
              </div>
            </div>

            <div class="card" style="padding:24px">
              <h3 style="font-size:15px;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid var(--border)">Keywords & Segmentação</h3>
              <div style="display:flex;flex-direction:column;gap:18px">
                <div>
                  <div style="font-weight:600;font-size:13px;margin-bottom:8px;color:#eab308">Google Ads — Busca Exata / Frase</div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">${kwGoogle(p).map(k=>`<span style="background:rgba(234,179,8,.1);color:#eab308;padding:4px 10px;border-radius:10px;font-size:11px">${k}</span>`).join('')}</div>
                </div>
                <div>
                  <div style="font-weight:600;font-size:13px;margin-bottom:8px;color:var(--accent)">Meta Ads — Interesses</div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">${kwMeta(p).map(k=>`<span style="background:rgba(249,115,22,.1);color:var(--accent);padding:4px 10px;border-radius:10px;font-size:11px">${k}</span>`).join('')}</div>
                </div>
                <div>
                  <div style="font-weight:600;font-size:13px;margin-bottom:8px;color:#22c55e">TikTok Ads — Hashtags / Categorias</div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">${kwTiktok(p).map(k=>`<span style="background:rgba(34,197,94,.1);color:#22c55e;padding:4px 10px;border-radius:10px;font-size:11px">${k}</span>`).join('')}</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:20px">
            <div class="card" style="padding:24px">
              <h3 style="font-size:15px;margin-bottom:16px">Provas de Mercado</h3>
              <div style="display:flex;flex-direction:column;gap:14px">
                <div><div style="font-size:11px;color:var(--text-secondary)">Crescimento (30d)</div><div style="font-size:22px;font-weight:700;color:var(--success)">+${p.change}%</div></div>
                <div style="height:1px;background:var(--border)"></div>
                <div><div style="font-size:11px;color:var(--text-secondary)">Saturação</div><div style="font-size:18px;font-weight:700;color:${sat[1]}">${sat[0]}</div><div style="font-size:11px;color:var(--text-muted)">${sat[2]}</div></div>
                <div style="height:1px;background:var(--border)"></div>
                <div><div style="font-size:11px;color:var(--text-secondary)">Engajamento</div><div style="font-size:18px;font-weight:700">${eng[0]}</div><div style="font-size:11px;color:var(--text-muted)">${eng[1]}</div></div>
                <div style="height:1px;background:var(--border)"></div>
                <div><div style="font-size:11px;color:var(--text-secondary)">Views Estimados</div><div style="font-size:18px;font-weight:700">${p.views}</div></div>
              </div>
            </div>
            <div class="card" style="padding:20px;background:linear-gradient(135deg,rgba(249,115,22,.08),transparent);border:1px solid rgba(249,115,22,.18)">
              <h4 style="font-size:14px;color:var(--accent);margin-bottom:8px">Estratégia Recomendada</h4>
              <p style="font-size:12px;color:var(--text-secondary);line-height:1.6;margin:0">
                Comece validando pelo <strong>${ranks[0].name}</strong> com criativos de teste (3-5 variações). Após 50 conversões, ative o <strong>${ranks[1].name}</strong> para remarketing e público sósia. Orçamento sugerido de validação: <strong>${formatCurrency(p.price * 3)}/dia</strong>.
              </p>
            </div>
          </div>
        </div>`;
    }

    h += '</div>';
    container.innerHTML = h;

    document.querySelectorAll('.cc-cat').forEach(el => {
      el.addEventListener('click', () => { selCat = el.dataset.id; step = 2; render(); });
      el.onmouseenter = () => el.style.borderColor = 'var(--accent)';
      el.onmouseleave = () => el.style.borderColor = 'var(--border)';
    });
    document.querySelectorAll('.cc-prod').forEach(el => {
      el.addEventListener('click', () => { selProd = parseInt(el.dataset.id); step = 3; render(); });
      el.onmouseenter = () => el.style.borderColor = 'var(--accent)';
      el.onmouseleave = () => el.style.borderColor = 'var(--border)';
    });
    const back = document.getElementById('cc-back');
    if (back) back.addEventListener('click', () => { step--; render(); });
  }

  render();
}
