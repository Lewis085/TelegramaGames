const fs = require('fs');

const cssContent = `:root,
[data-theme="dark"] {
  --bg-primary: #0d0d0d;
  --bg-secondary: #111111;
  --bg-card: #161616;
  --bg-hover: #1c1c1c;
  --text-primary: #f0f0f0;
  --text-secondary: #888888;
  --text-muted: #444444;
  --accent: #03e9f4;
  --accent-dim: rgba(3, 233, 244, 0.12);
  --accent-glow: 0 0 12px rgba(3, 233, 244, 0.3);
  --shadow-card: 15px 15px 30px #050505, -15px -15px 30px #1f1f1f;
  --shadow-btn: 6px 6px 12px #050505, -6px -6px 12px #1f1f1f;
  --shadow-inset: inset 4px 4px 12px #050505, inset -4px -4px 12px #1f1f1f;
  --success: #00ff88;
  --danger: #ff3355;
  --warning: #ffaa00;
  --radius-card: 30px;
  --radius-btn: 12px;
  
  --success-bg: rgba(0, 255, 136, 0.1);
  --danger-bg: rgba(255, 51, 85, 0.1);
  --warning-bg: rgba(255, 170, 0, 0.1);
  --accent-bg: var(--accent-dim);
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
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font: var(--font-heading);
  --header-height: var(--header-h);
  --gradient: var(--accent);
}

[data-theme="light"] {
  --bg-primary: #e8e8e8;
  --bg-secondary: #eef1f5;
  --bg-card: #e0e0e0;
  --bg-hover: #d1d1d1;
  --text-primary: #090909;
  --text-secondary: #666666;
  --text-muted: #aaaaaa;
  --accent: #03e9f4;
  --accent-dim: rgba(3, 233, 244, 0.12);
  --accent-glow: 0 0 12px rgba(3, 233, 244, 0.4);
  --shadow-card: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  --shadow-btn: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  --shadow-inset: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  --success: #00cc66;
  --danger: #ff3355;
  --warning: #f59e0b;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px;scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:var(--font-body);background-color:var(--bg-primary);color:var(--text-primary);line-height:1.5;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font-family:var(--font-heading)}
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading);margin-bottom:0.5em}
h1{font-size:42px;font-weight:600;color:var(--text-primary)}
h2{font-size:24px;font-weight:600;color:var(--text-primary)}
h3{font-size:18px;font-weight:500;color:var(--text-primary)}
h4{font-size:16px;font-weight:400;color:var(--text-muted)}
h5{font-size:14px;font-weight:400;color:var(--text-primary)}
h6{font-size:11px;font-weight:400;letter-spacing:1px;color:var(--text-muted)}
p{font-family:var(--font-body);font-size:14px;color:var(--text-secondary);letter-spacing:.6px}

#app{display:flex;min-height:100vh}

.sidebar{width:var(--sidebar-w);background-color:var(--bg-secondary);border:none;box-shadow:4px 0 12px rgba(0,0,0,0.15);position:fixed;top:0;left:0;height:100vh;z-index:100;display:flex;flex-direction:column;overflow-y:auto}
.main-wrapper{margin-left:var(--sidebar-w);flex:1;min-height:100vh;display:flex;flex-direction:column}
.header{height:var(--header-h);border-bottom:1px solid rgba(170,170,170,0.15);display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;z-index:50;background:var(--bg-primary)}
.page-content{flex:1;padding:32px 40px;max-width:1200px;width:100%;margin:0 auto}

.sidebar-logo{padding:16px 16px 12px;display:flex;align-items:center;gap:10px}
.sidebar-logo .logo-icon{width:28px;height:28px;border-radius:12px;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:13px;color:#0d0d0d;font-weight:800}
.sidebar-logo .logo-text{font-size:14px;font-weight:700;letter-spacing:-.3px;font-family:var(--font-heading)}
.sidebar-logo .logo-badge{font-size:9px;background:var(--accent-dim);color:var(--accent);padding:1px 6px;border-radius:50px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase}

.sidebar-nav{padding:4px 0;flex:1}
.nav-section-title{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);padding:16px 32px 6px;font-weight:400;font-family:var(--font-heading)}

.nav-item{display:flex;align-items:center;gap:8px;padding:10px 16px;border-radius:12px;margin:2px 8px;color:var(--text-secondary);cursor:pointer;transition:all 0.2s;font-size:15px;font-weight:400;text-decoration:none;font-family:var(--font-heading)}
.nav-item:hover{color:var(--text-primary)}
.nav-item.active{background:var(--bg-card);color:var(--accent);font-weight:500;box-shadow:var(--shadow-inset)}
.nav-item svg{width:16px;height:16px;flex-shrink:0;opacity:.6}
.nav-item.active svg{opacity:1;color:var(--accent)}
.nav-item .nav-badge{margin-left:auto;font-size:10px;padding:1px 6px;border-radius:50px;font-weight:700;background:var(--danger-bg);color:var(--danger)}

.sidebar-divider{height:1px;background-color:var(--text-muted);opacity:0.15;margin:8px 0}

.header-left{display:flex;align-items:center;gap:12px}
.header-title h1{font-size:14px;font-weight:600;letter-spacing:-.2px;margin:0}
.header-title p{font-size:12px;color:var(--text-secondary);display:none}
.header-right{display:flex;align-items:center;gap:8px}

.search-trigger{display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg-secondary);border:none;border-radius:var(--radius-btn);box-shadow:var(--shadow-inset);cursor:pointer;color:var(--text-muted);font-size:12px;transition:all .2s}
.search-trigger:hover{color:var(--text-primary)}
.search-trigger kbd{background:transparent;padding:0 4px;font-size:10px;font-family:var(--font-heading);color:var(--accent)}

.header-btn{width:32px;height:32px;border-radius:12px;border:none;box-shadow:var(--shadow-btn);background:var(--bg-card);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-secondary);transition:all .25s;position:relative}
.header-btn:hover{color:var(--accent);box-shadow:var(--shadow-inset)}
.header-btn .badge-dot{position:absolute;top:6px;right:6px;width:6px;height:6px;background:var(--accent);border-radius:50%}

.theme-toggle{font-size:14px}
.user-avatar{width:28px;height:28px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#0d0d0d;font-weight:600;font-size:11px;cursor:pointer;box-shadow:var(--accent-glow)}
.mobile-menu-btn{display:none;background:none;border:none;color:var(--text-primary);font-size:20px;cursor:pointer}

.kpi-grid{display:flex;gap:16px;margin-bottom:32px;overflow:hidden}
.kpi-card{background:var(--bg-card);border-radius:var(--radius-card);box-shadow:var(--shadow-card);flex:1;padding:24px;position:relative;transition:all .3s;border:none}
.kpi-card:hover{box-shadow:var(--shadow-card), var(--accent-glow)}
.kpi-card .kpi-icon{display:none}
.kpi-card .kpi-value{font-size:36px;font-weight:700;margin-bottom:2px;font-family:var(--font-heading);color:var(--text-primary)}
.kpi-card .kpi-label{font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);font-family:var(--font-heading)}
.kpi-card .kpi-change{font-size:12px;font-weight:500;display:flex;align-items:center;gap:3px;margin-top:4px}
.kpi-card .kpi-change.up{color:var(--success)}
.kpi-card .kpi-change.down{color:var(--danger)}
.kpi-card .kpi-glow{display:none}

.card{background:var(--bg-card);border-radius:var(--radius-card);box-shadow:var(--shadow-card);border:none;padding:24px;transition:box-shadow .3s}
.card:hover{box-shadow:var(--shadow-card), var(--accent-glow)}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.card-header h2{font-size:14px;font-weight:600;letter-spacing:-.2px;margin:0}
.card-header h3{font-size:13px;font-weight:600;margin:0}

.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:40px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-bottom:40px}

.data-table{width:100%;border-collapse:collapse}
.data-table th{text-align:left;padding:8px 12px;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted);font-weight:500;border-bottom:1px solid rgba(170,170,170,0.15);font-family:var(--font-heading)}
.data-table th:hover{color:var(--text-primary)}
.data-table td{padding:10px 12px;border-bottom:1px solid rgba(170,170,170,0.15);font-size:13px;vertical-align:middle}
.data-table tr{transition:background .1s}
.data-table tbody tr:hover{background:var(--bg-hover)}
.table-rank{font-weight:600;color:var(--text-secondary);font-size:12px;min-width:32px}

.badge{display:inline-flex;align-items:center;gap:3px;background:var(--accent-dim);color:var(--accent);border-radius:50px;padding:3px 10px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border:none}
.badge-marketplace{background:var(--accent-dim);color:var(--accent);border-radius:50px;padding:3px 10px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border:none}
.badge-up{background:var(--success-bg);color:var(--success)}
.badge-down{background:var(--danger-bg);color:var(--danger)}
.badge-stable{background:var(--warning-bg);color:var(--warning)}
.competition-low{background:var(--success-bg);color:var(--success)}
.competition-medium{background:var(--warning-bg);color:var(--warning)}
.competition-high{background:var(--danger-bg);color:var(--danger)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;background:var(--bg-card);color:var(--text-secondary);border:none;border-radius:var(--radius-btn);padding:10px 24px;font-family:Inter;font-weight:500;font-size:13px;box-shadow:var(--shadow-btn);cursor:pointer;transition:all 0.25s}
.btn:hover{box-shadow:var(--shadow-inset);color:var(--accent)}

.btn-primary{background:var(--text-primary);color:var(--bg-primary);border:none;border-radius:var(--radius-btn);padding:12px 28px;font-family:Inter;font-weight:600;font-size:13px;letter-spacing:0.02em;cursor:pointer;transition:all 0.25s;box-shadow:var(--shadow-card)}
.btn-primary:hover{box-shadow:var(--shadow-card), var(--accent-glow);color:var(--accent)}

.btn-secondary,.btn-ghost{background:var(--bg-card);color:var(--text-secondary);border:none;border-radius:var(--radius-btn);padding:10px 24px;font-family:Inter;font-weight:500;font-size:13px;box-shadow:var(--shadow-btn);cursor:pointer;transition:all 0.25s}
.btn-secondary:hover,.btn-ghost:hover{box-shadow:var(--shadow-inset);color:var(--accent)}
.btn-ghost.active{background:var(--bg-card);box-shadow:var(--shadow-inset);color:var(--accent)}

.btn-sm{padding:6px 14px;font-size:11px}
.btn-group{display:flex;gap:8px;flex-wrap:wrap}

input,textarea,select{background:var(--bg-card);border:none;border-radius:12px;box-shadow:var(--shadow-inset);padding:10px 16px;color:var(--text-primary);font-family:Inter;outline:none;transition:box-shadow 0.2s}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inset), 0 0 0 2px var(--accent-dim);border:none;outline:2px solid var(--accent)}

::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--accent-dim);border-radius:50px}
::-webkit-scrollbar-thumb:hover{background:var(--accent)}

.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:24px;margin-top:24px}
.product-card{background:var(--bg-card);padding:16px;transition:box-shadow .3s;cursor:pointer;border:none;border-radius:var(--radius-card);box-shadow:var(--shadow-card)}
.product-card:hover{box-shadow:var(--shadow-card), var(--accent-glow)}
.product-card .product-image{width:100%;height:140px;background:var(--bg-secondary);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:48px;margin-bottom:16px;box-shadow:var(--shadow-inset)}
.product-card .product-name{font-size:14px;font-weight:600;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.4;font-family:var(--font-heading)}
.product-card .product-price{font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:4px;letter-spacing:-.3px;font-family:var(--font-heading)}
.product-card .product-original{font-size:11px;color:var(--text-muted);text-decoration:line-through}
.product-card .product-meta{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid rgba(170,170,170,0.15)}
.product-card .product-sales{font-size:11px;color:var(--text-secondary)}
.product-card .product-change{font-size:12px;font-weight:600}
.product-card .product-change.up{color:var(--success)}
.product-card .product-rating{display:flex;align-items:center;gap:3px;font-size:11px;color:var(--warning)}

.alert-item{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid rgba(170,170,170,0.15);cursor:pointer}
.alert-item:last-child{border-bottom:none}
.alert-item:hover{background:transparent}
.alert-item.unread{border-left:none;padding-left:0}
.alert-icon{width:32px;height:32px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;box-shadow:var(--shadow-btn);background:var(--bg-card)}
.alert-icon.explosive{color:var(--danger)}
.alert-icon.trending{color:var(--success)}
.alert-icon.opportunity{color:var(--accent)}
.alert-icon.warning{color:var(--warning)}
.alert-body{flex:1}
.alert-title{font-size:13px;font-weight:600;margin-bottom:2px;font-family:var(--font-heading)}
.alert-desc{font-size:12px;color:var(--text-secondary);line-height:1.5}
.alert-time{font-size:11px;color:var(--text-muted);margin-top:4px}

.marketplace-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.mp-pill{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:50px;border:none;background:var(--bg-card);box-shadow:var(--shadow-btn);cursor:pointer;font-size:11px;font-weight:600;transition:all .25s;color:var(--text-secondary);font-family:var(--font-heading);letter-spacing:0.08em;text-transform:uppercase}
.mp-pill:hover{color:var(--accent);box-shadow:var(--shadow-inset)}
.mp-pill.active{background:var(--bg-card);color:var(--accent);box-shadow:var(--shadow-inset)}
.mp-pill .mp-dot{width:6px;height:6px;border-radius:50%}

.sparkline{display:inline-block;vertical-align:middle}
.chart-container{position:relative;width:100%}
.chart-container canvas{width:100%!important}
.growth-item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(170,170,170,0.15)}
.growth-item:last-child{border-bottom:none}
.growth-icon{font-size:20px;width:32px;text-align:center}
.growth-info{flex:1}
.growth-name{font-size:13px;font-weight:600;font-family:var(--font-heading)}
.growth-volume{font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:4px}
.growth-bar-wrap{flex:1;max-width:160px}
.growth-bar{height:4px;border-radius:50px;background:var(--bg-secondary);overflow:hidden;box-shadow:var(--shadow-inset)}
.growth-bar-fill{height:100%;border-radius:50px;background:var(--accent);transition:width 1s ease}
.growth-value{font-size:13px;font-weight:600;min-width:60px;text-align:right;font-family:var(--font-heading)}

.mp-detail-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:24px;margin-bottom:32px}
.mp-detail-card{background:var(--bg-card);border-radius:var(--radius-card);box-shadow:var(--shadow-card);padding:24px;text-align:center;cursor:pointer;transition:all .3s}
.mp-detail-card:hover{box-shadow:var(--shadow-card), var(--accent-glow);color:var(--accent)}
.mp-detail-card .mp-icon{font-size:28px;margin-bottom:12px}
.mp-detail-card .mp-name{font-size:14px;font-weight:600;margin-bottom:4px;font-family:var(--font-heading)}
.mp-detail-card .mp-stat{font-size:12px;color:var(--text-secondary)}

.ai-insight{border-radius:var(--radius-card);box-shadow:var(--shadow-card);padding:24px;margin-bottom:24px;background:var(--bg-card)}
.ai-insight-header{display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:14px;font-weight:600;color:var(--accent);font-family:var(--font-heading)}
.ai-insight p{font-size:13px;color:var(--text-secondary);line-height:1.7}
.ai-insight ul{margin:12px 0 0 16px}
.ai-insight li{font-size:13px;color:var(--text-secondary);margin-bottom:6px;line-height:1.5}

.period-selector{display:flex;gap:4px}
.period-btn{padding:8px 16px;border-radius:50px;border:none;background:var(--bg-card);box-shadow:var(--shadow-btn);font-size:11px;font-weight:600;cursor:pointer;color:var(--text-secondary);transition:all .25s;font-family:var(--font-heading);letter-spacing:0.08em;text-transform:uppercase}
.period-btn.active{background:var(--bg-card);color:var(--accent);box-shadow:var(--shadow-inset)}
.period-btn:hover:not(.active){color:var(--text-primary);box-shadow:var(--shadow-inset)}

.search-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:flex-start;justify-content:center;padding-top:20vh}
.search-modal-overlay.hidden{display:none}
.search-modal{background:var(--bg-card);border-radius:var(--radius-card);box-shadow:var(--shadow-card), var(--accent-glow);width:520px;max-height:420px;overflow:hidden}
.search-modal input{width:100%;padding:16px 20px;border:none;background:var(--bg-secondary);font-size:15px;color:var(--text-primary);outline:none;font-family:var(--font-body);border-radius:0;box-shadow:none;border-bottom:1px solid rgba(170,170,170,0.15)}
.search-results{max-height:340px;overflow-y:auto;padding:8px}
.search-result-item{padding:12px 16px;border-radius:12px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:background .2s;font-size:14px}
.search-result-item:hover{background:var(--bg-secondary);color:var(--accent)}
.search-result-type{font-size:10px;color:var(--text-muted);margin-left:auto;letter-spacing:0.08em;text-transform:uppercase;font-weight:700}

@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.animate-in{animation:fadeIn .3s ease forwards}
.stagger-1{animation-delay:.05s;opacity:0}
.stagger-2{animation-delay:.1s;opacity:0}
.stagger-3{animation-delay:.15s;opacity:0}
.stagger-4{animation-delay:.2s;opacity:0}
`;

