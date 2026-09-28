import { useEffect } from "preact/hooks";
import Lenis from "lenis";

/** Soft smooth scroll for immersive home. Skips when reduced motion is preferred. */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let frame = 0;
    function tick(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
