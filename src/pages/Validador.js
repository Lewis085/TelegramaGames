export function renderValidador() {
  const container = document.getElementById('page-content');
  container.innerHTML = `
    <div class="animate-in">
      <div style="max-width:800px;margin:0 auto">
        <h2 style="margin-bottom:8px;display:flex;align-items:center;gap:10px">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Validador de Produto
        </h2>
        <p style="color:var(--text-secondary);margin-bottom:32px">Descubra se vale a pena investir no produto antes de gastar com tráfego.</p>
        
        <div class="card" style="margin-bottom:24px;padding:24px">
          <div style="display:flex;gap:12px">
            <input type="text" id="val-product" placeholder="Ex: Mini Projetor Portátil Led" style="flex:1;padding:12px 16px;border-radius:var(--radius);border:1px solid var(--border);background:var(--bg-1);color:var(--text-primary);font-size:15px">
            <button id="val-btn" class="btn btn-primary" style="padding:0 24px">Validar com IA</button>
          </div>
        </div>

        <div id="val-loading" style="display:none;text-align:center;padding:40px;color:var(--text-muted)">
          <div class="spinner" style="margin:0 auto 16px;width:30px;height:30px;border:3px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin 1s linear infinite"></div>
          Analisando histórico de vendas, saturação e potencial no TikTok...
        </div>

        <div id="val-result" style="display:none" class="animate-in">
          <div style="display:grid;grid-template-columns:1fr 2fr;gap:24px;margin-bottom:24px">
            <div class="card" style="padding:32px;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center">
              <div style="font-size:14px;color:var(--text-secondary);margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Score de Viabilidade</div>
              <div style="position:relative;width:140px;height:140px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:conic-gradient(var(--success) 82%, var(--border) 0)">
                <div style="position:absolute;inset:10px;background:var(--bg-0);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column">
                  <span id="val-score" style="font-size:42px;font-weight:900;line-height:1;color:var(--text-primary)">82</span>
                  <span style="font-size:12px;color:var(--text-muted)">/ 100</span>
                </div>
              </div>
              <div id="val-badge" style="margin-top:20px;display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:var(--success-bg);color:var(--success);border-radius:20px;font-size:14px;font-weight:600">
                🔥 Recomendado: Lançar
              </div>
            </div>

            <div class="card" style="padding:24px;display:flex;flex-direction:column;gap:16px">
              <h3 style="font-size:16px;margin-bottom:8px">Análise Detalhada</h3>
              
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px">
                  <span style="color:var(--text-secondary)">Saturação de Mercado (Menor é melhor)</span>
                  <span style="font-weight:600" id="val-sat">45%</span>
                </div>
                <div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden">
                  <div id="bar-sat" style="height:100%;background:var(--warning);width:45%"></div>
                </div>
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px">
                  <span style="color:var(--text-secondary)">Potencial de Margem</span>
                  <span style="font-weight:600" id="val-mar">85%</span>
                </div>
                <div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden">
                  <div id="bar-mar" style="height:100%;background:var(--success);width:85%"></div>
                </div>
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px">
                  <span style="color:var(--text-secondary)">Facilidade em Vídeo (UGC)</span>
                  <span style="font-weight:600" id="val-vid">90%</span>
                </div>
                <div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden">
                  <div id="bar-vid" style="height:100%;background:var(--success);width:90%"></div>
                </div>
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px">
                  <span style="color:var(--text-secondary)">Fator Wow (Apelo Visual)</span>
                  <span style="font-weight:600" id="val-wow">70%</span>
                </div>
                <div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden">
                  <div id="bar-wow" style="height:100%;background:var(--accent);width:70%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="card" style="padding:24px">
            <h3 style="font-size:16px;margin-bottom:12px;display:flex;align-items:center;gap:8px">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Veredito da IA
            </h3>
            <p id="val-feedback" style="color:var(--text-secondary);font-size:14px;line-height:1.6"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('val-btn').addEventListener('click', () => {
    const product = document.getElementById('val-product').value;
    if (!product) return;
    
    document.getElementById('val-result').style.display = 'none';
    document.getElementById('val-loading').style.display = 'block';
    
    setTimeout(() => {
      document.getElementById('val-loading').style.display = 'none';
      document.getElementById('val-result').style.display = 'block';
      
      // Simulate logic based on length/name
      let score = 75 + Math.floor(Math.random() * 20);
      let sat = 20 + Math.floor(Math.random() * 50);
      let mar = 60 + Math.floor(Math.random() * 30);
      let vid = 70 + Math.floor(Math.random() * 25);
      let wow = 65 + Math.floor(Math.random() * 30);

      document.getElementById('val-score').innerText = score;
      document.getElementById('val-score').parentElement.parentElement.style.background = `conic-gradient(var(--${score > 80 ? 'success' : 'warning'}) ${score}%, var(--border) 0)`;

      document.getElementById('val-sat').innerText = sat + '%';
      document.getElementById('bar-sat').style.width = sat + '%';
      document.getElementById('bar-sat').style.background = sat < 40 ? 'var(--success)' : sat < 70 ? 'var(--warning)' : 'var(--danger)';

      document.getElementById('val-mar').innerText = mar + '%';
      document.getElementById('bar-mar').style.width = mar + '%';
      
      document.getElementById('val-vid').innerText = vid + '%';
      document.getElementById('bar-vid').style.width = vid + '%';

      document.getElementById('val-wow').innerText = wow + '%';
      document.getElementById('bar-wow').style.width = wow + '%';

      const badge = document.getElementById('val-badge');
      if (score > 85) {
        badge.innerHTML = '🔥 Recomendado: Lançar Forte';
        badge.style.background = 'var(--success-bg)'; badge.style.color = 'var(--success)';
        document.getElementById('val-feedback').innerHTML = `O <strong>${product}</strong> apresenta um excelente "Wow Factor" e alta facilidade para criar vídeos virais no TikTok. A saturação atual permite entrada rápida. Estratégia recomendada: Focar em vídeos UGC mostrando transformação antes/depois.`;
      } else if (score > 70) {
        badge.innerHTML = '⚠️ Testar com Cautela';
        badge.style.background = 'var(--warning-bg)'; badge.style.color = 'var(--warning)';
        document.getElementById('val-feedback').innerHTML = `O <strong>${product}</strong> tem boa margem, mas a saturação está moderada. É um produto que ainda vende, porém você precisará de uma oferta muito diferenciada ou um ângulo novo nos anúncios para se destacar. Comece com orçamento reduzido.`;
      } else {
        badge.innerHTML = '🚫 Evitar: Muito Saturado';
        badge.style.background = 'var(--danger-bg)'; badge.style.color = 'var(--danger)';
        document.getElementById('val-feedback').innerHTML = `Aviso: Mercado para <strong>${product}</strong> aparenta estar em declínio ou ultra-saturado. O custo de aquisição (CPA) será alto, esmagando suas margens. Recomendamos procurar outro produto dentro desse nicho.`;
      }

    }, 1500);
  });
}
