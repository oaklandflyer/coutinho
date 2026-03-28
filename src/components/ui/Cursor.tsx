"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  let rx = 0, ry = 0;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
    };

    const animate = () => {
      if (ring.current) {
        ring.current.style.left = rx + "px";
        ring.current.style.top = ry + "px";
      }
      requestAnimationFrame(animate);
    };

    const trackMouse = (e: MouseEvent) => {
      rx += (e.clientX - rx) * 0.12;
      ry += (e.clientY - ry) * 0.12;
    };

    // Correct: separate handlers
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousemove", trackMouse);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
    });

    animate();
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", trackMouse);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
