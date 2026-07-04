import React from "react";
import { CheckCircle2 } from "lucide-react";

const points = [
  ["What I build", "Mobile apps, web products, dashboards, API-connected interfaces, and marketplace flows."],
  ["How I think", "I start from the user flow, then shape clean UI and maintainable engineering structure around it."],
  ["Quality focus", "I care about loading states, empty states, error handling, performance, and real product usability."],
  ["Where I fit", "I can work across frontend, mobile, backend integration, deployment, and team delivery workflows."],
];

export default function About() {
  return (
    <section className="min-h-screen bg-[#04081A] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">About</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            A developer who thinks in complete product flows.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            I build software that feels clear to users and dependable for teams maintaining it.
            My work combines mobile-first development, clean UI, API integration, and practical
            full-stack delivery.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {points.map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-cyan-300/40">
              <CheckCircle2 className="mb-5 h-6 w-6 text-cyan-300" />
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-gray-300">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