fs.writeFileSync('src/style.css', cssContent);

// Fix styles-extra.css
let extraCss = fs.readFileSync('src/components/styles-extra.css', 'utf8');

extraCss = extraCss.replace(/\.creative-card\{[\s\S]*?\}/, '.creative-card{background:var(--bg-card);border:none;border-radius:var(--radius-card);overflow:hidden;transition:all .3s;cursor:pointer;box-shadow:var(--shadow-card)}');
extraCss = extraCss.replace(/\.creative-card:hover\{[\s\S]*?\}/, '.creative-card:hover{box-shadow:var(--shadow-card), var(--accent-glow)}');

extraCss = extraCss.replace(/\.hype-hero\{[\s\S]*?\}/, '.hype-hero{border:none;border-radius:var(--radius-card);padding:32px;margin-bottom:32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;background:var(--bg-card);box-shadow:var(--shadow-card)}');
extraCss = extraCss.replace(/\.nicho-hero\{[\s\S]*?\}/, '.nicho-hero{border:none;border-radius:var(--radius-card);padding:32px;margin-bottom:32px;display:flex;align-items:center;gap:20px;background:var(--bg-card);box-shadow:var(--shadow-card)}');

extraCss = extraCss.replace(/\.hype-card\{[\s\S]*?\}/, '.hype-card{background:var(--bg-card);border:none;transition:all .3s;cursor:pointer;overflow:hidden;border-radius:var(--radius-card);box-shadow:var(--shadow-card)}');
extraCss = extraCss.replace(/\.hype-card:hover\{[\s\S]*?\}/, '.hype-card:hover{box-shadow:var(--shadow-card), var(--accent-glow)}');

