import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./AppearingText.scss";
gsap.registerPlugin(ScrollTrigger);

interface AppearingTextProps {
  children: string;
  id: string;
  speed?: number;
}

export default function AppearingText({
  speed,
  id,
  children,
}: AppearingTextProps) {
  useGSAP(() => {
    console.log('a');
    
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: "top 75%",
      end: "bottom 50%",
      // toggleActions: "play none none reverse",
      scrub: false,
      markers: true,
      animation: gsap.fromTo(
        `#${id} .appearing-char`,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 1 / (children.length ?? 1) / (speed ?? 1),
          duration: 0.175 / (speed ?? 1),
          ease: "sine.inOut",
        }
      ),
      // onLeave
    });
  }, [children]);

  return (
    <p className="appearing-text" id={id}>
      {children.split("").map((char, index) => (
        <span key={index} className="appearing-char">
          {char == " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}
