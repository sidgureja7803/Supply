import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized configuration
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      syncTouch: false,
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 35,
    });

    lenisRef.current = lenis;

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', (data) => {
      ScrollTrigger.update();
    });

    // Animation frame function for smooth rendering
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    const rafId = requestAnimationFrame(raf);

    // Make sure ScrollTrigger works with Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.animatedScroll || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Handle route changes - scroll to top smoothly
    const handleRouteChange = () => {
      lenis.scrollTo(0, { 
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
    };

    // Listen for navigation changes
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
} 