/** Mock content for the HuggingBase parody platform */
const HB_DATA = {
  models: CATALOG.models,
  datasets: CATALOG.datasets,
  spaces: CATALOG.spaces,
  organizations: CATALOG.organizations,
  blog: CATALOG.blog,
  collections: CATALOG.collections,
  papers: CATALOG.papers,
  docs: CATALOG.docs,
  tasks: CATALOG.TASKS,

  pricing: [
    { name: 'Free', price: '$0', features: ['Public models & datasets', 'CPU Spaces', 'Community support', '5GB storage', 'CheekBench evaluations'] },
    { name: 'Pro', price: '$9/mo', features: ['Private repos', 'GPU Spaces (T4)', 'Priority inference', '100GB storage', 'Custom cheek-avatars', 'Advanced analytics'] },
    { name: 'Team', price: '$20/user/mo', features: ['Everything in Pro', 'Organization management', 'SSO integration', '500GB shared storage', 'Audit logs'] },
    { name: 'Enterprise', price: 'Contact us', features: ['Dedicated clusters', 'Custom SLAs', 'Unlimited storage', 'On-prem deployment', 'Dedicated support engineer'] },
  ],
};

const PAGE_SIZE = 12;

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function findItem(type, org, name) {
  const id = `${org}/${name}`.toLowerCase();
  return HB_DATA[type].find((item) => item.id.toLowerCase() === id);
}

function findOrg(id) {
  return HB_DATA.organizations.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

function findBlogPost(slug) {
  return HB_DATA.blog.find((p) => p.slug === slug);
}

function getOrgItems(orgId) {
  return {
    models: HB_DATA.models.filter((m) => m.org === orgId),
    datasets: HB_DATA.datasets.filter((d) => d.org === orgId),
    spaces: HB_DATA.spaces.filter((s) => s.org === orgId),
  };
}

function searchAll(query) {
  const q = query.toLowerCase().trim();
  if (!q) return { models: [], datasets: [], spaces: [], organizations: [], blog: [] };
  const match = (item) =>
    item.id?.toLowerCase().includes(q) ||
    item.name?.toLowerCase().includes(q) ||
    item.title?.toLowerCase().includes(q) ||
    item.desc?.toLowerCase().includes(q) ||
    item.excerpt?.toLowerCase().includes(q) ||
    (item.tags && item.tags.some((t) => t.toLowerCase().includes(q))) ||
    (item.task && item.task.toLowerCase().includes(q));
  return {
    models: HB_DATA.models.filter(match),
    datasets: HB_DATA.datasets.filter(match),
    spaces: HB_DATA.spaces.filter(match),
    organizations: HB_DATA.organizations.filter(match),
    blog: HB_DATA.blog.filter(match),
  };
}

function getTasks(type) {
  const items = HB_DATA[type];
  const tasks = {};
  items.forEach((item) => {
    const t = item.task || item.sdk || 'Other';
    tasks[t] = (tasks[t] || 0) + 1;
  });
  return Object.entries(tasks).sort((a, b) => b[1] - a[1]);
}

function paginate(items, page, pageSize = PAGE_SIZE) {
  const total = items.length;
  const pages = Math.ceil(total / pageSize) || 1;
  const p = Math.max(1, Math.min(page, pages));
  const start = (p - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: p, pages, total };
}
