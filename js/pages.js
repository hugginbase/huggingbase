/** Page renderers for each route */
const Pages = {
  home() {
    const cols = [
      { title: '📦 Trending Models', type: 'models', items: HB_DATA.models.slice(0, 4) },
      { title: '📊 Trending Datasets', type: 'datasets', items: HB_DATA.datasets.slice(0, 3) },
      { title: '🚀 Trending Spaces', type: 'spaces', items: HB_DATA.spaces.slice(0, 3) },
    ];

    return `
      <section class="hero-section">
        <img src="logo.png" alt="HuggingBase Mascot" class="hero-logo-large">
        <h1>The AI community building the back-end.</h1>
        <p>We're on a journey to advance and democratize gluteal parameters through open source infrastructure and active community science.</p>
        <div class="hero-actions">
          <button class="btn-primary" data-nav="/models">Explore Models</button>
          <button class="btn-secondary" data-nav="/spaces">Try a Space</button>
        </div>
      </section>
      <main class="grid-layout">
        ${cols.map((col) => `
          <div class="grid-column">
            <div class="column-header-row">
              <div class="column-header">${col.title}</div>
              <a href="#/${col.type}" class="see-all">See all →</a>
            </div>
            ${col.items.map((item) => Pages.card(item, col.type)).join('')}
          </div>
        `).join('')}
      </main>
      <section class="stats-banner">
        <div class="stat"><strong>${HB_DATA.models.length + 847}</strong><span>Models</span></div>
        <div class="stat"><strong>${HB_DATA.datasets.length + 312}</strong><span>Datasets</span></div>
        <div class="stat"><strong>${HB_DATA.spaces.length + 156}</strong><span>Spaces</span></div>
        <div class="stat"><strong>2.4M</strong><span>Community Members</span></div>
      </section>`;
  },

  card(item, type) {
    const [org, name] = item.id.split('/');
    const href = `#/${type}/${org}/${name}`;
    const meta = type === 'spaces' ? item.sdk : formatCount(item.likes);
    const metaIcon = type === 'spaces' ? '⚡' : '🍑';
    const tagClass = item.task === 'Computer Vision' || item.task === 'Tabular' ? 'tag-green' : 'tag-blue';
    const primaryTag = item.task || (item.tags && item.tags[0]) || '';
    const extraTags = (item.tags || []).filter((t) => t !== primaryTag).slice(0, 2);

    return `
      <a href="${href}" class="item-card" data-id="${item.id}">
        <div class="card-top">
          <div class="card-title"><span>${item.org}/</span>${item.name}</div>
          <div class="card-meta">${metaIcon} ${meta}</div>
        </div>
        <p class="card-desc">${item.desc}</p>
        <div class="card-tags">
          ${primaryTag ? `<span class="tag ${tagClass}">${primaryTag}</span>` : ''}
          ${extraTags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
      </a>`;
  },

  browseList(type, title, icon) {
    const items = HB_DATA[type];
    return `
      <div class="page-header">
        <h1>${icon} ${title}</h1>
        <p class="page-subtitle">${items.length} repositories available on HuggingBase</p>
      </div>
      <div class="filter-bar">
        <input type="text" class="filter-input" id="browse-filter" placeholder="Filter ${title.toLowerCase()}..." autocomplete="off">
        <select class="filter-select" id="browse-sort">
          <option value="likes">Most liked</option>
          <option value="name">Name A–Z</option>
          <option value="updated">Recently updated</option>
        </select>
      </div>
      <div class="browse-grid" id="browse-grid" data-type="${type}">
        ${items.map((item) => Pages.card(item, type)).join('')}
      </div>`;
  },

  models() {
    return Pages.browseList('models', 'Cheek-Models', '📦');
  },

  datasets() {
    return Pages.browseList('datasets', 'Asset-Sets', '📊');
  },

  spaces() {
    return Pages.browseList('spaces', 'Spaces', '🚀');
  },

  modelDetail(org, name) {
    const item = findItem('models', org, name);
    if (!item) return Pages.notFound();
    return Pages.repoDetail(item, 'models');
  },

  datasetDetail(org, name) {
    const item = findItem('datasets', org, name);
    if (!item) return Pages.notFound();
    return Pages.repoDetail(item, 'datasets');
  },

  spaceDetail(org, name) {
    const item = findItem('spaces', org, name);
    if (!item) return Pages.notFound();
    const demo = item.demo ? Pages.spaceDemo(item.demo) : '<p class="demo-placeholder">Demo loading... (just kidding, it\'s a parody)</p>';
    return `
      ${Pages.repoHeader(item, 'spaces')}
      <div class="detail-layout">
        <div class="detail-main">
          <div class="demo-container" id="space-demo">${demo}</div>
          <div class="readme-section">
            <h2>About this Space</h2>
            <p>${item.desc}</p>
            <p>Built with <strong>${item.sdk}</strong>. Running on HuggingBase free-tier CPU (probably).</p>
          </div>
        </div>
        ${Pages.repoSidebar(item, 'spaces')}
      </div>`;
  },

  repoDetail(item, type) {
    return `
      ${Pages.repoHeader(item, type)}
      <div class="detail-layout">
        <div class="detail-main">
          <div class="readme-section">
            <div class="readme-toolbar">
              <span class="readme-tab active">README</span>
            </div>
            <div class="readme-content">${Pages.markdown(item.readme)}</div>
          </div>
        </div>
        ${Pages.repoSidebar(item, type)}
      </div>`;
  },

  repoHeader(item, type) {
    const typeLabel = { models: 'Model', datasets: 'Dataset', spaces: 'Space' }[type];
    return `
      <div class="repo-header">
        <div class="repo-breadcrumb">
          <a href="#/${type}">${typeLabel}s</a>
          <span>/</span>
          <span class="repo-id">${item.org} / <strong>${item.name}</strong></span>
        </div>
        <div class="repo-actions">
          <button class="btn-icon" data-like="${item.id}" title="Like">🍑 <span class="like-count">${formatCount(item.likes)}</span></button>
          <button class="btn-outline" data-copy="${item.id}">Copy ID</button>
          ${type !== 'spaces' ? '<button class="btn-primary" data-download>Download</button>' : '<a href="#/' + type + '/' + item.org + '/' + item.name + '" class="btn-primary">Open App</a>'}
        </div>
      </div>`;
  },

  repoSidebar(item, type) {
    const rows = [];
    if (item.task) rows.push(['Task', item.task]);
    if (item.framework) rows.push(['Framework', item.framework]);
    if (item.sdk) rows.push(['SDK', item.sdk]);
    if (item.size) rows.push(['Size', item.size]);
    if (item.rows) rows.push(['Rows', item.rows]);
    if (item.downloads) rows.push(['Downloads', formatCount(item.downloads)]);
    rows.push(['Likes', formatCount(item.likes)]);
    rows.push(['Updated', item.updated]);

    return `
      <aside class="detail-sidebar">
        <h3>Repository Info</h3>
        <dl class="info-list">
          ${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}
        </dl>
        ${item.tags ? `<div class="sidebar-tags">${item.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      </aside>`;
  },

  markdown(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
      .replace(/\|(.+)\|/g, (line) => {
        if (line.includes('---')) return '';
        const cells = line.split('|').filter(Boolean).map((c) => c.trim());
        const tag = cells.every((c) => c.match(/^-+$/)) ? null : 'td';
        if (!tag) return '';
        return `<tr>${cells.map((c) => `<${tag}>${c}</${tag}>`).join('')}</tr>`;
      })
      .replace(/(<tr>.*<\/tr>\n?)+/g, (m) => `<table>${m}</table>`)
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, (line) => {
        if (line.startsWith('<')) return line;
        return line;
      });
  },

  spaceDemo(type) {
    const demos = {
      ergonomic: `
        <div class="demo-app ergonomic-demo">
          <h3>🪑 Ergonomic Calculator</h3>
          <p class="demo-desc">Calculate your optimal seating support based on daily desk habits.</p>
          <div class="form-group">
            <label>Hours sitting per day</label>
            <input type="range" id="sit-hours" min="1" max="16" value="8">
            <span class="range-val" id="sit-hours-val">8 hrs</span>
          </div>
          <div class="form-group">
            <label>Chair quality (1–10)</label>
            <input type="range" id="chair-quality" min="1" max="10" value="5">
            <span class="range-val" id="chair-quality-val">5</span>
          </div>
          <div class="form-group">
            <label>Breaks per day</label>
            <input type="range" id="breaks" min="0" max="12" value="3">
            <span class="range-val" id="breaks-val">3</span>
          </div>
          <button class="btn-primary" id="calc-ergonomic">Calculate Support Score</button>
          <div class="demo-result" id="ergonomic-result"></div>
        </div>`,
      cheekcheck: `
        <div class="demo-app cheekcheck-demo">
          <h3>📸 CheekCheck v2</h3>
          <p class="demo-desc">Upload an image for real-time posterior analytics (100% scientific).</p>
          <div class="upload-zone" id="upload-zone">
            <input type="file" id="cheek-upload" accept="image/*" hidden>
            <div class="upload-placeholder" id="upload-placeholder">
              <span class="upload-icon">📁</span>
              <p>Drop an image here or click to upload</p>
            </div>
            <canvas id="cheek-canvas" class="hidden"></canvas>
          </div>
          <button class="btn-primary" id="analyze-cheeks" disabled>Analyze Asset</button>
          <div class="demo-result" id="cheek-result"></div>
        </div>`,
      fabric: `
        <div class="demo-app fabric-demo">
          <h3>🧵 Fabric Stretch Simulator</h3>
          <p class="demo-desc">Simulate denim stretch under load.</p>
          <div class="form-group">
            <label>Fabric type</label>
            <select id="fabric-type">
              <option value="denim">Raw Denim</option>
              <option value="stretch">Stretch Denim</option>
              <option value="cotton">Cotton</option>
              <option value="spandex">Spandex Blend</option>
            </select>
          </div>
          <div class="form-group">
            <label>Load (kg)</label>
            <input type="range" id="fabric-load" min="1" max="100" value="40">
            <span class="range-val" id="fabric-load-val">40 kg</span>
          </div>
          <button class="btn-primary" id="simulate-fabric">Run Simulation</button>
          <div class="stretch-viz" id="stretch-viz">
            <div class="fabric-bar" id="fabric-bar"></div>
          </div>
          <div class="demo-result" id="fabric-result"></div>
        </div>`,
      desk: `
        <div class="demo-app desk-demo">
          <h3>🖥️ Desk Setup Optimizer</h3>
          <p class="demo-desc">Describe your workspace for AI-powered recommendations.</p>
          <div class="form-group">
            <label>Monitor height</label>
            <select id="monitor-height">
              <option value="low">Below eye level</option>
              <option value="ok">Eye level</option>
              <option value="high">Above eye level</option>
            </select>
          </div>
          <div class="form-group">
            <label>Chair type</label>
            <select id="chair-type">
              <option value="basic">Basic office chair</option>
              <option value="ergonomic">Ergonomic chair</option>
              <option value="gaming">Gaming chair</option>
              <option value="ball">Exercise ball</option>
            </select>
          </div>
          <div class="form-group">
            <label>Desk clutter level</label>
            <input type="range" id="clutter" min="1" max="10" value="5">
            <span class="range-val" id="clutter-val">5</span>
          </div>
          <button class="btn-primary" id="optimize-desk">Get Recommendations</button>
          <div class="demo-result" id="desk-result"></div>
        </div>`,
    };
    return demos[type] || '<p>Demo not available.</p>';
  },

  docs() {
    return `
      <div class="docs-layout">
        <nav class="docs-nav">
          <h2>Documentation</h2>
          <ul>
            ${HB_DATA.docs.map((d, i) => `<li><a href="#" class="doc-link ${i === 0 ? 'active' : ''}" data-doc="${d.slug}">${d.title}</a></li>`).join('')}
          </ul>
        </nav>
        <div class="docs-content" id="docs-content">
          <h1>${HB_DATA.docs[0].title}</h1>
          <p>${HB_DATA.docs[0].content}</p>
          <div class="docs-code">
            <pre><code>pip install huggingbase
from huggingbase import AutoModel

model = AutoModel.from_pretrained("meta-glute/llama-3-butt-optimized")
output = model.generate("Design a scalable backend for...")</code></pre>
          </div>
          <p>That's it! You're now part of the back-end revolution.</p>
        </div>
      </div>`;
  },

  pricing() {
    return `
      <div class="page-header centered">
        <h1>Simple, transparent pricing</h1>
        <p class="page-subtitle">Choose the plan that fits your posterior computing needs.</p>
      </div>
      <div class="pricing-grid">
        ${HB_DATA.pricing.map((plan, i) => `
          <div class="pricing-card ${i === 1 ? 'featured' : ''}">
            <h3>${plan.name}</h3>
            <div class="price">${plan.price}<span>${plan.price !== 'Contact us' ? '/mo' : ''}</span></div>
            <ul>
              ${plan.features.map((f) => `<li>✓ ${f}</li>`).join('')}
            </ul>
            <button class="btn-primary ${i === 2 ? 'btn-outline' : ''}" data-auth="${i === 0 ? 'signup' : 'signup'}">
              ${plan.price === 'Contact us' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        `).join('')}
      </div>`;
  },

  solutions() {
    return `
      <div class="page-header centered">
        <h1>Enterprise Solutions</h1>
        <p class="page-subtitle">Deploy posterior AI at scale across your organization.</p>
      </div>
      <div class="solutions-grid">
        <div class="solution-card">
          <div class="solution-icon">🏢</div>
          <h3>On-Premise Deployment</h3>
          <p>Run HuggingBase infrastructure behind your firewall with full data sovereignty.</p>
        </div>
        <div class="solution-card">
          <div class="solution-icon">🔒</div>
          <h3>Private Model Hub</h3>
          <p>Host proprietary cheek-models with fine-grained access controls and audit logging.</p>
        </div>
        <div class="solution-card">
          <div class="solution-icon">⚡</div>
          <h3>Inference Endpoints</h3>
          <p>Auto-scaling GPU endpoints with 99.9% uptime SLA for production workloads.</p>
        </div>
        <div class="solution-card">
          <div class="solution-icon">🎓</div>
          <h3>Research Partnerships</h3>
          <p>Collaborate with our science team on cutting-edge gluteal parameter research.</p>
        </div>
      </div>
      <div class="cta-banner">
        <h2>Ready to get started?</h2>
        <button class="btn-primary" data-auth="signup">Talk to our team</button>
      </div>`;
  },

  search(query) {
    const results = searchAll(query);
    const total = results.models.length + results.datasets.length + results.spaces.length;
    return `
      <div class="page-header">
        <h1>Search results</h1>
        <p class="page-subtitle">${total} result${total !== 1 ? 's' : ''} for "<strong>${query || ''}</strong>"</p>
      </div>
      ${total === 0 ? '<div class="empty-state"><p>No results found. Try "denim", "squat", or "ergonomic".</p></div>' : ''}
      ${results.models.length ? `<h2 class="section-title">Models (${results.models.length})</h2><div class="browse-grid">${results.models.map((i) => Pages.card(i, 'models')).join('')}</div>` : ''}
      ${results.datasets.length ? `<h2 class="section-title">Datasets (${results.datasets.length})</h2><div class="browse-grid">${results.datasets.map((i) => Pages.card(i, 'datasets')).join('')}</div>` : ''}
      ${results.spaces.length ? `<h2 class="section-title">Spaces (${results.spaces.length})</h2><div class="browse-grid">${results.spaces.map((i) => Pages.card(i, 'spaces')).join('')}</div>` : ''}`;
  },

  notFound() {
    return `
      <div class="empty-state large">
        <div class="empty-icon">🔍</div>
        <h1>404 — Repository not found</h1>
        <p>The model, dataset, or space you're looking for doesn't exist (yet).</p>
        <button class="btn-primary" data-nav="/">Back to Home</button>
      </div>`;
  },
};
