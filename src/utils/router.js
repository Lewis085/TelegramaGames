const routes = {};
let currentRoute = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function initRouter() {
  function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    const params = {};
    const queryString = hash.split('?')[1];
    if (queryString) {
      queryString.split('&').forEach(p => {
        const [k, v] = p.split('=');
        params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }
    if (routes[path]) {
      currentRoute = path;
      routes[path](params);
      updateActiveNav(path);
    } else if (routes['/']) {
      currentRoute = '/';
      routes['/'](params);
      updateActiveNav('/');
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function updateActiveNav(path) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.route === path);
  });
}

export function getCurrentRoute() {
  return currentRoute;
}
