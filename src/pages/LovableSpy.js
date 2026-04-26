export function renderLovableSpy() {
  const container = document.getElementById('page-content');

  // Dummy data representing "mined" lovable sites
  const adsData = [
    {
      id: 1,
      title: 'Kit Clareador Definitivo',
      url: 'clareador-premium.lovable.app',
      platform: 'TikTok Ads',
      spend: '$1.2K',
      roas: '3.4x',
      clicks: '15.4K',
      cpc: '$0.12',
      status: 'Escalando',
      adCopy: 'Descubra o segredo coreano para uma pele de porcelana em 7 dias...',
      thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
      networkIcon: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.9 1.57-4.49 2.21-6.86 1.83-2.61-.39-5.01-1.9-6.38-4.14C-1.19 19.82-.44 16.51 1.62 14.47c1.78-1.74 4.39-2.52 6.83-2.14.02 1.39.02 2.78.01 4.18-1.15-.35-2.42-.44-3.56.02-1.37.52-2.3 1.9-2.27 3.39.02 1.55.99 3.04 2.45 3.59 1.48.57 3.25.32 4.49-.66 1.34-1.05 1.95-2.73 1.94-4.44.02-6.04.01-12.09.02-18.14v-.25z"/></svg>',
      color: '#000000'
    },
    {
      id: 2,
      title: 'Cinta Modeladora PRO',
      url: 'shape-pro-max.lovable.app',
      platform: 'Google Search',
      spend: '$4.5K',
      roas: '2.1x',
      clicks: '8.2K',
      cpc: '$0.85',
      status: 'Estável',
      adCopy: 'A única cinta que não enrola. Promoção de lançamento + Frete Grátis.',
      thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80',
      networkIcon: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>',
      color: '#4285F4'
    },
    {
      id: 3,
      title: 'Robô Aspirador WAP',
      url: 'smart-clean-bot.lovable.app',
      platform: 'TikTok Ads',
      spend: '$800',
      roas: '4.5x',
      clicks: '22K',
      cpc: '$0.08',
      status: 'Viralizando',
      adCopy: 'Limpa a casa enquanto você dorme! Veja o antes e depois incrível.',
      thumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
      networkIcon: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.9 1.57-4.49 2.21-6.86 1.83-2.61-.39-5.01-1.9-6.38-4.14C-1.19 19.82-.44 16.51 1.62 14.47c1.78-1.74 4.39-2.52 6.83-2.14.02 1.39.02 2.78.01 4.18-1.15-.35-2.42-.44-3.56.02-1.37.52-2.3 1.9-2.27 3.39.02 1.55.99 3.04 2.45 3.59 1.48.57 3.25.32 4.49-.66 1.34-1.05 1.95-2.73 1.94-4.44.02-6.04.01-12.09.02-18.14v-.25z"/></svg>',
      color: '#000000'
    },
    {
      id: 4,
      title: 'Método Renda Extra 2026',
      url: 'renda-secreta.lovable.app',
      platform: 'Google Search',
      spend: '$10K+',
      roas: '1.8x',
      clicks: '12K',
      cpc: '$1.10',
      status: 'Escalando',
      adCopy: '[Oficial] Descubra o método testado por 15.000 alunos para faturar online.',
      thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&q=80',
      networkIcon: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>',
      color: '#4285F4'
    }
  ];

  container.innerHTML = `
    <div class="card mb-20 animate-in">
      <div class="card-header" style="flex-wrap:wrap;gap:16px;">
        <div>
          <h2 style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            Lovable Ads Spy
          </h2>
          <p class="text-muted">Minere landing pages e lojas geradas via Lovable.dev escalando no TikTok e Google Ads.</p>
        </div>
        <div style="display:flex;gap:12px;flex:1;justify-content:flex-end;min-width:300px;">
          <input type="text" class="search-input" placeholder="Buscar nicho, URL ou palavra-chave..." style="flex:1;max-width:350px;">
          <button class="btn btn-primary" style="display:flex;align-items:center;gap:6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Minerar
          </button>
        </div>
      </div>
      
      <div class="marketplace-filters" style="margin-top:20px;">
        <button class="mp-pill active"><span class="mp-dot" style="background:#786eff"></span> Todos</button>
        <button class="mp-pill"><span class="mp-dot" style="background:#000000"></span> TikTok Ads</button>
        <button class="mp-pill"><span class="mp-dot" style="background:#4285F4"></span> Google Search</button>
        <button class="mp-pill"><span class="mp-dot" style="background:#1877F2"></span> Facebook Ads</button>
      </div>
    </div>

    <div class="grid-3">
      ${adsData.map(ad => `
        <div class="card animate-in" style="padding:0;overflow:hidden;">
          <div style="height:160px;background:url('${ad.thumbnail}') center/cover;position:relative;">
            <div style="position:absolute;top:12px;left:12px;background:rgba(0,0,0,0.7);padding:6px 12px;border-radius:50px;backdrop-filter:blur(10px);display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#fff;">
              <div style="width:14px;height:14px;color:${ad.color === '#000000' ? '#fff' : ad.color};display:flex;align-items:center;">${ad.networkIcon}</div>
              ${ad.platform}
            </div>
            <div style="position:absolute;top:12px;right:12px;background:var(--success-bg);color:var(--success);padding:4px 10px;border-radius:6px;font-size:11px;font-weight:700;border:1px solid var(--success);">
              ${ad.status}
            </div>
          </div>
          
          <div style="padding:20px;">
            <h3 style="margin-bottom:8px;font-size:16px;">${ad.title}</h3>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:16px;">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
               <a href="#" style="color:var(--text-muted);font-size:13px;text-decoration:underline;">${ad.url}</a>
            </div>
            
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px;line-height:1.5;height:40px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
              "${ad.adCopy}"
            </p>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--bg-hover);padding:12px;border-radius:8px;margin-bottom:16px;">
              <div>
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;font-weight:600;">ROAS Est.</div>
                <div style="font-weight:700;color:var(--success);">${ad.roas}</div>
              </div>
              <div>
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;font-weight:600;">Ad Spend</div>
                <div style="font-weight:700;">${ad.spend}</div>
              </div>
              <div>
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;font-weight:600;">Cliques</div>
                <div style="font-weight:700;">${ad.clicks}</div>
              </div>
              <div>
                <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;font-weight:600;">CPC Médio</div>
                <div style="font-weight:700;">${ad.cpc}</div>
              </div>
            </div>
            
            <button class="btn btn-outline" style="width:100%;display:flex;align-items:center;justify-content:center;gap:8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Clonar Landing Page
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
