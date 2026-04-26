import './style.css';
import './components/styles-extra.css';
import { registerRoute, initRouter } from './utils/router.js';
import { initTheme } from './utils/theme.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderHeader } from './components/Header.js';
import { initSearchModal } from './components/SearchModal.js';
import { initProductModal } from './components/ProductModal.js';
import { renderDashboard } from './pages/Dashboard.js';
import { renderKeywords } from './pages/Keywords.js';
import { renderTrending } from './pages/Trending.js';
import { renderAnalysis } from './pages/Analysis.js';
import { renderMarketplaces } from './pages/Marketplace.js';
import { renderAlerts } from './pages/Alerts.js';
import { renderNicho } from './pages/Nicho.js';
import { renderOportunidade } from './pages/Oportunidade.js';
import { renderCreatives } from './pages/Creatives.js';
import { renderHypeRadar } from './pages/HypeRadar.js';
import { renderNichoExplorer } from './pages/NichoExplorer.js';
import { renderAssistant } from './pages/Assistant.js';
import { renderValidador } from './pages/Validador.js';
import { renderOfferKit } from './pages/OfferKit.js';
import { renderLandingGen } from './pages/LandingGen.js';
import { renderSimulador } from './pages/Simulador.js';
import { renderLovableSpy } from './pages/LovableSpy.js';

import { renderCanalCerto } from './pages/CanalCerto.js';
import { renderRadarMercado } from './pages/RadarMercado.js';

initTheme();
renderSidebar();
initSearchModal();
initProductModal();

function showPage(route, renderFn) {
  renderHeader(route);
  const content = document.getElementById('page-content');
  content.style.opacity = '0';
  content.style.transform = 'translateY(10px)';
  setTimeout(() => {
    renderFn();
    content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 50);
}

registerRoute('/', () => showPage('/', renderDashboard));
registerRoute('/keywords', () => showPage('/keywords', renderKeywords));
registerRoute('/trending', () => showPage('/trending', renderTrending));
registerRoute('/analysis', () => showPage('/analysis', renderAnalysis));
registerRoute('/marketplaces', () => showPage('/marketplaces', renderMarketplaces));
registerRoute('/alerts', () => showPage('/alerts', renderAlerts));
registerRoute('/nicho', () => showPage('/nicho', renderNicho));
registerRoute('/oportunidade', () => showPage('/oportunidade', renderOportunidade));
registerRoute('/creatives', () => showPage('/creatives', renderCreatives));
registerRoute('/hype', () => showPage('/hype', renderHypeRadar));
registerRoute('/nichos', () => showPage('/nichos', renderNichoExplorer));
registerRoute('/assistente', () => showPage('/assistente', renderAssistant));
registerRoute('/canalcerto', () => showPage('/canalcerto', renderCanalCerto));
registerRoute('/radarmercado', () => showPage('/radarmercado', renderRadarMercado));
registerRoute('/validador', () => showPage('/validador', renderValidador));
registerRoute('/offerkit', () => showPage('/offerkit', renderOfferKit));
registerRoute('/landing', () => showPage('/landing', renderLandingGen));
registerRoute('/simulador', () => showPage('/simulador', renderSimulador));
registerRoute('/lovablespy', () => showPage('/lovablespy', renderLovableSpy));

window.addEventListener('themechange', () => renderSidebar());
initRouter();
