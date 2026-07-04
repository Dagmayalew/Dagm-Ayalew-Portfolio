import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "@/assets/images/hero.png";

export default function CursorFollower() {
  const followerRef = useRef(null);
  const bubbleRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      targetRef.current = {
        x: event.clientX + 18,
        y: event.clientY + 18,
      };
      setIsVisible(true);
    };

    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handlePointerLeave);
    frameRef.current = requestAnimationFrame(moveFollower);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={`cursor-follower ${isVisible ? "cursor-follower-visible" : ""}`}
      aria-hidden="true"
    >
      <div className="cursor-follower-avatar">
        <img src={ProfileImage} alt="" />
      </div>
      <div ref={bubbleRef} className="cursor-follower-bubble">
        Hire me
      </div>
    </div>
  );
}
