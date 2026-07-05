import React, { useEffect, useRef, useState } from "react";

const centerPosition = { x: 50, y: 52 };

export default function RecruiterSprintGame() {
  const [phase, setPhase] = useState("ready");
  const [hirePosition, setHirePosition] = useState(centerPosition);
  const pointerRef = useRef({ x: -300, y: -300 });
  const gameRef = useRef(null);
  const loopRef = useRef(null);
  const resetRef = useRef(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (loopRef.current) {
        window.cancelAnimationFrame(loopRef.current);
      }

      if (resetRef.current) {
        window.clearTimeout(resetRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== "ready") {
      return undefined;
    }

    const checkHireMe = () => {
      const gameBox = gameRef.current?.getBoundingClientRect();

      if (gameBox) {
        const pointer = pointerRef.current;
        const hireX = gameBox.left + (gameBox.width * hirePosition.x) / 100;
        const hireY = gameBox.top + (gameBox.height * hirePosition.y) / 100;
        const distance = Math.hypot(pointer.x - hireX, pointer.y - hireY);

        if (distance < 54) {
          setPhase("caught");
          resetRef.current = window.setTimeout(() => {
            setHirePosition(centerPosition);
            setPhase("ready");
          }, 4200);
          return;
        }

        if (distance < 180) {
          setHirePosition((current) => ({
            x: Math.max(24, Math.min(76, current.x + (Math.random() > 0.5 ? 9 : -9))),
            y: Math.max(28, Math.min(74, current.y + (Math.random() > 0.5 ? 7 : -7))),
          }));
        }
      }

      loopRef.current = window.requestAnimationFrame(checkHireMe);
    };

    loopRef.current = window.requestAnimationFrame(checkHireMe);

    return () => {
      if (loopRef.current) {
        window.cancelAnimationFrame(loopRef.current);
      }
    };
  }, [hirePosition.x, hirePosition.y, phase]);

  return (
    <div ref={gameRef} className={`recruiter-game recruiter-game-${phase}`} aria-hidden="true">
      <div className="recruiter-game-chip">
        <span>Cursor game</span>
        <strong>Catch Hire me</strong>
        <small>Touch it with your image cursor</small>
      </div>

      {phase === "ready" && (
        <span
          className="recruiter-game-hire"
          style={{ left: `${hirePosition.x}%`, top: `${hirePosition.y}%` }}
        >
          Hire me
        </span>
      )}

      {phase === "caught" && (
        <div className="recruiter-game-win">
          <span>You caught Dagm</span>
          <strong>Let’s talk.</strong>
          <small>Remote React Native roles, mobile apps, APIs, and polished UI.</small>
        </div>
      )}
    </div>
  );
}
