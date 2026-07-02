import { useEffect, useState } from "react";

const isInteractive = (target) =>
  target?.closest?.("button, a, input, textarea, select, [role='button'], figure, img, .interactive-photo");

export default function CursorTrail() {
  const [points, setPoints] = useState([]);
  const [bursts, setBursts] = useState([]);
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false, hidden: true });
  const [canUseCursor, setCanUseCursor] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setCanUseCursor(finePointer);
    document.documentElement.classList.toggle("has-custom-cursor", finePointer);

    let id = 0;

    const onMove = (event) => {
      if (!finePointer) return;
      const active = Boolean(isInteractive(event.target));
      const next = { id: id += 1, x: event.clientX, y: event.clientY };
      document.documentElement.style.setProperty("--pointer-x", `${(event.clientX / window.innerWidth - 0.5).toFixed(3)}`);
      document.documentElement.style.setProperty("--pointer-y", `${(event.clientY / window.innerHeight - 0.5).toFixed(3)}`);
      setCursor({ x: event.clientX, y: event.clientY, active, hidden: false });
      setPoints((items) => [...items.slice(-12), next]);
      window.setTimeout(() => {
        setPoints((items) => items.filter((item) => item.id !== next.id));
      }, 620);
    };

    const onLeave = () => setCursor((value) => ({ ...value, hidden: true }));

    const onPointerDown = (event) => {
      const burst = {
        id: id += 1,
        x: event.clientX,
        y: event.clientY,
        touch: event.pointerType !== "mouse",
      };

      setBursts((items) => [...items.slice(-6), burst]);
      window.setTimeout(() => {
        setBursts((items) => items.filter((item) => item.id !== burst.id));
      }, 820);

      const button = event.target.closest?.("button, a, [role='button']");
      if (button) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "tap-ripple";
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        button.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 650);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      {canUseCursor && (
        <>
          <span
            className={`custom-cursor ${cursor.active ? "is-active" : ""} ${cursor.hidden ? "is-hidden" : ""}`}
            style={{ left: cursor.x, top: cursor.y }}
          >
            ♥
          </span>
          {points.map((point, index) => (
            <span
              key={point.id}
              className="cursor-heart"
              style={{
                left: point.x,
                top: point.y,
                opacity: (index + 1) / points.length,
              }}
            >
              ♥
            </span>
          ))}
        </>
      )}

      {bursts.map((burst) => (
        <span key={burst.id} className={`click-burst ${burst.touch ? "is-touch" : ""}`} style={{ left: burst.x, top: burst.y }}>
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} style={{ "--angle": `${index * 40}deg` }}>
              {index % 3 === 0 ? "♥" : index % 3 === 1 ? "✦" : ""}
            </i>
          ))}
        </span>
      ))}
    </div>
  );
}
