import React, { useEffect, useRef } from "react";

export default function Magnetic({ children, strength = 0.18 }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const resetWhenOutside = (event) => {
      const element = wrapperRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const isOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (isOutside) {
        element.style.transform = "translate3d(0, 0, 0)";
      }
    };

    window.addEventListener("pointermove", resetWhenOutside);
    return () => window.removeEventListener("pointermove", resetWhenOutside);
  }, []);

  const handlePointerMove = (event) => {
    const element = wrapperRef.current;

    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    element.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const handlePointerLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <span
      ref={wrapperRef}
      className="magnetic-item"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerOut={handlePointerLeave}
      onMouseLeave={handlePointerLeave}
    >
      {children}
    </span>
  );
}
