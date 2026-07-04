import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "@/assets/images/hero.png";

export default function CursorFollower() {
  const followerRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const pulseTimeoutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [cursorMessage, setCursorMessage] = useState({
    kicker: "Available",
    message: "Hire me",
  });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const moveFollower = () => {
      const current = positionRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(moveFollower);
    };

    const handlePointerMove = (event) => {
      const interactiveTarget = event.target.closest(
        "a, button, input, textarea, select, [role='button']"
      );
      const messageTarget = event.target.closest("[data-cursor-message]");
      const nextMessage = messageTarget
        ? {
            kicker: messageTarget.dataset.cursorKicker || "Explore",
            message: messageTarget.dataset.cursorMessage,
          }
        : interactiveTarget
          ? { kicker: "Open it", message: "Let's go" }
          : { kicker: "Available", message: "Hire me" };

      targetRef.current = {
        x: event.clientX + (interactiveTarget ? 26 : 18),
        y: event.clientY + (interactiveTarget ? 22 : 18),
      };
      setIsVisible(true);
      setIsInteractive(Boolean(interactiveTarget));
      setCursorMessage(nextMessage);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsInteractive(false);
      setCursorMessage({ kicker: "Available", message: "Hire me" });
    };

    const schedulePulse = () => {
      const delay = 5200 + Math.random() * 5200;

      pulseTimeoutRef.current = window.setTimeout(() => {
        setIsPopping(true);
        window.setTimeout(() => setIsPopping(false), 900);
        schedulePulse();
      }, delay);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);
    frameRef.current = requestAnimationFrame(moveFollower);
    schedulePulse();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={`cursor-follower ${
        isVisible ? "cursor-follower-visible" : ""
      } ${isInteractive ? "cursor-follower-interactive" : ""} ${
        isPopping ? "cursor-follower-pop" : ""
      }`}
      aria-hidden="true"
    >
      <div className="cursor-follower-avatar">
        <img src={ProfileImage} alt="" />
      </div>
      <div className="cursor-follower-bubble">
        <span className="cursor-follower-kicker">{cursorMessage.kicker}</span>
        <span className="cursor-follower-message">{cursorMessage.message}</span>
      </div>
    </div>
  );
}
