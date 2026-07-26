/** Mock content for the HuggingBase parody platform */
const HB_DATA = {
  models: [
    {
      id: 'meta-glute/llama-3-butt-optimized',
      org: 'meta-glute',
      name: 'Llama-3-Butt-Optimized',
      likes: 94200,
      downloads: 1280000,
      task: 'Text Generation',
      framework: 'PyTorch',
      desc: 'State-of-the-art text generation parameters fine-tuned on deep-squat engineering metrics.',
      readme: `# Llama-3-Butt-Optimized

Fine-tuned on 2.4T tokens of posture-aware corpora. Optimized for backend architecture discussions with scientifically calibrated gluteal embeddings.

## Usage

\`\`\`python
from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("meta-glute/llama-3-butt-optimized")
\`\`\`

## Benchmarks

| Metric | Score |
|--------|-------|
| Squat Depth | 98.2% |
| Seat Comfort | 94.7% |
| Denim Tension | 91.3% |`,
      tags: ['Text Generation', 'PyTorch', '7B'],
      updated: '2 days ago',
    },
    {
      id: 'deep-seat/squat-coder-7b',
      org: 'deep-seat',
      name: 'squat-coder-7b',
      likes: 42100,
      downloads: 520000,
      task: 'Code Generation',
      framework: 'PyTorch',
      desc: 'Code generation model specialized for designing solid, reliable backend architectures.',
      readme: `# squat-coder-7b

Generates structurally sound backend code with emphasis on load-bearing API design.

## Features
- REST endpoint scaffolding
- Database schema with proper indexing (for fast lookups)
- Unit tests that actually sit correctly`,
      tags: ['Code Generation', '7B'],
      updated: '5 days ago',
    },
    {
      id: 'stability-bum/sd-xl-motion-blur',
      org: 'stability-bum',
      name: 'sd-xl-motion-blur',
      likes: 38700,
      downloads: 890000,
      task: 'Text-to-Image',
      framework: 'Diffusers',
      desc: 'Latent diffusion model optimized for high-fidelity physics simulation tracking.',
      readme: `# sd-xl-motion-blur

Diffusion model trained on motion-capture datasets for realistic kinetic rendering.`,
      tags: ['Text-to-Image', 'Diffusers'],
      updated: '1 week ago',
    },
    {
      id: 'open-rear/open-butt-3b',
      org: 'open-rear',
      name: 'open-butt-3b',
      likes: 31500,
      downloads: 410000,
      task: 'Text Generation',
      framework: 'PyTorch',
      desc: 'Compact open-weight model for edge deployment on wearable posture sensors.',
      readme: `# open-butt-3b

Runs on-device. Perfect for real-time ergonomic feedback loops.`,
      tags: ['Text Generation', '3B', 'On-device'],
      updated: '3 days ago',
    },
    {
      id: 'anthropic-cheeks/claude-cheek-sonnet',
      org: 'anthropic-cheeks',
      name: 'claude-cheek-sonnet',
      likes: 67800,
      downloads: 2100000,
      task: 'Text Generation',
      framework: 'Safetensors',
      desc: 'Constitutional AI model trained to be helpful, harmless, and horizontally balanced.',
      readme: `# claude-cheek-sonnet

The most balanced model in our lineup. Literally.`,
      tags: ['Text Generation', 'Constitutional AI'],
      updated: '1 day ago',
    },
    {
      id: 'google-deep-seat/gemini-pro-sit',
      org: 'google-deep-seat',
      name: 'gemini-pro-sit',
      likes: 55300,
      downloads: 1500000,
      task: 'Multimodal',
      framework: 'JAX',
      desc: 'Multimodal model understanding both visual posture and textual seating preferences.',
      readme: `# gemini-pro-sit

Upload a photo of your chair setup and get personalized recommendations.`,
      tags: ['Multimodal', 'Vision'],
      updated: '4 days ago',
    },
  ],

  datasets: [
    {
      id: 'denim-labs/jeans-vs-sweatpants-10M',
      org: 'denim-labs',
      name: 'jeans-vs-sweatpants-10M',
      likes: 18200,
      downloads: 340000,
      task: 'Computer Vision',
      desc: 'Ten million image instances categorized by stretch ratios and fabric tension ratings.',
      readme: `# jeans-vs-sweatpants-10M

## Schema
- \`image\`: RGB tensor
- \`fabric_type\`: enum [denim, cotton, spandex, mystery]
- \`stretch_ratio\`: float 0.0–2.0
- \`comfort_score\`: float 0.0–10.0`,
      tags: ['Computer Vision', 'Image Classification'],
      size: '847 GB',
      rows: '10M',
      updated: '1 week ago',
    },
    {
      id: 'ergonomics-org/chair-pressure-maps',
      org: 'ergonomics-org',
      name: 'chair-pressure-maps',
      likes: 11400,
      downloads: 89000,
      task: 'Tabular',
      desc: 'Sensory pressure metrics tracking daily posture shifts and structural seating shifts.',
      readme: `# chair-pressure-maps

Pressure sensor readings from 50,000 office workers over 6 months.`,
      tags: ['Tabular', 'Time Series'],
      size: '12 GB',
      rows: '2.1M',
      updated: '2 weeks ago',
    },
    {
      id: 'squat-university/deep-squat-form-videos',
      org: 'squat-university',
      name: 'deep-squat-form-videos',
      likes: 9800,
      downloads: 156000,
      task: 'Video',
      desc: 'Annotated video dataset of squat form with joint angle measurements.',
      readme: `# deep-squat-form-videos

Expert-labeled depth classifications: parallel, below-parallel, and ATG.`,
      tags: ['Video', 'Pose Estimation'],
      size: '234 GB',
      rows: '450K',
      updated: '5 days ago',
    },
    {
      id: 'yoga-pants-inc/stretch-test-results',
      org: 'yoga-pants-inc',
      name: 'stretch-test-results',
      likes: 7600,
      downloads: 67000,
      task: 'Tabular',
      desc: 'Laboratory stretch test results across 2,000 fabric compositions.',
      readme: `# stretch-test-results

Includes elasticity decay curves over 10,000 cycle tests.`,
      tags: ['Tabular', 'Materials Science'],
      size: '890 MB',
      rows: '2K',
      updated: '3 days ago',
    },
  ],

  spaces: [
    {
      id: 'workspace/cheekcheck-v2',
      org: 'workspace',
      name: 'CheekCheck-v2',
      likes: 29100,
      sdk: 'Streamlit',
      desc: 'An interactive classifier running real-time asset tracking via your webcam or uploads.',
      demo: 'cheekcheck',
      tags: ['Streamlit', 'Computer Vision'],
      updated: '2 days ago',
    },
    {
      id: 'glute-labs/ergonomic-calculator',
      org: 'glute-labs',
      name: 'ergonomic-calculator',
      likes: 14200,
      sdk: 'Gradio',
      desc: 'Input your daily desk sitting duration to calculate optimum seating support settings.',
      demo: 'ergonomic',
      tags: ['Gradio', 'Calculator'],
      updated: '1 week ago',
    },
    {
      id: 'denim-labs/fabric-stretch-simulator',
      org: 'denim-labs',
      name: 'fabric-stretch-simulator',
      likes: 8700,
      sdk: 'Gradio',
      desc: 'Simulate fabric stretch behavior under various load conditions.',
      demo: 'fabric',
      tags: ['Gradio', 'Simulation'],
      updated: '4 days ago',
    },
    {
      id: 'posture-ai/desk-setup-optimizer',
      org: 'posture-ai',
      name: 'desk-setup-optimizer',
      likes: 11300,
      sdk: 'Streamlit',
      desc: 'Upload a photo of your workspace for AI-powered ergonomic recommendations.',
      demo: 'desk',
      tags: ['Streamlit', 'Vision'],
      updated: '6 days ago',
    },
  ],

  docs: [
    { title: 'Quickstart', slug: 'quickstart', content: 'Get up and running with HuggingBase in under 5 minutes. Clone a model, load weights, deploy a Space.' },
    { title: 'Cheek-Models Hub', slug: 'models', content: 'Browse, download, and fine-tune cheek-models. All models use the standard .butt format.' },
    { title: 'Asset-Sets', slug: 'datasets', content: 'Discover curated datasets for training your next breakthrough in posterior analytics.' },
    { title: 'Spaces', slug: 'spaces', content: 'Deploy interactive ML apps directly in the browser. No GPU required (results may vary).' },
    { title: 'Inference API', slug: 'inference', content: 'REST API for running models in production. Rate limit: 1000 requests per cheek per hour.' },
    { title: 'Cluster Computing', slug: 'cluster', content: 'Scale your workloads across our distributed glute-compute infrastructure.' },
  ],

  pricing: [
    { name: 'Free', price: '$0', features: ['Public models & datasets', 'CPU Spaces', 'Community support', '5GB storage'] },
    { name: 'Pro', price: '$9/mo', features: ['Private repos', 'GPU Spaces (T4)', 'Priority inference', '100GB storage', 'Custom cheek-avatars'] },
    { name: 'Enterprise', price: 'Contact us', features: ['Dedicated clusters', 'SSO & audit logs', 'SLA guarantees', 'Unlimited storage', 'On-prem deployment'] },
  ],
};

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function findItem(type, org, name) {
  const id = `${org}/${name}`.toLowerCase();
  return HB_DATA[type].find((item) => item.id.toLowerCase() === id);
}

function searchAll(query) {
  const q = query.toLowerCase().trim();
  if (!q) return { models: [], datasets: [], spaces: [] };
  const match = (item) =>
    item.id.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q) ||
    (item.tags && item.tags.some((t) => t.toLowerCase().includes(q))) ||
    (item.task && item.task.toLowerCase().includes(q));
  return {
    models: HB_DATA.models.filter(match),
    datasets: HB_DATA.datasets.filter(match),
    spaces: HB_DATA.spaces.filter(match),
  };
}
