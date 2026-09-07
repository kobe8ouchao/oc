import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const NAV = [
  { id: 'business', label: 'Business' },
  { id: 'showcase', label: 'Showcase' },
]

const CAPABILITIES = [
  {
    title: 'AI for the enterprise',
    body: 'Models are only worth anything when they slot into a real workflow. I wire them into your systems with the unglamorous parts handled — evaluation, guardrails, and logs you can actually read.',
  },
  {
    title: 'Full-stack development',
    body: 'From the database schema to the last pixel of the interface. I ship web apps that load fast, work on any screen, and stay easy for your team to maintain.',
  },
  {
    title: 'Agent building',
    body: 'Small, focused assistants that finish a job end to end — reading your inbox, drafting the reply, filing the report — with a person kept in the loop.',
  },
]

const FEATURES = [
  {
    title: 'Voice-first booking',
    body: 'Captures intent from natural speech, not menu prompts.',
  },
  {
    title: 'Context-aware replies',
    body: 'Knows availability, preferences, and past conversations.',
  },
  {
    title: 'Summaries as tidy cards',
    body: 'Turns a finished task into a clear, confirmable record.',
  },
]

const EMAIL_FEATURES = [
  {
    title: 'Inbox ingestion',
    body: 'Pulls new mail from any inbox, in real time.',
  },
  {
    title: 'Intent classification',
    body: 'Tells a lead from a request from a complaint — automatically.',
  },
  {
    title: 'Auto-drafting',
    body: 'Writes a reply draft, then hands off for a quick human check.',
  },
]

const RAG_FEATURES = [
  {
    title: 'Ingestion & chunking',
    body: 'Splits files into clean, queryable chunks.',
  },
  {
    title: 'Vector indexing',
    body: 'Embeds and links chunks into one searchable graph.',
  },
  {
    title: 'Grounded answers',
    body: 'Retrieves source passages, then answers with citations.',
  },
]

function Logo({ compact = false }) {
  const ringSize = compact ? 'h-4 w-4' : 'h-7 w-7'
  const wordSize = compact
    ? 'font-display font-medium text-foreground'
    : 'font-display text-lg font-semibold tracking-tight text-foreground'

  return (
    <a href="#top" className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className={`${ringSize} text-primary`} aria-hidden="true">
        <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
      <span className={wordSize}>Ochre</span>
    </a>
  )
}

function Hamburger({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

function Header({ active }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                active === item.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Hamburger open={open} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function MatrixRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    const fontSize = 16
    const chars = '01<>/\\+*'
    let cols = 0
    let drops = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / fontSize)
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -30))
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.fillStyle = 'rgba(246, 240, 229, 0.08)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${fontSize}px "DM Mono", ui-monospace, monospace`
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = 'rgba(176, 111, 60, 0.55)'
        ctx.fillText(ch, x, y)
        if (y > h && Math.random() > 0.975) drops[i] = Math.floor(Math.random() * -30)
        drops[i] += 0.35
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30" />
  )
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen w-full items-center justify-center px-5 py-24 md:px-8">
      <MatrixRain />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-5 text-sm font-medium tracking-wide text-primary">
          AI-FIRST STUDIO
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
          AI that drives your business forward.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          We help companies modernise with AI — voice assistants, autonomous agents, and
          retrieval systems that plug straight into how your team already works.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#business"
            className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
          >
            Start a project
          </a>
        </div>
      </div>

      <a
        href="#business"
        aria-label="Scroll down"
        className="pointer-events-auto absolute inset-x-0 bottom-24 z-10 flex flex-col items-center gap-1.5 text-muted-foreground/70 transition-colors hover:text-primary"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <svg
          viewBox="0 0 24 24"
          className="scroll-chevron h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 9l7 7 7-7" />
        </svg>
      </a>
    </section>
  )
}

function Business() {
  return (
    <section id="business" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-sm font-medium tracking-wide text-primary">What I do</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Capabilities
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.title}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="reveal rounded-xl border border-border bg-card p-6"
            >
              <span className="font-display text-2xl font-semibold text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5 9-10" />
    </svg>
  )
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

function BranchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="17" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M6 7v4a2 2 0 0 0 2 2h8" />
      <path d="M18 7v6" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10V4a1 1 0 0 1 1-1h6l11 11-7 7L3 10z" />
      <circle cx="8" cy="8" r="1.5" />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l2.5 7 7 2.5-7 2.5L12 22l-2.5-7-7-2.5 7-2.5z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.1-.4-4.4-1.1L3 20l1.1-5.1A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  )
}

const EMAIL_TEAMS = [
  { name: 'Sales', icon: <TagIcon /> },
  { name: 'Design', icon: <PenIcon /> },
  { name: 'Support', icon: <ChatIcon /> },
]

function FlowNode({ icon, title, sub, tone = 'neutral', delay = 0 }) {
  const isPrimary = tone === 'primary'
  return (
    <div
      className={`bubble-in flex items-center gap-3 rounded-xl border px-4 py-3 ${
        isPrimary ? 'node-pulse border-primary/30 bg-primary/10' : 'border-border bg-card'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isPrimary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
        }`}
      >
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold leading-tight text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">{sub}</span>
      </span>
    </div>
  )
}

function FlowLine() {
  return (
    <span className="relative mx-auto block h-9 w-px bg-border">
      <span className="flow-y absolute left-1/2 top-0 -ml-[3px] h-1.5 w-1.5 rounded-full bg-primary" />
    </span>
  )
}

function FlowBranch() {
  return (
    <span className="relative mx-auto my-1 block h-px w-[80%] overflow-hidden bg-border">
      <span className="flow-x absolute left-0 top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary" />
    </span>
  )
}

function EmailAgentDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] rounded-2xl border border-border bg-background p-5 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.25)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
            <InboxIcon />
          </span>
          <span className="font-display text-sm font-semibold text-foreground">Email pipeline</span>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Live</span>
      </div>

      <div className="flex flex-col">
        <FlowNode delay={0} icon={<InboxIcon />} title="Inbox" sub="New mail arrives" />
        <FlowLine />
        <FlowNode delay={120} icon={<SearchIcon />} title="Read & analyze" sub="Intent, urgency & sentiment" />
        <FlowLine />
        <FlowNode delay={240} tone="primary" icon={<BranchIcon />} title="Classify & route" sub="Agent decides the team" />
        <FlowLine />
        <FlowBranch />
        <div className="grid grid-cols-3 gap-2.5">
          {EMAIL_TEAMS.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card px-1 py-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-foreground">{t.icon}</span>
              <span className="text-xs font-medium text-foreground">{t.name}</span>
            </div>
          ))}
        </div>
        <FlowBranch />
        <FlowLine />
        <FlowNode delay={360} icon={<DocIcon />} title="Draft reply" sub="Ready for human review" />
      </div>
    </div>
  )
}

const RAG_CATEGORIES = {
  Source: '#c9924a',
  Process: '#b06f3c',
  Core: '#7f4a28',
  Query: '#8a7b3f',
  Answer: '#4f8070',
}

