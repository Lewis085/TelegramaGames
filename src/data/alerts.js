export const alerts = [
  { id: 1, type: 'explosive', title: 'Difusor Ultrassônico explodindo no TikTok', description: 'Volume de busca aumentou 456% na última semana. Produto viral em múltiplos vídeos.', marketplace: 'tiktok', keyword: 'difusor de ambiente', change: 456, time: '2 min atrás', read: false },
  { id: 2, type: 'trending', title: 'Lip Tint domina buscas de beleza', description: 'Keyword "lip tint" atingiu 850K buscas mensais, crescimento de 120% no TikTok Shop.', marketplace: 'tiktok', keyword: 'lip tint', change: 120, time: '15 min atrás', read: false },
  { id: 3, type: 'opportunity', title: 'Garrafa Térmica com baixa competição', description: 'Alto volume (520K) com competição baixa na Shopee. Oportunidade de nicho identificada.', marketplace: 'shopee', keyword: 'garrafa térmica', change: 42, time: '1h atrás', read: false },
  { id: 4, type: 'explosive', title: 'Pelúcia Capivara viralizou', description: 'Buscas por "pelúcia capivara" cresceram 234% na Shopee. Trend impulsionado por memes.', marketplace: 'shopee', keyword: 'pelúcia kawaii', change: 234, time: '2h atrás', read: true },
  { id: 5, type: 'warning', title: 'Cadeira Gamer em declínio', description: 'Categoria "cadeira gamer" caiu 8.3% no Mercado Livre nos últimos 30 dias.', marketplace: 'mercadolivre', keyword: 'cadeira gamer', change: -8.3, time: '3h atrás', read: true },
  { id: 6, type: 'trending', title: 'Creatina mantém crescimento forte', description: 'Keyword "creatina" segue em alta com +45% no ML. Tendência consolidada há 3 meses.', marketplace: 'mercadolivre', keyword: 'creatina', change: 45, time: '4h atrás', read: true },
  { id: 7, type: 'opportunity', title: 'Mini Projetor com demanda crescente', description: 'Buscas cresceram 87% na Shopee com competição média. Margem de lucro atrativa.', marketplace: 'shopee', keyword: 'mini projetor', change: 87, time: '5h atrás', read: true },
  { id: 8, type: 'explosive', title: 'Kit Skincare viral no TikTok', description: 'Conteúdo sobre skincare routine impulsionou buscas em 102%. Categoria inteira crescendo.', marketplace: 'tiktok', keyword: 'kit skincare', change: 102, time: '6h atrás', read: true },
  { id: 9, type: 'warning', title: 'Ring Light saturado', description: 'Mercado de Ring Light mostra sinais de saturação. Volume caiu 12% na Shopee.', marketplace: 'shopee', keyword: 'ring light', change: -12.3, time: '8h atrás', read: true },
  { id: 10, type: 'trending', title: 'Ar Condicionado sazonal', description: 'Buscas por AC subiram 55% na Americanas com aproximação do verão.', marketplace: 'americanas', keyword: 'ar condicionado', change: 55, time: '12h atrás', read: true },
];

export function getUnreadAlerts() { return alerts.filter(a => !a.read); }
export function getAlertsByType(type) { return alerts.filter(a => a.type === type); }
