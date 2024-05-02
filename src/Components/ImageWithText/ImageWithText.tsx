import "./ImageWithText.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useTextAnimations from "../../Hooks/UseTextAnimations";
gsap.registerPlugin(ScrollTrigger);

interface ImageWithTextBaseProps {
  text: string;
  imageUrl: string;
  direction?: "Normal" | "Reverse";
  wrap?: "Normal" | "Reverse";
  id?: string;
}

type ScrollTriggerToggleAction =
  | "play"
  | "pause"
  | "resume"
  | "reset"
  | "restart"
  | "complete"
  | "reverse"
  | "none";

interface AnimationProps {
  scrub?: boolean;
  markers?: boolean;
  onComplete?: () => void;
  toggleActions?: `${ScrollTriggerToggleAction} ${ScrollTriggerToggleAction} ${ScrollTriggerToggleAction} ${ScrollTriggerToggleAction}`;
  duration?: number;
  textStagger?: number;
  textAppearingType?: "characters" | "words" | "lines";
}

type ImageWithTextProps = ImageWithTextBaseProps &
  (
    | {
        animated: true;
        id: string;
        animationProps?: AnimationProps;
      }
    | {
        animated?: false;
      }
  );

export default function ImageWithText(props: ImageWithTextProps) {
  useTextAnimations({
    element: props.animated ? `#${props.id} p` : "#not-animated",
    animation: props.animated ? "appear" : "none",
    trigger: props.animated ? `#${props.id}` : undefined,
    duration: props.animated ? props.animationProps?.duration : undefined,
    stagger: props.animated ? props.animationProps?.textStagger : undefined,
    onComplete: props.animated ? props.animationProps?.onComplete : undefined,
    scrub: props.animated ? props.animationProps?.scrub : undefined,
    markers: props.animated ? props.animationProps?.markers : undefined,
    toggleActions: props.animated
      ? props.animationProps?.toggleActions
      : undefined,
    appearingType: props.animated
      ? props.animationProps?.textAppearingType
      : undefined,
  });

  useGSAP(() => {
    if (!props.animated) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: `#${props.id}`,
      start: "top 75%",
      end: "bottom 50%",
      toggleActions:
        props.animationProps?.toggleActions ?? "play none none none",
      scrub: props.animationProps?.scrub,
      markers: props.animationProps?.markers,
      animation: gsap.fromTo(
        `#${props.id} img`,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration:
            (props.animationProps?.duration ?? 0.175) +
            (!props.animationProps || !props.animationProps.textStagger
              ? 0.3
              : (props.animationProps.textStagger * props.text.length) / 3),
          ease: "sine.inOut",
        }
      ),
    });

    return () => scrollTrigger.kill();
  }, [props.direction]);

  return (
    <div
      className="image-with-text-container"
      style={{
        flexDirection:
          !props.direction || props.direction === "Normal"
            ? "row"
            : "row-reverse",
        flexWrap:
          !props.wrap || props.wrap === "Normal" ? "wrap" : "wrap-reverse",
      }}
      id={props.id ? props.id : void 0}
    >
      <div className="image-text-container">
        <p>{props.text}</p>
      </div>
      <img src={props.imageUrl} />
    </div>
  );
}
