import { formatNumber, formatPercent } from '../utils/helpers.js';

export function renderKPICards(container, kpis) {
  container.innerHTML = kpis.map((kpi, i) => {
    const changeClass = kpi.change > 0 ? 'up' : 'down';
    const arrow = kpi.change > 0 ? '↑' : '↓';
    return `
      <div class="kpi-card animate-in stagger-${i + 1}">
        <div class="kpi-value">${typeof kpi.value === 'number' ? formatNumber(kpi.value) : kpi.value}</div>
        <div class="kpi-label">${kpi.label}</div>
        <div class="kpi-change ${changeClass}">
          ${arrow} ${formatPercent(Math.abs(kpi.change))} vs mês anterior
        </div>
      </div>
    `;
  }).join('');
}
