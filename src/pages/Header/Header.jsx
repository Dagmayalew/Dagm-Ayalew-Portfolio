import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaHome,
  FaLaptopCode,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { profile } from "@/data/portfolio";

const navLinks = [
  { id: "home", icon: FaHome, text: "Home", path: "/" },
  { id: "about", icon: FaUser, text: "About", path: "/about" },
  { id: "skills", icon: FaCode, text: "Skills", path: "/skills" },
  { id: "projects", icon: FaLaptopCode, text: "Projects", path: "/projects" },
  { id: "experience", icon: FaBriefcase, text: "Experience", path: "/experience" },
  { id: "education", icon: FaGraduationCap, text: "Education", path: "/education" },
  { id: "contact", icon: FaEnvelope, text: "Contact", path: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    () => location.pathname.substring(1) || "home"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname.substring(1) || "home");
  }, [location.pathname]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-slate-950/90 backdrop-blur-md md:border-none md:bg-transparent">
      <div className="w-full md:fixed md:left-1/2 md:top-4 md:w-auto md:-translate-x-1/2">
        <div className="p-[1px] md:rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400">
          <nav className="bg-slate-950/95 px-4 py-2.5 backdrop-blur-md md:rounded-full md:px-6">
            <div className="flex items-center justify-between px-2 md:hidden">
              <Link to="/" className="font-semibold text-white">
                {profile.name}
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen((value) => !value)}
                className="rounded-lg p-2 text-white hover:bg-white/10"
                aria-label="Toggle navigation"
              >
                <FaBars />
              </button>
            </div>

            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:gap-1 md:py-0 lg:gap-2">
                {navLinks.map(({ id, icon: Icon, text, path }) => (
                  <Link
                    key={id}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 md:rounded-full md:py-1.5 ${
                      activeLink === id
                        ? "bg-white/15 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={activeLink === id ? "scale-110" : ""} />
                    <span>{text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