const RAG_NODES = [
  { id: 'pdf', name: 'PDF', cat: 'Source', desc: 'Scanned reports, contracts and papers ready to be indexed.' },
  { id: 'notion', name: 'Notion', cat: 'Source', desc: 'Team wikis and project notes pulled straight into the base.' },
  { id: 'docs', name: 'Docs', cat: 'Source', desc: 'Google Docs and shared files, kept in one place.' },
  { id: 'web', name: 'Web', cat: 'Source', desc: 'Crawled pages and help articles, refreshed on schedule.' },
  { id: 'csv', name: 'CSV', cat: 'Source', desc: 'Tabular exports and structured records from your tools.' },
  { id: 'api', name: 'API', cat: 'Source', desc: 'Live data streamed in from internal systems.' },
  { id: 'slack', name: 'Slack', cat: 'Source', desc: 'Channel messages and threads, searchable on demand.' },
  { id: 'email', name: 'Email', cat: 'Source', desc: 'Threads and attachments from the shared inbox.' },
  { id: 'drive', name: 'Drive', cat: 'Source', desc: 'Presentations and spreadsheets in shared drives.' },
  { id: 'crm', name: 'CRM', cat: 'Source', desc: 'Customer records and deal history from sales.' },
  { id: 'parse', name: 'Parse', cat: 'Process', desc: 'Turns raw files into clean, readable text.' },
  { id: 'clean', name: 'Clean', cat: 'Process', desc: 'Strips noise, markers and duplicated content.' },
  { id: 'chunk', name: 'Chunk', cat: 'Process', desc: 'Splits long documents into compact, queryable pieces.' },
  { id: 'extract', name: 'Extract', cat: 'Process', desc: 'Pulls key entities and structure out of each chunk.' },
  { id: 'embed', name: 'Embed', cat: 'Process', desc: 'Maps each chunk into a dense vector representation.' },
  { id: 'index', name: 'Vector index', cat: 'Process', desc: 'Stores vectors for fast, approximate similarity search.' },
  { id: 'kb', name: 'Knowledge base', cat: 'Core', desc: 'The single source of truth your agents actually rely on.' },
  { id: 'cache', name: 'Cache', cat: 'Core', desc: 'Reuses frequent results so answers stay fast and cheap.' },
  { id: 'query', name: 'Query', cat: 'Query', desc: 'A question asked in plain, natural language.' },
  { id: 'refine', name: 'Refine', cat: 'Query', desc: 'Reformulates the question into a sharper search intent.' },
  { id: 'retrieve', name: 'Retrieve', cat: 'Query', desc: 'Finds the passages most relevant to the question.' },
  { id: 'context', name: 'Context', cat: 'Query', desc: 'Assembles source material around the question.' },
  { id: 'rerank', name: 'Rerank', cat: 'Process', desc: 'Orders passages by true relevance, not just similarity.' },
  { id: 'answer', name: 'Answer', cat: 'Answer', desc: 'Writes a grounded reply from the retrieved sources.' },
  { id: 'citations', name: 'Citations', cat: 'Answer', desc: 'Links every claim back to where it came from.' },
]

const RAG_LINKS = [
  ['pdf', 'parse'], ['notion', 'parse'], ['docs', 'parse'],
  ['web', 'parse'], ['csv', 'parse'], ['api', 'parse'],
  ['slack', 'parse'], ['email', 'parse'], ['drive', 'parse'],
  ['crm', 'parse'],
  ['parse', 'clean'], ['clean', 'chunk'], ['chunk', 'extract'],
  ['extract', 'embed'], ['embed', 'index'], ['index', 'cache'],
  ['query', 'refine'], ['refine', 'retrieve'],
  ['retrieve', 'index'],
  ['retrieve', 'context'], ['context', 'rerank'],
  ['rerank', 'answer'], ['answer', 'citations'],
]

