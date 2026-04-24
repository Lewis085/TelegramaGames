import { formatCurrency } from '../utils/helpers.js';

const opportunities = [
  { name: 'Perfume Importado Brand Inspired', cat: 'Beleza', stage: 'Subindo', stageColor: 'var(--success)', buyer: 'Classe C/D · 18-35 · Desejo de status acessível', why: 'Margem de 300-500% no volume. Fornecedores nacionais com MOQ baixo. Alta demanda por "cheiro de rico" acessível.', channel: 'TikTok Ads', channelWhy: 'Produto extremamente visual. Vídeos de reação e comparação viralizam fácil.', window: 'green', windowLabel: 'Opera agora', margin: 'R$ 15-25 custo → R$ 79-129 venda', demand: '42K buscas/mês crescendo' },
  { name: 'Tênis Casual Estilo Jordan/Nike', cat: 'Moda', stage: 'No Pico', stageColor: 'var(--warning)', buyer: 'Classe C · 16-28 · Ostentação e pertencimento social', why: 'Volume altíssimo. Preço de compra R$40-80, venda R$149-249. Marketplace aceita bem. Público compra por impulso visual.', channel: 'Meta Ads', channelWhy: 'Feed do Instagram é vitrine perfeita. Público engajado com moda streetwear.', window: 'yellow', windowLabel: 'Ainda dá, corre', margin: 'R$ 45-80 custo → R$ 149-249 venda', demand: '88K buscas/mês estável' },
  { name: 'Cinta Modeladora Térmica', cat: 'Saúde & Beleza', stage: 'Com Fôlego', stageColor: '#8b5cf6', buyer: 'Classe C/D · 25-45 · Mulheres buscando resultado rápido', why: 'Produto perene com picos sazonais. Custo baixíssimo, margem de 400%. Fácil de explicar em vídeo com antes/depois.', channel: 'TikTok Ads', channelWhy: 'Conteúdo de transformação retém e converte. CPM mais barato que Meta para esse público.', window: 'green', windowLabel: 'Opera agora', margin: 'R$ 12-20 custo → R$ 69-99 venda', demand: '31K buscas/mês crescendo' },
  { name: 'Relógio Smartwatch Estilo Apple', cat: 'Tecnologia', stage: 'No Pico', stageColor: 'var(--warning)', buyer: 'Classe C · 20-40 · Desejo tech acessível', why: 'Aparência premium, preço popular. Funcionalidades reais (saúde, notificações). Compradores repetem para presente.', channel: 'Meta Ads', channelWhy: 'Criativos comparativos "original vs inspirado" performam muito no Feed e Reels.', window: 'yellow', windowLabel: 'Ainda dá, corre', margin: 'R$ 35-60 custo → R$ 149-199 venda', demand: '55K buscas/mês estável' },
  { name: 'Kit Skincare Vitamina C + Ácido', cat: 'Beleza', stage: 'Subindo', stageColor: 'var(--success)', buyer: 'Classe B/C · 22-40 · Autocuidado e rotina de pele', why: 'Tendência forte impulsionada por dermatologistas no TikTok. Kit aumenta ticket médio. Recompra natural em 45-60 dias.', channel: 'TikTok Ads', channelWhy: 'Conteúdo educativo de skincare tem retenção altíssima. Público confia em reviews.', window: 'green', windowLabel: 'Opera agora', margin: 'R$ 18-30 custo → R$ 89-139 venda', demand: '67K buscas/mês crescendo' },
  { name: 'Garrafa Térmica Estilo Stanley', cat: 'Utilidades', stage: 'Com Fôlego', stageColor: '#8b5cf6', buyer: 'Classe B/C · 18-35 · Lifestyle e status funcional', why: 'Hype da Stanley abriu mercado para genéricos. Custo de R$15-25, venda de R$59-99. Alta demanda em época de calor.', channel: 'Meta Ads + TikTok', channelWhy: 'Combina conteúdo aspiracional no TikTok com remarketing no Meta para fechar venda.', window: 'yellow', windowLabel: 'Ainda dá, corre', margin: 'R$ 15-25 custo → R$ 59-99 venda', demand: '38K buscas/mês caindo leve' },
  { name: 'Fone Bluetooth TWS Premium', cat: 'Tecnologia', stage: 'Subindo', stageColor: 'var(--success)', buyer: 'Classe C/D · 16-30 · Tech acessível do dia a dia', why: 'Produto essencial com ciclo de recompra. Custo caiu muito. Visual premium e funcionalidade real justificam o preço.', channel: 'Google Ads', channelWhy: 'Busca ativa altíssima. Quem pesquisa já quer comprar. ROAS estável.', window: 'green', windowLabel: 'Opera agora', margin: 'R$ 20-40 custo → R$ 79-149 venda', demand: '95K buscas/mês crescendo' },
  { name: 'Maquiagem Multistick (Blush/Lip/Eye)', cat: 'Beleza', stage: 'Subindo', stageColor: 'var(--success)', buyer: 'Classe B/C/D · 16-35 · Praticidade e tendência K-beauty', why: 'Viralizou no TikTok global. Produto 3 em 1 com apelo forte. MOQ baixo, fácil de marcar privada.', channel: 'TikTok Ads', channelWhy: 'Produto feito para demonstração em vídeo curto. UGC converte absurdamente.', window: 'green', windowLabel: 'Opera agora', margin: 'R$ 8-15 custo → R$ 39-69 venda', demand: '28K buscas/mês explodindo' },
];

