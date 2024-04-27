import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./FloatingText.scss";
import { useCallback, useState } from "react";

interface FloatingTextProps {
  className?: string;
  id?: string;
  children: string;
  fromY?: number;
  yJump?: number;
  stagger?: number;
  duration?: number;
}

export default function FloatingText({
  children,
  className,
  id,
  duration,
  stagger,
  fromY,
  yJump,
}: FloatingTextProps) {
  const { contextSafe } = useGSAP();
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const jump = useCallback(
    contextSafe(() => {
      if (isAnimated) return;

      setIsAnimated(true);
      gsap.fromTo(
        ".floating-char",
        {
          y: fromY ?? 0,
        },
        {
          y: (fromY ?? 0) + (yJump ?? -10),
          stagger: stagger ?? 0.05,
          duration: duration ?? 0.1,
          // ease: "back.out",
          ease: "sine.inOut",
        }
      );

      gsap.to(".floating-char", {
        y: fromY ?? 0,
        stagger: stagger ?? 0.05,
        duration: duration ?? 0.1,
        delay: (duration ?? 0.1) + (stagger ?? 0.05),
        // ease: "back.inOut",
        ease: "sine.inOut",
        onComplete: () => setIsAnimated(false),
      });
    }),
    [isAnimated]
  );

  return (
    <p
      className={"floating-text" + (className ? " " + className : "")}
      id={id}
      onMouseOver={jump}
    >
      {children.split("").map((char, index) => (
        <span key={index} className="floating-char">
          {char == " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}
