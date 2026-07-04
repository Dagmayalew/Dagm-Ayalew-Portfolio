import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "@/assets/css/tomorrow.css";
import { Link } from "react-router-dom";
import { Download, Mail } from "lucide-react";
import Meteors from "@/components/ui/meteors";
import SparklesText from "@/components/ui/sparkles-text";
import { FlipWords } from "@/components/ui/flip-words";
import { profile, trustSignals } from "@/data/portfolio";

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  const words = [
    "Mobile App Developer",
    "React Native Engineer",
    "Full Stack Developer",
    "Product Builder",
  ];

  const [code] = useState(`
const profile = {
  name: 'Dagm Ayalew',
  role: 'Mobile App & Full Stack Developer',
  stack: ['React Native', 'Next.js', 'TypeScript', 'Go', 'PostgreSQL'],
  strengths: ['Clean UI', 'API Integration', 'Performance', 'Product Thinking'],
  location: 'Addis Ababa, Ethiopia',
  hireable: true
};
  `);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <main className="min-h-screen bg-[#020617] pt-20 text-white lg:pt-0">
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <GridBackground />
        <div className="pointer-events-none absolute inset-0">
          <Meteors number={10} />
        </div>

        <div className="container relative z-10 mx-auto flex flex-col items-center justify-between py-12 lg:flex-row lg:py-0">
          <div className="relative mb-12 w-full lg:mb-0 lg:w-1/2">
            <div className="absolute hidden h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl lg:-left-20 lg:-top-20 lg:block" />
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-700/50 bg-gray-800/50 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {profile.location}
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
              <SparklesText text="Hello" />
              <span className="relative inline-block">
                I&apos;m <span className="typing-effect gradient-text">Dagm</span>
              </span>
            </h1>

            <div className="mb-8 mt-8 inline-flex items-center rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 px-5 py-3 backdrop-blur-sm">
              <FlipWords className="text-lg font-medium text-cyan-300 sm:text-xl" words={words} />
            </div>

            <p className="max-w-2xl text-lg leading-8 text-gray-300">
              I build polished mobile and web products with clean UI, reliable APIs,
              and production-ready architecture for recruiters, teams, founders, and clients.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/projects"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-6 py-4 text-center font-semibold text-slate-950 transition hover:scale-105"
              >
                View Projects
              </Link>
              <a
                href={profile.cvPath}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Download CV <Download className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300"
              >
                Contact Me <Mail className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustSignals.map((signal) => (
                <div key={signal} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200">
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-6 rounded-[2rem] bg-cyan-500/10 blur-3xl" />
              <div className="gradient-border relative">
                <div className="code-window bg-[#091121]">
                <div className="window-header">
                  <div className="window-dot bg-red-500" />
                  <div className="window-dot bg-yellow-500" />
                  <div className="window-dot bg-green-500" />
                  <span className="ml-2 text-sm text-gray-400">profile.js</span>
                </div>
                <pre className="language-javascript">
                  <code className="language-javascript">{code}</code>
                </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
