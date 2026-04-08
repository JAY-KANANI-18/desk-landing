import { useInView } from "../hooks/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "fade";
  animation?: "up" | "left" | "right" | "scale" | "fade";
  threshold?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  animation,
  threshold = 0.12,
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({ threshold });
  const finalDirection = animation ?? direction;

  const base = "transition-all ease-out";
  const duration = "duration-700";

  const hidden: Record<string, string> = {
    up: "opacity-0 translate-y-12",
    left: "opacity-0 -translate-x-12",
    right: "opacity-0 translate-x-12",
    scale: "opacity-0 scale-90",
    fade: "opacity-0",
  };

  const visible: Record<string, string> = {
    up: "opacity-100 translate-y-0",
    left: "opacity-100 translate-x-0",
    right: "opacity-100 translate-x-0",
    scale: "opacity-100 scale-100",
    fade: "opacity-100",
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${base} ${duration} ${inView ? visible[finalDirection] : hidden[finalDirection]} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};
