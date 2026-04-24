const fs = require('fs');

const cssContent = `:root,
[data-theme="dark"] {
  --bg-primary: #080c10;
  --bg-secondary: #111820;
  --bg-card: #0d1117;
  --bg-hover: #111820;
  --border: rgba(255,255,255,0.06);
  --border-solid: rgba(255,255,255,0.1);
  --border-accent: rgba(0,212,232,0.3);
  --text-primary: #e8f4f6;
  --text-secondary: #7a9aa8;
  --text-muted: #4a6470;
  --accent: #00d4e8;
  --accent-soft: rgba(0,212,232,0.08);
  --success: #00e878;
  --danger: #ff4466;
  --warning: #ffaa00;

  --success-bg: rgba(0,232,120,0.07);
  --danger-bg: rgba(255,68,102,0.07);
  --warning-bg: rgba(255,170,0,0.07);
  
  --font-heading: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --bg-0: var(--bg-primary);
  --bg-1: var(--bg-secondary);
  --bg-2: var(--bg-hover);
  --text-0: var(--text-primary);
  --text-1: var(--text-secondary);
  --text-2: var(--text-secondary);
  --text-3: var(--text-muted);
  --green: var(--success);
  --green-soft: var(--success-bg);
  --red: var(--danger);
  --red-soft: var(--danger-bg);
  --yellow: var(--warning);
  --yellow-soft: var(--warning-bg);
  
  --sidebar-w: 240px;
  --header-h: 56px;
  --radius: 10px;
  --radius-sm: 6px;
  --radius-lg: 16px;
  --header-height: var(--header-h);
}

[data-theme="light"] {
  --bg-primary: #f4f6f8;
  --bg-secondary: #f0f3f6;
  --bg-card: #ffffff;
  --bg-hover: #e8ebef;
  --border: rgba(0,0,0,0.07);
  --border-solid: rgba(0,0,0,0.12);
  --border-accent: rgba(0,180,200,0.35);
  --text-primary: #0a1014;
  --text-secondary: #5a7480;
  --text-muted: #9aabb4;
  --accent: #0099aa;
  --accent-soft: rgba(0,153,170,0.08);
  --success: #009944;
  --danger: #cc2244;
  --warning: #f59e0b;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px;scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:var(--font-body);background-color:var(--bg-primary);color:var(--text-primary);line-height:1.5;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font-family:var(--font-body)}
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading);margin-bottom:0.5em}
h1{font-size:32px;font-weight:700;color:var(--text-primary);letter-spacing:-1px}
h2{font-size:20px;font-weight:600;color:var(--text-primary);letter-spacing:-0.5px}
h3{font-size:16px;font-weight:600;color:var(--text-primary)}
h4{font-size:14px;font-weight:500;color:var(--text-secondary)}
h5{font-size:12px;font-weight:500;color:var(--text-primary)}
h6{font-family:var(--font-mono);font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-muted)}
p{font-family:var(--font-body);font-size:13px;color:var(--text-secondary);line-height:1.6}

#app{display:flex;min-height:100vh}

.sidebar{width:var(--sidebar-w);background-color:var(--bg-card);border-right:1px solid var(--border);position:fixed;top:0;left:0;height:100vh;z-index:100;display:flex;flex-direction:column;overflow-y:auto}
.main-wrapper{margin-left:var(--sidebar-w);flex:1;min-height:100vh;display:flex;flex-direction:column}
.header{height:var(--header-h);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;z-index:50;background:var(--bg-primary)}
.page-content{flex:1;padding:32px 40px;max-width:1200px;width:100%;margin:0 auto}

.sidebar-logo{padding:20px 16px 16px;display:flex;align-items:center;gap:10px}
.sidebar-logo .logo-icon{width:24px;height:24px;border-radius:6px;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;font-weight:800;font-family:var(--font-head)}
.sidebar-logo .logo-text{font-size:15px;font-weight:700;letter-spacing:-.5px;font-family:var(--font-heading)}
.sidebar-logo .logo-badge{font-family:var(--font-mono);font-size:9px;background:var(--accent-soft);color:var(--accent);padding:2px 6px;border-radius:4px;font-weight:500;border:1px solid var(--border-accent);letter-spacing:0.1em}

.sidebar-nav{padding:4px 8px;flex:1}
.nav-section-title{font-family:var(--font-mono);font-size:9px;text-transform:uppercase;letter-spacing:0.16em;color:var(--text-muted);padding:16px 12px 6px;font-weight:500}

.nav-item{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;margin-bottom:2px;color:var(--text-secondary);cursor:pointer;transition:all 0.15s;font-size:12px;font-weight:500;text-decoration:none;font-family:var(--font-body);border-left:2px solid transparent}
.nav-item:not(.active):hover{background-color:var(--bg-secondary);color:var(--text-primary)}
.nav-item.active{background-color:var(--accent-soft);color:var(--accent);border-left:2px solid var(--accent);padding-left:10px}
.nav-item svg{width:16px;height:16px;flex-shrink:0;opacity:0.7}
.nav-item.active svg{opacity:1}
.nav-item .nav-badge{margin-left:auto;font-family:var(--font-mono);font-size:9px;padding:2px 6px;border-radius:4px;font-weight:500;background:var(--red-soft);color:var(--danger);border:1px solid rgba(255,68,102,0.2)}

.sidebar-divider{height:1px;background-color:var(--border);margin:8px 0}

.header-left{display:flex;align-items:center;gap:12px}
.header-title h1{font-size:13px;font-weight:600;letter-spacing:-.2px;margin:0}
.header-title p{font-size:11px;color:var(--text-secondary);display:none}
.header-right{display:flex;align-items:center;gap:10px}

.search-trigger{display:flex;align-items:center;gap:8px;padding:6px 12px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;cursor:pointer;color:var(--text-muted);font-size:12px;transition:all .15s}
.search-trigger:hover{border-color:var(--accent);color:var(--text-primary)}
.search-trigger kbd{background:transparent;font-family:var(--font-mono);font-size:10px;color:var(--text-secondary);letter-spacing:0.1em}

.header-btn{width:30px;height:30px;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-secondary);transition:all .2s;position:relative}
.header-btn:hover{border-color:var(--accent);color:var(--accent)}
.header-btn .badge-dot{position:absolute;top:5px;right:5px;width:6px;height:6px;background:var(--accent);border-radius:50%}

.user-avatar{width:26px;height:26px;border-radius:6px;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:11px;cursor:pointer;font-family:var(--font-heading)}
.mobile-menu-btn{display:none;background:none;border:none;color:var(--text-primary);font-size:20px;cursor:pointer}

.kpi-grid{display:grid;grid-template-columns:repeat(4, 1fr);gap:10px;margin-bottom:32px}
.kpi-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:18px 16px;position:relative;overflow:hidden;transition:all .2s}
.kpi-card::after{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:var(--accent);opacity:0;transition:opacity 0.2s}
.kpi-card:hover::after{opacity:1}
.kpi-card .kpi-icon{display:none}
.kpi-card .kpi-value{font-size:26px;font-weight:700;margin-bottom:8px;font-family:var(--font-heading);color:var(--text-primary);line-height:1}
.kpi-card .kpi-label{font-family:var(--font-mono);font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px}
.kpi-card .kpi-change{font-family:var(--font-mono);font-size:10px;font-weight:500;display:flex;align-items:center;gap:3px;margin-top:4px}
.kpi-card .kpi-change.up{color:var(--success)}
.kpi-card .kpi-change.down{color:var(--danger)}
.kpi-card .kpi-glow{display:none}

.card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:20px;transition:border-color .2s}
.card:hover{border-color:var(--accent)}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.card-header h2{font-family:var(--font-heading);font-size:13px;font-weight:600;color:var(--text-primary);margin:0}
.card-header h3{font-family:var(--font-heading);font-size:12px;font-weight:600;margin:0}

.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px}

.data-table{width:100%;border-collapse:collapse}
.data-table th{text-align:left;padding:12px;font-family:var(--font-mono);font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:var(--text-muted);font-weight:500;border-bottom:1px solid var(--border)}
.data-table th:hover{color:var(--text-primary)}
.data-table td{padding:12px;border-bottom:1px solid var(--border);font-family:var(--font-body);font-size:12px;color:var(--text-secondary);vertical-align:middle}
.data-table tr:last-child td{border-bottom:none}
.data-table tbody tr{transition:background .15s}
.data-table tbody tr:hover{background:var(--bg-secondary)}
.table-rank{font-family:var(--font-mono);font-weight:500;color:var(--text-muted);font-size:11px;min-width:32px}

.badge{font-family:var(--font-mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;padding:3px 8px;border-radius:4px;background:var(--accent-soft);color:var(--accent);border:1px solid var(--border-accent);display:inline-flex;align-items:center;gap:4px}
.badge-marketplace{font-family:var(--font-mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;padding:3px 8px;border-radius:4px;background:var(--accent-soft);color:var(--accent);border:1px solid var(--border-accent)}
.badge-up{background:var(--green-soft);color:var(--success);border-color:rgba(0,232,120,0.2)}
.badge-down{background:var(--red-soft);color:var(--danger);border-color:rgba(255,68,102,0.2)}
.badge-stable{background:var(--yellow-soft);color:var(--warning);border-color:rgba(255,170,0,0.2)}
.competition-low{background:var(--green-soft);color:var(--success);border-color:rgba(0,232,120,0.2)}
.competition-medium{background:var(--yellow-soft);color:var(--warning);border-color:rgba(255,170,0,0.2)}
.competition-high{background:var(--red-soft);color:var(--danger);border-color:rgba(255,68,102,0.2)}

.btn{font-family:var(--font-body);font-size:12px;font-weight:500;padding:9px 20px;border-radius:7px;border:1px solid var(--border);cursor:pointer;transition:all 0.2s;letter-spacing:0.01em;display:inline-flex;align-items:center;justify-content:center;gap:6px}
.btn-primary{background:var(--accent);color:#030a0c;border-color:var(--accent)}
.btn-primary:hover{filter:brightness(1.1);color:#030a0c}
.btn-secondary{background:var(--bg-card);color:var(--text-primary);border-color:var(--border)}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent)}
.btn-ghost{background:transparent;color:var(--text-secondary);border-color:transparent}
.btn-ghost:hover{color:var(--text-primary);background:var(--bg-secondary)}
.btn-ghost.active{background:var(--bg-card);color:var(--text-primary);border-color:var(--border)}
.btn-sm{padding:5px 14px;font-size:11px}
.btn-group{display:flex;gap:6px;flex-wrap:wrap}

input,textarea,select{font-family:var(--font-body);font-size:13px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:10px 14px;color:var(--text-primary);outline:none;transition:all 0.2s}
input:focus,textarea:focus,select:focus{border-color:var(--accent);background:var(--bg-secondary)}

::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:99px}
::-webkit-scrollbar-thumb:hover{background:var(--text-muted)}

.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-top:16px}
.product-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:16px;transition:border-color .2s;cursor:pointer}
.product-card:hover{border-color:var(--accent)}
.product-card .product-image{width:100%;height:140px;background:var(--bg-secondary);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:16px;overflow:hidden;position:relative}
.product-card .product-name{font-family:var(--font-heading);font-size:13px;font-weight:600;margin-bottom:6px;color:var(--text-primary);line-height:1.4}
.product-card .product-price{font-family:var(--font-mono);font-size:13px;font-weight:500;color:var(--text-primary);margin-bottom:4px}
.product-card .product-original{font-size:10px;color:var(--text-muted);text-decoration:line-through;margin-left:6px}
.product-card .product-meta{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}
.product-card .product-sales{font-family:var(--font-mono);font-size:10px;color:var(--text-secondary)}
.product-card .product-change{font-family:var(--font-mono);font-size:10px;font-weight:500}
.product-card .product-change.up{color:var(--success)}
.product-card .product-rating{display:flex;align-items:center;gap:3px;font-family:var(--font-mono);font-size:10px;color:var(--warning)}

.alert-item{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);cursor:pointer}
.alert-item:last-child{border-bottom:none}
.alert-item:hover{background:transparent}
.alert-item.unread{border-left:none;padding-left:0}
.alert-icon{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;border:1px solid var(--border);background:var(--bg-secondary)}
.alert-icon.explosive{color:var(--danger)}
.alert-icon.trending{color:var(--success)}
.alert-icon.opportunity{color:var(--accent)}
.alert-icon.warning{color:var(--warning)}
.alert-body{flex:1}
.alert-title{font-family:var(--font-body);font-size:12px;font-weight:500;margin-bottom:2px;color:var(--text-primary)}
.alert-desc{font-family:var(--font-body);font-size:11px;color:var(--text-secondary);line-height:1.4}
.alert-time{font-family:var(--font-mono);font-size:9px;color:var(--text-muted);margin-top:4px}

.marketplace-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.mp-pill{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);cursor:pointer;font-family:var(--font-body);font-size:11px;font-weight:500;transition:all .2s;color:var(--text-secondary)}
.mp-pill:hover{border-color:var(--accent);color:var(--accent)}
.mp-pill.active{background:var(--accent-soft);color:var(--accent);border-color:var(--border-accent)}
.mp-pill .mp-dot{width:4px;height:4px;border-radius:50%}

.sparkline{display:inline-block;vertical-align:middle}
.chart-container{position:relative;width:100%}
.chart-container canvas{width:100%!important}

.growth-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}
.growth-item:last-child{border-bottom:none}
.growth-icon{font-size:16px;width:28px;text-align:center}
.growth-info{flex:1}
.growth-name{font-family:var(--font-body);font-size:12px;font-weight:500;color:var(--text-primary)}
.growth-volume{font-family:var(--font-mono);font-size:10px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;margin-top:2px}
.growth-bar-wrap{flex:1;max-width:140px}
.growth-bar{height:3px;border-radius:99px;background:var(--border);overflow:hidden;margin-top:4px}
.growth-bar-fill{height:100%;border-radius:99px;background:var(--accent);transition:width 1s ease}
.growth-value{font-family:var(--font-mono);font-size:11px;font-weight:500;min-width:60px;text-align:right;color:var(--text-primary)}

.mp-detail-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:24px}
.mp-detail-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:all .2s}
.mp-detail-card:hover{border-color:var(--accent)}
.mp-detail-card .mp-icon{font-size:24px;margin-bottom:12px}
.mp-detail-card .mp-name{font-family:var(--font-heading);font-size:13px;font-weight:600;margin-bottom:4px;color:var(--text-primary)}
.mp-detail-card .mp-stat{font-family:var(--font-mono);font-size:10px;color:var(--text-secondary)}

.ai-insight{border:1px solid var(--border);border-radius:10px;padding:20px;margin-bottom:20px;background:var(--bg-card)}
.ai-insight-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;font-family:var(--font-body);font-size:13px;font-weight:600;color:var(--accent)}
.ai-insight p{font-size:12px;color:var(--text-secondary);line-height:1.6}
.ai-insight ul{margin:10px 0 0 16px}
.ai-insight li{font-size:12px;color:var(--text-secondary);margin-bottom:6px;line-height:1.5}

.period-selector{display:flex;gap:4px}
.period-btn{padding:6px 12px;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);font-family:var(--font-body);font-size:11px;font-weight:500;cursor:pointer;color:var(--text-secondary);transition:all .2s}
.period-btn.active{background:var(--bg-secondary);color:var(--text-primary);border-color:var(--border)}
.period-btn:hover:not(.active){color:var(--text-primary);border-color:var(--accent)}

.search-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:flex-start;justify-content:center;padding-top:20vh}
.search-modal-overlay.hidden{display:none}
.search-modal{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;width:520px;max-height:420px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.2)}
.search-modal input{width:100%;padding:14px 16px;border:none;background:var(--bg-secondary);font-size:13px;color:var(--text-primary);outline:none;font-family:var(--font-body);border-radius:0;border-bottom:1px solid var(--border)}
.search-results{max-height:340px;overflow-y:auto;padding:8px}
.search-result-item{padding:10px 12px;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .2s;font-family:var(--font-body);font-size:12px;color:var(--text-primary)}
.search-result-item:hover{background:var(--bg-secondary);color:var(--accent)}
.search-result-type{font-family:var(--font-mono);font-size:9px;color:var(--text-muted);margin-left:auto;letter-spacing:0.1em;text-transform:uppercase}

@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.animate-in{animation:fadeIn .25s ease forwards}
.stagger-1{animation-delay:.04s;opacity:0}
.stagger-2{animation-delay:.08s;opacity:0}
.stagger-3{animation-delay:.12s;opacity:0}
.stagger-4{animation-delay:.16s;opacity:0}
`;

