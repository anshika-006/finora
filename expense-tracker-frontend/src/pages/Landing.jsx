import { useState } from "react"
import { Shield, PieChart, List, Target, ShieldCheck, Palette, Download,ChevronDown} from "lucide-react"

export default function Landing() {
  const [active, setActive] = useState("dashboard")
  const shots = [
    { key: "dashboard", label: "Dashboard", src: "/Dashboard.jpg", alt: "Finora Dashboard with charts" },
    { key: "expenses", label: "Expenses", src: "/Expenses.jpg", alt: "Finora Expenses table list" },
    { key: "calendar", label: "Calendar", src: "/Calendar.jpg", alt: "Finora Calendar view" },
    { key: "graph", label: "Analytics", src: "/Graph.jpg", alt: "Finora Analytics and Graphs" },
  ];
  const current = shots.find((s) => s.key === active) || shots[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2" aria-label="Finora home">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/20"
              aria-hidden="true"
            >
              <Shield className="w-4 h-4 text-emerald-500" />
            </span>
            <span className="text-white text-lg font-semibold tracking-tight">Finora</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#showcase" className="hover:text-white">
              Screens
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#showcase"
              className="rounded-md border border-slate-700 px-3 py-2 text-sm hover:border-slate-600 hover:text-white"
            >
              Live Preview
            </a>
            <a
              href="/register"
              className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-block rounded bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-400">
              Personal Finance, Simplified
            </p>
            <h1 className="mt-4 text-pretty text-4xl font-semibold leading-tight text-white md:text-5xl">
              Track spending. Set budgets. Grow smarter with Finora.
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed">
              A clean, fast dashboard for your money. No clutter—just clarity so you can make better decisions every
              day.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Create free account
              </a>
              <a
                href="#showcase"
                className="inline-flex items-center justify-center rounded-md border border-slate-700 px-5 py-3 text-sm hover:border-slate-600 hover:text-white"
              >
                See it in action
              </a>
            </div>

            <ul className="mt-8 grid max-w-md grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {["Instant setup", "No ads, no clutter", "Budgets by category", "Private & secure"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-lg rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700"></span>
                </div>
                <span className="text-xs text-slate-400">finora.app</span>
              </div>
              <img src="/Dashboard.jpg" alt="Finora Dashboard preview" className="h-auto w-full rounded-b-xl" />
            </div>

            <div className="pointer-events-none absolute -bottom-6 -right-6 hidden w-40 rotate-3 rounded-lg border border-slate-800 bg-slate-900/90 p-2 shadow-xl md:block">
              <div className="text-xs text-slate-400">This month</div>
              <div className="mt-1 text-2xl font-semibold text-white">₹3,500</div>
              <div className="text-xs text-emerald-400">+8% vs last month</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-slate-800/70">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-balance text-3xl font-semibold text-white md:text-4xl">
            Everything you need to stay on top of your money
          </h2>
          <p className="mt-2 max-w-2xl">
            Finora focuses on clarity and speed. No distractions—just the tools you'll actually use.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Crystal dashboard",
                desc: "See top expenses, monthly trends, and category breakdowns at a glance.",
                icon: <PieChart className="w-5 h-5" />,
              },
              {
                title: "Fast expense logging",
                desc: "Add, edit, and categorize transactions with a lightweight table.",
                icon: <List className="w-5 h-5" />,
              },
              {
                title: "Budgets by category",
                desc: "Set monthly targets and track progress with simple visuals.",
                icon: <Target className="w-5 h-5" />,
              },
              {
                title: "Privacy-first",
                desc: "Local-first UX patterns and transparent export controls.",
                icon: <ShieldCheck className="w-5 h-5" />,
              },
              {
                title: "Clean dark UI",
                desc: "Accessible contrast and focus on content. Looks great day or night.",
                icon: <Palette className="w-5 h-5" />,
              },
              {
                title: "Export-ready",
                desc: "Keep records portable with CSV and simple report views.",
                icon: <Download className="w-5 h-5" />,
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-500">
                  {f.icon}
                </div>
                <h3 className="text-white font-medium">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" className="border-t border-slate-800/70 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">Take a closer look</h2>
              <p className="mt-2 max-w-prose">Toggle between screens to preview the experience before you sign up.</p>
            </div>
            <div className="hidden md:block">
              <a
                href="/login"
                className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
              >
                Try it free
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {shots.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(s.key)}
                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  active === s.key
                    ? "border-emerald-500 bg-emerald-500/10 text-white"
                    : "border-slate-700 hover:border-slate-600"
                }`}
                aria-pressed={active === s.key}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <img src={current.src || "/placeholder.svg"} alt={current.alt} className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-800/70">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Is Finora free to use?",
                a: "Yes—get started for free. Advanced exports and automations are optional add‑ons.",
              },
              {
                q: "Do you support budgets by category?",
                a: "Absolutely. Set limits for Housing, Food, Transport, and more with clear progress.",
              },
              {
                q: "Is my data private?",
                a: "Yes. Finora is built with a privacy‑first mindset and clear export controls.",
              },
              {
                q: "Can I switch from another app?",
                a: "Yes—import CSVs and you're ready to go in minutes.",
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-lg border border-slate-800 bg-slate-900 p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-white">
                  {item.q}
                  <span className="text-slate-400 transition group-open:rotate-180">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-2 text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-slate-800 bg-slate-950 px-6 py-8 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white">Ready to take control?</h3>
              <p className="mt-1 text-sm">Start tracking in seconds. No credit card required.</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/register"
                className="rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Get started free
              </a>
              <a
                href="#showcase"
                className="rounded-md border border-slate-700 px-5 py-3 text-sm hover:border-slate-600 hover:text-white"
              >
                Preview
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Finora. All rights reserved.</p>
          <div className="flex gap-5 text-sm">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Support
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}