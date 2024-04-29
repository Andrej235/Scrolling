import { useCallback, useState } from "react";
import useSplitText from "./UseSplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function useFloatingText(
  element: `#${string}` | `.${string}`
) {
  const split = useSplitText(element);
  const { contextSafe } = useGSAP();
  const [isAnimated, setIsAnimated] = useState(false);

  const playAnimation = useCallback(
    contextSafe(() => {
      if (isAnimated || !split) return;

      setIsAnimated(true);
      gsap.fromTo(
        split.chars,
        {
          y: 0,
        },
        {
          y: -15,
          stagger: 0.05,
          duration: 0.1,
          ease: "sine.inOut",
        }
      );

      gsap.to(split.chars, {
        y: 0,
        stagger: 0.05,
        duration: 0.1,
        delay: 0.15,
        ease: "sine.inOut",
        onComplete: () => setIsAnimated(false),
      });
    }),
    [isAnimated, split]
  );

  return playAnimation;
}
