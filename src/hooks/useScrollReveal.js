import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Returns ref and inView state
 * @param {number} threshold - Intersection Observer threshold (0-1)
 * @param {number} margin - Intersection Observer root margin
 * @returns {Object} { ref, inView }
 */
export const useScrollReveal = (threshold = 0.12, margin = "-50px") => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold, margin, once: true });
  return { ref, inView };
};

/**
 * Hook for counting numbers with animation
 * @param {number} target - Target number to count to
 * @param {boolean} shouldStart - Whether to start counting
 * @param {number} duration - Animation duration in seconds
 * @returns {number} Current count value
 */
export const useCounter = (
  target = 100,
  shouldStart = false,
  duration = 1.5,
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.ceil((duration * 1000) / frameDuration);
    let currentFrame = 0;

    const increment = target / totalFrames;

    const interval = setInterval(() => {
      currentFrame++;
      setCount(Math.min(Math.floor(currentFrame * increment), target));

      if (currentFrame === totalFrames) {
        clearInterval(interval);
      }
    }, frameDuration);

    return () => clearInterval(interval);
  }, [shouldStart, target, duration]);

  return count;
};

/**
 * Hook to handle multiple elements' animations with stagger
 * @param {number} staggerDelay - Delay between staggered items in ms
 * @param {number} threshold - Intersection Observer threshold
 * @returns {Object} { containerRef, itemRefs, inView }
 */
export const useStaggerAnimation = (threshold = 0.12) => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { threshold, once: true });

  return { containerRef, inView };
};
