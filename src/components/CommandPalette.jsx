import React, { useEffect, useMemo, useState } from "react";
import { Download, FolderKanban, Mail, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { profile } from "@/data/portfolio";
import { showCvDownloadToast } from "@/components/CvDownloadToast";

export default function CommandPalette() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const actions = useMemo(
    () => [
      {
        label: "View Projects",
        detail: "Explore case-study style project cards",
        icon: FolderKanban,
        run: () => navigate("/projects"),
      },
      {
        label: "Download CV",
        detail: "Get Dagm Ayalew's latest CV",
        icon: Download,
        run: () => {
          const link = document.createElement("a");
          link.href = profile.cvPath;
          link.download = "Dagm_Ayalew_CV.pdf";
          link.click();
          showCvDownloadToast();
        },
      },
      {
        label: "Contact",
        detail: "Open the contact page",
        icon: Mail,
        run: () => navigate("/contact"),
      },
      {
        label: "Skills",
        detail: "Review mobile, frontend, backend, and product skills",
        icon: Sparkles,
        run: () => navigate("/skills"),
      },
    ],
    [navigate]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isCommandK) {
        event.preventDefault();
        setIsOpen((value) => !value);
        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % actions.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + actions.length) % actions.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        actions[activeIndex].run();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions, activeIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  const runAction = (index) => {
    actions[index].run();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="command-palette-trigger"
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" />
        <span>Command</span>
        <kbd>⌘K</kbd>
      </button>

      {isOpen && (
        <div className="command-palette-layer" role="presentation">
          <button
            type="button"
            className="command-palette-backdrop"
            aria-label="Close command palette"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="command-palette-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="command-palette-search">
              <Search className="h-5 w-5" />
              <span>What do you want to open?</span>
              <kbd>Esc</kbd>
            </div>
            <div className="command-palette-list" role="listbox">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runAction(index)}
                    className={`command-palette-item ${
                      activeIndex === index ? "command-palette-item-active" : ""
                    }`}
                    role="option"
                    aria-selected={activeIndex === index}
                  >
                    <span className="command-palette-icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <strong>{action.label}</strong>
                      <small>{action.detail}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
