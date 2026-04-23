export function renderCanalCerto() {
  const container = document.getElementById('page-content');
  
  // States
  let step = 1;
  let selectedCategory = null;
  let selectedProduct = null;

  const categories = [
    { id: 'beleza', name: 'Beleza & Cosméticos', icon: '✨' },
    { id: 'fitness', name: 'Fitness & Saúde', icon: '💪' },
    { id: 'pet', name: 'Mundo Pet', icon: '🐶' },
    { id: 'casa', name: 'Casa & Decoração', icon: '🏠' },
    { id: 'infoproduto', name: 'Infoprodutos & Cursos', icon: '📚' },
    { id: 'alimentacao', name: 'Alimentação & Delivery', icon: '🍔' }
  ];

  const productsByCategory = {
    beleza: [
      { id: 'p1', name: 'Sérum Vitamina C', type: 'visual', ticket: 'baixo', age: 'jovem', search: 'medio' },
      { id: 'p2', name: 'Escova Secadora 3 em 1', type: 'visual', ticket: 'baixo', age: 'jovem', search: 'alto' },
      { id: 'p3', name: 'Kit Skincare Antissinais', type: 'neutro', ticket: 'medio', age: 'adulto', search: 'alto' }
    ],
    fitness: [
      { id: 'p4', name: 'Cinta Modeladora Slim', type: 'visual', ticket: 'baixo', age: 'jovem', search: 'medio' },
      { id: 'p5', name: 'Whey Protein Isolado', type: 'neutro', ticket: 'medio', age: 'adulto', search: 'alto' },
      { id: 'p6', name: 'Smartwatch Esportivo', type: 'visual', ticket: 'medio', age: 'jovem', search: 'alto' }
    ],
    pet: [
      { id: 'p7', name: 'Cama Pet Ortopédica', type: 'visual', ticket: 'medio', age: 'adulto', search: 'medio' },
      { id: 'p8', name: 'Brinquedo Interativo Gatos', type: 'visual', ticket: 'baixo', age: 'jovem', search: 'baixo' },
      { id: 'p9', name: 'Ração Super Premium', type: 'neutro', ticket: 'alto', age: 'adulto', search: 'alto' }
    ],
    casa: [
      { id: 'p10', name: 'Umidificador Difusor LED', type: 'visual', ticket: 'baixo', age: 'jovem', search: 'medio' },
      { id: 'p11', name: 'Mop Giratório Pro', type: 'visual', ticket: 'baixo', age: 'adulto', search: 'alto' },
      { id: 'p12', name: 'Robô Aspirador Inteligente', type: 'visual', ticket: 'alto', age: 'adulto', search: 'alto' }
    ],
    infoproduto: [
      { id: 'p13', name: 'Curso de Tráfego Pago', type: 'info', ticket: 'alto', age: 'adulto', search: 'alto' },
      { id: 'p14', name: 'Planilha de Organização Financeira', type: 'info', ticket: 'baixo', age: 'jovem', search: 'medio' },
      { id: 'p15', name: 'Mentoria de Emagrecimento', type: 'info', ticket: 'alto', age: 'adulto', search: 'medio' }
    ],
    alimentacao: [
      { id: 'p16', name: 'Delivery de Hambúrguer Artesanal', type: 'local', ticket: 'baixo', age: 'jovem', search: 'alto' },
      { id: 'p17', name: 'Marmitas Fit Congeladas', type: 'local', ticket: 'medio', age: 'adulto', search: 'alto' },
      { id: 'p18', name: 'Curso de Confeitaria', type: 'info', ticket: 'medio', age: 'adulto', search: 'baixo' }
    ]
  };

  function getRanking(product) {
    let ttk = 50, meta = 50, gg = 50;
    let ttkWhy = [], metaWhy = [], ggWhy = [];

    // Lógica por trás do ranking
    if (product.type === 'visual') {
      ttk += 30; ttkWhy.push('Produto muito visual/impulsivo.');
      meta += 20; metaWhy.push('Ótimo para anúncios em vídeo (Reels/Stories).');
      gg -= 20; ggWhy.push('Baixo apelo visual no formato de texto.');
    } else if (product.type === 'info') {
      ttk -= 10; ttkWhy.push('Público do TikTok converte menos para ticket alto infoproduto direto.');
      meta += 30; metaWhy.push('Canal ideal para lançamentos e perpétuo.');
      gg += 20; ggWhy.push('Ótimo para fundo de funil e intenção.');
    } else if (product.type === 'local') {
      ttk -= 20; ttkWhy.push('Dificuldade de segmentação hiper-local.');
      meta += 20; metaWhy.push('Boa segmentação por raio/região.');
      gg += 30; ggWhy.push('Excelente para "perto de mim" ou "delivery".');
    }

    if (product.search === 'alto') {
      gg += 30; ggWhy.push('Alto volume de buscas ativas mensais.');
      ttk -= 10; ttkWhy.push('Público não está pesquisando, está descobrindo.');
    } else if (product.search === 'baixo') {
      gg -= 20; ggWhy.push('Baixíssimo volume de busca ativa.');
      meta += 15; metaWhy.push('Produto deve ser empurrado via descoberta.');
    }

    if (product.age === 'jovem') {
      ttk += 20; ttkWhy.push('Público principal da plataforma.');
      gg -= 10; ggWhy.push('Jovens buscam menos em texto, mais em vídeo.');
    } else if (product.age === 'adulto') {
      ttk -= 15; ttkWhy.push('Fatia menor de público com poder aquisitivo alto nesta rede.');
      meta += 10; metaWhy.push('Público comprador maduro muito consolidado.');
    }

    if (product.ticket === 'alto') {
      ttk -= 10; ttkWhy.push('Jornada de compra mais longa, difícil no impulso.');
      meta += 10; metaWhy.push('Bom com funil e remarketing.');
      gg += 15; ggWhy.push('Busca intencional favorece tickets maiores.');
    } else if (product.ticket === 'baixo') {
      ttk += 15; ttkWhy.push('Ideal para compra por impulso de baixo ticket.');
      meta += 5; metaWhy.push('Boa conversão por impulso no Feed.');
    }

    // Clamp scores 0-99
    ttk = Math.min(99, Math.max(10, ttk));
    meta = Math.min(99, Math.max(10, meta));
    gg = Math.min(99, Math.max(10, gg));

    const channels = [
      { name: 'TikTok Ads', score: ttk, color: 'var(--success)', why: ttkWhy.join(' ') },
      { name: 'Meta Ads', score: meta, color: 'var(--accent)', why: metaWhy.join(' ') },
      { name: 'Google Ads', score: gg, color: 'var(--warning)', why: ggWhy.join(' ') }
    ].sort((a, b) => b.score - a.score);

    return channels;
  }

  function renderView() {
    let html = `
      <div class="animate-in" style="max-width:1000px;margin:0 auto">
        <h2 style="margin-bottom:8px;display:flex;align-items:center;gap:10px">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          Canal Certo
        </h2>
        <p style="color:var(--text-secondary);margin-bottom:32px">Inteligência de Tráfego. Descubra exatamente onde e como anunciar seu produto.</p>
    `;

    if (step === 1) {
      html += `
        <h3 style="margin-bottom:16px">1. Escolha o nicho de atuação</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:16px">
          ${categories.map(c => `
            <div class="card cat-card" data-id="${c.id}" style="cursor:pointer;display:flex;align-items:center;gap:12px;padding:20px;transition:all 0.2s">
              <span style="font-size:24px">${c.icon}</span>
              <span style="font-weight:600">${c.name}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else if (step === 2) {
      html += `
        <button id="btn-back" class="btn btn-secondary" style="margin-bottom:24px">← Voltar</button>
        <h3 style="margin-bottom:16px">2. Produtos com tração em ${categories.find(c=>c.id===selectedCategory).name}</h3>
        <p style="color:var(--text-muted);margin-bottom:24px">Selecione um produto para visualizar o painel de inteligência de canal.</p>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px">
          ${productsByCategory[selectedCategory].map(p => `
            <div class="card prod-card" data-id="${p.id}" style="cursor:pointer;padding:24px;border:1px solid var(--border);transition:all 0.2s">
              <div style="font-weight:600;font-size:16px;margin-bottom:8px">${p.name}</div>
              <div style="font-size:12px;color:var(--text-secondary);display:flex;gap:8px">
                <span style="background:var(--bg-1);padding:4px 8px;border-radius:4px">${p.type === 'visual' ? '📸 Visual' : p.type === 'info' ? '📚 Info' : p.type === 'local' ? '📍 Local' : '📦 Físico'}</span>
                <span style="background:var(--bg-1);padding:4px 8px;border-radius:4px">Ticket ${p.ticket}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (step === 3) {
      const p = productsByCategory[selectedCategory].find(x => x.id === selectedProduct);
      const ranks = getRanking(p);

      html += `
        <button id="btn-back" class="btn btn-secondary" style="margin-bottom:24px">← Voltar para produtos</button>
        
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px">
          <div style="width:48px;height:48px;border-radius:8px;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#000;font-size:24px">🎯</div>
          <div>
            <h2 style="margin:0">${p.name}</h2>
            <div style="color:var(--text-secondary);font-size:14px">Painel de Inteligência de Tráfego</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px">
          
          <div style="display:flex;flex-direction:column;gap:24px">
            <div class="card" style="padding:24px">
              <h3 style="margin-bottom:24px;font-size:16px;border-bottom:1px solid var(--border);padding-bottom:12px">Ranking de Canais</h3>
              <div style="display:flex;flex-direction:column;gap:20px">
                ${ranks.map((r, index) => `
                  <div style="display:flex;gap:16px;align-items:flex-start">
                    <div style="font-size:32px;line-height:1">${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>
                    <div style="flex:1">
                      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                        <div style="font-weight:700;font-size:16px">${r.name}</div>
                        <div style="font-weight:800;font-size:18px;color:${r.color}">${r.score}/100</div>
                      </div>
                      <div style="width:100%;height:6px;background:var(--bg-1);border-radius:3px;margin-bottom:12px;overflow:hidden">
                        <div style="width:${r.score}%;height:100%;background:${r.color};border-radius:3px"></div>
                      </div>
                      <div style="font-size:13px;color:var(--text-secondary);line-height:1.5">
                        <strong>Veredito:</strong> ${r.why}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="card" style="padding:24px">
              <h3 style="margin-bottom:24px;font-size:16px;border-bottom:1px solid var(--border);padding-bottom:12px">Keywords e Segmentação Recomendada</h3>
              <div style="display:flex;flex-direction:column;gap:16px">
                <div>
                  <div style="font-weight:600;font-size:14px;margin-bottom:8px;color:var(--warning)">Google Ads (Busca Exata/Frase)</div>
                  <div style="display:flex;flex-wrap:wrap;gap:8px">
                    ${['comprar ' + p.name.toLowerCase(), p.name.toLowerCase() + ' funciona', 'melhor ' + p.name.toLowerCase(), 'preço ' + p.name.toLowerCase()].map(k => `<span style="background:rgba(234,179,8,0.1);color:var(--warning);padding:4px 10px;border-radius:12px;font-size:12px">${k}</span>`).join('')}
                  </div>
                </div>
                <div>
                  <div style="font-weight:600;font-size:14px;margin-bottom:8px;color:var(--accent)">Meta Ads (Interesses)</div>
                  <div style="display:flex;flex-wrap:wrap;gap:8px">
                    ${['Compras Online', 'Compradores Engajados', selectedCategory, 'Novidades'].map(k => `<span style="background:rgba(249,115,22,0.1);color:var(--accent);padding:4px 10px;border-radius:12px;font-size:12px">${k}</span>`).join('')}
                  </div>
                </div>
                <div>
                  <div style="font-weight:600;font-size:14px;margin-bottom:8px;color:var(--success)">TikTok Ads (Hashtags/Comportamento)</div>
                  <div style="display:flex;flex-wrap:wrap;gap:8px">
                    ${['#achados', '#viral', '#comprinhas', '#' + selectedCategory].map(k => `<span style="background:rgba(34,197,94,0.1);color:var(--success);padding:4px 10px;border-radius:12px;font-size:12px">${k}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:24px">
            <div class="card" style="padding:24px">
              <h3 style="margin-bottom:16px;font-size:16px">Provas de Mercado</h3>
              <div style="display:flex;flex-direction:column;gap:16px">
                <div>
                  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">Volume de Busca (30 dias)</div>
                  <div style="font-size:20px;font-weight:700;color:var(--text-primary)">+${Math.floor(Math.random() * 400 + 100)}%</div>
                  <div style="font-size:11px;color:var(--success)">Crescimento acentuado</div>
                </div>
                <div style="height:1px;background:var(--border)"></div>
                <div>
                  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">Saturação de Anunciantes</div>
                  <div style="font-size:20px;font-weight:700;color:var(--text-primary)">Baixa</div>
                  <div style="font-size:11px;color:var(--text-muted)">Apenas 12 anunciantes escalando</div>
                </div>
                <div style="height:1px;background:var(--border)"></div>
                <div>
                  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">Engajamento Viral</div>
                  <div style="font-size:20px;font-weight:700;color:var(--text-primary)">Alto</div>
                  <div style="font-size:11px;color:var(--text-muted)">Vídeos retendo > 40% até 3s</div>
                </div>
              </div>
            </div>
            
            <div class="card" style="padding:24px;background:linear-gradient(135deg, rgba(249,115,22,0.1), rgba(0,0,0,0));border:1px solid rgba(249,115,22,0.2)">
              <h3 style="margin-bottom:8px;font-size:15px;color:var(--accent)">Estratégia Sugerida</h3>
              <p style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin:0">
                Inicie a campanha pelo canal <strong>${ranks[0].name}</strong> validando os criativos e públicos amplos. Após as primeiras 50 conversões, ative o <strong>${ranks[1].name}</strong> para remarketing de carrinho abandonado e expansão de público sósia.
              </p>
            </div>
          </div>

        </div>
      `;
    }

    html += `</div>`;
    container.innerHTML = html;
    attachEvents();
  }

  function attachEvents() {
    document.querySelectorAll('.cat-card').forEach(el => {
      el.addEventListener('click', () => {
        selectedCategory = el.dataset.id;
        step = 2;
        renderView();
      });
      el.addEventListener('mouseenter', () => el.style.borderColor = 'var(--accent)');
      el.addEventListener('mouseleave', () => el.style.borderColor = 'var(--border)');
    });

    document.querySelectorAll('.prod-card').forEach(el => {
      el.addEventListener('click', () => {
        selectedProduct = el.dataset.id;
        step = 3;
        renderView();
      });
      el.addEventListener('mouseenter', () => el.style.borderColor = 'var(--accent)');
      el.addEventListener('mouseleave', () => el.style.borderColor = 'var(--border)');
    });

    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        step--;
        renderView();
      });
    }
  }

  renderView();
}
