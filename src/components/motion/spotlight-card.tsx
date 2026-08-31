"use client";

import { useRef } from "react";

export const spotlightClassName =
  "group/spot relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100 before:[background:radial-gradient(220px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_srgb,var(--accent)_14%,transparent),transparent_70%)]";

export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  function onMouseMove(event: React.MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return { ref, onMouseMove };
}
