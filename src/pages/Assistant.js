import { products, getProductImage } from '../data/products.js';
import { keywords } from '../data/keywords.js';
import { getMarketplace, getMpBadge, marketplaces } from '../data/marketplaces.js';
import { formatCurrency, formatNumber, formatPercent , renderImage } from '../utils/helpers.js';

const botPersonality = {
  name: 'TrendBot',
  avatar: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 7.27 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/><circle cx="10" cy="14" r="1" fill="white"/><circle cx="14" cy="14" r="1" fill="white"/></svg>`,
};

const quickActions = [
  { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>', label: 'Produtos em alta agora', query: 'produtos em alta' },
  { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>', label: 'Nichos lucrativos', query: 'nichos lucrativos' },
  { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>', label: 'Baixa competição', query: 'baixa competicao' },
  { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>', label: 'O que vender?', query: 'o que vender' },
  { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', label: 'Melhor marketplace', query: 'melhor marketplace' },
  { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>', label: 'Produtos para viralizar', query: 'produtos viralizar' },
];

let chatMessages = [];

function generateBotResponse(query) {
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const sorted = [...products].sort((a, b) => b.hypeScore - a.hypeScore);

  if (q.includes('alta') || q.includes('trending') || q.includes('hype') || q.includes('explodindo')) {
    const top5 = sorted.slice(0, 5);
    return {
      text: `🔥 **Esses são os 5 produtos mais quentes agora:**\n\nBaseado no nosso Hype Score que analisa crescimento, volume de vendas e viralização:`,
      products: top5,
      tip: '💡 Dica: Produtos com Hype Score acima de 80 têm alta probabilidade de se manterem em alta nas próximas semanas.'
    };
  }

  if (q.includes('nicho') || q.includes('lucrativ')) {
    const nicheData = {};
    products.forEach(p => {
      const key = p.category;
      if (!nicheData[key]) nicheData[key] = { name: key, count: 0, totalSales: 0, avgChange: 0 };
      nicheData[key].count++;
      nicheData[key].totalSales += p.sales;
      nicheData[key].avgChange += p.change;
    });
    const niches = Object.values(nicheData).map(n => ({ ...n, avgChange: n.avgChange / n.count })).sort((a, b) => b.avgChange - a.avgChange);
    return {
      text: `🎯 **Top nichos lucrativos neste momento:**\n\n${niches.slice(0, 5).map((n, i) => `${i + 1}. **${n.name}** — Crescimento médio de +${n.avgChange.toFixed(0)}%, ${formatNumber(n.totalSales)} vendas totais`).join('\n')}`,
      tip: '💡 Dica: Nichos com alto crescimento e poucos vendedores são os mais lucrativos. Considere nichos que ainda não atingiram o pico.'
    };
  }

  if (q.includes('competicao') || q.includes('competição') || q.includes('facil')) {
    const lowComp = keywords.filter(k => k.competition === 'baixa').sort((a, b) => b.change - a.change);
    return {
      text: `📉 **Keywords com baixa competição e alta demanda:**\n\n${lowComp.slice(0, 8).map((k, i) => `${i + 1}. **"${k.keyword}"** — ${formatNumber(k.volume)} buscas/mês, crescimento ${formatPercent(k.change)} (${getMarketplace(k.marketplace).name})`).join('\n')}`,
      tip: '💡 Dica: Essas keywords indicam mercados com demanda mas poucos vendedores especializados. Ideal para quem está começando!'
    };
  }

  if (q.includes('vender') || q.includes('comecar') || q.includes('iniciar') || q.includes('recomend')) {
    const recommended = sorted.filter(p => p.hypePhase === 'subindo' && p.price < 100);
    return {
      text: `🚀 **Recomendações para começar a vender:**\n\nBaseado na nossa análise, sugiro focar em produtos que estão **subindo** (ainda não atingiram o pico) e com **ticket médio acessível**:`,
      products: recommended.slice(0, 5),
      tip: '💡 Dica: Produtos em fase "subindo" oferecem a melhor janela de oportunidade. Você entra antes da saturação!'
    };
  }

  if (q.includes('marketplace') || q.includes('plataforma') || q.includes('onde vender')) {
    const mpData = marketplaces.map(m => {
      const prods = products.filter(p => p.marketplace === m.id);
      const avgChange = prods.reduce((s, p) => s + p.change, 0) / (prods.length || 1);
      return { ...m, prodCount: prods.length, avgChange, totalSales: prods.reduce((s, p) => s + p.sales, 0) };
    }).sort((a, b) => b.avgChange - a.avgChange);
    return {
      text: `📊 **Análise de Marketplaces:**\n\n${mpData.map((m, i) => `${i + 1}. **${m.name}** — Crescimento médio +${m.avgChange.toFixed(0)}%, ${formatNumber(m.totalSales)} vendas, ${m.prodCount} produtos trending`).join('\n')}`,
      tip: '💡 Dica: TikTok Shop é o melhor para produtos virais e ticket baixo. Mercado Livre para eletrônicos de alto ticket.'
    };
  }

  if (q.includes('viral') || q.includes('tiktok') || q.includes('video')) {
    const viral = sorted.filter(p => p.marketplace === 'tiktok' || p.hypeScore > 75);
    return {
      text: `🎬 **Produtos com potencial viral:**\n\nProdutos que geram conteúdo facilmente compartilhável (antes/depois, unboxing, review):`,
      products: viral.slice(0, 5),
      tip: '💡 Dica: Produtos que permitem demonstração visual (antes/depois, transformação) viralizam mais fácil no TikTok e Instagram.'
    };
  }

  // Default
  return {
    text: `Entendi! Posso te ajudar com:\n\n• **Produtos em alta** — o que está bombando agora\n• **Nichos lucrativos** — categorias com melhor potencial\n• **Baixa competição** — onde tem menos concorrência\n• **O que vender** — recomendações personalizadas\n• **Melhor marketplace** — onde vender cada tipo\n• **Produtos para viralizar** — conteúdo que bomba\n\nTente perguntar algo como: *"Quais nichos têm baixa competição?"*`,
    tip: '💡 Sou seu assistente de inteligência de mercado. Pergunta qualquer coisa sobre tendências e produtos!'
  };
}

function renderProductCards(prods) {
  if (!prods || prods.length === 0) return '';
  return `<div class="bot-products-row">${prods.map(p => {
    const img = getProductImage(p.imgType, p);
    const mp = getMarketplace(p.marketplace);
    return `<div class="bot-product-card" data-product-id="${p.id}">
      <div class="bot-prod-img" style="overflow:hidden">${renderImage(p.imageUrl, p.title)}</div>
      <div class="bot-prod-info">
        <div class="bot-prod-name">${p.name}</div>
        <div class="bot-prod-price">${formatCurrency(p.price)}</div>
        <div style="display:flex;gap:6px;align-items:center">${getMpBadge(mp)} <span class="badge badge-up" style="font-size:11px">+${p.change}%</span></div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function formatBotText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

export function renderAssistant() {
  const container = document.getElementById('page-content');

  container.innerHTML = `
    <div class="assistant-layout">
      <div class="assistant-main">
        <div class="assistant-chat-area" id="chat-area">
          <div class="assistant-welcome">
            <div class="assistant-bot-avatar">${botPersonality.avatar}</div>
            <h2>Olá! Eu sou o <span class="gradient-text">TrendBot</span> 🤖</h2>
            <p>Seu assistente de inteligência de mercado. Me pergunte sobre produtos, nichos e tendências!</p>
            <div class="quick-actions-grid">
              ${quickActions.map(a => `<button class="quick-action-btn" data-query="${a.query}"><span>${a.icon}</span> ${a.label}</button>`).join('')}
            </div>
          </div>
          <div id="chat-messages"></div>
        </div>
        <div class="assistant-input-area">
          <div class="assistant-input-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 7.27 19H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h-1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>
            <input type="text" id="chat-input" placeholder="Pergunte sobre produtos, nichos, tendências..." autocomplete="off"/>
            <button class="send-btn" id="send-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const chatInput = document.getElementById('chat-input');
  const chatMsgs = document.getElementById('chat-messages');

  function sendMessage(text) {
    if (!text.trim()) return;
    // Add user message
    chatMsgs.innerHTML += `<div class="chat-msg user-msg"><div class="chat-bubble user-bubble">${text}</div></div>`;

    // Generate bot response
    setTimeout(() => {
      const resp = generateBotResponse(text);
      const productsHtml = renderProductCards(resp.products);
      const tipHtml = resp.tip ? `<div class="bot-tip">${resp.tip}</div>` : '';
      chatMsgs.innerHTML += `
        <div class="chat-msg bot-msg">
          <div class="bot-avatar-sm">${botPersonality.avatar}</div>
          <div class="chat-bubble bot-bubble">
            <div class="bot-text">${formatBotText(resp.text)}</div>
            ${productsHtml}
            ${tipHtml}
          </div>
        </div>`;
      chatMsgs.scrollTop = chatMsgs.scrollHeight;

      // Add click handlers for product cards
      chatMsgs.querySelectorAll('.bot-product-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = parseInt(card.dataset.productId);
          const product = products.find(p => p.id === id);
          if (product) window.dispatchEvent(new CustomEvent('openproduct', { detail: product }));
        });
      });
    }, 400);

    chatInput.value = '';
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(chatInput.value); });
  document.getElementById('send-btn').addEventListener('click', () => sendMessage(chatInput.value));
  container.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.query;
      chatInput.value = q;
      sendMessage(q);
    });
  });
}
