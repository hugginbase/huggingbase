/** Page renderers for each route */
const Pages = {
  home() {
    const cols = [
      { title: '📦 Trending Models', type: 'models', items: HB_DATA.models.slice(0, 6) },
      { title: '📊 Trending Datasets', type: 'datasets', items: HB_DATA.datasets.slice(0, 5) },
      { title: '🚀 Trending Spaces', type: 'spaces', items: HB_DATA.spaces.slice(0, 5) },
    ];

    return `
      <section class="hero-section">
        <img src="logo.png" alt="HuggingBase Mascot" class="hero-logo-large">
        <h1>The AI community building the back-end.</h1>
        <p>We're on a journey to advance and democratize gluteal parameters through open source infrastructure and active community science.</p>
        <div class="hero-actions">
          <button class="btn-primary" data-nav="/models">Explore Models</button>
          <button class="btn-secondary" data-nav="/spaces">Try a Space</button>
          <button class="btn-secondary" data-nav="/organizations">Browse Organizations</button>
        </div>
        <div class="hero-search-hint">Search ${HB_DATA.models.length + HB_DATA.datasets.length + HB_DATA.spaces.length}+ repositories — press <kbd>⌘K</kbd></div>
      </section>

      <section class="task-categories">
        <h2 class="section-heading">Browse by task</h2>
        <div class="task-chips">
          ${getTasks('models').slice(0, 8).map(([task, count]) => `
            <a href="#/models?task=${encodeURIComponent(task)}" class="task-chip">${task} <span>${count}</span></a>
          `).join('')}
        </div>
      </section>

      <main class="grid-layout">
        ${cols.map((col) => `
          <div class="grid-column">
            <div class="column-header-row">
              <div class="column-header">${col.title}</div>
              <a href="#/${col.type}" class="see-all">See all ${HB_DATA[col.type].length} →</a>
            </div>
            ${col.items.map((item) => Pages.card(item, col.type)).join('')}
          </div>
        `).join('')}
      </main>

      <section class="home-section">
        <div class="section-header-row">
          <h2 class="section-heading">🏢 Organizations</h2>
          <a href="#/organizations" class="see-all">View all ${HB_DATA.organizations.length} →</a>
        </div>
        <div class="org-grid">${HB_DATA.organizations.slice(0, 8).map(Pages.orgCard).join('')}</div>
      </section>

      <section class="home-section">
        <div class="section-header-row">
          <h2 class="section-heading">📚 Collections</h2>
          <a href="#/collections" class="see-all">View all →</a>
        </div>
        <div class="collection-grid">${HB_DATA.collections.slice(0, 4).map(Pages.collectionCard).join('')}</div>
      </section>

      <section class="home-section">
        <div class="section-header-row">
          <h2 class="section-heading">📰 Blog & Announcements</h2>
          <a href="#/blog" class="see-all">View all ${HB_DATA.blog.length} posts →</a>
        </div>
        <div class="blog-grid">${HB_DATA.blog.slice(0, 6).map(Pages.blogCard).join('')}</div>
      </section>

      <section class="home-section">
        <div class="section-header-row">
          <h2 class="section-heading">📄 Research Papers</h2>
          <a href="#/papers" class="see-all">View all →</a>
        </div>
        <div class="papers-list">${HB_DATA.papers.slice(0, 5).map(Pages.paperRow).join('')}</div>
      </section>

      <section class="stats-banner">
        <div class="stat"><strong>${HB_DATA.models.length}</strong><span>Models</span></div>
        <div class="stat"><strong>${HB_DATA.datasets.length}</strong><span>Datasets</span></div>
        <div class="stat"><strong>${HB_DATA.spaces.length}</strong><span>Spaces</span></div>
        <div class="stat"><strong>${HB_DATA.organizations.length}</strong><span>Organizations</span></div>
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

  browseList(type, title, icon, query = {}) {
    const taskFilter = query.task || '';
    let items = [...HB_DATA[type]];
    if (taskFilter) items = items.filter((i) => (i.task || i.sdk) === taskFilter);
    const page = parseInt(query.page, 10) || 1;
    const { items: pageItems, pages, total } = paginate(items, page);
    const tasks = getTasks(type);

    return `
      <div class="page-header">
        <h1>${icon} ${title}</h1>
        <p class="page-subtitle">${total} repositories on HuggingBase${taskFilter ? ` · filtered by <strong>${taskFilter}</strong>` : ''}</p>
      </div>
      <div class="task-chips browse-chips">
        <a href="#/${type}" class="task-chip ${!taskFilter ? 'active' : ''}">All <span>${HB_DATA[type].length}</span></a>
        ${tasks.map(([task, count]) => `
          <a href="#/${type}?task=${encodeURIComponent(task)}" class="task-chip ${taskFilter === task ? 'active' : ''}">${task} <span>${count}</span></a>
        `).join('')}
      </div>
      <div class="filter-bar">
        <input type="text" class="filter-input" id="browse-filter" placeholder="Filter ${title.toLowerCase()}..." autocomplete="off">
        <select class="filter-select" id="browse-sort">
          <option value="likes">Most liked</option>
          <option value="name">Name A–Z</option>
          <option value="updated">Recently updated</option>
        </select>
      </div>
      <div class="browse-grid" id="browse-grid" data-type="${type}" data-task="${taskFilter}">
        ${pageItems.map((item) => Pages.card(item, type)).join('')}
      </div>
      ${Pages.pagination(type, page, pages, total, query)}`;
  },

  pagination(type, page, pages, total, query = {}) {
    if (pages <= 1) return '';
    const q = (extra) => {
      const params = { ...query, ...extra };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const s = new URLSearchParams(params).toString();
      return s ? `?${s}` : '';
    };
    const links = [];
    if (page > 1) links.push(`<a href="#/${type}${q({ page: page - 1 })}" class="page-btn">← Prev</a>`);
    for (let i = 1; i <= pages; i++) {
      if (pages > 7 && i > 2 && i < pages - 1 && Math.abs(i - page) > 1) {
        if (i === 3 || i === pages - 2) links.push('<span class="page-ellipsis">…</span>');
        continue;
      }
      links.push(`<a href="#/${type}${q({ page: i })}" class="page-btn ${i === page ? 'active' : ''}">${i}</a>`);
    }
    if (page < pages) links.push(`<a href="#/${type}${q({ page: page + 1 })}" class="page-btn">Next →</a>`);
    return `<div class="pagination"><span class="page-info">Showing page ${page} of ${pages} (${total} total)</span><div class="page-links">${links.join('')}</div></div>`;
  },

  orgCard(org) {
    return `
      <a href="#/organizations/${org.id}" class="org-card">
        <div class="org-card-top">
          <div class="org-avatar">${org.name[0]}</div>
          <div>
            <div class="org-name">${org.name} ${org.verified ? '<span class="verified">✓</span>' : ''}</div>
            <div class="org-stats">${org.models} models · ${org.datasets} datasets · ${org.spaces} spaces</div>
          </div>
        </div>
        <p class="org-desc">${org.desc}</p>
        <div class="org-followers">${formatCount(org.followers)} followers</div>
      </a>`;
  },

  collectionCard(col) {
    return `
      <a href="#/collections/${col.id}" class="collection-card">
        <h3>${col.title}</h3>
        <p>${col.desc}</p>
        <span class="collection-count">${col.count} items</span>
      </a>`;
  },

  blogCard(post) {
    return `
      <a href="#/blog/${post.slug}" class="blog-card">
        <span class="blog-tag">${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="blog-meta">${post.author} · ${post.date} · ${post.readTime}</div>
      </a>`;
  },

  paperRow(paper) {
    return `
      <div class="paper-row">
        <div class="paper-info">
          <h3>${paper.title}</h3>
          <p class="paper-authors">${paper.authors} · ${paper.org} · ${paper.year}</p>
          <p class="paper-desc">${paper.desc}</p>
        </div>
        <div class="paper-citations">${formatCount(paper.citations)} citations</div>
      </div>`;
  },

  models(_, query) {
    return Pages.browseList('models', 'Cheek-Models', '📦', query);
  },

  datasets(_, query) {
    return Pages.browseList('datasets', 'Asset-Sets', '📊', query);
  },

  spaces(_, query) {
    return Pages.browseList('spaces', 'Spaces', '🚀', query);
  },

  organizations() {
    return `
      <div class="page-header">
        <h1>🏢 Organizations</h1>
        <p class="page-subtitle">${HB_DATA.organizations.length} organizations building open posterior science</p>
      </div>
      <div class="org-grid full">${HB_DATA.organizations.map(Pages.orgCard).join('')}</div>`;
  },

  organizationDetail(orgId) {
    const org = findOrg(orgId);
    if (!org) return Pages.notFound();
    const items = getOrgItems(org.id);
    return `
      <div class="org-profile">
        <div class="org-profile-header">
          <div class="org-avatar large">${org.name[0]}</div>
          <div>
            <h1>${org.name} ${org.verified ? '<span class="verified">✓ Verified</span>' : ''}</h1>
            <p class="org-profile-desc">${org.desc}</p>
            <div class="org-profile-stats">
              <span><strong>${formatCount(org.followers)}</strong> followers</span>
              <span><strong>${items.models.length}</strong> models</span>
              <span><strong>${items.datasets.length}</strong> datasets</span>
              <span><strong>${items.spaces.length}</strong> spaces</span>
            </div>
          </div>
          <button class="btn-primary" data-follow-org="${org.id}">Follow</button>
        </div>
      </div>
      ${items.models.length ? `<h2 class="section-title">Models (${items.models.length})</h2><div class="browse-grid">${items.models.map((i) => Pages.card(i, 'models')).join('')}</div>` : ''}
      ${items.datasets.length ? `<h2 class="section-title">Datasets (${items.datasets.length})</h2><div class="browse-grid">${items.datasets.map((i) => Pages.card(i, 'datasets')).join('')}</div>` : ''}
      ${items.spaces.length ? `<h2 class="section-title">Spaces (${items.spaces.length})</h2><div class="browse-grid">${items.spaces.map((i) => Pages.card(i, 'spaces')).join('')}</div>` : ''}
      ${!items.models.length && !items.datasets.length && !items.spaces.length ? '<div class="empty-state"><p>This organization hasn\'t published any repositories yet.</p></div>' : ''}`;
  },

  blog() {
    return `
      <div class="page-header">
        <h1>📰 Blog</h1>
        <p class="page-subtitle">${HB_DATA.blog.length} articles on models, research, and community updates</p>
      </div>
      <div class="blog-grid full">${HB_DATA.blog.map(Pages.blogCard).join('')}</div>`;
  },

  blogPost(slug) {
    const post = findBlogPost(slug);
    if (!post) return Pages.notFound();
    return `
      <article class="blog-article">
        <span class="blog-tag">${post.tag}</span>
        <h1>${post.title}</h1>
        <div class="blog-meta">${post.author} · ${post.date} · ${post.readTime} read</div>
        <div class="blog-body">
          <p>${post.excerpt}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In the rapidly evolving field of posterior analytics, ${post.title.toLowerCase()} represents a significant milestone for our community. Researchers and practitioners alike have been waiting for this announcement.</p>
          <h2>Key Highlights</h2>
          <ul>
            <li>Comprehensive evaluation across ${Math.floor(Math.random() * 30) + 20} benchmark tasks</li>
            <li>Open-source release under Apache 2.0 license</li>
            <li>Integration with HuggingBase Inference API and Spaces</li>
            <li>Community fine-tuning recipes and starter notebooks</li>
          </ul>
          <p>We're excited to see what the community builds with this release. Join the discussion on our Discord or open an issue on GitHub.</p>
          <div class="blog-cta">
            <button class="btn-primary" data-nav="/models">Explore Models</button>
            <button class="btn-secondary" data-nav="/blog">More Articles</button>
          </div>
        </div>
      </article>`;
  },

  collections() {
    return `
      <div class="page-header">
        <h1>📚 Collections</h1>
        <p class="page-subtitle">Curated sets of models, datasets, and spaces for every use case</p>
      </div>
      <div class="collection-grid full">${HB_DATA.collections.map(Pages.collectionCard).join('')}</div>`;
  },

  collectionDetail(id) {
    const col = HB_DATA.collections.find((c) => c.id === id);
    if (!col) return Pages.notFound();
    const allItems = [];
    col.items.forEach((itemId) => {
      const [org, name] = itemId.split('/');
      const m = findItem('models', org, name);
      const d = findItem('datasets', org, name);
      const s = findItem('spaces', org, name);
      if (m) allItems.push({ item: m, type: 'models' });
      if (d) allItems.push({ item: d, type: 'datasets' });
      if (s) allItems.push({ item: s, type: 'spaces' });
    });
    const extra = [...HB_DATA.models, ...HB_DATA.datasets, ...HB_DATA.spaces]
      .filter((i) => col.title.toLowerCase().includes(i.task?.toLowerCase() || '') || col.desc.toLowerCase().includes(i.org))
      .slice(0, col.count);
    const display = allItems.length ? allItems : extra.map((item) => ({
      item,
      type: HB_DATA.models.includes(item) ? 'models' : HB_DATA.datasets.includes(item) ? 'datasets' : 'spaces',
    }));
    return `
      <div class="page-header">
        <h1>📚 ${col.title}</h1>
        <p class="page-subtitle">${col.desc} · ${col.count} items</p>
      </div>
      <div class="browse-grid">${display.slice(0, 12).map(({ item, type }) => Pages.card(item, type)).join('')}</div>
      ${col.count > 12 ? `<p class="collection-more">+ ${col.count - 12} more items in this collection</p>` : ''}`;
  },

  papers() {
    return `
      <div class="page-header">
        <h1>📄 Research Papers</h1>
        <p class="page-subtitle">${HB_DATA.papers.length} papers advancing the field of posterior AI</p>
      </div>
      <div class="papers-list full">${HB_DATA.papers.map(Pages.paperRow).join('')}</div>`;
  },

  leaderboard() {
    const top = [...HB_DATA.models].sort((a, b) => b.likes - a.likes).slice(0, 20);
    return `
      <div class="page-header">
        <h1>🏆 Leaderboard</h1>
        <p class="page-subtitle">Top cheek-models by community likes on HuggingBase</p>
      </div>
      <div class="leaderboard-table">
        <div class="lb-header"><span>#</span><span>Model</span><span>Task</span><span>Likes</span><span>Downloads</span></div>
        ${top.map((m, i) => `
          <a href="#/models/${m.org}/${m.name}" class="lb-row">
            <span class="lb-rank">${i + 1}</span>
            <span class="lb-name"><strong>${m.org}/</strong>${m.name}</span>
            <span class="lb-task"><span class="tag tag-blue">${m.task}</span></span>
            <span class="lb-likes">🍑 ${formatCount(m.likes)}</span>
            <span class="lb-dl">${formatCount(m.downloads)}</span>
          </a>
        `).join('')}
      </div>`;
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
    const total = results.models.length + results.datasets.length + results.spaces.length + results.organizations.length + results.blog.length;
    return `
      <div class="page-header">
        <h1>Search results</h1>
        <p class="page-subtitle">${total} result${total !== 1 ? 's' : ''} for "<strong>${query || ''}</strong>"</p>
      </div>
      ${total === 0 ? '<div class="empty-state"><p>No results found. Try "denim", "squat", "llama", or "ergonomic".</p></div>' : ''}
      ${results.models.length ? `<h2 class="section-title">Models (${results.models.length})</h2><div class="browse-grid">${results.models.map((i) => Pages.card(i, 'models')).join('')}</div>` : ''}
      ${results.datasets.length ? `<h2 class="section-title">Datasets (${results.datasets.length})</h2><div class="browse-grid">${results.datasets.map((i) => Pages.card(i, 'datasets')).join('')}</div>` : ''}
      ${results.spaces.length ? `<h2 class="section-title">Spaces (${results.spaces.length})</h2><div class="browse-grid">${results.spaces.map((i) => Pages.card(i, 'spaces')).join('')}</div>` : ''}
      ${results.organizations.length ? `<h2 class="section-title">Organizations (${results.organizations.length})</h2><div class="org-grid">${results.organizations.map(Pages.orgCard).join('')}</div>` : ''}
      ${results.blog.length ? `<h2 class="section-title">Blog (${results.blog.length})</h2><div class="blog-grid">${results.blog.map(Pages.blogCard).join('')}</div>` : ''}`;
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
