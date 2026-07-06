import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const foods = [
  {
    id: "ui",
    label: "Design UI",
    hint: "Shape the first screen",
    position: { x: 26, y: 34 },
  },
  {
    id: "api",
    label: "Connect API",
    hint: "Bring in live data",
    position: { x: 63, y: 25 },
  },
  {
    id: "mobile",
    label: "Mobile App",
    hint: "Make it feel native",
    position: { x: 76, y: 54 },
  },
  {
    id: "deploy",
    label: "Deploy",
    hint: "Send it to production",
    position: { x: 42, y: 68 },
  },
  {
    id: "contact",
    label: "Contact Dagm",
    hint: "Start the real build",
    position: { x: 78, y: 38 },
  },
];

const eatMessages = [
  "First screen locked.",
  "Data is flowing.",
  "Mobile energy added.",
  "Ready to ship.",
];

const burstPieces = [1, 2, 3, 4, 5, 6];

function getRoutePoints(items) {
  return items.map((food) => `${food.position.x},${food.position.y}`).join(" ");
}

function sendSnakeFeed(level, currentFood, isFinal = false) {
  window.dispatchEvent(
    new CustomEvent("portfolio-snake-feed", {
      detail: {
        level,
        kicker: isFinal ? "Full build" : "Snake mode",
        message: isFinal ? "Opening contact" : currentFood.label,
      },
    }),
  );
}