fs.writeFileSync('src/style.css', cssContent);

// Fix styles-extra.css
let extraCss = fs.readFileSync('src/components/styles-extra.css', 'utf8');

extraCss = extraCss.replace(/\.creative-card\{[\s\S]*?\}/, '.creative-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;overflow:hidden;transition:border-color .2s;cursor:pointer}');
extraCss = extraCss.replace(/\.creative-card:hover\{[\s\S]*?\}/, '.creative-card:hover{border-color:var(--accent)}');

extraCss = extraCss.replace(/\.hype-hero\{[\s\S]*?\}/, '.hype-hero{border:1px solid var(--border);border-radius:10px;padding:24px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;background:var(--bg-card)}');
extraCss = extraCss.replace(/\.nicho-hero\{[\s\S]*?\}/, '.nicho-hero{border:1px solid var(--border);border-radius:10px;padding:24px;margin-bottom:24px;display:flex;align-items:center;gap:16px;background:var(--bg-card)}');

extraCss = extraCss.replace(/\.hype-card\{[\s\S]*?\}/, '.hype-card{background:var(--bg-card);border:1px solid var(--border);transition:border-color .2s;cursor:pointer;overflow:hidden;border-radius:10px}');
extraCss = extraCss.replace(/\.hype-card:hover\{[\s\S]*?\}/, '.hype-card:hover{border-color:var(--accent)}');

