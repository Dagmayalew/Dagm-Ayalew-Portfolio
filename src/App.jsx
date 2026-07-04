import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./assets/css/index.css";
import AvailabilityPill from "./components/AvailabilityPill";
import CommandPalette from "./components/CommandPalette";
import CursorFollower from "./components/CursorFollower";
import CvDownloadToast from "./components/CvDownloadToast";
import Header from "./pages/Header/Header";
import RecruiterSummary from "./components/RecruiterSummary";
import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Experience from "./pages/Experience/Experience";
import Education from "./pages/Education/Education";
import Contact from "./pages/Contact/Contact";

function PageShell({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <AvailabilityPill />
      <CommandPalette />
      <CursorFollower />
      <CvDownloadToast />
      <RecruiterSummary />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageShell>
                <Hero />
              </PageShell>
            }
          />
          <Route
            path="/about"
            element={
              <PageShell>
                <About />
              </PageShell>
            }
          />
          <Route
            path="/skills"
            element={
              <PageShell>
                <Skills />
              </PageShell>
            }
          />
          <Route
            path="/projects"
            element={
              <PageShell>
                <Projects />
              </PageShell>
            }
          />
          <Route
            path="/experience"
            element={
              <PageShell>
                <Experience />
              </PageShell>
            }
          />
          <Route
            path="/education"
            element={
              <PageShell>
                <Education />
              </PageShell>
            }
          />
          <Route
            path="/contact"
            element={
              <PageShell>
                <Contact />
              </PageShell>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
