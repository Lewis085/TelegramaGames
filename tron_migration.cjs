const fs = require('fs');

let css = fs.readFileSync('src/style.css', 'utf8');

// 1. Replace variables
css = css.replace(/:root,[\s\S]*?\}[\s\S]*?\[data-theme="light"\]\{[\s\S]*?\}/m, `:root,
[data-theme="dark"],
[data-theme="light"] {
  --bg-primary: #050b0e;
  --bg-secondary: #080f14;
  --bg-card: #0a1520;
  --bg-hover: #0d1c2a;
  --border: #03e9f420;
  --border-active: #03e9f4;
  --border-solid: #03e9f440;
  --border-strong: #03e9f480;
  --text-primary: #e0f7fa;
  --text-secondary: #4a9aaa;
  --text-muted: #2a6070;
  --accent: #03e9f4;
  --accent-dim: #03e9f440;
  --accent-glow: 0 0 8px #03e9f4, 0 0 25px #03e9f440;
  --success: #00ff88;
  --danger: #ff3355;
  --warning: #ffaa00;

  --accent-soft: var(--accent-dim);
  --accent-hover: var(--accent);
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
  --radius: 8px;
  --radius-sm: 4px;
  --radius-lg: 10px;
  --radius-md: 6px;
  --radius-xl: 10px;
  --header-height: var(--header-h);
  --gradient: var(--accent);
}`);

// 2. Nav Item
css = css.replace(/\.nav-item\{[\s\S]*?\}/, '.nav-item{display:flex;align-items:center;gap:8px;padding:16px 32px;color:var(--text-secondary);cursor:pointer;transition:background-color .3s;font-size:15px;font-weight:400;text-decoration:none;margin-bottom:0;font-family:var(--font-heading);border-left:2px solid transparent}');
css = css.replace(/\.nav-item\.active\{[\s\S]*?\}/, '.nav-item.active{background-color:var(--bg-hover);color:var(--accent);font-weight:500;border-left:2px solid var(--accent);box-shadow:inset 0 0 20px #03e9f410}');

// 3. KPI
css = css.replace(/\.kpi-card \.kpi-value\{[\s\S]*?\}/, '.kpi-card .kpi-value{font-size:42px;font-weight:700;letter-spacing:-.5px;margin-bottom:2px;font-family:var(--font-heading);color:var(--accent);text-shadow:0 0 20px #03e9f460}');
css = css.replace(/\.kpi-card \.kpi-label\{[\s\S]*?\}/, '.kpi-card .kpi-label{font-size:11px;color:var(--text-muted);font-weight:400;text-transform:uppercase;letter-spacing:0.1em;font-family:var(--font-heading)}');

// 4. Card
css = css.replace(/\.card\{[\s\S]*?\}/, '.card{background-color:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:24px;box-shadow:none;transition:border-color .3s,box-shadow .3s}');
css = css.replace(/\.card:hover\{[\s\S]*?\}/, '.card:hover{border-color:var(--accent);box-shadow:var(--accent-glow)}');

// 5. Badges
css = css.replace(/\.badge\{[\s\S]*?\}/, '.badge{display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:var(--accent-dim);color:var(--accent);border:1px solid var(--accent)}');
css = css.replace(/\.badge-marketplace\{[\s\S]*?\}/, '.badge-marketplace{font-size:10px;padding:3px 8px;border-radius:4px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:var(--accent-dim);color:var(--accent);border:1px solid var(--accent)}');
css = css.replace(/\.badge-up\{[\s\S]*?\}/, '.badge-up{background:var(--success-bg);color:var(--success);border-color:var(--success)}');
css = css.replace(/\.badge-down\{[\s\S]*?\}/, '.badge-down{background:var(--danger-bg);color:var(--danger);border-color:var(--danger)}');
css = css.replace(/\.badge-stable\{[\s\S]*?\}/, '.badge-stable{background:var(--warning-bg);color:var(--warning);border-color:var(--warning)}');

// 6. Buttons
css = css.replace(/\.btn\{[\s\S]*?\}/, '.btn{display:inline-flex;align-items:center;gap:6px;padding:10px 24px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:all .3s;font-family:var(--font-heading);letter-spacing:.08em;text-transform:uppercase;background:transparent}');
css = css.replace(/\.btn-primary\{[\s\S]*?\}/, '.btn-primary{background:transparent;color:var(--accent);border:1px solid var(--accent)}');
css = css.replace(/\.btn-primary:hover\{[\s\S]*?\}/, '.btn-primary:hover{background:var(--accent);color:#050b0e;box-shadow:var(--accent-glow)}');
css = css.replace(/\.btn-secondary,\.btn-ghost\{[\s\S]*?\}/, '.btn-secondary,.btn-ghost{background:transparent;color:var(--text-secondary);border:1px solid var(--border)}');
css = css.replace(/\.btn-secondary:hover,\.btn-ghost:hover\{[\s\S]*?\}/, '.btn-secondary:hover,.btn-ghost:hover{border-color:var(--accent);color:var(--accent)}');
// remove btn:active
css = css.replace(/\.btn:active\{[\s\S]*?\}/, '');

// 7. Inputs
css += `
input,textarea,select{background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;color:var(--text-primary);padding:8px 16px;outline:none;transition:all .3s;font-family:var(--font-body)}
input:focus,textarea:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent-dim)}
`;

// 8. Scrollbar
css = css.replace(/::-webkit-scrollbar\{width:6px\}/, '::-webkit-scrollbar{width:4px}');
css += `
::-webkit-scrollbar-thumb{background:var(--accent-dim);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:var(--accent)}
`;

fs.writeFileSync('src/style.css', css);
