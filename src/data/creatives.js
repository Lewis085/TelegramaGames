// Simulated viral creatives / ads data
export const creatives = [
  {
    id: 1, title: 'Serum Vitamina C — Antes e Depois',
    marketplace: 'tiktok', type: 'video', format: 'UGC Review',
    impressions: 4800000, clicks: 312000, ctr: 6.5, conversions: 18400,
    spend: 48000, revenue: 549560, roas: 11.4,
    hook: '"Eu nao acreditei quando vi o resultado em 7 dias..."',
    thumbnail: 'linear-gradient(135deg,#fce4ec,#f8bbd0)',
    status: 'active', daysRunning: 14
  },
  {
    id: 2, title: 'Garrafa Termica — Teste de Gelo 24h',
    marketplace: 'shopee', type: 'video', format: 'Product Demo',
    impressions: 3200000, clicks: 224000, ctr: 7.0, conversions: 15600,
    spend: 24000, revenue: 622440, roas: 25.9,
    hook: '"Coloquei gelo as 6h da manha e olha o resultado as 6h da noite"',
    thumbnail: 'linear-gradient(135deg,#e8f5e9,#a5d6a7)',
    status: 'active', daysRunning: 21
  },
  {
    id: 3, title: 'Air Fryer — 5 Receitas em 10 Min',
    marketplace: 'mercadolivre', type: 'video', format: 'Tutorial',
    impressions: 5600000, clicks: 280000, ctr: 5.0, conversions: 12800,
    spend: 84000, revenue: 3710720, roas: 44.2,
    hook: '"Com essa Air Fryer eu nunca mais pedi delivery"',
    thumbnail: 'linear-gradient(135deg,#fff8e1,#ffe082)',
    status: 'active', daysRunning: 30
  },
  {
    id: 4, title: 'Pelucia Capivara — Unboxing Viral',
    marketplace: 'shopee', type: 'video', format: 'Unboxing',
    impressions: 8200000, clicks: 574000, ctr: 7.0, conversions: 8400,
    spend: 12000, revenue: 419160, roas: 34.9,
    hook: '"Gente, olha o tamanho dessa capivara que chegou"',
    thumbnail: 'linear-gradient(135deg,#fce4ec,#f48fb1)',
    status: 'paused', daysRunning: 45
  },
  {
    id: 5, title: 'Lip Tint — Comparativo 8 Marcas',
    marketplace: 'tiktok', type: 'video', format: 'Comparativo',
    impressions: 6100000, clicks: 427000, ctr: 7.0, conversions: 22800,
    spend: 36000, revenue: 453720, roas: 12.6,
    hook: '"Testei 8 lip tints pra voce nao precisar. O melhor foi..."',
    thumbnail: 'linear-gradient(135deg,#f3e5f5,#ce93d8)',
    status: 'active', daysRunning: 18
  },
  {
    id: 6, title: 'Creatina — Resultados 90 Dias',
    marketplace: 'mercadolivre', type: 'image', format: 'Carrossel',
    impressions: 2800000, clicks: 168000, ctr: 6.0, conversions: 9200,
    spend: 32000, revenue: 642680, roas: 20.1,
    hook: '"90 dias de creatina: meu shape mudou completamente"',
    thumbnail: 'linear-gradient(135deg,#e3f2fd,#90caf9)',
    status: 'active', daysRunning: 25
  },
  {
    id: 7, title: 'Conjunto Fitness — Try On Haul',
    marketplace: 'shein', type: 'video', format: 'Try On',
    impressions: 3900000, clicks: 273000, ctr: 7.0, conversions: 14200,
    spend: 28000, revenue: 850580, roas: 30.4,
    hook: '"Paguei R$59 nesse conjunto e olha a qualidade"',
    thumbnail: 'linear-gradient(135deg,#e0f7fa,#80deea)',
    status: 'active', daysRunning: 12
  },
  {
    id: 8, title: 'Echo Dot — Casa Inteligente Setup',
    marketplace: 'amazon', type: 'video', format: 'Setup Guide',
    impressions: 2100000, clicks: 126000, ctr: 6.0, conversions: 5800,
    spend: 45000, revenue: 1623420, roas: 36.1,
    hook: '"Transformei minha casa inteira por menos de R$300"',
    thumbnail: 'linear-gradient(135deg,#e8eaf6,#9fa8da)',
    status: 'active', daysRunning: 35
  },
];

export function getTopCreatives(n = 5) {
  return [...creatives].sort((a, b) => b.roas - a.roas).slice(0, n);
}

export function getCreativesByMarketplace(id) {
  return creatives.filter(c => c.marketplace === id);
}