function RagGraph() {
  const containerRef = useRef(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const hexToInt = (h) => parseInt(h.slice(1), 16)

    // --- graph data ---
    const centerId = 'kb'
    const nodeMap = new Map()
    const nodes = RAG_NODES.map((d, i) => {
      const n = {
        ...d,
        index: i,
        degree: 0,
        x: d.id === centerId ? 0 : (Math.random() - 0.5) * 26,
        y: d.id === centerId ? 0 : (Math.random() - 0.5) * 26,
        z: d.id === centerId ? 0 : (Math.random() - 0.5) * 26,
        vx: 0,
        vy: 0,
        vz: 0,
      }
      nodeMap.set(d.id, n)
      return n
    })
    const linksData = [
      ...RAG_LINKS,
      ...RAG_NODES.filter((d) => d.id !== centerId).map((d) => [d.id, centerId]),
    ]
    const links = linksData.map(([s, t]) => {
      const a = nodeMap.get(s)
      const b = nodeMap.get(t)
      a.degree++
      b.degree++
      return { s: a.index, t: b.index }
    })
    const neighbors = new Map()
    nodes.forEach((n) => neighbors.set(n.id, new Set()))
    linksData.forEach(([s, t]) => {
      neighbors.get(s).add(t)
      neighbors.get(t).add(s)
    })

    // --- renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      2000,
    )
    camera.position.set(70, 46, 105)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.rotateSpeed = 0.65
    controls.zoomSpeed = 1.0
    controls.panSpeed = 0.8
    controls.minDistance = 18
    controls.maxDistance = 340
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // --- lights ---
    scene.add(new THREE.AmbientLight(0xfff1e0, 1.15))
    const key = new THREE.DirectionalLight(0xffffff, 2.3)
    key.position.set(90, 140, 70)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffd9a3, 1.1)
    rim.position.set(-70, -50, -90)
    scene.add(rim)

    // --- warm dust background ---
    const dustPos = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      const r = 360 + Math.random() * 300
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      dustPos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      dustPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      dustPos[i * 3 + 2] = r * Math.cos(ph)
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({ color: 0xd8a55a, size: 0.9, transparent: true, opacity: 0.22 })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // --- nodes ---
    const sphereGeo = new THREE.SphereGeometry(1, 48, 48)
    const nodeMesh = new Map()
    const nodeMat = new Map()
    const nodeGroup = new Map()
    const labelSprite = new Map()

    function roundedRect(ctx, x, y, w, h, r) {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }

    function makeLabel(text, borderHex) {
      const font = '600 26px "DM Sans","Space Grotesk","Segoe UI",sans-serif'
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d')
      ctx.font = font
      const tw = ctx.measureText(text).width
      const padX = 10
      const padY = 6
      const w = Math.ceil(tw + padX * 2)
      const h = 26 + padY * 2
      const ratio = 2
      c.width = w * ratio
      c.height = h * ratio
      ctx.scale(ratio, ratio)
      ctx.font = font
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      roundedRect(ctx, 1, 1, w - 2, h - 2, (h - 2) / 2)
      ctx.fillStyle = 'rgba(255,251,242,0.92)'
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = borderHex
      ctx.stroke()
      ctx.fillStyle = '#3a2c20'
      ctx.fillText(text, w / 2, h / 2)

      const tex = new THREE.CanvasTexture(c)
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
      tex.minFilter = THREE.LinearFilter
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
      const sp = new THREE.Sprite(mat)
      const hWorld = 0.85
      sp.scale.set((w / h) * hWorld, hWorld, 1)
      return sp
    }

    nodes.forEach((n) => {
      n.size = 0.34 + Math.min(n.degree, 20) * 0.02
      if (n.id === centerId) n.size *= 1.15
      const colHex = RAG_CATEGORIES[n.cat]
      const color = new THREE.Color(hexToInt(colHex))
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.45,
        metalness: 0.15,
        emissive: color.clone(),
        emissiveIntensity: 0.18,
      })
      const mesh = new THREE.Mesh(sphereGeo, mat)
      mesh.scale.setScalar(n.size)
      mesh.userData.id = n.id

      const label = makeLabel(n.name, colHex)
      label.position.y = n.size + 0.78

      const g = new THREE.Group()
      g.add(mesh)
      g.add(label)
      g.position.set(n.x, n.y, n.z)
      scene.add(g)

      nodeMesh.set(n.id, mesh)
      nodeMat.set(n.id, mat)
      nodeGroup.set(n.id, g)
      labelSprite.set(n.id, label)
    })

    // --- edges ---
    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(links.length * 6), 3))
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xc49b66, transparent: true, opacity: 0.42 })
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat)
    scene.add(edgeLines)

    // --- physics ---
    const REPULSION = 1400
    const SPRING_K = 0.03
    const REST = 10
    const DAMPING = 0.8
    const MAXV = 1.2
    const CENTER = 0.006
    const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)

    function stepPhysics() {
      const n = nodes.length
      for (let i = 0; i < n; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < n; j++) {
          const b = nodes[j]
          let dx = a.x - b.x
          let dy = a.y - b.y
          let dz = a.z - b.z
          let d2 = dx * dx + dy * dy + dz * dz
          if (d2 < 0.01) {
            const ang = Math.random() * Math.PI * 2
            dx = Math.cos(ang) * 0.1
            dy = Math.sin(ang) * 0.1
            dz = (Math.random() - 0.5) * 0.1
            d2 = dx * dx + dy * dy + dz * dz + 0.0001
          }
          const d = Math.sqrt(d2)
          const f = REPULSION / d2
          const fx = (dx / d) * f
          const fy = (dy / d) * f
          const fz = (dz / d) * f
          a.vx += fx; a.vy += fy; a.vz += fz
          b.vx -= fx; b.vy -= fy; b.vz -= fz
        }
        const ck = a.id === centerId ? 9 : 1
        a.vx -= a.x * CENTER * ck
        a.vy -= a.y * CENTER * ck
        a.vz -= a.z * CENTER * ck
      }
      for (const l of links) {
        const a = nodes[l.s]
        const b = nodes[l.t]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dz = b.z - a.z
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001
        const f = (d - REST) * SPRING_K
        const fx = (dx / d) * f
        const fy = (dy / d) * f
        const fz = (dz / d) * f
        a.vx += fx; a.vy += fy; a.vz += fz
        b.vx -= fx; b.vy -= fy; b.vz -= fz
      }
      for (const nd of nodes) {
        nd.vx = clamp(nd.vx * DAMPING, -MAXV, MAXV)
        nd.vy = clamp(nd.vy * DAMPING, -MAXV, MAXV)
        nd.vz = clamp(nd.vz * DAMPING, -MAXV, MAXV)
        nd.x += nd.vx
        nd.y += nd.vy
        nd.z += nd.vz
      }
    }

    // --- picking ---
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const sphereMeshes = nodes.map((n) => nodeMesh.get(n.id))
    let hoveredId = null

    function pick(clientX, clientY) {
      const r = renderer.domElement.getBoundingClientRect()
      pointer.x = ((clientX - r.left) / r.width) * 2 - 1
      pointer.y = -((clientY - r.top) / r.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(sphereMeshes, false)
      return hits.length ? hits[0].object.userData.id : null
    }

    function applyHighlight(id) {
      const active = new Set()
      if (id) {
        active.add(id)
        neighbors.get(id).forEach((x) => active.add(x))
      }
      nodes.forEach((n) => {
        const m = nodeMesh.get(n.id)
        const intensity = id ? (active.has(n.id) ? 0.55 : 0.12) : 0.18
        nodeMat.get(n.id).emissiveIntensity = intensity
        m.scale.setScalar(id ? (active.has(n.id) ? n.size * 1.12 : n.size * 0.6) : n.size)
      })
      edgeMat.opacity = id ? 0.08 : 0.42
      renderer.domElement.style.cursor = id ? 'pointer' : 'grab'
    }

    const onPointerMove = (e) => {
      hoveredId = pick(e.clientX, e.clientY)
      applyHighlight(hoveredId)
    }
    const onPointerLeave = () => {
      hoveredId = null
      applyHighlight(null)
    }
    let downPos = null
    const onPointerDown = (e) => {
      downPos = { x: e.clientX, y: e.clientY }
    }
    const onPointerUp = (e) => {
      if (downPos && Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) < 5) {
        const id = pick(e.clientX, e.clientY)
        if (id) {
          const n = nodeMap.get(id)
          setInfo({ name: n.name, cat: n.cat, desc: n.desc, color: RAG_CATEGORIES[n.cat] })
        } else {
          setInfo(null)
        }
      }
      downPos = null
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerleave', onPointerLeave)
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointerup', onPointerUp)

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // --- loop ---
    const posAttr = edgeGeo.attributes.position
    let raf
    function animate() {
      raf = requestAnimationFrame(animate)
      stepPhysics()
      for (const n of nodes) nodeGroup.get(n.id).position.set(n.x, n.y, n.z)
      const arr = posAttr.array
      for (let i = 0; i < links.length; i++) {
        const a = nodes[links[i].s]
        const b = nodes[links[i].t]
        const o = i * 6
        arr[o] = a.x
        arr[o + 1] = a.y
        arr[o + 2] = a.z
        arr[o + 3] = b.x
        arr[o + 4] = b.y
        arr[o + 5] = b.z
      }
      posAttr.needsUpdate = true
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      controls.dispose()
      sphereGeo.dispose()
      dustGeo.dispose()
      edgeGeo.dispose()
      edgeMat.dispose()
      dustMat.dispose()
      nodeMat.forEach((m) => m.dispose())
      labelSprite.forEach((s) => {
        s.material.map.dispose()
        s.material.dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        ref={containerRef}
        className="h-[420px] w-full cursor-grab active:cursor-grabbing sm:h-[480px] lg:h-[520px]"
      />

      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
        {Object.entries(RAG_CATEGORIES).map(([cat, color]) => (
          <span
            key={cat}
            className="flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {cat}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/80 px-3 py-1.5 text-[11px] text-muted-foreground shadow-sm backdrop-blur">
        Drag to rotate · Scroll to zoom · Hover a node
      </div>

      {info && (
        <div className="absolute left-3 top-1/2 w-[240px] -translate-y-1/2 rounded-xl bg-background/95 p-4 shadow-xl backdrop-blur">
          <button
            type="button"
            onClick={() => setInfo(null)}
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground hover:bg-secondary"
            aria-label="Close"
          >
            ✕
          </button>
          <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: info.color }}>
            {info.cat}
          </span>
          <p className="mt-1 font-display text-base font-semibold text-foreground">{info.name}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{info.desc}</p>
        </div>
      )}
    </div>
  )
}

function VoiceAssistantDemo() {
  const [step, setStep] = useState(0)
  const DURATIONS = [1500, 1200, 1300, 1100, 2200]
  const TODOS = ['Send weekly report', 'Approve design mockup', 'Call the supplier']

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((s) => (s + 1) % DURATIONS.length)
    }, DURATIONS[step])
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div className="relative h-[600px] w-[290px]">
      <span className="absolute -left-[2px] top-24 h-8 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -left-[2px] top-36 h-12 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-r bg-neutral-700" />

      <div className="absolute inset-0 rounded-[3rem] bg-neutral-900 p-[6px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.45)]">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.6rem] bg-background">
          <div className="relative flex items-center justify-between px-7 pt-3 text-[10px] font-medium text-foreground">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2.5 h-[22px] w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
            <span className="flex items-center gap-1">
              <span className="text-[9px]">●●●</span>
              <span className="text-[11px]">▮▮</span>
            </span>
          </div>

          <div className="flex flex-col items-center pt-4">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <span className="orb-ripple absolute inset-0 rounded-full bg-primary/30" />
              <span className="orb-breathe absolute inset-2 overflow-hidden rounded-full bg-gradient-to-br from-accent to-primary shadow-[inset_0_-6px_12px_rgba(0,0,0,0.15)]">
                <span className="absolute left-3.5 top-2 h-6 w-6 rounded-full bg-white/30 blur-[2px]" />
                <span className="eye-wrap absolute inset-x-0 top-[32%] flex items-center justify-center gap-4">
                  <span className="eye relative h-4 w-4 rounded-full bg-white" />
                  <span className="eye relative h-4 w-4 rounded-full bg-white" />
                </span>
              </span>
            </div>
            <span className="mt-2 text-xs font-medium text-muted-foreground">Ochre Assistant</span>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-2.5 px-4 pb-4">
            {step >= 1 && (
              <div className="bubble-in ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-primary px-3.5 py-2 text-[12.5px] leading-snug text-primary-foreground">
                Help me record today&apos;s client call at 4pm.
              </div>
            )}
            {step >= 2 && (
              <div className="bubble-in max-w-[85%] rounded-lg rounded-bl-sm border border-border bg-card px-3.5 py-2 text-[12.5px] leading-snug text-foreground">
                Sure — recorded. Wrapping it up now.
              </div>
            )}
            {step >= 3 && (
              <div className="bubble-in ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-primary px-3.5 py-2 text-[12.5px] leading-snug text-primary-foreground">
                Show me today&apos;s to-dos.
              </div>
            )}
            {step >= 4 && (
              <div className="bubble-in flex w-full max-w-[94%] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckIcon />
                    </span>
                    <p className="font-display text-sm font-semibold text-foreground">
                      Today&apos;s to-dos
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {TODOS.length} / {TODOS.length}
                  </span>
                </div>

                <ul className="divide-y divide-border px-3.5">
                  {TODOS.map((t) => (
                    <li key={t} className="flex items-center gap-2.5 py-2">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckIcon />
                      </span>
                      <span className="text-[12px] text-foreground">{t}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground">Done</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 border-t border-border px-3.5 py-2.5">
                  <p className="text-[11px] text-muted-foreground">All done — please confirm.</p>
                  <button
                    type="button"
                    className="ml-auto rounded-md bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 px-4 pb-3 pt-2">
            <span className="flex items-end gap-1">
              <span className="wave-bar h-3 w-[3px] rounded-full bg-primary" />
              <span className="wave-bar h-3 w-[3px] rounded-full bg-primary" style={{ animationDelay: '120ms' }} />
              <span className="wave-bar h-3 w-[3px] rounded-full bg-primary" style={{ animationDelay: '240ms' }} />
              <span className="wave-bar h-3 w-[3px] rounded-full bg-primary" style={{ animationDelay: '360ms' }} />
            </span>
            <span className="text-[12px] font-medium text-muted-foreground">Listening…</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Showcase() {
  return (
    <section id="showcase" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-sm font-medium tracking-wide text-primary">Showcase</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Selected work
        </h2>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="reveal">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Intelligent Voice Assistant
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A voice interface that answers, books, and routes — so callers get things done
              without waiting on hold or pressing through a menu.
            </p>
            <ul className="mt-8 space-y-4">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-9 inline-block rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              Discuss a voice assistant
            </a>
          </div>

          <div data-reveal className="reveal flex justify-center">
            <VoiceAssistantDemo />
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 border-t border-border pt-20 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="reveal order-2 flex justify-center lg:order-1">
            <EmailAgentDemo />
          </div>
          <div data-reveal className="reveal order-1 lg:order-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Email Agent
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              An inbox that sorts itself. Incoming mail is read, classified, and routed to the
              right team with a draft reply already prepared — so nothing sits unanswered.
            </p>
            <ul className="mt-8 space-y-4">
              {EMAIL_FEATURES.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-9 inline-block rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              Automate your inbox
            </a>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 border-t border-border pt-20 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="reveal">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              RAG system
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Turn documents into a searchable knowledge base. Sources are chunked, embedded, and
              indexed into a graph your agents can query — with the exact passages attached to
              every answer.
            </p>
            <ul className="mt-8 space-y-4">
              {RAG_FEATURES.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-9 inline-block rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              Build your knowledge base
            </a>
          </div>
          <div data-reveal className="reveal flex justify-center">
            <RagGraph />
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-primary">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Let&apos;s build something useful.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Tell me what&apos;s slowing you down, and I&apos;ll tell you what I&apos;d do about
            it. No pitch deck, no fluff.
          </p>
          <a
            href="mailto:hello@ochre.studio"
            className="mt-8 inline-block rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            hello@ochre.studio
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="h-4 w-4 text-primary" aria-hidden="true">
            <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="4" />
          </svg>
          <span className="font-display font-medium text-foreground">Ochre</span>
        </div>
        <p>© {new Date().getFullYear()} Ochre. Built with care.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [active, setActive] = useState('business')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 560)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    revealEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header active={active} />
      <main>
        <Hero />
        <Business />
        <Showcase />
        <Contact />
      </main>
      <Footer />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed right-5 bottom-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur transition-all duration-300 hover:border-primary/50 hover:text-primary ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}