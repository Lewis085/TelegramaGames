import { toggleTheme, getTheme } from '../utils/theme.js';
import { getUnreadAlerts } from '../data/alerts.js';
import { navigate } from '../utils/router.js';

const pageTitles = {
  '/': { title: 'Leads overview', subtitle: '' },
  '/keywords': { title: 'Keywords Explorer', subtitle: '' },
  '/trending': { title: 'Trending Products', subtitle: '' },
  '/creatives': { title: 'Viral Creatives', subtitle: '' },
  '/analysis': { title: 'Market Analysis', subtitle: '' },
  '/marketplaces': { title: 'Marketplaces', subtitle: '' },
  '/alerts': { title: 'Alerts', subtitle: '' },
  '/nicho': { title: 'Niche Comparator', subtitle: '' },
  '/oportunidade': { title: 'Opportunities', subtitle: '' },
  '/hype': { title: 'Hype Radar', subtitle: '' },
  '/nichos': { title: 'Niche Explorer', subtitle: '' },
  '/assistente': { title: 'TrendBot AI', subtitle: '' },
};

const topNav = [
  { label: 'Dashboard', route: '/' },
  { label: 'Trending', route: '/trending' },
  { label: 'Hype Radar', route: '/hype' },
  { label: 'Keywords', route: '/keywords' },
  { label: 'Creatives', route: '/creatives' }
];

export function renderHeader(route = '/') {
  const header = document.getElementById('header');
  const info = pageTitles[route] || pageTitles['/'];
  const unread = getUnreadAlerts().length;
  const isDark = getTheme() === 'dark';

  header.innerHTML = `
    <div class="header-top-row">
      <div class="header-logo" onclick="window.navigate('/')" style="cursor:pointer;">
        <div class="logo-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7"/></svg>
        </div>
      </div>
      
      <div class="header-nav-pills">
        ${topNav.map(item => `
          <button class="nav-pill ${route === item.route ? 'active' : ''}" data-route="${item.route}">
            ${item.label}
          </button>
        `).join('')}
      </div>

      <div class="header-actions-right">
        <button class="icon-circle-btn" id="theme-toggle" title="Toggle Theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </button>
        <button class="icon-circle-btn" title="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          ${unread > 0 ? `<span class="badge-dot"></span>` : ''}
        </button>
        <div class="user-avatar-circle">
          <img src="https://image.pollinations.ai/prompt/portrait%20of%20a%20young%20man%20smiling%20professional%20avatar?width=100&height=100&nologo=true" alt="User">
        </div>
      </div>
    </div>
    
    <div class="header-bottom-row">
      <div class="header-title">
        <h1>${info.title}</h1>
        <button class="date-picker-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Jun. 6, 2026
        </button>
      </div>
      <div class="platform-selector">
        <span class="platform-label">Choose platform:</span>
        <button class="platform-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          Meta
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    </div>
  `;
  document.getElementById('theme-toggle').addEventListener('click', () => {
    toggleTheme();
    window.dispatchEvent(new Event('themechange'));
  });

  const pills = header.querySelectorAll('.nav-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(pill.dataset.route);
    });
  });
}
