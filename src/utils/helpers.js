export function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export function formatCurrency(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatPercent(v) {
  const sign = v > 0 ? '+' : '';
  return sign + v.toFixed(1) + '%';
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

export function animateValue(el, start, end, duration = 1000) {
  const range = end - start;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + range * eased);
    el.textContent = formatNumber(current);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export function createElement(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

export function getFallbackImage() {
  return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%232a2a35"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="%23666" text-anchor="middle" dy=".3em">Sem Imagem</text></svg>';
}

export function renderImage(url, alt, className = '') {
  // Enforces valid URLs, lazy loading, and error fallbacks
  const safeUrl = url || getFallbackImage();
  const fallback = getFallbackImage().replace(/"/g, '&quot;');
  return `<img src="${safeUrl}" alt="${alt}" class="${className}" loading="lazy" referrerpolicy="no-referrer" style="object-fit:cover;width:100%;height:100%;" onerror="this.onerror=null;this.src='${fallback}'"/>`;
}
