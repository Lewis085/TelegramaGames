const fs = require('fs');

let css = fs.readFileSync('src/components/styles-extra.css', 'utf8');

// Reset cards that had neumorphism
css = css.replace(/\.creative-card\{[\s\S]*?\}/, '.creative-card{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow:hidden;transition:border-color .3s, box-shadow .3s;cursor:pointer}');
css = css.replace(/\.creative-card:hover\{[\s\S]*?\}/, '.creative-card:hover{border-color:var(--accent);box-shadow:var(--accent-glow)}');

css = css.replace(/\.hype-hero\{[\s\S]*?\}/, '.hype-hero{border:1px solid var(--border);border-radius:8px;padding:24px 28px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;background:var(--bg-card);transition:all .3s}');
css = css.replace(/\.nicho-hero\{[\s\S]*?\}/, '.nicho-hero{border:1px solid var(--border);border-radius:8px;padding:24px 28px;margin-bottom:28px;display:flex;align-items:center;gap:14px;background:var(--bg-card);transition:all .3s}');

css = css.replace(/\.hype-card\{[\s\S]*?\}/, '.hype-card{background:var(--bg-card);border:1px solid transparent;transition:all .3s;cursor:pointer;overflow:hidden;border-radius:8px}');
// add hover for hype-card
css = css.replace(/\.hype-card:hover\{[\s\S]*?\}/, '.hype-card:hover{background:var(--bg-hover);border-color:var(--accent);box-shadow:var(--accent-glow)}');

css = css.replace(/\.nicho-insight-card\{[\s\S]*?\}/, '.nicho-insight-card{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:20px;text-align:center;transition:all .3s}');
css = css.replace(/\.nicho-insight-card:hover\{[\s\S]*?\}/, '.nicho-insight-card:hover{border-color:var(--accent);box-shadow:var(--accent-glow)}');

css = css.replace(/\.nicho-opportunity-card\{[\s\S]*?\}/, '.nicho-opportunity-card{background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:16px;transition:all .3s}');
css = css.replace(/\.nicho-opportunity-card:hover\{[\s\S]*?\}/, '.nicho-opportunity-card:hover{border-color:var(--accent);box-shadow:var(--accent-glow)}');

// Fix badges / pills
css = css.replace(/\.hype-pill\{[\s\S]*?\}/, '.hype-pill{display:flex;align-items:center;gap:6px;padding:4px 12px;border-radius:4px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:all .3s;color:var(--text-secondary);font-family:var(--font-heading)}');
css = css.replace(/\.hype-pill:hover\{[\s\S]*?\}/, '.hype-pill:hover{border-color:var(--accent);color:var(--accent)}');
css = css.replace(/\.hype-pill\.active\{[\s\S]*?\}/, '.hype-pill.active{border-color:var(--accent);background:var(--accent-dim);color:var(--accent);box-shadow:var(--accent-glow)}');

// We also need to remove --neu-shadow-btn/outer from any other places in styles-extra if they exist.

fs.writeFileSync('src/components/styles-extra.css', css);
