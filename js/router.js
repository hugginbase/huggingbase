/** Minimal hash-based SPA router */
const Router = {
  routes: [],
  current: null,

  register(pattern, handler) {
    const keys = [];
    const regex = new RegExp(
      '^' +
        pattern
          .replace(/:([^/]+)/g, (_, key) => {
            keys.push(key);
            return '([^/]+)';
          })
          .replace(/\//g, '\\/') +
        '$'
    );
    this.routes.push({ regex, keys, handler });
  },

  navigate(path) {
    if (path.startsWith('/')) path = path.slice(1);
    window.location.hash = '#' + (path || '/');
  },

  resolve() {
    let path = window.location.hash.slice(1) || '/';
    if (!path.startsWith('/')) path = '/' + path;

    const queryIndex = path.indexOf('?');
    let query = {};
    if (queryIndex !== -1) {
      const params = new URLSearchParams(path.slice(queryIndex + 1));
      params.forEach((v, k) => (query[k] = v));
      path = path.slice(0, queryIndex);
    }

    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        const params = {};
        route.keys.forEach((key, i) => (params[key] = decodeURIComponent(match[i + 1])));
        this.current = { path, params, query };
        route.handler(params, query);
        return;
      }
    }

    this.current = { path: '/404', params: {}, query: {} };
    App.render404();
  },

  init() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },
};
