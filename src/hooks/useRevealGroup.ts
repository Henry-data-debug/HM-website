import { useEffect, useRef } from 'react';

/**
 * Applies the `is-visible` class to the attached element and all of its
 * children carrying the `.reveal` class when it scrolls into view.
 * Stagger is achieved via the inline `transitionDelay` style on each child.
 */
export function useRevealGroup<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let childObserver: MutationObserver | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('.reveal').forEach((child) => {
            child.classList.add('is-visible');
          });
          el.classList.add('is-visible');
          childObserver = new MutationObserver(() => {
            el.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((child) => {
              child.classList.add('is-visible');
            });
          });
          childObserver.observe(el, { childList: true, subtree: true });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      childObserver?.disconnect();
    };
  }, [options]);

  return ref;
}
