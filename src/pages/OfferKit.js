export function renderOfferKit() {
  const container = document.getElementById('page-content');
  container.innerHTML = `
    <div class="animate-in">
      <div style="max-width:1000px;margin:0 auto">
        <h2 style="margin-bottom:8px;display:flex;align-items:center;gap:10px">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          Kit de Oferta
        </h2>
        <p style="color:var(--text-secondary);margin-bottom:32px">Transforme um produto qualquer em uma oferta irresistível. Receba copy, hooks e viabilidade na hora.</p>
        
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:24px">
          <div class="card" style="padding:24px;height:fit-content">
            <h3 style="font-size:15px;margin-bottom:16px">Estruturação</h3>
            
            <div style="display:flex;flex-direction:column;gap:16px">
              <div>
                <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Nome do Produto</label>
                <input type="text" id="ok-prod" placeholder="Ex: Cinto Ergonômico LombaFit" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
              </div>
              <div>
                <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Qual a Dor Principal?</label>
                <input type="text" id="ok-dor" placeholder="Ex: Dor lombar ao trabalhar sentado" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
              </div>
              <div>
                <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Qual o Público?</label>
                <input type="text" id="ok-pub" placeholder="Ex: Homens 30+ home office" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
              </div>
              <div>
                <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Diferencial (Opcional)</label>
                <input type="text" id="ok-dif" placeholder="Ex: Aquecimento magnético" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
              </div>
              
              <div style="height:1px;background:var(--border);margin:8px 0"></div>
              
              <div style="display:flex;gap:12px">
                <div style="flex:1">
                  <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Custo Total (R$)</label>
                  <input type="number" id="ok-custo" value="45" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
                </div>
                <div style="flex:1">
                  <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Preço Venda (R$)</label>
                  <input type="number" id="ok-preco" value="147" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
                </div>
              </div>

              <button id="ok-btn" class="btn btn-primary" style="width:100%;margin-top:16px">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Gerar Kit de Oferta
              </button>
            </div>
          </div>

          <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;min-height:600px">
            <div id="ok-loading" style="display:none;padding:100px 20px;text-align:center;color:var(--text-muted)">
               <div class="spinner" style="margin:0 auto 16px;width:30px;height:30px;border:3px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin 1s linear infinite"></div>
               Construindo oferta irresistível e calculando margens...
            </div>

            <div id="ok-empty" style="padding:100px 20px;text-align:center;color:var(--text-muted);display:flex;flex-direction:column;align-items:center;gap:12px">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              Preencha os dados e clique em "Gerar" para ver o Kit.
            </div>

            <div id="ok-output" style="display:none;padding:24px;overflow-y:auto;flex:1">
              
              <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-bottom:32px">
                <div style="background:var(--bg-1);padding:16px;border-radius:8px;border:1px solid var(--border)">
                  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">Lucro / Venda</div>
                  <div id="out-lucro" style="font-size:20px;font-weight:700;color:var(--success)">R$ 102,00</div>
                  <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Margem de <span id="out-margem">69%</span></div>
                </div>
                <div style="background:var(--bg-1);padding:16px;border-radius:8px;border:1px solid var(--border)">
                  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">ROAS Break-even</div>
                  <div id="out-roas" style="font-size:20px;font-weight:700;color:var(--warning)">1.44x</div>
                  <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Mínimo p/ não dar prejuízo</div>
                </div>
                <div style="background:var(--bg-1);padding:16px;border-radius:8px;border:1px solid var(--border)">
                  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">Lucro em 100 Vendas</div>
                  <div id="out-cenario" style="font-size:20px;font-weight:700;color:var(--accent)">R$ 10.200</div>
                  <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Sem contar custo de Ads</div>
                </div>
              </div>

              <div style="margin-bottom:24px">
                <h4 style="font-size:14px;color:var(--accent);margin-bottom:12px;display:flex;align-items:center;gap:6px">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Headline Principal
                </h4>
                <div id="out-headline" style="padding:16px;background:var(--bg-1);border-left:3px solid var(--accent);font-size:18px;font-weight:600;line-height:1.4"></div>
              </div>

              <div style="margin-bottom:24px">
                <h4 style="font-size:14px;color:var(--success);margin-bottom:12px;display:flex;align-items:center;gap:6px">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  3 Hooks Virais (Para Vídeos TikTok/Reels)
                </h4>
                <ul id="out-hooks" style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px"></ul>
              </div>

              <div>
                <h4 style="font-size:14px;color:var(--warning);margin-bottom:12px;display:flex;align-items:center;gap:6px">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  Script do Anúncio (Venda Direta)
                </h4>
                <div id="out-script" style="padding:16px;background:var(--bg-1);border-radius:8px;font-size:14px;line-height:1.6;color:var(--text-secondary)"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  document.getElementById('ok-btn').addEventListener('click', () => {
    const prod = document.getElementById('ok-prod').value || 'Produto X';
    const dor = document.getElementById('ok-dor').value || 'Dor X';
    const pub = document.getElementById('ok-pub').value || 'Público X';
    const dif = document.getElementById('ok-dif').value || 'Diferencial X';
    
    const custo = parseFloat(document.getElementById('ok-custo').value) || 0;
    const preco = parseFloat(document.getElementById('ok-preco').value) || 0;

    document.getElementById('ok-empty').style.display = 'none';
    document.getElementById('ok-output').style.display = 'none';
    document.getElementById('ok-loading').style.display = 'block';

    setTimeout(() => {
      document.getElementById('ok-loading').style.display = 'none';
      document.getElementById('ok-output').style.display = 'block';

      // Calc
      const lucro = preco - custo;
      const margem = preco > 0 ? (lucro / preco) * 100 : 0;
      const roasBE = lucro > 0 ? (preco / lucro).toFixed(2) : 0;

      document.getElementById('out-lucro').innerText = \`R$ \${lucro.toFixed(2)}\`;
      document.getElementById('out-margem').innerText = \`\${margem.toFixed(0)}%\`;
      document.getElementById('out-roas').innerText = \`\${roasBE}x\`;
      document.getElementById('out-cenario').innerText = \`R$ \${(lucro * 100).toFixed(2)}\`;

      // Copy
      document.getElementById('out-headline').innerText = \`Aviso para \${pub}: O Fim da \${dor} Chegou Com o Novo \${prod}.\`;
      
      const hooks = [
        \`"Se você é de \${pub} e ainda sofre com \${dor}, pare de rolar a tela agora."\`,
        \`"Acabaram de revelar o método que está acabando com \${dor} em 7 dias."\`,
        \`"Por que ninguém está falando sobre esse novo \${prod} que tem \${dif}?"\`
      ];
      document.getElementById('out-hooks').innerHTML = hooks.map(h => \`<li style="padding:12px;background:var(--bg-1);border-radius:6px;font-size:14px;color:var(--text-primary)">\${h}</li>\`).join('');

      document.getElementById('out-script').innerHTML = \`
        <strong>[Hook]</strong> Você que faz parte de \${pub}, eu sei o quanto \${dor} atrapalha o seu dia a dia.<br><br>
        <strong>[Problema]</strong> A maioria das soluções no mercado não funciona ou custa uma fortuna.<br><br>
        <strong>[Solução]</strong> É por isso que o \${prod} viralizou. Ele não só resolve seu problema rápido, como também oferece \${dif}.<br><br>
        <strong>[Oferta/CTA]</strong> Estamos com 50% de desconto e frete grátis apenas para as próximas 24h. Clique em Saiba Mais e garanta o seu antes que o estoque acabe!
      \`;

    }, 1500);
  });
}
