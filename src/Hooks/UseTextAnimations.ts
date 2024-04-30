import { useCallback, useEffect, useState } from "react";
import useSplitText from "./UseSplitText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

type ScrollTriggerToggleAction =
  | "play"
  | "pause"
  | "resume"
  | "reset"
  | "restart"
  | "complete"
  | "reverse"
  | "none";

interface AppearAnimationProps {
  animation: "appear";
  scrub?: boolean;
  markers?: boolean;
  onComplete?: () => void;
  toggleActions?: `${ScrollTriggerToggleAction} ${ScrollTriggerToggleAction} ${ScrollTriggerToggleAction} ${ScrollTriggerToggleAction}`;
}

interface JumpAnimationProps {
  animation: "jump";
  fromY?: number;
  yJump?: number;
}

type TextAnimationProps = {
  element: `#${string}` | `.${string}`;
  stagger?: number;
  duration?: number;
} & (AppearAnimationProps | JumpAnimationProps);

export default function useTextAnimations<T extends "appear" | "jump">(
  props: TextAnimationProps
): T extends "appear" ? undefined : () => void {
  const split = useSplitText(props.element);
  const { contextSafe } = useGSAP();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (!split || props.animation !== "appear") return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: props.element,
      start: "top 75%",
      end: "bottom 50%",
      toggleActions: props.toggleActions ?? "play none none none",
      scrub: props.scrub,
      markers: props.markers,
      animation: gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          stagger: props.stagger ?? 1 / (split.chars?.length ?? 1),
          duration: props.duration ?? 0.175,
          ease: "sine.inOut",
          onComplete: props.onComplete,
        }
      ),
    });
    return () => scrollTrigger.kill();
  }, [split]);

  if (props.animation !== "jump") return undefined as any;

  return useCallback(
    contextSafe(() => {
      if (isAnimated || !split) return;

      setIsAnimated(true);
      gsap.fromTo(
        split.chars,
        {
          y: props.fromY ?? 0,
        },
        {
          y: (props.fromY ?? 0) + (props.yJump ?? -15),
          stagger: props.stagger ?? 0.05,
          duration: props.duration ?? 0.175,
          ease: "sine.inOut",
        }
      );

      gsap.to(split.chars, {
        y: props.fromY ?? 0,
        stagger: props.stagger ?? 0.05,
        duration: props.duration ?? 0.175,
        delay: (props.duration ?? 0.175) + (props.stagger ?? 0.05),
        ease: "sine.inOut",
        onComplete: () => setIsAnimated(false),
      });
    }),
    [isAnimated, split]
  ) as any;
}
