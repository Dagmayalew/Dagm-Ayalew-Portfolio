import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Mail } from "lucide-react";
import Meteors from "@/components/ui/meteors";
import SparklesText from "@/components/ui/sparkles-text";
import { FlipWords } from "@/components/ui/flip-words";
import Magnetic from "@/components/Magnetic";
import { showCvDownloadToast } from "@/components/CvDownloadToast";
import { profile, trustSignals } from "@/data/portfolio";

const words = [
  "Mobile App Developer",
  "React Native Engineer",
  "Full Stack Developer",
  "Product Builder",
];

const terminalLines = [
  "dagm.status = \"open for full-time and part-time jobs\"",
  "dagm.stack = [\"React Native\", \"Next.js\", \"TypeScript\", \"Go\", \"PostgreSQL\"]",
  "dagm.focus = \"mobile-first products + reliable APIs\"",
  "dagm.strengths = [\"clean UI\", \"auth flows\", \"payments\", \"deployment\"]",
  "dagm.readyToBuild() // true",
];

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
  const [typedLines, setTypedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      const line = terminalLines[lineIndex];

      if (!line) {
        return;
      }

      setCurrentLine(line.slice(0, charIndex + 1));
      charIndex += 1;

      if (charIndex < line.length) {
        timeoutId = window.setTimeout(typeNextCharacter, 26);
        return;
      }

      timeoutId = window.setTimeout(() => {
        setTypedLines((lines) => [...lines, line]);
        setCurrentLine("");
        lineIndex += 1;
        charIndex = 0;

        if (lineIndex < terminalLines.length) {
          timeoutId = window.setTimeout(typeNextCharacter, 170);
        }
      }, 420);
    };

    timeoutId = window.setTimeout(typeNextCharacter, 450);

    return () => window.clearTimeout(timeoutId);
  }, []);

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
              <Magnetic>
                <Link
                  to="/projects"
                  className="block rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-6 py-4 text-center font-semibold text-slate-950 transition hover:shadow-[0_0_2rem_-0.7rem_#67e8f9]"
                >
                  View Projects
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.cvPath}
                  download
                  onClick={showCvDownloadToast}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  Download CV <Download className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300"
                >
                  Contact Me <Mail className="h-4 w-4" />
                </Link>
              </Magnetic>
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
                  <span className="ml-2 text-sm text-gray-400">terminal</span>
                </div>
                <div className="terminal-intro" aria-label="Animated developer terminal">
                  {typedLines.map((line) => (
                    <p key={line}>
                      <span className="terminal-prompt">$</span> {line}
                    </p>
                  ))}
                  <p>
                    <span className="terminal-prompt">$</span> {currentLine}
                    <span className="terminal-caret" />
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