extraCss = extraCss.replace(/\.nicho-insight-card\{[\s\S]*?\}/, '.nicho-insight-card{background:var(--bg-card);border:none;border-radius:var(--radius-card);padding:24px;text-align:center;transition:all .3s;box-shadow:var(--shadow-card)}');
extraCss = extraCss.replace(/\.nicho-insight-card:hover\{[\s\S]*?\}/, '.nicho-insight-card:hover{box-shadow:var(--shadow-card), var(--accent-glow)}');

extraCss = extraCss.replace(/\.nicho-opportunity-card\{[\s\S]*?\}/, '.nicho-opportunity-card{background:var(--bg-card);border:none;border-radius:var(--radius-card);padding:20px;transition:all .3s;box-shadow:var(--shadow-card)}');
extraCss = extraCss.replace(/\.nicho-opportunity-card:hover\{[\s\S]*?\}/, '.nicho-opportunity-card:hover{box-shadow:var(--shadow-card), var(--accent-glow)}');

extraCss = extraCss.replace(/\.hype-pill\{[\s\S]*?\}/, '.hype-pill{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:50px;border:none;background:var(--bg-card);box-shadow:var(--shadow-btn);cursor:pointer;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:all .25s;color:var(--text-secondary);font-family:var(--font-heading)}');
extraCss = extraCss.replace(/\.hype-pill:hover\{[\s\S]*?\}/, '.hype-pill:hover{box-shadow:var(--shadow-inset);color:var(--accent)}');
extraCss = extraCss.replace(/\.hype-pill\.active\{[\s\S]*?\}/, '.hype-pill.active{box-shadow:var(--shadow-inset);color:var(--accent);background:var(--bg-card)}');

// Removing specific border declarations from extraCss
extraCss = extraCss.replace(/border: 1px solid [^;]+;/g, 'border: none;');
extraCss = extraCss.replace(/border:\.5px solid [^;]+;/g, 'border: none;');

fs.writeFileSync('src/components/styles-extra.css', extraCss);
