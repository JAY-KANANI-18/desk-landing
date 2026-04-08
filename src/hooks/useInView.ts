import { type RefObject, useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(targetRef: RefObject<HTMLElement>, options?: UseInViewOptions): boolean;
export function useInView(options?: UseInViewOptions): { ref: RefObject<HTMLElement>; inView: boolean };
export function useInView(targetOrOptions: RefObject<HTMLElement> | UseInViewOptions = {}, maybeOptions?: UseInViewOptions) {
  const targetRef = "current" in targetOrOptions ? targetOrOptions : undefined;
  const options = targetRef ? (maybeOptions ?? {}) : (targetOrOptions as UseInViewOptions);
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const localRef = useRef<HTMLElement>(null);
  const ref = targetRef ?? localRef;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  if (targetRef) return inView;
  return { ref, inView };
}
