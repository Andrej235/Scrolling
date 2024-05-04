import { useGSAP } from "@gsap/react";
import useSplitText from "./UseSplitText";
import gsap from "gsap";

export default function useScrambledText(element: `#${string}`) {
  const split = useSplitText(element);

  useGSAP(() => {
    if (!split || !split.chars) return;

    split.chars.forEach((word) => {
      gsap.fromTo(
        word,
        {
          x: Math.random() * 250 - 125,
          y: Math.random() * 500 - 250,
          rotationX: Math.random() * 90 - 45,
          rotationY: Math.random() * 90 - 45,
          rotationZ: Math.random() * 360 - 180,
        },
        {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          duration: 0.5,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [split]);
}
