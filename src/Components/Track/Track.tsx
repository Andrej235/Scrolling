import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Track.scss";
import { useGSAP } from "@gsap/react";
import { Queue } from "../../Types/Queue";

interface TrackProps {
  children: JSX.Element[] | JSX.Element;
  distanceBetweenElements: number;
  totalDuration: number;
  direction?: "Left" | "Right";
}

type PrecalculatedElement = {
  element: Element;
  start: number;
  startVisible: number;
  finish: number;
  width: number;
};

export default function Track({
  children,
  distanceBetweenElements,
  totalDuration,
  direction,
}: TrackProps) {
  const hiddenTrackItemsQueue = useRef<Queue<PrecalculatedElement>>(
    new Queue<PrecalculatedElement>()
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const trackRectRef = useRef<DOMRect>(new DOMRect());

  useEffect(() => {
    initialize();
    showNext();

    //No need to hide all elements since 'initialize' will hide them anyway
    return () => hiddenTrackItemsQueue.current.clear();
  }, []);

  function showNext() {
    const firstInQueue = hiddenTrackItemsQueue.current.dequeue();
    if (firstInQueue) showElement(firstInQueue);
  }

  const { contextSafe } = useGSAP();

  const initialize = contextSafe(() => {
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    trackRectRef.current = trackRect;

    const children = trackRef.current.children[0].children;
    const isLeft = !direction || direction === "Left";

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childRect = child.getBoundingClientRect();
      const childRelativeLeft = trackRect.left - childRect.left;

      const leftOuterEdge = childRelativeLeft - childRect.width;
      const leftInnerEdge = childRelativeLeft;
      const rightOuterEdge = childRelativeLeft + trackRect.width;
      const rightInnerEdge = rightOuterEdge - childRect.width;

      hideElement({
        element: child,
        start: isLeft ? leftOuterEdge : rightOuterEdge,
        startVisible: isLeft ? leftInnerEdge : rightInnerEdge,
        finish: isLeft ? rightOuterEdge : leftOuterEdge,
        width: childRect.width,
      });
    }
  });

  const hideElement = contextSafe((element: PrecalculatedElement) => {
    gsap.set(element.element, {
      left: element.start,
    });

    hiddenTrackItemsQueue.current.enqueue(element);
  });

  const showElement = contextSafe((element: PrecalculatedElement) => {
    if (!trackRectRef.current) return;

    const absoluteTravelDistancePercent =
      (element.width + distanceBetweenElements) /
      (trackRectRef.current.width + element.width);

    const timeline = gsap.timeline();

    timeline.to(element.element, {
      left:
        element.startVisible +
        (!direction || direction == "Left"
          ? distanceBetweenElements
          : -distanceBetweenElements),
      duration: totalDuration * absoluteTravelDistancePercent,
      ease: "none",
      onComplete: showNext,
    });

    timeline.to(element.element, {
      left: element.finish,
      duration: totalDuration * (1 - absoluteTravelDistancePercent),
      ease: "none",
      onComplete: () => {
        hideElement(element);
      },
    });
  });

  return (
    <div className="track" ref={trackRef}>
      <div>{children}</div>
    </div>
  );
}
