import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { getTheme } from '../utils/theme.js';

export function createLineChart(canvas, labels, datasets, options = {}) {
  const isDark = getTheme() === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return new Chart(canvas, {
    type: 'line',
    data: { labels, datasets: datasets.map(ds => ({
      ...ds,
      tension: 0.4,
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: ds.borderColor,
      fill: ds.fill !== undefined ? ds.fill : false,
      ...ds,
    }))},
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: datasets.length > 1, labels: { color: textColor, usePointStyle: true, padding: 16, font: { family: 'Inter', size: 12 } } },
        tooltip: {
          backgroundColor: isDark ? '#1e293b' : '#fff',
          titleColor: isDark ? '#f1f5f9' : '#0f172a',
          bodyColor: isDark ? '#94a3b8' : '#64748b',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: 'Inter', weight: '600' },
          bodyFont: { family: 'Inter' },
        },
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Inter', size: 12 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Inter', size: 12 } }, ...(options.yBeginAtZero ? { beginAtZero: true } : {}) },
      },
      ...options,
    }
  });
}

export function createBarChart(canvas, labels, datasets, options = {}) {
  const isDark = getTheme() === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return new Chart(canvas, {
    type: 'bar',
    data: { labels, datasets: datasets.map(ds => ({ borderRadius: 6, borderSkipped: false, ...ds })) },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: datasets.length > 1, labels: { color: textColor, usePointStyle: true, padding: 16, font: { family: 'Inter', size: 12 } } },
        tooltip: {
          backgroundColor: isDark ? '#1e293b' : '#fff',
          titleColor: isDark ? '#f1f5f9' : '#0f172a',
          bodyColor: isDark ? '#94a3b8' : '#64748b',
          borderColor: isDark ? '#334155' : '#e2e8f0',
          borderWidth: 1, padding: 12, cornerRadius: 8,
          titleFont: { family: 'Inter', weight: '600' }, bodyFont: { family: 'Inter' },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'Inter', size: 12 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Inter', size: 12 } }, beginAtZero: true },
      },
      ...options,
    }
  });
}

export function createDoughnutChart(canvas, labels, data, colors) {
  const isDark = getTheme() === 'dark';
  return new Chart(canvas, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { position: 'bottom', labels: { color: isDark ? '#94a3b8' : '#64748b', usePointStyle: true, padding: 14, font: { family: 'Inter', size: 12 } } },
      },
    }
  });
}

export function destroyChart(chart) {
  if (chart) chart.destroy();
}
