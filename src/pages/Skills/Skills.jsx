import React from "react";
import { skillExplanations, skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section className="min-h-screen bg-[#04081A] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Skills</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            A practical stack for mobile apps, dashboards, and reliable APIs.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Skills are grouped by how recruiters and teams evaluate real delivery capability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="rounded-3xl border border-white/10 bg-gray-900/70 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
              <h2 className="mb-5 text-2xl font-semibold text-cyan-200">{group.title}</h2>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill"
                    tabIndex={0}
                    data-skill-note={skillExplanations[skill] || "Practical product delivery skill."}
                    data-cursor-kicker="Skill"
                    data-cursor-message={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
