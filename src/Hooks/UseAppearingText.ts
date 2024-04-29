import { useEffect } from "react";
import useSplitText from "./UseSplitText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function useAppearingText(
  element: `#${string}` | `.${string}`
) {
  const split = useSplitText(element);

  useEffect(() => {
    if (!split) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 75%",
      end: "bottom 50%",
      // toggleActions: "play none none reverse",
      scrub: false,
      markers: true,
      animation: gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 1 / (split.chars?.length ?? 1),
          duration: 0.175,
          ease: "sine.inOut",
        }
      ),
    });

    return () => scrollTrigger.kill();
  }, [split]);
}
