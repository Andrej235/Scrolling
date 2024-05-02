import { useGSAP } from "@gsap/react";
import useSplitText from "./UseSplitText";
import { useCallback, useEffect } from "react";
import gsap from "gsap";

export default function useJumpyText(element: `#${string}` | `.${string}`) {
  const split = useSplitText(element);
  const { contextSafe } = useGSAP();

  const playInAnimation = useCallback(
    contextSafe((e: MouseEvent) => {
      gsap.to(e.target, {
        y: -15,
        duration: 0.1,
      });
    }),
    [contextSafe]
  );

  const playOutAnimation = useCallback(
    contextSafe((e: MouseEvent) => {
      gsap.to(e.target, {
        y: 0,
        duration: 0.1,
      });
    }),
    [contextSafe]
  );

  useEffect(() => {
    if (!split) return;

    split.chars?.forEach((x) =>
      x.addEventListener("mouseover", playInAnimation)
    );
    split.chars?.forEach((x) =>
      x.addEventListener("mouseout", playOutAnimation)
    );

    return () =>
      split.chars?.forEach((x) => {
        x.removeEventListener("mouseover", playInAnimation);
        x.removeEventListener("mouseout", playOutAnimation);
      });
  }, [playInAnimation, playOutAnimation, split]);
}
