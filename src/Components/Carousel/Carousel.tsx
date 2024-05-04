import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface AnimationProps {
  inDuration: number;
  outDuration: number;
  visibleDuration: number;
}

type ExclusiveOffset<T extends "single" | "separate"> = T extends "single"
  ? { offset: gsap.TweenValue; inOffset?: never; outOffset?: never }
  : { offset?: never; inOffset: gsap.TweenValue; outOffset: gsap.TweenValue };

interface CarouselProps {
  children: JSX.Element[];
  animationProps?: Partial<AnimationProps>;
  flyIn?:
    | ({
        from?: "left" | "right" | "top" | "bottom";
        to?: "left" | "right" | "top" | "bottom";
      } & (ExclusiveOffset<"single"> | ExclusiveOffset<"separate">))
    | true;
}

export default function Carousel({
  children,
  flyIn,
  animationProps,
}: CarouselProps) {
  const [currentChild, setCurrentChild] = useState<number>(0);
  const currentChildRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentChild(0);
  }, children);

  useGSAP(() => {
    if (!flyIn) return;

    const offset =
      flyIn !== true && flyIn.inOffset
        ? ({
            in: flyIn.inOffset,
            out: flyIn.outOffset,
          } as const)
        : flyIn !== true && flyIn.offset
        ? ({
            in: flyIn.offset,
            out: flyIn.offset,
          } as const)
        : ({
            in: 100,
            out: 100,
          } as const);

    const tl = gsap.timeline();
    const from: {} = getDirectionalOffset(
      flyIn === true ? "top" : flyIn.from ?? "top",
      offset.in
    );

    tl.fromTo(
      currentChildRef.current,
      {
        opacity: 0,
        ...from,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: animationProps?.inDuration ?? 0.3,
      },
      0
    );

    const flyOut: {} = getDirectionalOffset(
      flyIn === true ? "top" : flyIn.to ?? "top",
      offset.out
    );

    tl.to(
      currentChildRef.current,
      {
        opacity: 0,
        onComplete: () =>
          setCurrentChild(
            currentChild + 1 > children.length - 1 ? 0 : currentChild + 1
          ),
        duration:
          animationProps?.outDuration ??
          (animationProps?.inDuration ?? 0.7) / 1.7,
        ...flyOut,
      },
      `+=${animationProps?.visibleDuration ?? 3}`
    );
  }, [currentChild]);

  function getDirectionalOffset(
    direction: "left" | "right" | "top" | "bottom",
    offset: gsap.TweenValue
  ): { x: gsap.TweenValue } | { y: gsap.TweenValue } {
    switch (direction) {
      case "top":
        return {
          y: -offset,
        };

      case "bottom":
        return {
          y: offset,
        };

      case "left":
        return {
          x: -offset,
        };

      case "right":
        return {
          x: offset,
        };
    }
  }

  return <div ref={currentChildRef}>{children[currentChild]}</div>;
}