export default function RecruiterSprintGame() {
  const navigate = useNavigate();
  const [foodIndex, setFoodIndex] = useState(0);
  const [phase, setPhase] = useState("playing");
  const [message, setMessage] = useState("Eat the build steps in order.");
  const [eatenFoodId, setEatenFoodId] = useState(null);
  const [biteBurst, setBiteBurst] = useState(null);
  const lockRef = useRef(false);
  const foodTimerRef = useRef(null);
  const burstTimerRef = useRef(null);
  const navigateTimerRef = useRef(null);
  const foodRef = useRef(null);
  const guideLineRef = useRef(null);
  const foodIndexRef = useRef(0);
  const phaseRef = useRef("playing");

  const currentFood = foods[Math.min(foodIndex, foods.length - 1)];
  const routePoints = useMemo(() => getRoutePoints(foods), []);
  const completedRoutePoints = useMemo(
    () => getRoutePoints(foods.slice(0, Math.min(foodIndex + 1, foods.length))),
    [foodIndex],
  );

  const progressText = useMemo(
    () => `${Math.min(foodIndex, foods.length)}/${foods.length}`,
    [foodIndex],
  );

  useEffect(() => {
    foodIndexRef.current = foodIndex;

    if (foodRef.current) {
      foodRef.current.classList.remove("recruiter-game-food-near");
      foodRef.current.style.setProperty("--food-heat", "0");
      foodRef.current.style.setProperty("--food-nudge-x", "0px");
      foodRef.current.style.setProperty("--food-nudge-y", "0px");
      foodRef.current.style.setProperty("--food-scale", "1");
      foodRef.current.style.setProperty("--food-ring-opacity", "0.55");
    }

    const guideFood = foods[Math.min(foodIndex, foods.length - 1)];

    if (guideLineRef.current && guideFood) {
      guideLineRef.current.setAttribute("x1", guideFood.position.x);
      guideLineRef.current.setAttribute("y1", guideFood.position.y);
      guideLineRef.current.setAttribute("x2", guideFood.position.x);
      guideLineRef.current.setAttribute("y2", guideFood.position.y);
      guideLineRef.current.style.setProperty("--guide-opacity", "0.08");
      guideLineRef.current.style.setProperty("--guide-width", "1.2");
    }
  }, [foodIndex]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing" || !currentFood) {
      return;
    }

    sendSnakeFeed(foodIndex, currentFood);
  }, [currentFood, foodIndex, phase]);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const handleSnakePosition = (event) => {
      if (lockRef.current || phaseRef.current !== "playing") {
        return;
      }

      const currentFoodIndex = foodIndexRef.current;
      const activeFood = foods[currentFoodIndex];

      if (!activeFood) {
        return;
      }

      const { x, y, radius = 28 } = event.detail || {};

      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
      }

      const foodBox = foodRef.current?.getBoundingClientRect();
      const foodX = foodBox
        ? foodBox.left + foodBox.width / 2
        : (window.innerWidth * activeFood.position.x) / 100;
      const foodY = foodBox
        ? foodBox.top + foodBox.height / 2
        : (window.innerHeight * activeFood.position.y) / 100;
      const distance = Math.hypot(x - foodX, y - foodY);
      const biteDistance = Math.max(76, radius + 42);
      const foodHeat = Math.max(0, 1 - distance / 240);
      const guideLine = guideLineRef.current;

      if (guideLine) {
        const cursorX = Math.min(100, Math.max(0, (x / window.innerWidth) * 100));
        const cursorY = Math.min(100, Math.max(0, (y / window.innerHeight) * 100));

        guideLine.setAttribute("x1", cursorX.toFixed(2));
        guideLine.setAttribute("y1", cursorY.toFixed(2));
        guideLine.setAttribute("x2", activeFood.position.x);
        guideLine.setAttribute("y2", activeFood.position.y);
        guideLine.style.setProperty("--guide-opacity", (0.12 + foodHeat * 0.58).toFixed(3));
        guideLine.style.setProperty("--guide-width", (1.1 + foodHeat * 1.4).toFixed(3));
      }

      if (foodRef.current) {
        foodRef.current.classList.toggle("recruiter-game-food-near", foodHeat > 0.45);
        foodRef.current.style.setProperty("--food-heat", foodHeat.toFixed(3));
        foodRef.current.style.setProperty(
          "--food-nudge-x",
          `${((x - foodX) * foodHeat * 0.045).toFixed(2)}px`,
        );
        foodRef.current.style.setProperty(
          "--food-nudge-y",
          `${((y - foodY) * foodHeat * 0.045).toFixed(2)}px`,
        );
        foodRef.current.style.setProperty(
          "--food-scale",
          (1 + foodHeat * 0.05).toFixed(3),
        );
        foodRef.current.style.setProperty(
          "--food-ring-opacity",
          (0.55 + foodHeat * 0.35).toFixed(3),
        );
      }

      if (distance > biteDistance) {
        return;
      }

      lockRef.current = true;

      const nextIndex = currentFoodIndex + 1;
      const isFinal = nextIndex >= foods.length;

      if (burstTimerRef.current) {
        window.clearTimeout(burstTimerRef.current);
      }

      setEatenFoodId(activeFood.id);
      setBiteBurst({ id: `${activeFood.id}-${Date.now()}`, position: activeFood.position });
      sendSnakeFeed(nextIndex, activeFood, isFinal);
      setMessage(
        isFinal
          ? "Final food eaten. Heading to contact."
          : eatMessages[Math.min(nextIndex - 1, eatMessages.length - 1)],
      );

      if (isFinal) {
        setFoodIndex(nextIndex);
        setPhase("won");
        burstTimerRef.current = window.setTimeout(() => setBiteBurst(null), 520);
        navigateTimerRef.current = window.setTimeout(() => {
          navigate("/contact");
        }, 1050);
        return;
      }

      foodTimerRef.current = window.setTimeout(() => {
        setFoodIndex(nextIndex);
        setEatenFoodId(null);
        lockRef.current = false;
      }, 420);

      burstTimerRef.current = window.setTimeout(() => setBiteBurst(null), 540);
    };

    window.addEventListener("portfolio-snake-position", handleSnakePosition);

    return () => {
      window.removeEventListener("portfolio-snake-position", handleSnakePosition);
    };
  }, [navigate]);

  useEffect(
    () => () => {
      if (foodTimerRef.current) {
        window.clearTimeout(foodTimerRef.current);
      }

      if (burstTimerRef.current) {
        window.clearTimeout(burstTimerRef.current);
      }

      if (navigateTimerRef.current) {
        window.clearTimeout(navigateTimerRef.current);
      }

      sendSnakeFeed(0, { label: "Let's build" });
    },
    [],
  );

  return (
    <div className={`recruiter-game recruiter-game-${phase}`} aria-hidden="true">
      <div className="recruiter-game-chip">
        <span>Snake mode</span>
        <strong>Feed the cursor</strong>
        <small>{message}</small>
      </div>

      <div className="recruiter-game-score" aria-hidden="true">
        <span>Food</span>
        <strong>{progressText}</strong>
        <div className="recruiter-game-progress">
          {foods.map((food, index) => (
            <i
              key={food.id}
              className={index < foodIndex ? "recruiter-game-progress-done" : ""}
            />
          ))}
        </div>
      </div>

      <div className="recruiter-game-playfield recruiter-game-snake-field" aria-hidden="true">
        <svg className="recruiter-game-route" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline className="recruiter-game-route-base" points={routePoints} />
          <polyline className="recruiter-game-route-active" points={completedRoutePoints} />
          {currentFood && (
            <line
              ref={guideLineRef}
              className="recruiter-game-route-guide"
              x1={currentFood.position.x}
              y1={currentFood.position.y}
              x2={currentFood.position.x}
              y2={currentFood.position.y}
            />
          )}
        </svg>

        <div className="recruiter-game-waypoints">
          {foods.map((food, index) => (
            <span
              key={food.id}
              className={`${index < foodIndex ? "recruiter-game-waypoint-done" : ""}${index === foodIndex ? " recruiter-game-waypoint-active" : ""}`}
              style={{ left: `${food.position.x}%`, top: `${food.position.y}%` }}
            />
          ))}
        </div>

        {currentFood && (
          <div
            key={currentFood.id}
            ref={foodRef}
            className={`recruiter-game-food recruiter-game-food-${currentFood.id}${eatenFoodId === currentFood.id ? " recruiter-game-food-eaten" : ""}`}
            style={{ left: `${currentFood.position.x}%`, top: `${currentFood.position.y}%` }}
          >
            <b>{String(Math.min(foodIndex + 1, foods.length)).padStart(2, "0")}</b>
            <span>{currentFood.label}</span>
            <small>{currentFood.hint}</small>
          </div>
        )}

        {biteBurst && (
          <div
            key={biteBurst.id}
            className="recruiter-game-burst"
            style={{ left: `${biteBurst.position.x}%`, top: `${biteBurst.position.y}%` }}
          >
            {burstPieces.map((piece) => (
              <span key={piece} style={{ "--burst-piece": piece }} />
            ))}
          </div>
        )}
      </div>

      {phase === "won" && (
        <div className="recruiter-game-win">
          <span>Snake full</span>
          <strong>Let’s talk.</strong>
          <small>The final food opens the contact page.</small>
        </div>
      )}
    </div>
  );
}
