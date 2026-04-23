import { formatCurrency } from '../utils/helpers.js';

export function renderSimulador() {
  const container = document.getElementById('page-content');
  container.innerHTML = `
    <div class="animate-in">
      <div style="max-width:800px;margin:0 auto">
        <h2 style="margin-bottom:8px;display:flex;align-items:center;gap:10px">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--accent)" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
          Simulador de Escala
        </h2>
        <p style="color:var(--text-secondary);margin-bottom:32px">Desmistifique a escala. Descubra quanto investir e vender por dia para bater sua meta.</p>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
          
          <div class="card" style="padding:24px">
            <h3 style="font-size:16px;margin-bottom:24px">Suas Variáveis</h3>
            
            <div style="margin-bottom:24px">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <label style="font-size:13px;color:var(--text-secondary)">Meta de Faturamento (Mês)</label>
                <span id="lbl-meta" style="font-weight:600;color:var(--accent)">R$ 50.000</span>
              </div>
              <input type="range" id="sl-meta" min="5000" max="500000" step="5000" value="50000" style="width:100%;accent-color:var(--accent)">
            </div>

            <div style="margin-bottom:24px">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <label style="font-size:13px;color:var(--text-secondary)">Ticket Médio (Preço Venda)</label>
                <span id="lbl-ticket" style="font-weight:600">R$ 147,00</span>
              </div>
              <input type="range" id="sl-ticket" min="20" max="1000" step="1" value="147" style="width:100%;accent-color:var(--accent)">
            </div>

            <div style="margin-bottom:24px">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <label style="font-size:13px;color:var(--text-secondary)">Custo do Produto + Taxas</label>
                <span id="lbl-custo" style="font-weight:600">R$ 47,00</span>
              </div>
              <input type="range" id="sl-custo" min="5" max="500" step="1" value="47" style="width:100%;accent-color:var(--accent)">
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <label style="font-size:13px;color:var(--text-secondary)">Custo por Compra (CPA Estimado)</label>
                <span id="lbl-cpa" style="font-weight:600">R$ 35,00</span>
              </div>
              <input type="range" id="sl-cpa" min="5" max="200" step="1" value="35" style="width:100%;accent-color:var(--accent)">
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="card" style="padding:24px;background:var(--bg-1)">
              <div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">Lucro Líquido por Venda</div>
              <div id="out-lucro" style="font-size:32px;font-weight:800;color:var(--success)">R$ 65,00</div>
              <div id="out-margem" style="font-size:12px;color:var(--text-muted);margin-top:4px">Margem: 44.2%</div>
            </div>

            <div class="card" style="padding:24px">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div>
                  <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">Vendas Necessárias (Mês)</div>
                  <div id="out-vendas-mes" style="font-size:24px;font-weight:700">340</div>
                </div>
                <div>
                  <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">Vendas Necessárias (Dia)</div>
                  <div id="out-vendas-dia" style="font-size:24px;font-weight:700">11</div>
                </div>
              </div>
            </div>

            <div class="card" style="padding:24px;border:1px solid var(--accent-soft)">
              <div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">Plano de Investimento Diário</div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:14px">Orçamento em Ads (Dia)</span>
                <span id="out-ads-dia" style="font-weight:700;color:var(--danger)">R$ 385,00</span>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span style="font-size:14px">Faturamento (Dia)</span>
                <span id="out-fat-dia" style="font-weight:700;color:var(--success)">R$ 1.617,00</span>
              </div>
              <div style="height:1px;background:var(--border);margin:12px 0"></div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:14px;font-weight:600">ROAS Necessário</span>
                <span id="out-roas" style="font-weight:800;color:var(--accent);font-size:18px">4.2x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  function calc() {
    const meta = parseFloat(document.getElementById('sl-meta').value);
    const ticket = parseFloat(document.getElementById('sl-ticket').value);
    const custo = parseFloat(document.getElementById('sl-custo').value);
    const cpa = parseFloat(document.getElementById('sl-cpa').value);

    document.getElementById('lbl-meta').innerText = formatCurrency(meta);
    document.getElementById('lbl-ticket').innerText = formatCurrency(ticket);
    document.getElementById('lbl-custo').innerText = formatCurrency(custo);
    document.getElementById('lbl-cpa').innerText = formatCurrency(cpa);

    const lucro = ticket - custo - cpa;
    const margem = (lucro / ticket) * 100;
    
    document.getElementById('out-lucro').innerText = formatCurrency(lucro);
    document.getElementById('out-lucro').style.color = lucro > 0 ? 'var(--success)' : 'var(--danger)';
    document.getElementById('out-margem').innerText = \`Margem: \${margem.toFixed(1)}%\`;

    if (ticket > 0) {
      const vendasMes = Math.ceil(meta / ticket);
      const vendasDia = Math.ceil(vendasMes / 30);
      document.getElementById('out-vendas-mes').innerText = vendasMes;
      document.getElementById('out-vendas-dia').innerText = vendasDia;

      const adsDia = vendasDia * cpa;
      const fatDia = vendasDia * ticket;
      document.getElementById('out-ads-dia').innerText = formatCurrency(adsDia);
      document.getElementById('out-fat-dia').innerText = formatCurrency(fatDia);

      const roas = adsDia > 0 ? (fatDia / adsDia).toFixed(1) : 0;
      document.getElementById('out-roas').innerText = roas + 'x';
    }
  }

  document.getElementById('sl-meta').addEventListener('input', calc);
  document.getElementById('sl-ticket').addEventListener('input', calc);
  document.getElementById('sl-custo').addEventListener('input', calc);
  document.getElementById('sl-cpa').addEventListener('input', calc);

  calc();
}
