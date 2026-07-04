import React from "react";
import { BriefcaseBusiness } from "lucide-react";
import { experience, processSteps, recruiterReasons } from "@/data/portfolio";

export default function Experience() {
  return (
    <section className="min-h-screen bg-[#04081A] px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Experience</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Delivery experience across mobile, web, and API-connected products.
          </h1>
        </div>

        <div className="grid gap-6">
          {experience.map((item) => (
            <article key={`${item.title}-${item.company}`} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p className="mt-1 font-medium text-cyan-300">{item.company}</p>
                </div>
                <p className="text-sm text-gray-400">{item.period}</p>
              </div>
              <ul className="mt-6 grid gap-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-gray-300">
                    <BriefcaseBusiness className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-gray-900/70 p-6">
            <h2 className="text-2xl font-semibold">Development Process</h2>
            <div className="mt-5 grid gap-3">
              {processSteps.map((step, index) => (
                <p key={step} className="rounded-xl bg-white/5 px-4 py-3 text-sm text-gray-300">
                  Step {index + 1}: {step}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gray-900/70 p-6">
            <h2 className="text-2xl font-semibold">Why teams can trust me</h2>
            <div className="mt-5 grid gap-3">
              {recruiterReasons.map((reason) => (
                <p key={reason} className="rounded-xl bg-white/5 px-4 py-3 text-sm text-gray-300">
                  {reason}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
