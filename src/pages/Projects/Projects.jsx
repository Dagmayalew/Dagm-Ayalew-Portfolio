import React from "react";
import { ExternalLink, Github, Layers3, CheckCircle2 } from "lucide-react";
import { profile, projects } from "@/data/portfolio";

export default function Projects() {
  const handleCardPointerMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section className="min-h-screen bg-[#04081A] px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Featured Projects</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Product-minded work written like case studies.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            These projects show mobile delivery, full-stack thinking, marketplace flows,
            admin systems, and developer tooling.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.name}
              data-cursor-kicker="Case study"
              data-cursor-message={project.name}
              onPointerMove={handleCardPointerMove}
              className="project-spotlight-card group rounded-3xl border border-white/10 bg-gray-900/80 p-6 shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-cyan-500/10"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  Project {index + 1}
                </span>
                <Layers3 className="h-5 w-5 text-cyan-300" />
              </div>
              <h2 className="text-2xl font-semibold text-white">{project.name}</h2>
              <p className="mt-3 leading-7 text-gray-300">{project.description}</p>

              <div className="mt-6 grid gap-4 text-sm">
                <div>
                  <p className="font-semibold text-cyan-200">Problem solved</p>
                  <p className="mt-1 leading-6 text-gray-300">{project.problem}</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-200">My role</p>
                  <p className="mt-1 leading-6 text-gray-300">{project.role}</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-200">Business value</p>
                  <p className="mt-1 leading-6 text-gray-300">{project.value}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    data-cursor-kicker="View stack"
                    data-cursor-message={item}
                    className="rounded-lg bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ul className="mt-6 grid gap-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    data-cursor-kicker="Built this"
                    data-cursor-message={feature}
                    className="flex gap-2 text-sm text-gray-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-kicker="Live demo"
                  data-cursor-message="Open project"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  Live Demo <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-kicker="Source"
                  data-cursor-message="View code"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  GitHub <Github className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  data-cursor-kicker="Case study"
                  data-cursor-message="Ask me"
                  className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Case Study
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
