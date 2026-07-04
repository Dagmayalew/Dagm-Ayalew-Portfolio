import React from "react";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="min-h-screen bg-[#04081A] px-6 py-32 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Education</p>
        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Academic background</h1>

        <article className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="flex items-start gap-5">
            <div className="rounded-2xl bg-cyan-400/10 p-4 text-cyan-300">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Bachelor of Science in Computer Science</h2>
              <p className="mt-3 text-cyan-300">Unity University, Addis Ababa (Gerji Campus)</p>
              <p className="mt-2 text-gray-400">Graduated 2025</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
