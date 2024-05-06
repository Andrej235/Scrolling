import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Track.scss";
import { useGSAP } from "@gsap/react";
import { Queue } from "../../Types/Queue";

interface TrackProps {
  children: JSX.Element[] | JSX.Element;
}

export default function Track({ children }: TrackProps) {
  const hiddenTrackItemsQueue = useRef<Queue<Element>>(new Queue<Element>());
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initialize();

    return () => {
      console.log("cleaning up");
      hiddenTrackItemsQueue.current = new Queue<Element>();
    };
  }, []);

  const { contextSafe } = useGSAP();

  const initialize = contextSafe(() => {
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const children = trackRef.current.children[0].children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childRect = child.getBoundingClientRect();
      (child as HTMLElement).dataset.originalLeft = childRect.left.toString();

      const childRelativeLeft = trackRect.left - childRect.left;

      // const currentX = -(2 * rect.width - positionX - childRelativeLeft);
      const currentX = childRelativeLeft - childRect.width;
      gsap.set(child, {
        left: currentX,
      });

      hiddenTrackItemsQueue.current.enqueue(child);
    }
  });

  const hideElement = contextSafe((element: Element) => {
    if (!trackRef.current) return;

    gsap.set(element, {
      left: 0,
    });

    const trackRect = trackRef.current?.getBoundingClientRect();
    const childRect = element.getBoundingClientRect();
    const currentX = trackRect.left - childRect.left - childRect.width;

    gsap.set(element, {
      left: currentX,
    });

    hiddenTrackItemsQueue.current.enqueue(element);
  });

  const showElement = contextSafe((element: Element) => {
    if (!trackRef.current) return;

    const trackRect = trackRef.current?.getBoundingClientRect();
    const currentX =
      trackRect.left -
      parseInt((element as HTMLElement).dataset.originalLeft ?? "0") +
      trackRect.width;

    const tl = gsap.timeline();
    tl.to(element, {
      left: currentX,
      duration: 1,
      ease: "none",
      onComplete: () => {
        tl.clear();
        hideElement(element);
      },
    });
  });

  function start() {
    const firstInQueue = hiddenTrackItemsQueue.current.dequeue();
    if (!firstInQueue) return;

    showElement(firstInQueue);
  }

  return (
    <div className="track" ref={trackRef} onClick={start}>
      <div>{children}</div>
    </div>
  );
}
