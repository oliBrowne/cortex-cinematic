/**
 * CORTEX design reminder: motion is controlled, infrastructural, and intentional—never bouncy.
 * Every reveal follows the same warm-ivory, precision-document movement language.
 */
import { motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";

type RevealProps = Omit<ComponentProps<typeof motion.div>, "animate" | "initial" | "transition"> & {
  delay?: number;
};

export function Reveal({ className = "", delay = 0, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
