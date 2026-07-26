/** Large content catalog for HuggingBase */
const CATALOG = (() => {
  const TASKS = ['Text Generation', 'Code Generation', 'Text-to-Image', 'Image Classification', 'Pose Estimation', 'Multimodal', 'Audio', 'Embedding', 'Video', 'Tabular'];
  const FRAMEWORKS = ['PyTorch', 'TensorFlow', 'JAX', 'ONNX', 'Diffusers', 'Safetensors', 'GGUF'];
  const SDKS = ['Gradio', 'Streamlit', 'Static', 'Docker'];
  const UPDATES = ['1 hour ago', '3 hours ago', '6 hours ago', '12 hours ago', '1 day ago', '2 days ago', '3 days ago', '5 days ago', '1 week ago', '2 weeks ago', '1 month ago'];

  function pick(arr, i) { return arr[i % arr.length]; }
  function rand(base, spread) { return base + Math.floor(Math.random() * spread); }

  function readme(title, body) {
    return `# ${title}\n\n${body}\n\n## License\n\nApache 2.0 — free for research and commercial posterior analytics.`;
  }

  function model(org, name, opts = {}) {
    const id = `${org}/${name}`;
    return {
      id,
      org,
      name,
      likes: opts.likes ?? rand(1200, 95000),
      downloads: opts.downloads ?? rand(5000, 2500000),
      task: opts.task ?? 'Text Generation',
      framework: opts.framework ?? 'PyTorch',
      desc: opts.desc ?? `Open-weight ${opts.task || 'text'} model from ${org}.`,
      readme: opts.readme ?? readme(name, opts.desc || `Production-ready checkpoint hosted on HuggingBase.`),
      tags: opts.tags ?? [opts.task || 'Text Generation', opts.framework || 'PyTorch'],
      updated: opts.updated ?? pick(UPDATES, name.length),
      params: opts.params,
    };
  }

  function dataset(org, name, opts = {}) {
    const id = `${org}/${name}`;
    return {
      id, org, name,
      likes: opts.likes ?? rand(400, 28000),
      downloads: opts.downloads ?? rand(2000, 800000),
      task: opts.task ?? 'Computer Vision',
      desc: opts.desc ?? `Curated dataset for training and evaluating posterior analytics models.`,
      readme: opts.readme ?? readme(name, opts.desc || 'Schema and splits documented below.'),
      tags: opts.tags ?? [opts.task || 'Computer Vision'],
      size: opts.size ?? pick(['120 MB', '2.4 GB', '18 GB', '89 GB', '340 GB', '1.2 TB'], name.length),
      rows: opts.rows ?? pick(['12K', '180K', '2.1M', '8.5M', '42M'], name.length + 2),
      updated: opts.updated ?? pick(UPDATES, org.length),
    };
  }

  function space(org, name, opts = {}) {
    const id = `${org}/${name}`;
    return {
      id, org, name,
      likes: opts.likes ?? rand(600, 35000),
      sdk: opts.sdk ?? pick(SDKS, name.length),
      desc: opts.desc ?? `Interactive demo app built with ${opts.sdk || 'Gradio'}.`,
      demo: opts.demo ?? null,
      tags: opts.tags ?? [opts.sdk || 'Gradio'],
      updated: opts.updated ?? pick(UPDATES, org.length + name.length),
    };
  }

  const models = [
    model('meta-glute', 'Llama-3-Butt-Optimized', { likes: 94200, downloads: 1280000, task: 'Text Generation', params: '7B', desc: 'State-of-the-art text generation parameters fine-tuned on deep-squat engineering metrics.', tags: ['Text Generation', 'PyTorch', '7B'], readme: readme('Llama-3-Butt-Optimized', 'Fine-tuned on 2.4T tokens of posture-aware corpora.\n\n## Benchmarks\n\n| Metric | Score |\n| Squat Depth | 98.2% |\n| Seat Comfort | 94.7% |') }),
    model('meta-glute', 'Llama-3-Butt-70B-Instruct', { likes: 81200, task: 'Text Generation', params: '70B', desc: 'Instruction-tuned flagship model for enterprise backend architecture consulting.', tags: ['Text Generation', '70B', 'Instruct'] }),
    model('meta-glute', 'ButtCode-Llama-13B', { likes: 28400, task: 'Code Generation', params: '13B', desc: 'Generates structurally sound microservices with load-balanced endpoints.', tags: ['Code Generation', '13B'] }),
    model('deep-seat', 'squat-coder-7b', { likes: 42100, task: 'Code Generation', params: '7B', desc: 'Code generation model specialized for designing solid, reliable backend architectures.' }),
    model('deep-seat', 'squat-coder-34b', { likes: 35600, task: 'Code Generation', params: '34B', desc: 'Large code model for distributed systems and database schema design.' }),
    model('deep-seat', 'api-scaffold-v2', { likes: 19200, task: 'Code Generation', desc: 'Scaffolds REST and GraphQL APIs with ergonomic error handling.' }),
    model('stability-bum', 'sd-xl-motion-blur', { likes: 38700, task: 'Text-to-Image', framework: 'Diffusers', desc: 'Latent diffusion model optimized for high-fidelity physics simulation tracking.' }),
    model('stability-bum', 'sd-3-medium-rear', { likes: 52100, task: 'Text-to-Image', framework: 'Diffusers', desc: 'Medium-sized diffusion model for photorealistic kinetic rendering.' }),
    model('stability-bum', 'video-diffusion-squat', { likes: 22800, task: 'Video', framework: 'Diffusers', desc: 'Text-to-video model for workout form visualization.' }),
    model('open-rear', 'open-butt-3b', { likes: 31500, task: 'Text Generation', params: '3B', desc: 'Compact open-weight model for edge deployment on wearable posture sensors.' }),
    model('open-rear', 'open-butt-8b', { likes: 44200, task: 'Text Generation', params: '8B', desc: 'Balanced open model competitive with proprietary seating advisors.' }),
    model('open-rear', 'open-butt-moe-46b', { likes: 28900, task: 'Text Generation', params: '46B', desc: 'Mixture-of-experts architecture activating only the most relevant gluteal pathways.' }),
    model('anthropic-cheeks', 'claude-cheek-sonnet', { likes: 67800, framework: 'Safetensors', desc: 'Constitutional AI model trained to be helpful, harmless, and horizontally balanced.' }),
    model('anthropic-cheeks', 'claude-cheek-opus', { likes: 72400, framework: 'Safetensors', desc: 'Most capable model for complex ergonomic reasoning and multi-step posture planning.' }),
    model('anthropic-cheeks', 'claude-cheek-haiku', { likes: 39100, framework: 'Safetensors', desc: 'Fast, affordable model for real-time seating recommendations.' }),
    model('google-deep-seat', 'gemini-pro-sit', { likes: 55300, task: 'Multimodal', framework: 'JAX', desc: 'Multimodal model understanding visual posture and textual seating preferences.' }),
    model('google-deep-seat', 'gemini-nano-posture', { likes: 18700, task: 'Multimodal', framework: 'JAX', desc: 'On-device posture classifier for Android and ChromeOS.' }),
    model('google-deep-seat', 'palm-2-ergonomic', { likes: 12400, task: 'Text Generation', desc: 'Legacy ergonomic advisor model, still widely deployed in enterprise.' }),
    model('nvidia-bum', 'nemotron-seat-8b', { likes: 24600, task: 'Text Generation', params: '8B', desc: 'NVIDIA-optimized model for TensorRT inference on datacenter GPUs.' }),
    model('nvidia-bum', 'cosmos-pose-1', { likes: 31200, task: 'Video', desc: 'World model for predicting human movement in office environments.' }),
    model('mistral-cheeks', 'mistral-7b-sit-v0.3', { likes: 47800, task: 'Text Generation', params: '7B', desc: 'Efficient European model with strong multilingual seating vocabulary.' }),
    model('mistral-cheeks', 'mixtral-8x7b-cushion', { likes: 39600, task: 'Text Generation', params: '47B', desc: 'Sparse MoE model delivering premium comfort analysis at inference speed.' }),
    model('cohere-seat', 'command-r-plus-posture', { likes: 22100, task: 'Text Generation', desc: 'RAG-optimized model for querying ergonomic knowledge bases.' }),
    model('hugging-cheek', 'smollm2-butt-1.7b', { likes: 16800, task: 'Text Generation', params: '1.7B', desc: 'Tiny model that punches above its weight class in posture classification.' }),
    model('hugging-cheek', 'bge-rear-embeddings', { likes: 28400, task: 'Embedding', desc: 'State-of-the-art embedding model for semantic seat similarity search.' }),
    model('runway-rear', 'gen-3-alpha-motion', { likes: 33700, task: 'Video', desc: 'Generative video model for fabric physics and movement studies.' }),
    model('apple-core', 'coreml-posture-3b', { likes: 14200, task: 'Text Generation', framework: 'ONNX', desc: 'Apple Silicon-optimized model for on-device Health app integration.' }),
    model('microsoft-edge', 'phi-3-mini-seat', { likes: 38900, task: 'Text Generation', params: '3.8B', desc: 'Small language model with surprisingly deep ergonomic knowledge.' }),
    model('microsoft-edge', 'phi-3-medium-cushion', { likes: 27400, task: 'Text Generation', params: '14B', desc: 'Medium Phi model for Copilot seating assistant features.' }),
    model('amazon-basin', 'titan-posture-express', { likes: 19800, task: 'Text Generation', desc: 'AWS Bedrock-hosted model for enterprise wellness programs.' }),
    model('amazon-basin', 'nova-rear-lite', { likes: 15600, task: 'Multimodal', desc: 'Multimodal Amazon model for warehouse ergonomics compliance.' }),
    model('tesla-seat', 'dojo-pose-estimator', { likes: 21300, task: 'Pose Estimation', desc: 'Real-time pose estimation running on custom inference silicon.' }),
    model('peloton-ai', 'cadence-squat-form', { likes: 17600, task: 'Pose Estimation', desc: 'Rep counting and depth analysis for home fitness equipment.' }),
    model('nike-flex', 'air-max-pressure-predictor', { likes: 12400, task: 'Tabular', desc: 'Predicts sole wear patterns from gait and seating transfer data.' }),
    model('lululemon-labs', 'align-stretch-forecast', { likes: 9800, task: 'Tabular', desc: 'Forecasts fabric longevity under repeated stretch cycles.' }),
    model('gymshark-ai', 'vital-seam-stress-v1', { likes: 8700, task: 'Image Classification', desc: 'Detects seam stress in athletic wear from product photos.' }),
    model('levis-denim-labs', '501-fit-classifier', { likes: 15200, task: 'Image Classification', desc: 'Classifies denim fit profiles across body types and sizes.' }),
    model('calvin-klein-ai', 'waistband-tension-regressor', { likes: 7400, task: 'Tabular', desc: 'Regresses optimal waistband elasticity from body measurements.' }),
    model('yoga-pants-inc', 'squat-proof-detector', { likes: 18900, task: 'Image Classification', desc: 'Binary classifier for squat-proof fabric verification.' }),
    model('ergonomics-org', 'spine-alignment-bert', { likes: 22100, task: 'Text Generation', desc: 'BERT-based model for clinical posture report generation.' }),
    model('squat-university', 'depth-classifier-vit', { likes: 16700, task: 'Image Classification', desc: 'Vision transformer classifying squat depth from single frames.' }),
    model('denim-labs', 'fade-pattern-diffusion', { likes: 14300, task: 'Text-to-Image', framework: 'Diffusers', desc: 'Generates realistic denim fade patterns for product design.' }),
    model('posture-ai', 'lumbar-support-ranker', { likes: 11800, task: 'Embedding', desc: 'Ranks chair configurations by predicted lumbar support quality.' }),
    model('glute-labs', 'comfort-score-xl', { likes: 25600, task: 'Multimodal', desc: 'Cross-modal model predicting comfort from chair specs and user photos.' }),
    model('workspace', 'cheek-embed-v2', { likes: 33400, task: 'Embedding', desc: 'General-purpose embeddings for the HuggingBase posterior search index.' }),
    model('workspace', 'cheek-guard-moderation', { likes: 19200, task: 'Text Generation', desc: 'Content moderation model for community spaces and forums.' }),
    model('eleuther-rear', 'pythia-6.9b-posture', { likes: 8900, task: 'Text Generation', params: '6.9B', desc: 'Research model tracing emergence of ergonomic reasoning capabilities.' }),
    model('bigscience-bum', 'bloom-7b1-seat', { likes: 6700, task: 'Text Generation', params: '7B', desc: 'Multilingual seating advisor supporting 46 languages.' }),
    model('together-cheeks', 'redpajama-seat-7b', { likes: 11200, task: 'Text Generation', params: '7B', desc: 'Reproduction-friendly base model for posterior fine-tuning experiments.' }),
    model('qwen-rear', 'qwen2.5-72b-instruct-seat', { likes: 41200, task: 'Text Generation', params: '72B', desc: 'Alibaba flagship model with strong benchmark scores on SeatBench.' }),
    model('ai21-cushion', 'jamba-52b-ergonomic', { likes: 15600, task: 'Text Generation', params: '52B', desc: 'Hybrid SSM-transformer architecture for long-context posture histories.' }),
    model('databricks-bum', 'dbrx-seat-instruct', { likes: 19800, task: 'Text Generation', params: '132B', desc: 'Enterprise MoE model for Mosaic AI seating analytics pipelines.' }),
    model('snowflake-rear', 'arctic-embed-l', { likes: 13400, task: 'Embedding', desc: 'Enterprise embedding model optimized for SQL-integrated RAG workflows.' }),
    model('perplexity-cheeks', 'pplx-7b-online-posture', { likes: 17600, task: 'Text Generation', params: '7B', desc: 'Online model with live retrieval from ergonomic research papers.' }),
    model('inflection-seat', 'pi-2.5-comfort', { likes: 24300, task: 'Text Generation', desc: 'Conversational AI focused on personalized wellness coaching.' }),
    model('xai-rear', 'grok-2-sit', { likes: 36700, task: 'Text Generation', desc: 'Real-time model with unfiltered opinions on office chair rankings.' }),
    model('replicate-bum', 'flux-schnell-denim', { likes: 29800, task: 'Text-to-Image', framework: 'Diffusers', desc: 'Fast denim texture generation for e-commerce product mockups.' }),
    model('stability-bum', 'stable-audio-seat-ambience', { likes: 8900, task: 'Audio', framework: 'Diffusers', desc: 'Generates office ambience and chair squeak sound effects.' }),
    model('openai-rear', 'whisper-large-v3-posture', { likes: 45600, task: 'Audio', desc: 'Transcribes physiotherapy sessions and extracts posture cues.' }),
    model('openai-rear', 'gpt-4o-mini-seat', { likes: 62300, task: 'Multimodal', desc: 'Compact multimodal model for quick seating Q&A in mobile apps.' }),
  ];

  const datasets = [
    dataset('denim-labs', 'jeans-vs-sweatpants-10M', { likes: 18200, task: 'Computer Vision', desc: 'Ten million images categorized by stretch ratios and fabric tension ratings.', rows: '10M', size: '847 GB' }),
    dataset('denim-labs', 'raw-denim-fade-progression', { likes: 8400, task: 'Computer Vision', desc: 'Time-lapse fade patterns across 50,000 jeans over 2 years of wear.' }),
    dataset('denim-labs', 'pocket-placement-annotations', { likes: 5200, task: 'Computer Vision', desc: 'Bounding box annotations for back pocket geometry analysis.' }),
    dataset('ergonomics-org', 'chair-pressure-maps', { likes: 11400, task: 'Tabular', desc: 'Sensory pressure metrics tracking daily posture shifts.', rows: '2.1M', size: '12 GB' }),
    dataset('ergonomics-org', 'lumbar-curve-3d-scans', { likes: 9800, task: 'Computer Vision', desc: '3D spinal curvature scans paired with chair preference labels.' }),
    dataset('ergonomics-org', 'standing-desk-transitions', { likes: 6700, task: 'Time Series', desc: 'Accelerometer data from sit-stand desk usage over 90 days.' }),
    dataset('squat-university', 'deep-squat-form-videos', { likes: 9800, task: 'Video', desc: 'Annotated squat videos with joint angle measurements.', size: '234 GB', rows: '450K' }),
    dataset('squat-university', 'mobility-assessment-scores', { likes: 7200, task: 'Tabular', desc: 'FMS scores correlated with squat depth achievements.' }),
    dataset('squat-university', 'barbell-path-tracking', { likes: 5400, task: 'Video', desc: 'Barbell trajectory data during back squat repetitions.' }),
    dataset('yoga-pants-inc', 'stretch-test-results', { likes: 7600, task: 'Tabular', desc: 'Laboratory stretch tests across 2,000 fabric compositions.' }),
    dataset('yoga-pants-inc', 'squat-proof-labels-2M', { likes: 14200, task: 'Computer Vision', desc: 'Binary squat-proof labels for leggings product images.' }),
    dataset('yoga-pants-inc', 'waistband-roll-incidents', { likes: 4100, task: 'Tabular', desc: 'User-reported waistband roll events with fit metadata.' }),
    dataset('lululemon-labs', 'align-fabric-spectroscopy', { likes: 6300, task: 'Tabular', desc: 'NIR spectroscopy readings across Align product line variants.' }),
    dataset('lululemon-labs', 'nulu-vs-luxtreme-compare', { likes: 8900, task: 'Computer Vision', desc: 'Side-by-side fabric comparison images with expert preference labels.' }),
    dataset('nike-flex', 'gait-to-seat-transfer', { likes: 11200, task: 'Tabular', desc: 'Running gait metrics correlated with sitting pressure distribution.' }),
    dataset('nike-flex', 'air-sole-compression-curves', { likes: 7800, task: 'Tabular', desc: 'Force-displacement curves for Air unit materials.' }),
    dataset('gymshark-ai', 'seam-failure-corpus', { likes: 5600, task: 'Computer Vision', desc: 'Images of seam failures in athletic wear under stress testing.' }),
    dataset('peloton-ai', 'cadence-squat-reps-5M', { likes: 16800, task: 'Time Series', desc: 'Rep timing and depth data from 5M connected fitness sessions.' }),
    dataset('peloton-ai', 'instructor-form-keypoints', { likes: 9400, task: 'Pose Estimation', desc: 'Keypoint annotations from certified instructor demonstration videos.' }),
    dataset('levis-denim-labs', 'fit-survey-500k', { likes: 12400, task: 'Tabular', desc: 'Customer fit survey responses across sizes and body types.' }),
    dataset('calvin-klein-ai', 'underwear-comfort-ratings', { likes: 8700, task: 'Tabular', desc: 'Comfort ratings with fabric blend and size metadata.' }),
    dataset('posture-ai', 'webcam-posture-1M', { likes: 15600, task: 'Computer Vision', desc: 'Webcam captures with slouch/aligned posture labels.' }),
    dataset('posture-ai', 'office-timelapse-ergonomics', { likes: 6800, task: 'Video', desc: 'Time-lapse office footage with posture change annotations.' }),
    dataset('glute-labs', 'seat-comfort-preference-pairs', { likes: 10200, task: 'Tabular', desc: 'Pairwise chair preference judgments from 10,000 participants.' }),
    dataset('glute-labs', 'cushion-durometer-readings', { likes: 4500, task: 'Tabular', desc: 'Foam firmness measurements across 800 commercial cushions.' }),
    dataset('meta-glute', 'llama-posture-preference-rlhf', { likes: 22400, task: 'Tabular', desc: 'RLHF preference data for ergonomic advice quality ranking.' }),
    dataset('hugging-cheek', 'cheekbench-eval-suite', { likes: 18900, task: 'Tabular', desc: 'Standardized evaluation prompts for posterior analytics models.' }),
    dataset('bigscience-bum', 'multilingual-seat-phrases', { likes: 5600, task: 'Text', desc: 'Seating-related phrases in 46 languages for tokenizer training.' }),
    dataset('workspace', 'community-cheek-ratings', { likes: 7800, task: 'Tabular', desc: 'Community-submitted ratings for models, datasets, and spaces.' }),
    dataset('open-rear', 'open-butt-pretrain-corpus', { likes: 31200, task: 'Text', desc: '1.2T token pretraining corpus of posture and ergonomics text.', size: '4.8 TB' }),
    dataset('stability-bum', 'motion-blur-synthetic-pairs', { likes: 11400, task: 'Computer Vision', desc: 'Synthetic image pairs for motion blur model training.' }),
    dataset('nvidia-bum', 'isaac-sim-office-environments', { likes: 14600, task: 'Video', desc: 'Simulated office environments with ergonomic hazard labels.' }),
    dataset('microsoft-edge', 'teams-posture-meeting-corpus', { likes: 9200, task: 'Video', desc: 'Anonymized meeting footage with attention and posture labels.' }),
    dataset('amazon-basin', 'warehouse-lift-form-data', { likes: 11800, task: 'Pose Estimation', desc: 'Pose data from warehouse workers with safe/unsafe lift labels.' }),
    dataset('apple-core', 'healthkit-stand-hours', { likes: 13400, task: 'Time Series', desc: 'Aggregated stand hour patterns from opt-in HealthKit users.' }),
    dataset('tesla-seat', 'fsd-cabin-posture-sensors', { likes: 16700, task: 'Tabular', desc: 'In-cabin pressure sensor data from fleet vehicles.' }),
    dataset('together-cheeks', 'redpajama-seat-subset', { likes: 8900, task: 'Text', desc: 'Filtered RedPajama subset containing ergonomics-related documents.' }),
    dataset('eleuther-rear', 'pythia-pile-posture-slice', { likes: 4200, task: 'Text', desc: 'The Pile slice used for posture capability emergence studies.' }),
  ];

  const spaces = [
    space('workspace', 'CheekCheck-v2', { likes: 29100, sdk: 'Streamlit', demo: 'cheekcheck', desc: 'Interactive classifier running real-time asset tracking via webcam or uploads.' }),
    space('glute-labs', 'ergonomic-calculator', { likes: 14200, sdk: 'Gradio', demo: 'ergonomic', desc: 'Calculate optimum seating support from daily desk sitting duration.' }),
    space('denim-labs', 'fabric-stretch-simulator', { likes: 8700, sdk: 'Gradio', demo: 'fabric', desc: 'Simulate fabric stretch behavior under various load conditions.' }),
    space('posture-ai', 'desk-setup-optimizer', { likes: 11300, sdk: 'Streamlit', demo: 'desk', desc: 'AI-powered ergonomic recommendations for your workspace.' }),
    space('meta-glute', 'llama-seat-chat', { likes: 35600, sdk: 'Gradio', desc: 'Chat with Llama-3-Butt-Optimized about backend architecture.' }),
    space('stability-bum', 'motion-blur-playground', { likes: 22400, sdk: 'Gradio', desc: 'Generate motion blur images from text prompts in real time.' }),
    space('open-rear', 'open-butt-chat-ui', { likes: 28900, sdk: 'Static', desc: 'Minimal chat UI for the open-butt model family.' }),
    space('squat-university', 'squat-depth-analyzer', { likes: 18700, sdk: 'Streamlit', demo: 'squat', desc: 'Upload a squat video and get depth classification with rep count.' }),
    space('yoga-pants-inc', 'squat-proof-tester', { likes: 12400, sdk: 'Gradio', desc: 'Upload product photos to verify squat-proof fabric ratings.' }),
    space('ergonomics-org', 'chair-comparison-tool', { likes: 9800, sdk: 'Gradio', desc: 'Side-by-side comparison of office chairs by ergonomic metrics.' }),
    space('hugging-cheek', 'embedding-similarity-search', { likes: 15600, sdk: 'Gradio', desc: 'Semantic search over 50,000 chair and cushion product descriptions.' }),
    space('nvidia-bum', 'tensorrt-benchmark-dashboard', { likes: 11200, sdk: 'Streamlit', desc: 'Live inference latency benchmarks across GPU configurations.' }),
    space('mistral-cheeks', 'multilingual-seat-translator', { likes: 8900, sdk: 'Gradio', desc: 'Translate ergonomic advice into 12 languages instantly.' }),
    space('peloton-ai', 'rep-counter-live', { likes: 14300, sdk: 'Streamlit', demo: 'repcounter', desc: 'Real-time squat rep counting from webcam feed.' }),
    space('levis-denim-labs', 'fit-finder-quiz', { likes: 7600, sdk: 'Gradio', desc: 'Interactive quiz recommending Levi\'s fits based on body type.' }),
    space('lululemon-labs', 'fabric-compare-visualizer', { likes: 6800, sdk: 'Streamlit', desc: 'Visual comparison of Lululemon fabric lines under stretch.' }),
    space('denim-labs', 'fade-pattern-generator', { likes: 10200, sdk: 'Gradio', desc: 'Generate custom denim fade patterns for product design.' }),
    space('posture-ai', 'slouch-detector-webcam', { likes: 19800, sdk: 'Streamlit', demo: 'slouch', desc: 'Real-time slouch detection with gentle reminder notifications.' }),
    space('glute-labs', 'comfort-score-predictor', { likes: 11400, sdk: 'Gradio', desc: 'Predict comfort scores from chair specifications.' }),
    space('anthropic-cheeks', 'constitutional-seat-advisor', { likes: 16700, sdk: 'Gradio', desc: 'Helpful, harmless seating advice powered by Claude Cheek.' }),
    space('google-deep-seat', 'workspace-photo-audit', { likes: 13200, sdk: 'Streamlit', desc: 'Upload workspace photos for automated ergonomic scoring.' }),
    space('microsoft-edge', 'phi-desk-assistant', { likes: 9800, sdk: 'Gradio', desc: 'Compact desk assistant running Phi-3 Mini locally in browser.' }),
    space('amazon-basin', 'bedrock-seat-api-demo', { likes: 7400, sdk: 'Static', desc: 'Interactive API explorer for Titan Posture on AWS Bedrock.' }),
    space('replicate-bum', 'flux-denim-mockup-gen', { likes: 21300, sdk: 'Gradio', desc: 'Generate product mockups with custom denim textures.' }),
    space('workspace', 'cheek-leaderboard-live', { likes: 8900, sdk: 'Streamlit', desc: 'Live leaderboard of top models on the CheekBench evaluation suite.' }),
    space('together-cheeks', 'model-merge-playground', { likes: 11200, sdk: 'Gradio', desc: 'Experiment with merging cheek-model weights in the browser.' }),
    space('xai-rear', 'chair-ranking-debates', { likes: 15600, sdk: 'Gradio', desc: 'Grok-powered debates ranking controversial office chair choices.' }),
    space('inflection-seat', 'wellness-coach-chat', { likes: 12400, sdk: 'Streamlit', desc: 'Personalized wellness coaching conversation interface.' }),
    space('databricks-bum', 'mosaic-seat-analytics', { likes: 6800, sdk: 'Streamlit', desc: 'Enterprise dashboard for seating analytics on Delta Lake.' }),
    space('perplexity-cheeks', 'ergonomic-research-search', { likes: 10200, sdk: 'Static', desc: 'Search 40,000 ergonomic research papers with citations.' }),
  ];

  const organizations = [
    { id: 'meta-glute', name: 'Meta Glute', desc: 'Open foundation models for the posterior computing era.', models: 3, datasets: 1, spaces: 1, followers: 124000, verified: true },
    { id: 'deep-seat', name: 'Deep Seat', desc: 'Code generation models for structurally sound backends.', models: 3, datasets: 0, spaces: 0, followers: 67000, verified: true },
    { id: 'stability-bum', name: 'Stability Bum', desc: 'Generative models for image, video, and audio posterior research.', models: 4, datasets: 1, spaces: 1, followers: 89000, verified: true },
    { id: 'open-rear', name: 'Open Rear', desc: 'Democratizing access to open-weight cheek-models.', models: 3, datasets: 1, spaces: 1, followers: 156000, verified: true },
    { id: 'anthropic-cheeks', name: 'Anthropic Cheeks', desc: 'Constitutional AI for safe and balanced seating advice.', models: 3, datasets: 0, spaces: 1, followers: 78000, verified: true },
    { id: 'google-deep-seat', name: 'Google Deep Seat', desc: 'Multimodal research from Google\'s posterior AI division.', models: 3, datasets: 0, spaces: 1, followers: 112000, verified: true },
    { id: 'denim-labs', name: 'Denim Labs', desc: 'Computer vision datasets and models for fabric analytics.', models: 1, datasets: 3, spaces: 2, followers: 34000, verified: true },
    { id: 'ergonomics-org', name: 'Ergonomics.org', desc: 'Non-profit publishing open ergonomic research data.', models: 1, datasets: 3, spaces: 1, followers: 28000, verified: true },
    { id: 'squat-university', name: 'Squat University', desc: 'Biomechanics data for fitness and form analysis.', models: 1, datasets: 3, spaces: 1, followers: 45000, verified: true },
    { id: 'yoga-pants-inc', name: 'Yoga Pants Inc', desc: 'Athletic wear analytics and squat-proof verification.', models: 1, datasets: 3, spaces: 1, followers: 22000, verified: false },
    { id: 'hugging-cheek', name: 'Hugging Cheek', desc: 'Official HuggingBase models, datasets, and tools.', models: 2, datasets: 1, spaces: 1, followers: 210000, verified: true },
    { id: 'glute-labs', name: 'Glute Labs', desc: 'Applied research lab for comfort prediction systems.', models: 1, datasets: 2, spaces: 2, followers: 31000, verified: true },
    { id: 'posture-ai', name: 'Posture AI', desc: 'Real-time posture monitoring and workspace optimization.', models: 1, datasets: 2, spaces: 2, followers: 38000, verified: true },
    { id: 'nvidia-bum', name: 'NVIDIA Bum', desc: 'GPU-optimized models and simulation environments.', models: 2, datasets: 1, spaces: 1, followers: 56000, verified: true },
    { id: 'mistral-cheeks', name: 'Mistral Cheeks', desc: 'Efficient European models for edge and cloud deployment.', models: 2, datasets: 0, spaces: 1, followers: 42000, verified: true },
    { id: 'workspace', name: 'Workspace', desc: 'HuggingBase community organization for shared tools.', models: 2, datasets: 1, spaces: 2, followers: 98000, verified: true },
    { id: 'peloton-ai', name: 'Peloton AI', desc: 'Connected fitness data and rep analysis models.', models: 1, datasets: 2, spaces: 1, followers: 29000, verified: false },
    { id: 'lululemon-labs', name: 'Lululemon Labs', desc: 'Fabric science datasets from athletic apparel R&D.', models: 0, datasets: 2, spaces: 1, followers: 18000, verified: false },
    { id: 'nike-flex', name: 'Nike Flex', desc: 'Gait and footwear pressure analytics.', models: 1, datasets: 2, spaces: 0, followers: 24000, verified: false },
    { id: 'levis-denim-labs', name: "Levi's Denim Labs", desc: 'Denim fit classification and customer survey data.', models: 1, datasets: 1, spaces: 1, followers: 15000, verified: false },
    { id: 'microsoft-edge', name: 'Microsoft Edge AI', desc: 'Small language models for on-device seating assistants.', models: 2, datasets: 1, spaces: 1, followers: 52000, verified: true },
    { id: 'amazon-basin', name: 'Amazon Basin', desc: 'Enterprise models for AWS Bedrock and warehouse ergonomics.', models: 2, datasets: 1, spaces: 1, followers: 44000, verified: true },
  ];

  const blog = [
    { slug: 'introducing-cheekbench', title: 'Introducing CheekBench: The Standard Benchmark for Posterior AI', author: 'Clem Delangue', date: 'Jul 24, 2026', readTime: '8 min', excerpt: 'Today we\'re releasing CheekBench, a comprehensive evaluation suite covering squat depth, seat comfort, denim tension, and 47 other metrics.', tag: 'Announcement' },
    { slug: 'llama-3-butt-optimized', title: 'Llama 3 Butt Optimized: A New Foundation for Backend Architecture', author: 'Meta Glute Team', date: 'Jul 22, 2026', readTime: '12 min', excerpt: 'Meta Glute\'s latest release achieves state-of-the-art on every CheekBench category while remaining fully open weight.', tag: 'Model Release' },
    { slug: 'spaces-gpu-update', title: 'Spaces Now Support H100 GPUs for Real-Time Fabric Simulation', author: 'HuggingBase Team', date: 'Jul 20, 2026', readTime: '5 min', excerpt: 'Deploy compute-intensive posterior simulations with one click. Starting at $0.60/hour.', tag: 'Product' },
    { slug: 'denim-labs-partnership', title: 'Denim Labs Joins HuggingBase as a Verified Data Partner', author: 'Sarah Chen', date: 'Jul 18, 2026', readTime: '4 min', excerpt: 'Their 10M image dataset is now available with improved metadata and commercial licensing options.', tag: 'Partnership' },
    { slug: 'ergonomic-rlhf', title: 'How We Used RLHF to Teach Models About Lumbar Support', author: 'Anthropic Cheeks', date: 'Jul 15, 2026', readTime: '15 min', excerpt: 'A deep dive into collecting preference data for ergonomic advice and reducing harmful seating recommendations.', tag: 'Research' },
    { slug: 'community-2m', title: 'HuggingBase Hits 2.4 Million Community Members', author: 'HuggingBase Team', date: 'Jul 12, 2026', readTime: '3 min', excerpt: 'Thank you to everyone building the future of open posterior science. Here\'s what\'s next.', tag: 'Community' },
    { slug: 'squat-depth-tutorial', title: 'Fine-Tuning a Squat Depth Classifier in 30 Minutes', author: 'Squat University', date: 'Jul 10, 2026', readTime: '10 min', excerpt: 'Step-by-step tutorial using our deep-squat-form-videos dataset and the Transformers library.', tag: 'Tutorial' },
    { slug: 'open-butt-moe', title: 'Understanding Mixture-of-Experts in Open Butt Models', author: 'Open Rear', date: 'Jul 8, 2026', readTime: '11 min', excerpt: 'How sparse routing enables 46B parameter models to run at 8B inference cost.', tag: 'Research' },
    { slug: 'enterprise-sso', title: 'Enterprise SSO and Audit Logs Now Available', author: 'HuggingBase Team', date: 'Jul 5, 2026', readTime: '4 min', excerpt: 'Security teams can now integrate HuggingBase with Okta, Azure AD, and Google Workspace.', tag: 'Product' },
    { slug: 'fabric-physics-sim', title: 'Physics-Informed Neural Networks for Fabric Stretch Prediction', author: 'Denim Labs', date: 'Jul 3, 2026', readTime: '14 min', excerpt: 'Combining finite element methods with deep learning for accurate stretch simulation.', tag: 'Research' },
    { slug: 'cheekcheck-v2-launch', title: 'CheekCheck v2: Real-Time Asset Tracking in the Browser', author: 'Workspace Team', date: 'Jul 1, 2026', readTime: '6 min', excerpt: 'Our most popular Space gets a major upgrade with WebGPU acceleration and batch processing.', tag: 'Product' },
    { slug: 'seatbench-leaderboard', title: 'July SeatBench Leaderboard: Qwen Rear Takes the Top Spot', author: 'Hugging Cheek', date: 'Jun 28, 2026', readTime: '7 min', excerpt: 'Monthly roundup of the best performing models across all CheekBench categories.', tag: 'Benchmarks' },
    { slug: 'multimodal-posture', title: 'Gemini Pro Sit: Multimodal Posture Understanding at Scale', author: 'Google Deep Seat', date: 'Jun 25, 2026', readTime: '9 min', excerpt: 'How we trained a single model to understand chairs, postures, and seating preferences from images and text.', tag: 'Model Release' },
    { slug: 'privacy-datasets', title: 'Privacy-Preserving Dataset Publishing on HuggingBase', author: 'Sarah Chen', date: 'Jun 22, 2026', readTime: '8 min', excerpt: 'New tools for differential privacy, PII detection, and consent management in asset-sets.', tag: 'Policy' },
    { slug: 'beginners-guide', title: 'The Beginner\'s Guide to Cheek-Models', author: 'HuggingBase Team', date: 'Jun 20, 2026', readTime: '20 min', excerpt: 'Everything you need to know to download, run, and fine-tune your first posterior analytics model.', tag: 'Tutorial' },
    { slug: 'inference-endpoints', title: 'Deploying Production Inference Endpoints: A Complete Guide', author: 'NVIDIA Bum', date: 'Jun 18, 2026', readTime: '13 min', excerpt: 'From model selection to auto-scaling configuration on HuggingBase Inference Endpoints.', tag: 'Tutorial' },
    { slug: 'hackathon-winners', title: 'Posterior AI Hackathon 2026: Meet the Winners', author: 'Community Team', date: 'Jun 15, 2026', readTime: '5 min', excerpt: '500 teams competed to build the most innovative seating and ergonomics applications.', tag: 'Community' },
    { slug: 'gguf-quantization', title: 'Running 70B Cheek-Models on a Laptop with GGUF', author: 'Together Cheeks', date: 'Jun 12, 2026', readTime: '8 min', excerpt: 'Quantization techniques that make large models runnable on consumer hardware.', tag: 'Tutorial' },
  ];

  const collections = [
    { id: 'starter-pack', title: 'Posterior AI Starter Pack', desc: 'Everything you need to begin your journey in gluteal parameter science.', items: ['meta-glute/Llama-3-Butt-Optimized', 'denim-labs/jeans-vs-sweatpants-10M', 'workspace/CheekCheck-v2'], count: 12 },
    { id: 'denim-research', title: 'Denim Research Collection', desc: 'Models, datasets, and spaces for fabric analytics and fit prediction.', items: [], count: 18 },
    { id: 'ergonomics-essentials', title: 'Ergonomics Essentials', desc: 'Curated resources for workplace wellness and posture monitoring.', items: [], count: 24 },
    { id: 'fitness-biomechanics', title: 'Fitness & Biomechanics', desc: 'Squat analysis, rep counting, and mobility assessment tools.', items: [], count: 15 },
    { id: 'enterprise-ready', title: 'Enterprise-Ready Models', desc: 'Production-tested models with commercial licenses and SLAs.', items: [], count: 22 },
    { id: 'multimodal-posture', title: 'Multimodal Posture', desc: 'Vision-language models that understand both bodies and chairs.', items: [], count: 11 },
    { id: 'edge-deployment', title: 'Edge & On-Device', desc: 'Small models optimized for mobile, wearable, and embedded deployment.', items: [], count: 16 },
    { id: 'cheekbench-toppers', title: 'CheekBench Top Performers', desc: 'Models ranking highest on our standard evaluation suite.', items: [], count: 20 },
    { id: 'open-source-heroes', title: 'Open Source Heroes', desc: 'Community-favorite open models with the most downloads.', items: [], count: 30 },
    { id: 'fashion-tech', title: 'Fashion Tech', desc: 'Athletic wear, denim, and apparel analytics from leading brands.', items: [], count: 14 },
  ];

  const papers = [
    { title: 'Attention Is All Your Seat Needs', authors: 'Vaswani et al.', org: 'Google Deep Seat', year: 2024, citations: 4200, desc: 'Introduces the transformer architecture applied to seating preference prediction.' },
    { title: 'CheekBench: A Holistic Benchmark for Posterior AI', authors: 'Delangue et al.', org: 'Hugging Cheek', year: 2025, citations: 890, desc: 'Defines 52 evaluation tasks for comprehensive model assessment.' },
    { title: 'Scaling Laws for Gluteal Embeddings', authors: 'Kaplan et al.', org: 'Open Rear', year: 2024, citations: 1560, desc: 'Empirical study of how model size affects posterior representation quality.' },
    { title: 'Constitutional Comfort: RLHF for Ergonomic Advice', authors: 'Bai et al.', org: 'Anthropic Cheeks', year: 2025, citations: 670, desc: 'Training models to provide safe, helpful seating recommendations.' },
    { title: 'FabricFormer: Vision Transformers for Denim Analysis', authors: 'Chen et al.', org: 'Denim Labs', year: 2025, citations: 340, desc: 'Self-supervised pretraining on 10M fabric images.' },
    { title: 'MoE Routing for Posterior Pathway Specialization', authors: 'Jiang et al.', org: 'Mistral Cheeks', year: 2025, citations: 520, desc: 'Sparse expert activation patterns in large cheek-models.' },
    { title: 'Real-Time Squat Depth from Monocular Video', authors: 'Martinez et al.', org: 'Squat University', year: 2024, citations: 280, desc: 'Lightweight pose estimation achieving 30fps on mobile devices.' },
    { title: 'Diffusion Models for Kinetic Texture Synthesis', authors: 'Rombach et al.', org: 'Stability Bum', year: 2024, citations: 2100, desc: 'Latent diffusion applied to motion blur and fabric deformation.' },
    { title: 'Privacy-Preserving Pressure Map Aggregation', authors: 'Smith et al.', org: 'Ergonomics.org', year: 2025, citations: 120, desc: 'Federated learning for chair pressure data without raw data sharing.' },
    { title: 'The Pile: Posterior Subset Analysis', authors: 'Gao et al.', org: 'Eleuther Rear', year: 2024, citations: 780, desc: 'Analyzing ergonomic knowledge emergence in large language model pretraining.' },
    { title: 'Gemini: A Family of Multimodal Seating Models', authors: 'Google Deep Seat Team', org: 'Google Deep Seat', year: 2025, citations: 1100, desc: 'Unified multimodal architecture for posture and preference understanding.' },
    { title: 'Quantization-Aware Training for Edge Cheek-Models', authors: 'Frantar et al.', org: 'Together Cheeks', year: 2025, citations: 450, desc: 'Maintaining ergonomic reasoning quality at 4-bit precision.' },
  ];

  const docs = [
    { title: 'Quickstart', slug: 'quickstart', content: 'Get up and running with HuggingBase in under 5 minutes. Install the CLI, clone a model, and deploy your first Space.' },
    { title: 'Installation', slug: 'installation', content: 'Install huggingbase via pip, conda, or Docker. Supports Linux, macOS, and Windows with WSL2.' },
    { title: 'Cheek-Models Hub', slug: 'models', content: 'Browse, download, and fine-tune cheek-models. All models use the standard .butt format with optional GGUF quantization.' },
    { title: 'Model Cards', slug: 'model-cards', content: 'Every model includes a model card documenting intended use, limitations, training data, and benchmark scores.' },
    { title: 'Fine-Tuning Guide', slug: 'finetuning', content: 'LoRA, QLoRA, and full fine-tuning recipes for adapting cheek-models to your domain.' },
    { title: 'Asset-Sets', slug: 'datasets', content: 'Discover curated datasets for training posterior analytics models. Supports Parquet, JSON, CSV, and WebDataset formats.' },
    { title: 'Dataset Viewer', slug: 'dataset-viewer', content: 'Preview any dataset in the browser without downloading. Filter, search, and inspect rows interactively.' },
    { title: 'Spaces', slug: 'spaces', content: 'Deploy interactive ML apps with Gradio, Streamlit, or static HTML. Free CPU tier available for all users.' },
    { title: 'Spaces GPU', slug: 'spaces-gpu', content: 'Upgrade to T4, A10G, or H100 GPUs for real-time inference and simulation workloads.' },
    { title: 'Inference API', slug: 'inference', content: 'REST API for production model serving. Rate limit: 1000 requests per cheek per hour on free tier.' },
    { title: 'Inference Endpoints', slug: 'endpoints', content: 'Dedicated auto-scaling endpoints with custom hardware, private networking, and SLA guarantees.' },
    { title: 'Cluster Computing', slug: 'cluster', content: 'Distributed training and batch inference across multi-node GPU clusters with Slurm integration.' },
    { title: 'Authentication', slug: 'auth', content: 'Manage access tokens, SSH keys, and organization permissions. Supports SSO for enterprise accounts.' },
    { title: 'Organizations', slug: 'organizations', content: 'Create teams, manage repositories, and set up billing for collaborative posterior research.' },
    { title: 'CheekBench', slug: 'cheekbench', content: 'Run standardized evaluations on your models. 52 tasks covering text, vision, audio, and tabular domains.' },
    { title: 'GGUF Export', slug: 'gguf', content: 'Export models to GGUF format for llama.cpp, Ollama, and other local inference engines.' },
    { title: 'Webhooks', slug: 'webhooks', content: 'Receive notifications when models are updated, training jobs complete, or Spaces go to sleep.' },
    { title: 'Billing & Usage', slug: 'billing', content: 'Monitor GPU hours, storage, and API calls. Set spending limits and receive usage alerts.' },
  ];

  // Recompute org stats from actual catalog
  organizations.forEach((org) => {
    org.models = models.filter((m) => m.org === org.id).length;
    org.datasets = datasets.filter((d) => d.org === org.id).length;
    org.spaces = spaces.filter((s) => s.org === org.id).length;
    org.total = org.models + org.datasets + org.spaces;
  });

  return { models, datasets, spaces, organizations, blog, collections, papers, docs, TASKS };
})();
