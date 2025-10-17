import React from "react";
import { createRoot } from "react-dom/client";
import "./src/index.css";

export default function AntonKundenkoSite() {
  const BG = "#001B14";
  const PRI = "#00FF9C";
  const ACC = "#66FFC2";
  const DIM = "#A3F7BF";
  const BRD = "#007A4B";

  const projects = [
    { title: "ThePlatform", href: "https://theplatform.technology/", tagline: "K-inspired high-performance data processing platform", blurb: "Static dispatch parser. Vector pipelines. Zero-GC hot path. Built for speed and clarity.", chips: ["K-style", "SIMD", "C"] },
    { title: "RayforceDB", href: "https://rayforcedb.com/", tagline: "Lisp-like vector database engine in C with zero dependencies", blurb: "Custom allocator. On-demand GC for mmapped slabs <32M. Query language built for vectors.", chips: ["Lisp VM", "Allocator", "MMap"] },
    { title: "AXL-DB", href: "https://axl-db.com/", tagline: "Tiny vector database: SIMD, memory-mapped arrays, custom allocators", blurb: "Fused loops at runtime. Verb-wire ops (+,−,*,/). Swiss-style tables and fast joins.", chips: ["SIMD", "Open Addressing", "C"] },
  ];

  const links = [
    { label: "GitHub", href: "https://github.com/singaraiona" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anton-kundenko-a22a3667/" },
    { label: "Reddit", href: "https://www.reddit.com/user/het0ku/" },
    { label: "Email", href: "mailto:anton@kundenko.dev" },
  ];

  const phrases = [
    "building vector databases",
    "designing allocators",
    "analyzing SIMD loops",
    "writing Lisp VMs",
    "profiling hot paths",
  ];

  function Typewriter({ items }) {
    const [i, setI] = React.useState(0);
    const [txt, setTxt] = React.useState("");
    const [del, setDel] = React.useState(false);

    React.useEffect(() => {
      const full = items[i % items.length];
      const doneTyping = txt === full;
      const doneDeleting = del && txt === "";

      let t = 60;
      if (del) t = 40;
      if (doneTyping) t = 900;
      if (del && txt.length % 3 === 0) t = 30;

      const id = setTimeout(() => {
        if (!del) {
          if (!doneTyping) setTxt(full.slice(0, txt.length + 1));
          else setDel(true);
        } else {
          if (!doneDeleting) setTxt(full.slice(0, txt.length - 1));
          else {
            setDel(false);
            setI((i + 1) % items.length);
          }
        }
      }, t);
      return () => clearTimeout(id);
    }, [i, txt, del, items]);

    return (
      <div className="mt-3 text-lg sm:text-xl tracking-tight flex items-center gap-1">
        <span style={{ color: DIM }}>&gt;</span>
        <span className="whitespace-pre" style={{ color: ACC }}>{txt}</span>
        <span className="cursor-blink" style={{ color: PRI }}>▊</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen font-mono relative overflow-hidden" style={{ backgroundColor: BG, color: DIM }}>
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "100% 2px" }} />
      <style>{`
        @keyframes typeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .typed { animation: typeIn 0.8s ease-out both; }
        .glow { text-shadow: 0 0 8px ${ACC}44, 0 0 16px ${ACC}22; }
        .soft-border { box-shadow: 0 0 0 1px ${BRD} inset; }
        @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .cursor-blink { animation: blink 1s steps(2, start) infinite; }
        a { 
          transition: all .3s ease; 
          position: relative;
        }
        a:hover { 
          transform: translateY(-1px);
          text-shadow: 0 0 8px currentColor;
        }
        .nav-link:hover {
          color: ${ACC} !important;
          text-shadow: 0 0 12px ${ACC}44;
        }
        .project-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,255,156,0.2);
        }
        .contact-link:hover {
          background-color: #01291F !important;
          color: ${ACC} !important;
          border-color: ${ACC} !important;
          box-shadow: 0 0 8px ${ACC}22;
        }
      `}</style>

      <header className="sticky top-0 bg-black/40" style={{ boxShadow: `inset 0 -1px 0 ${BRD}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="text-sm uppercase" style={{ color: ACC }}>Anton Kundenko</a>
          <nav className="flex items-center gap-4">
            {['Projects', 'Writing', 'Stack', 'Contact'].map(section => (
              <a key={section} href={`#${section.toLowerCase()}`} className="text-sm nav-link" style={{ color: DIM }}>
                {section}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold typed glow" style={{ color: PRI }}>Anton Kundenko</h1>
            <p className="mt-4 max-w-3xl typed" style={{ animationDelay: '0.3s', color: DIM }}>
              Systems engineer building vector databases and tools. Inspired by kdb+/k. Lisp-like VMs, SIMD fusion, Swiss-table hash maps, and allocator design.
            </p>
            <div className="typed" style={{ animationDelay: '0.5s' }}>
              <Typewriter items={phrases} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 typed" style={{ animationDelay: '0.8s' }}>
              {links.map((l) => (
                <a key={l.href} href={l.href}
                  className="px-4 py-1 rounded soft-border contact-link"
                  style={{ color: DIM, borderColor: BRD, backgroundColor: "transparent" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <img
              src="/avatar.png"
              alt="Anton Kundenko"
              className="w-40 h-40 lg:w-48 lg:h-48 rounded-xl object-cover"
              style={{
                borderColor: BRD,
                boxShadow: `0 0 0 1px ${BRD} inset, 0 0 20px ${ACC}22`
              }}
            />
          </div>
        </div>
      </section>

      <section id="projects" className="py-10" style={{ boxShadow: `inset 0 1px 0 ${BRD}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl mb-6 glow" style={{ color: PRI }}>Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <a key={p.title} href={p.href} className="rounded-xl p-4 soft-border project-link" style={{ borderColor: BRD, backgroundColor: "rgba(0,0,0,0.25)" }}>
                <h3 className="text-lg glow" style={{ color: ACC }}>{p.title}</h3>
                <p className="text-sm" style={{ color: DIM }}>{p.tagline}</p>
                <p className="text-xs mt-2" style={{ color: DIM }}>{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.chips.map(c => (<span key={c} className="text-[10px] rounded px-2 py-0.5 soft-border" style={{ borderColor: BRD, color: ACC }}>{c}</span>))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="py-10" style={{ boxShadow: `inset 0 1px 0 ${BRD}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl mb-4 glow" style={{ color: PRI }}>Core Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { h: "Languages", p: "C as ground truth. K/k influence. Lisp VM." },
              { h: "Data structures", p: "Columnar vectors, dicts, Swiss-table hashing, radix partitioning." },
              { h: "Execution", p: "SIMD via compiler vectors. Fused map/reduce/scan." },
              { h: "Memory", p: "Slab + buddy allocators. mmapped slabs with optional GC." },
              { h: "IO & OS", p: "mmap, madvise, huge pages, zero-copy paths." },
              { h: "Tooling", p: "perf, flamegraphs, sanitizers, static builds." },
            ].map(c => (
              <div key={c.h} className="rounded-xl p-4 soft-border" style={{ borderColor: BRD, backgroundColor: "rgba(0,0,0,0.25)" }}>
                <div className="glow" style={{ color: ACC }}>{c.h}</div>
                <div className="text-xs" style={{ color: DIM }}>{c.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-10" style={{ boxShadow: `inset 0 1px 0 ${BRD}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl mb-4 glow" style={{ color: PRI }}>Contact</h2>
          <p className="text-sm" style={{ color: DIM }}>Open to collaboration, consulting, and performance audits.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map(l => (
              <a key={l.href} href={l.href} className="px-4 py-1 rounded soft-border contact-link" style={{ borderColor: BRD, color: DIM }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-xs" style={{ color: ACC, boxShadow: `inset 0 1px 0 ${BRD}` }}>
        © {new Date().getFullYear()} Anton Kundenko — K · Lisp VM · SIMD
      </footer>
    </main>
  );
}

// Render the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AntonKundenkoSite />);
