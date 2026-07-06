import { useEffect, useRef, useState } from "react";
import ProfileImage from "@/assets/images/hero.png";

const tailSegments = [1, 2, 3, 4, 5];

export default function CursorFollower() {
  const followerRef = useRef(null);
  const mouthRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const mouthPositionRef = useRef({ x: -120, y: -120 });
  const frameRef = useRef(null);
  const pulseTimeoutRef = useRef(null);
  const snakePulseTimeoutRef = useRef(null);
  const snakeLevelRef = useRef(0);
  const tailRefs = useRef([]);
  const tailPositionsRef = useRef(tailSegments.map(() => ({ x: -120, y: -120 })));
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [snakeLevel, setSnakeLevel] = useState(0);
  const [cursorMessage, setCursorMessage] = useState({
    kicker: "Available",
    message: "Let’s build",
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

      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      const avatarSize = 54 + snakeLevelRef.current * 8;
      const mouth = mouthPositionRef.current;
      const head = {
        x: current.x + avatarSize / 2,
        y: current.y + avatarSize / 2,
      };

      if (mouthRef.current) {
        mouthRef.current.style.transform = `translate3d(${mouth.x}px, ${mouth.y}px, 0) translate(-50%, -50%)`;
      }

      tailPositionsRef.current.forEach((segmentPosition, index) => {
        const segmentTarget = index === 0 ? mouth : tailPositionsRef.current[index - 1];
        const isVisibleSegment = snakeLevelRef.current >= index + 1;

        segmentPosition.x += (segmentTarget.x - segmentPosition.x) * 0.2;
        segmentPosition.y += (segmentTarget.y - segmentPosition.y) * 0.2;

        if (tailRefs.current[index]) {
          tailRefs.current[index].style.transform = `translate3d(${segmentPosition.x}px, ${segmentPosition.y}px, 0) translate(-50%, -50%) scale(${isVisibleSegment ? 1 : 0.72})`;
        }
      });

      window.dispatchEvent(
        new CustomEvent("portfolio-snake-position", {
          detail: {
            x: mouth.x,
            y: mouth.y,
            radius: 18 + snakeLevelRef.current * 3,
            headX: head.x,
            headY: head.y,
            level: snakeLevelRef.current,
          },
        }),
      );

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
          : { kicker: "Available", message: "Let’s build" };

      targetRef.current = {
        x: event.clientX + (interactiveTarget ? 26 : 18),
        y: event.clientY + (interactiveTarget ? 22 : 18),
      };
      mouthPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      setIsVisible(true);
      setIsInteractive(Boolean(interactiveTarget));
      setCursorMessage(nextMessage);
    };

    const handlePointerLeave = () => {
      mouthPositionRef.current = { x: -120, y: -120 };
      setIsVisible(false);
      setIsInteractive(false);
      setCursorMessage({ kicker: "Available", message: "Let’s build" });
    };

    const handleSnakeFeed = (event) => {
      const { level = 0, kicker = "Snake mode", message = "Keep going" } = event.detail || {};

      if (snakePulseTimeoutRef.current) {
        window.clearTimeout(snakePulseTimeoutRef.current);
      }

      setSnakeLevel(level);
      snakeLevelRef.current = level;
      setIsPopping(true);
      setCursorMessage({ kicker, message });
      snakePulseTimeoutRef.current = window.setTimeout(() => setIsPopping(false), 650);
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
    window.addEventListener("portfolio-snake-feed", handleSnakeFeed);
    document.addEventListener("mouseleave", handlePointerLeave);
    frameRef.current = requestAnimationFrame(moveFollower);
    schedulePulse();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("portfolio-snake-feed", handleSnakeFeed);
      document.removeEventListener("mouseleave", handlePointerLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
      if (snakePulseTimeoutRef.current) {
        window.clearTimeout(snakePulseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={mouthRef}
        className={`cursor-follower-mouth ${
          isVisible ? "cursor-follower-mouth-visible" : ""
        } ${isPopping ? "cursor-follower-mouth-bite" : ""} ${
          snakeLevel > 0 ? "cursor-follower-mouth-snake" : ""
        }`}
        style={{ "--cursor-snake-grow": snakeLevel }}
        aria-hidden="true"
      />

      <div
        className={`cursor-follower-tail ${
          isVisible ? "cursor-follower-tail-visible" : ""
        } ${snakeLevel > 0 ? "cursor-follower-tail-active" : ""}`}
        style={{ "--cursor-snake-grow": snakeLevel }}
        aria-hidden="true"
      >
        {tailSegments.map((segment) => (
          <span
            key={segment}
            ref={(node) => {
              tailRefs.current[segment - 1] = node;
            }}
            className={snakeLevel >= segment ? "cursor-follower-tail-segment-visible" : ""}
            style={{
              "--cursor-tail-index": segment,
            }}
          />
        ))}
      </div>

      <div
        ref={followerRef}
        className={`cursor-follower ${
          isVisible ? "cursor-follower-visible" : ""
        } ${isInteractive ? "cursor-follower-interactive" : ""} ${
          isPopping ? "cursor-follower-pop" : ""
        } ${snakeLevel > 0 ? "cursor-follower-snake" : ""}`}
        style={{ "--cursor-snake-grow": snakeLevel }}
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
    </>
  );
}
