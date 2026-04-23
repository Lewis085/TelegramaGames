export function renderLandingGen() {
  const container = document.getElementById('page-content');
  container.innerHTML = `
    <div class="animate-in">
      <div style="max-width:900px;margin:0 auto">
        <h2 style="margin-bottom:8px;display:flex;align-items:center;gap:10px">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent)" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          Gerador de Página de Vendas (LP)
        </h2>
        <p style="color:var(--text-secondary);margin-bottom:32px">Gere a estrutura persuasiva completa para o seu produto em segundos.</p>
        
        <div style="display:grid;grid-template-columns:1fr 2fr;gap:24px">
          
          <div class="card" style="padding:24px;height:fit-content">
            <h3 style="font-size:15px;margin-bottom:16px">Briefing do Produto</h3>
            
            <div style="display:flex;flex-direction:column;gap:16px">
              <div>
                <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Produto</label>
                <input type="text" id="lp-prod" placeholder="Ex: Sutiã Postural Confort" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
              </div>
              <div>
                <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Maior Benefício</label>
                <input type="text" id="lp-ben" placeholder="Ex: Alivia dores nas costas instantaneamente" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
              </div>
              <div>
                <label style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;display:block">Para Quem É</label>
                <input type="text" id="lp-who" placeholder="Ex: Mulheres 40+ que sentem dor no trabalho" style="width:100%;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-0);color:var(--text-primary)">
              </div>
              <button id="lp-btn" class="btn btn-primary" style="width:100%;margin-top:8px">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Gerar Copy Completa
              </button>
            </div>
          </div>

          <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;min-height:500px">
            <div style="padding:12px 20px;border-bottom:1px solid var(--border);background:var(--bg-1);display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13px;font-weight:600;color:var(--text-secondary)">Preview da Landing Page</span>
              <button class="btn" style="padding:4px 12px;font-size:12px" onclick="navigator.clipboard.writeText(document.getElementById('lp-output').innerText);this.innerText='Copiado!';setTimeout(()=>this.innerText='Copiar',2000)">Copiar</button>
            </div>
            
            <div id="lp-loading" style="display:none;padding:60px 20px;text-align:center;color:var(--text-muted)">
               Gerando blocos de copy... isso leva alguns segundos.
            </div>

            <div id="lp-empty" style="padding:60px 20px;text-align:center;color:var(--text-muted);display:flex;flex-direction:column;align-items:center;gap:12px">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Preencha os dados e clique em "Gerar"
            </div>

            <div id="lp-output" style="display:none;padding:32px;font-family:serif;font-size:16px;line-height:1.7;color:var(--text-0);background:var(--bg-0);overflow-y:auto;flex:1">
              <!-- Gerado via JS -->
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  document.getElementById('lp-btn').addEventListener('click', () => {
    const prod = document.getElementById('lp-prod').value || 'Produto Exemplo';
    const ben = document.getElementById('lp-ben').value || 'Resolve o seu problema';
    const who = document.getElementById('lp-who').value || 'Pessoas cansadas';

    document.getElementById('lp-empty').style.display = 'none';
    document.getElementById('lp-output').style.display = 'none';
    document.getElementById('lp-loading').style.display = 'block';

    setTimeout(() => {
      document.getElementById('lp-loading').style.display = 'none';
      const out = document.getElementById('lp-output');
      out.style.display = 'block';

      out.innerHTML = `
        <div style="text-align:center;margin-bottom:40px">
          <div style="color:var(--danger);font-size:13px;font-weight:bold;text-transform:uppercase;font-family:sans-serif;margin-bottom:12px">Atenção: Oferta Liberada</div>
          <h1 style="font-size:28px;font-weight:900;line-height:1.2;margin-bottom:16px">${ben} com o Novo ${prod}</h1>
          <p style="font-size:18px;color:var(--text-2);margin-bottom:24px">O segredo guardado a 7 chaves que ${who} estão usando para transformar suas rotinas.</p>
          <button style="background:var(--success);color:white;border:none;padding:16px 32px;font-size:18px;font-weight:bold;border-radius:8px;cursor:pointer;width:100%;max-width:300px;font-family:sans-serif">QUERO GARANTIR O MEU</button>
        </div>

        <h2 style="font-size:22px;font-weight:bold;margin-bottom:16px">Você também sofre com isso?</h2>
        <p style="margin-bottom:16px">Sabemos o quanto é frustrante tentar de tudo e não ver resultados. Você gasta dinheiro, perde tempo e a frustração só aumenta. Se você é parte de ${who}, isso não precisa mais ser a sua realidade.</p>
        
        <div style="background:var(--bg-1);padding:24px;border-left:4px solid var(--accent);margin:32px 0">
          <h3 style="font-size:18px;font-weight:bold;margin-bottom:12px;font-family:sans-serif">Apresentando: ${prod}</h3>
          <ul style="padding-left:20px;margin-bottom:0">
            <li style="margin-bottom:8px"><strong>Benefício 1:</strong> Resultado imediato na primeira semana.</li>
            <li style="margin-bottom:8px"><strong>Benefício 2:</strong> Design exclusivo pensado para a sua rotina.</li>
            <li><strong>Benefício 3:</strong> Tecnologia avançada testada e aprovada.</li>
          </ul>
        </div>

        <h2 style="font-size:22px;font-weight:bold;margin-bottom:16px;text-align:center">O que dizem nossos clientes:</h2>
        <div style="display:grid;gap:16px;margin-bottom:40px">
          <div style="padding:16px;border:1px solid var(--border);border-radius:8px">"Mudou minha vida! Comprei o ${prod} e o resultado foi exatamente como prometido. Recomendo para todos." - Maria S. ⭐⭐⭐⭐⭐</div>
          <div style="padding:16px;border:1px solid var(--border);border-radius:8px">"Finalmente algo que funciona para ${who}. Entrega rápida e produto premium." - João P. ⭐⭐⭐⭐⭐</div>
        </div>

        <div style="text-align:center;padding:32px;background:var(--bg-1);border-radius:8px">
          <h2 style="font-size:22px;font-weight:bold;margin-bottom:12px">Garantia Incondicional de 7 Dias</h2>
          <p style="margin-bottom:24px">Risco zero. Se você não amar o ${prod}, devolvemos 100% do seu dinheiro sem burocracia.</p>
          <button style="background:var(--success);color:white;border:none;padding:16px 32px;font-size:18px;font-weight:bold;border-radius:8px;cursor:pointer;width:100%;max-width:300px;font-family:sans-serif">COMPRAR AGORA COM DESCONTO</button>
        </div>
      `;
    }, 1200);
  });
}
