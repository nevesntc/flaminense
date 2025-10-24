import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  duration?: number; // ms
  className?: string;
}

export const AnimatedNumber: React.FC<Props> = ({ value, duration = 1200, className }) => {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const from = display;
    const to = value;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(from + (to - from) * progress));
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplay(to);
      }
    };
  if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
    // eslint-disable-next-line
  }, [value]);

  return <span className={className}>{display.toLocaleString()}</span>;
};
