/** Main application controller */
const App = {
  user: null,
  favorites: new Set(),

  init() {
    this.loadState();
    this.registerRoutes();
    Router.init();
    this.bindGlobalEvents();
    this.updateAuthUI();
  },

  loadState() {
    try {
      const saved = localStorage.getItem('hb_user');
      if (saved) this.user = JSON.parse(saved);
      const favs = localStorage.getItem('hb_favorites');
      if (favs) this.favorites = new Set(JSON.parse(favs));
    } catch (_) {}
  },

  saveState() {
    if (this.user) localStorage.setItem('hb_user', JSON.stringify(this.user));
    else localStorage.removeItem('hb_user');
    localStorage.setItem('hb_favorites', JSON.stringify([...this.favorites]));
  },

  registerRoutes() {
    Router.register('/', () => this.render(Pages.home()));
    Router.register('/models', (_, q) => this.render(Pages.models(null, q)));
    Router.register('/datasets', (_, q) => this.render(Pages.datasets(null, q)));
    Router.register('/spaces', (_, q) => this.render(Pages.spaces(null, q)));
    Router.register('/models/:org/:name', (p) => this.render(Pages.modelDetail(p.org, p.name)));
    Router.register('/datasets/:org/:name', (p) => this.render(Pages.datasetDetail(p.org, p.name)));
    Router.register('/spaces/:org/:name', (p) => this.render(Pages.spaceDetail(p.org, p.name)));
    Router.register('/organizations', () => this.render(Pages.organizations()));
    Router.register('/organizations/:org', (p) => this.render(Pages.organizationDetail(p.org)));
    Router.register('/blog', () => this.render(Pages.blog()));
    Router.register('/blog/:slug', (p) => this.render(Pages.blogPost(p.slug)));
    Router.register('/collections', () => this.render(Pages.collections()));
    Router.register('/collections/:id', (p) => this.render(Pages.collectionDetail(p.id)));
    Router.register('/papers', () => this.render(Pages.papers()));
    Router.register('/leaderboard', () => this.render(Pages.leaderboard()));
    Router.register('/docs', () => this.render(Pages.docs()));
    Router.register('/pricing', () => this.render(Pages.pricing()));
    Router.register('/solutions', () => this.render(Pages.solutions()));
    Router.register('/search', (_, q) => this.render(Pages.search(q.q || '')));
  },

  render(html) {
    const main = document.getElementById('app-content');
    main.innerHTML = html;
    main.scrollTop = 0;
    window.scrollTo(0, 0);
    this.bindPageEvents();
    this.updateLikeButtons();
  },

  render404() {
    this.render(Pages.notFound());
  },

  bindGlobalEvents() {
    document.getElementById('search-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) Router.navigate('/search?q=' + encodeURIComponent(q));
      }
    });

    document.getElementById('search-modal-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) {
          this.closeSearchModal();
          Router.navigate('/search?q=' + encodeURIComponent(q));
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearchModal();
      }
      if (e.key === 'Escape') {
        this.closeSearchModal();
        this.closeAuthModal();
        this.closeMobileNav();
      }
    });

    document.getElementById('search-trigger').addEventListener('click', () => this.openSearchModal());
    document.getElementById('search-input').addEventListener('focus', () => this.openSearchModal());
    document.getElementById('search-modal-backdrop').addEventListener('click', () => this.closeSearchModal());

    document.getElementById('btn-signin').addEventListener('click', (e) => {
      e.preventDefault();
      this.openAuthModal('signin');
    });
    document.getElementById('btn-signup').addEventListener('click', (e) => {
      e.preventDefault();
      this.openAuthModal('signup');
    });
    document.getElementById('auth-modal-close').addEventListener('click', () => this.closeAuthModal());
    document.getElementById('auth-modal-backdrop').addEventListener('click', () => this.closeAuthModal());

    document.getElementById('auth-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const mode = document.getElementById('auth-mode').value;
      const email = document.getElementById('auth-email').value.trim();
      const name = document.getElementById('auth-name').value.trim();
      if (!email) return;
      this.user = { email, name: name || email.split('@')[0], joined: new Date().toISOString() };
      this.saveState();
      this.updateAuthUI();
      this.closeAuthModal();
      this.toast(mode === 'signup' ? 'Welcome to HuggingBase! 🍑' : 'Signed in successfully!');
    });

    document.getElementById('auth-switch').addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.getElementById('auth-mode').value;
      this.setAuthMode(current === 'signin' ? 'signup' : 'signin');
    });

    document.getElementById('btn-logout').addEventListener('click', (e) => {
      e.preventDefault();
      this.user = null;
      this.saveState();
      this.updateAuthUI();
      this.toast('Signed out.');
    });

    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
      document.getElementById('mobile-nav').classList.toggle('open');
    });
    document.getElementById('mobile-nav-close').addEventListener('click', () => this.closeMobileNav());
    document.getElementById('mobile-nav').addEventListener('click', (e) => {
      if (e.target.id === 'mobile-nav') this.closeMobileNav();
    });

    document.querySelectorAll('.mobile-nav a').forEach((a) => {
      a.addEventListener('click', () => this.closeMobileNav());
    });
  },

  bindPageEvents() {
    document.querySelectorAll('[data-nav]').forEach((el) => {
      el.addEventListener('click', () => Router.navigate(el.dataset.nav));
    });

    document.querySelectorAll('[data-auth]').forEach((el) => {
      el.addEventListener('click', () => this.openAuthModal(el.dataset.auth));
    });

    document.querySelectorAll('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.copy).then(() => this.toast('Copied to clipboard!'));
      });
    });

    document.querySelectorAll('[data-like]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.like;
        if (this.favorites.has(id)) {
          this.favorites.delete(id);
          this.toast('Removed from favorites');
        } else {
          this.favorites.add(id);
          this.toast('Added to favorites 🍑');
        }
        this.saveState();
        this.updateLikeButtons();
      });
    });

    document.querySelectorAll('[data-follow-org]').forEach((btn) => {
      btn.addEventListener('click', () => this.toast('Following organization! 🍑'));
    });

    document.querySelectorAll('[data-download]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.toast('Download started... (just kidding, this is a parody site)');
      });
    });

    const filter = document.getElementById('browse-filter');
    const sort = document.getElementById('browse-sort');
    if (filter && sort) {
      const update = () => this.filterBrowse(filter.value, sort.value);
      filter.addEventListener('input', update);
      sort.addEventListener('change', update);
    }

    document.querySelectorAll('.doc-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = link.dataset.doc;
        const doc = HB_DATA.docs.find((d) => d.slug === slug);
        if (!doc) return;
        document.querySelectorAll('.doc-link').forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
        document.getElementById('docs-content').innerHTML = `
          <h1>${doc.title}</h1>
          <p>${doc.content}</p>
          ${slug === 'inference' ? '<div class="docs-code"><pre><code>curl https://api.huggingbase.com/models/meta-glute/llama-3-butt-optimized \\\n  -H "Authorization: Bearer hf_xxxxxxxx"</code></pre></div>' : ''}
          ${slug === 'cluster' ? '<p>Our cluster nodes feature 8× A100 GPUs with 640GB combined VRAM — enough to fine-tune even the largest cheek-models.</p>' : ''}
        `;
      });
    });

    this.initDemos();
  },

  filterBrowse(query, sortBy) {
    const grid = document.getElementById('browse-grid');
    if (!grid) return;
    const type = grid.dataset.type;
    const taskFilter = grid.dataset.task || '';
    let items = [...HB_DATA[type]];
    if (taskFilter) items = items.filter((i) => (i.task || i.sdk) === taskFilter);

    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (i) => i.id.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'likes') items.sort((a, b) => b.likes - a.likes);
    else if (sortBy === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'updated') items.reverse();

    grid.innerHTML = items.map((item) => Pages.card(item, type)).join('');
  },

  initDemos() {
    this.initErgonomicDemo();
    this.initCheekCheckDemo();
    this.initFabricDemo();
    this.initDeskDemo();
    this.bindRangeInputs();
  },

  bindRangeInputs() {
    document.querySelectorAll('input[type="range"]').forEach((input) => {
      const valEl = document.getElementById(input.id + '-val');
      if (!valEl) return;
      const update = () => {
        const suffix = input.id.includes('load') ? ' kg' : input.id.includes('hours') ? ' hrs' : '';
        valEl.textContent = input.value + suffix;
      };
      input.addEventListener('input', update);
      update();
    });
  },

  initErgonomicDemo() {
    const btn = document.getElementById('calc-ergonomic');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const hours = +document.getElementById('sit-hours').value;
      const quality = +document.getElementById('chair-quality').value;
      const breaks = +document.getElementById('breaks').value;
      const base = 100 - hours * 4 + quality * 5 + breaks * 3;
      const score = Math.max(10, Math.min(99, base + Math.floor(Math.random() * 10)));
      const grade = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement';
      const recs = [];
      if (hours > 8) recs.push('Consider a standing desk converter');
      if (quality < 5) recs.push('Upgrade to an ergonomic chair with lumbar support');
      if (breaks < 3) recs.push('Take a 5-minute walk every hour');
      document.getElementById('ergonomic-result').innerHTML = `
        <div class="result-score">Support Score: <strong>${score}/100</strong> (${grade})</div>
        ${recs.length ? '<ul>' + recs.map((r) => `<li>${r}</li>`).join('') + '</ul>' : '<p>Your setup is well optimized! Keep it up.</p>'}`;
    });
  },

  initCheekCheckDemo() {
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('cheek-upload');
    const btn = document.getElementById('analyze-cheeks');
    if (!zone) return;

    const handleFile = (file) => {
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const canvas = document.getElementById('cheek-canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          canvas.width = Math.min(img.width, 400);
          canvas.height = (img.height / img.width) * canvas.width;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.classList.remove('hidden');
          document.getElementById('upload-placeholder').classList.add('hidden');
          btn.disabled = false;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    zone.addEventListener('click', () => input.click());
    input.addEventListener('change', () => handleFile(input.files[0]));
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      handleFile(e.dataTransfer.files[0]);
    });

    btn.addEventListener('click', () => {
      btn.disabled = true;
      btn.textContent = 'Analyzing...';
      setTimeout(() => {
        const metrics = {
          symmetry: (85 + Math.random() * 14).toFixed(1),
          density: (70 + Math.random() * 25).toFixed(1),
          posture: (60 + Math.random() * 35).toFixed(1),
          confidence: (92 + Math.random() * 7).toFixed(1),
        };
        document.getElementById('cheek-result').innerHTML = `
          <div class="metrics-grid">
            <div class="metric"><span>Symmetry</span><strong>${metrics.symmetry}%</strong></div>
            <div class="metric"><span>Density</span><strong>${metrics.density}%</strong></div>
            <div class="metric"><span>Posture Index</span><strong>${metrics.posture}%</strong></div>
            <div class="metric"><span>Confidence</span><strong>${metrics.confidence}%</strong></div>
          </div>
          <p class="result-note">Analysis complete. Results are for entertainment purposes only.</p>`;
        btn.textContent = 'Re-analyze';
        btn.disabled = false;
      }, 1500);
    });
  },

  initFabricDemo() {
    const btn = document.getElementById('simulate-fabric');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const type = document.getElementById('fabric-type').value;
      const load = +document.getElementById('fabric-load').value;
      const elasticity = { denim: 0.3, stretch: 0.7, cotton: 0.5, spandex: 0.9 }[type];
      const stretch = Math.min(100, load * elasticity * (0.8 + Math.random() * 0.4));
      const bar = document.getElementById('fabric-bar');
      bar.style.width = stretch + '%';
      bar.style.background = stretch > 70 ? '#ef4444' : stretch > 40 ? '#facc15' : '#22c55e';
      document.getElementById('fabric-result').innerHTML = `
        <p>Stretch: <strong>${stretch.toFixed(1)}%</strong> — ${stretch > 70 ? '⚠️ Critical tension!' : stretch > 40 ? 'Moderate stretch' : 'Within safe limits'}</p>`;
    });
  },

  initDeskDemo() {
    const btn = document.getElementById('optimize-desk');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const monitor = document.getElementById('monitor-height').value;
      const chair = document.getElementById('chair-type').value;
      const clutter = +document.getElementById('clutter').value;
      const recs = [];
      if (monitor === 'low') recs.push('Raise your monitor so the top is at eye level');
      if (monitor === 'high') recs.push('Lower your monitor slightly to reduce neck strain');
      if (chair === 'ball') recs.push('Consider switching to a proper ergonomic chair for long sessions');
      if (chair === 'gaming') recs.push('Adjust lumbar support — gaming chairs often lack proper ergonomics');
      if (clutter > 7) recs.push('Declutter your desk — a clean workspace improves focus and posture');
      if (clutter <= 3) recs.push('Great desk organization! Maintain this minimal setup.');
      recs.push('Position your keyboard so elbows are at 90°');
      recs.push('Keep feet flat on the floor or use a footrest');
      document.getElementById('desk-result').innerHTML = `
        <h4>Recommendations</h4>
        <ul>${recs.map((r) => `<li>${r}</li>`).join('')}</ul>`;
    });
  },

  updateLikeButtons() {
    document.querySelectorAll('[data-like]').forEach((btn) => {
      btn.classList.toggle('liked', this.favorites.has(btn.dataset.like));
    });
  },

  updateAuthUI() {
    const signedOut = document.getElementById('auth-signed-out');
    const signedIn = document.getElementById('auth-signed-in');
    if (this.user) {
      signedOut.classList.add('hidden');
      signedIn.classList.remove('hidden');
      document.getElementById('user-name').textContent = this.user.name;
      document.getElementById('user-avatar').textContent = this.user.name[0].toUpperCase();
    } else {
      signedOut.classList.remove('hidden');
      signedIn.classList.add('hidden');
    }
  },

  openSearchModal() {
    document.getElementById('search-modal').classList.add('open');
    document.getElementById('search-modal-input').focus();
  },

  closeSearchModal() {
    document.getElementById('search-modal').classList.remove('open');
  },

  openAuthModal(mode) {
    this.setAuthMode(mode);
    document.getElementById('auth-modal').classList.add('open');
    document.getElementById('auth-email').focus();
  },

  closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('open');
  },

  closeMobileNav() {
    document.getElementById('mobile-nav').classList.remove('open');
  },

  setAuthMode(mode) {
    document.getElementById('auth-mode').value = mode;
    document.getElementById('auth-title').textContent = mode === 'signup' ? 'Create your account' : 'Sign in';
    document.getElementById('auth-submit').textContent = mode === 'signup' ? 'Sign Up' : 'Sign In';
    document.getElementById('auth-name-group').classList.toggle('hidden', mode === 'signin');
    document.getElementById('auth-switch-text').textContent =
      mode === 'signup' ? 'Already have an account?' : "Don't have an account?";
    document.getElementById('auth-switch').textContent = mode === 'signup' ? 'Sign in' : 'Sign up';
  },

  toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
