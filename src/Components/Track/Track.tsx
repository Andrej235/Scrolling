import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Track.scss";
import { useGSAP } from "@gsap/react";
import { Queue } from "../../Types/Queue";

interface TrackProps {
  children: JSX.Element[] | JSX.Element;
  distanceBetweenElements: number;
  totalDuration: number;
}

type PrecalculatedElement = {
  element: Element;
  leftOuterEdge: number;
  leftInnerEdge: number;
  rightOuterEdge: number;
  rightInnerEdge: number;
  width: number;
};

export default function Track({
  children,
  distanceBetweenElements,
  totalDuration,
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

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childRect = child.getBoundingClientRect();
      const childRelativeLeft = trackRect.left - childRect.left;

      hideElement({
        element: child,
        leftOuterEdge: childRelativeLeft - childRect.width,
        leftInnerEdge: childRelativeLeft,
        rightOuterEdge: childRelativeLeft + trackRect.width,
        rightInnerEdge: childRelativeLeft + trackRect.width - childRect.width,
        width: childRect.width,
      });
    }
  });

  const hideElement = contextSafe((element: PrecalculatedElement) => {
    gsap.set(element.element, {
      left: element.leftOuterEdge,
    });

    hiddenTrackItemsQueue.current.enqueue(element);
  });

  const showElement = contextSafe((element: PrecalculatedElement) => {
    if (!trackRectRef.current) return;

    const trackRect = trackRectRef.current;
    const visibleX = element.leftInnerEdge;

    const absoluteTravelDistancePercent =
      (element.width + distanceBetweenElements) /
      (trackRect.width + element.width);

    const timeline = gsap.timeline();

    timeline.to(element.element, {
      left: visibleX + distanceBetweenElements,
      duration: totalDuration * absoluteTravelDistancePercent,
      ease: "none",
      onComplete: showNext,
    });

    timeline.to(element.element, {
      left: visibleX + trackRect.width,
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