extraCss = extraCss.replace(/\.nicho-insight-card\{[\s\S]*?\}/, '.nicho-insight-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:20px;text-align:center;transition:border-color .2s}');
extraCss = extraCss.replace(/\.nicho-insight-card:hover\{[\s\S]*?\}/, '.nicho-insight-card:hover{border-color:var(--accent)}');

extraCss = extraCss.replace(/\.nicho-opportunity-card\{[\s\S]*?\}/, '.nicho-opportunity-card{background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:16px;transition:border-color .2s}');
extraCss = extraCss.replace(/\.nicho-opportunity-card:hover\{[\s\S]*?\}/, '.nicho-opportunity-card:hover{border-color:var(--accent)}');

extraCss = extraCss.replace(/\.hype-pill\{[\s\S]*?\}/, '.hype-pill{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);cursor:pointer;font-family:var(--font-body);font-size:11px;font-weight:500;transition:all .2s;color:var(--text-secondary)}');
extraCss = extraCss.replace(/\.hype-pill:hover\{[\s\S]*?\}/, '.hype-pill:hover{border-color:var(--accent);color:var(--accent)}');
extraCss = extraCss.replace(/\.hype-pill\.active\{[\s\S]*?\}/, '.hype-pill.active{border-color:var(--border-accent);color:var(--accent);background:var(--accent-soft)}');

fs.writeFileSync('src/components/styles-extra.css', extraCss);