export function renderRadarMercado() {
  const container = document.getElementById('page-content');
  let visibleCount = 4;

  function render() {
    const visible = opportunities.slice(0, visibleCount);
    container.innerHTML = `
      <div class="animate-in" style="max-width:1060px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <div style="display:flex;align-items:center;gap:12px">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            <h2 style="margin:0">Radar de Mercado</h2>
          </div>
          <button id="rm-refresh" class="btn btn-secondary" style="font-size:13px;display:flex;align-items:center;gap:6px">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Atualizar
          </button>
        </div>
        <p style="color:var(--text-secondary);margin-bottom:28px">Oportunidades ativas com potencial de operação lucrativa. Foco em produtos com apelo para classes C/D.</p>

        <div style="display:flex;flex-direction:column;gap:16px">
          ${visible.map(o => {
            const wColor = o.window === 'green' ? 'var(--success)' : o.window === 'yellow' ? 'var(--warning)' : 'var(--danger)';
            const wBg = o.window === 'green' ? 'rgba(34,197,94,.08)' : o.window === 'yellow' ? 'rgba(234,179,8,.08)' : 'rgba(239,68,68,.08)';
            return `
            <div class="card" style="padding:0;overflow:hidden">
              <div style="display:grid;grid-template-columns:1fr 1fr;min-height:0">

                <div style="padding:24px;border-right:1px solid var(--border)">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
                    <h3 style="margin:0;font-size:16px;flex:1">${o.name}</h3>
                    <span style="font-size:11px;padding:3px 10px;border-radius:10px;font-weight:600;background:${wBg};color:${wColor};white-space:nowrap">${o.windowLabel}</span>
                  </div>
                  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
                    <span style="font-size:11px;padding:3px 8px;border-radius:6px;background:var(--bg-1);color:var(--text-secondary)">${o.cat}</span>
                    <span style="font-size:11px;padding:3px 8px;border-radius:6px;background:rgba(${o.stageColor === 'var(--success)' ? '34,197,94' : o.stageColor === 'var(--warning)' ? '234,179,8' : '139,92,246'},.1);color:${o.stageColor};font-weight:600">${o.stage}</span>
                  </div>
                  <div style="margin-bottom:14px">
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px">Perfil do comprador</div>
                    <div style="font-size:13px;color:var(--text-primary)">${o.buyer}</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px">Por que funciona</div>
                    <div style="font-size:13px;color:var(--text-secondary);line-height:1.5">${o.why}</div>
                  </div>
                </div>

                <div style="padding:24px;display:flex;flex-direction:column;gap:14px">
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px">Canal recomendado</div>
                    <div style="font-size:14px;font-weight:700;color:var(--accent);margin-bottom:4px">${o.channel}</div>
                    <div style="font-size:12px;color:var(--text-secondary)">${o.channelWhy}</div>
                  </div>
                  <div style="height:1px;background:var(--border)"></div>
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px">Margem estimada</div>
                    <div style="font-size:13px;font-weight:600;color:var(--success)">${o.margin}</div>
                  </div>
                  <div style="height:1px;background:var(--border)"></div>
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px">Demanda</div>
                    <div style="font-size:13px;color:var(--text-primary)">${o.demand}</div>
                  </div>
                </div>

              </div>
            </div>`;
          }).join('')}
        </div>

        ${visibleCount < opportunities.length ? `<div style="text-align:center;margin-top:24px"><button id="rm-more" class="btn btn-secondary" style="font-size:13px">Carregar mais oportunidades</button></div>` : ''}
      </div>
    `;

    document.getElementById('rm-refresh')?.addEventListener('click', () => {
      // Shuffle order to simulate refresh
      for (let i = opportunities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opportunities[i], opportunities[j]] = [opportunities[j], opportunities[i]];
      }
      visibleCount = 4;
      render();
    });

    document.getElementById('rm-more')?.addEventListener('click', () => {
      visibleCount = Math.min(visibleCount + 4, opportunities.length);
      render();
    });
  }

  render();
}
