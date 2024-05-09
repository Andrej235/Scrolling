import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Track.scss";
import { useGSAP } from "@gsap/react";
import { Queue } from "../../Types/Queue";

interface UniversalTrackProps {
  children: JSX.Element[] | JSX.Element;
  distanceBetweenElements: number;
  totalDuration: number;
  isPaused?: boolean;
  pauseStateToggleTriggers?: ("Mouse over" | "Scroll /// Not implemented")[];
}

type TrackProps = UniversalTrackProps &
  (
    | {
        type: "vertical";
        direction?: "Up" | "Down";
      }
    | {
        type: "horizontal";
        direction?: "Left" | "Right";
      }
    | {
        type?: never;
        direction?: "Left" | "Right";
      }
  );

type PrecalculatedElement = {
  element: Element;
  start: number;
  startVisible: number;
  finish: number;
  relevantSize: number;
};

export default function Track({
  children,
  distanceBetweenElements,
  totalDuration,
  isPaused,
  pauseStateToggleTriggers,
  ...typeProps
}: TrackProps) {
  useEffect(() => {
    if (isPaused) pause();
    else resume();
  }, [isPaused]);

  const hiddenTrackItemsQueue = useRef<Queue<PrecalculatedElement>>(
    new Queue<PrecalculatedElement>()
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const trackRectRef = useRef<DOMRect>(new DOMRect());
  const visibleElementTimelines = useRef<Queue<gsap.core.Timeline>>(
    new Queue<gsap.core.Timeline>()
  );
  const isDirectionNegative = useRef<boolean>(false);

  useEffect(() => {
    initialize();
    showNext();

    //No need to hide all elements since 'initialize' will hide them anyway
    return () => {
      hiddenTrackItemsQueue.current.clear();
      visibleElementTimelines.current.clear();
    };
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

    if (!typeProps.type || typeProps.type == "horizontal") {
      const isLeft = typeProps.direction && typeProps.direction === "Left";

      isDirectionNegative.current = !isLeft;

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
          relevantSize: childRect.width,
        });
      }
    } else if (typeProps.type == "vertical") {
      const isUp = typeProps.direction && typeProps.direction === "Up";
      isDirectionNegative.current = !isUp;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childRect = child.getBoundingClientRect();
        const childRelativeTop = trackRect.top - childRect.top;

        const topOuterEdge = childRelativeTop - childRect.height;
        const topInnerEdge = childRelativeTop;
        const bottomOuterEdge = childRelativeTop + trackRect.height;
        const bottomInnerEdge = bottomOuterEdge - childRect.height;

        hideElement({
          element: child,
          start: isUp ? bottomOuterEdge : topOuterEdge,
          startVisible: isUp ? bottomInnerEdge : topInnerEdge,
          finish: isUp ? topOuterEdge : bottomOuterEdge,
          relevantSize: childRect.height,
        });
      }
    }
  });

  const hideElement = contextSafe((element: PrecalculatedElement) => {
    const styleProp =
      !typeProps.type || typeProps.type === "horizontal" ? "left" : "top";

    gsap.set(element.element, {
      [styleProp]: element.start,
    });

    visibleElementTimelines.current.dequeue();
    hiddenTrackItemsQueue.current.enqueue(element);
  });

  const showElement = contextSafe((element: PrecalculatedElement) => {
    if (!trackRectRef.current) return;

    const timeline = gsap.timeline();
    visibleElementTimelines.current.enqueue(timeline);

    const visible =
      element.startVisible +
      (isDirectionNegative.current
        ? -distanceBetweenElements
        : distanceBetweenElements);

    const isHorizontal = !typeProps.type || typeProps.type == "horizontal";
    const styleProp = isHorizontal ? "left" : "top";

    const absoluteTravelDistancePercent =
      (element.relevantSize + distanceBetweenElements) /
      ((isHorizontal
        ? trackRectRef.current.width
        : trackRectRef.current.height) +
        element.relevantSize);

    timeline.to(element.element, {
      [styleProp]: visible,
      duration: totalDuration * absoluteTravelDistancePercent,
      ease: "none",
      onComplete: showNext,
    });

    timeline.to(element.element, {
      [styleProp]: element.finish,
      duration: totalDuration * (1 - absoluteTravelDistancePercent),
      ease: "none",
      onComplete: () => {
        hideElement(element);
      },
    });
  });

  function pause() {
    visibleElementTimelines.current.toArray().forEach((tl) => tl.pause());
  }

  function resume() {
    visibleElementTimelines.current.toArray().forEach((tl) => tl.resume());
  }

  return (
    <div
      className={`track ${
        !typeProps.type || typeProps.type === "horizontal"
          ? "horizontal-track"
          : "vertical-track"
      }`}
      ref={trackRef}
      onMouseOver={
        pauseStateToggleTriggers?.includes("Mouse over") ? pause : undefined
      }
      onMouseLeave={
        pauseStateToggleTriggers?.includes("Mouse over") ? resume : undefined
      }
    >
      <div>{children}</div>
    </div>
  );
}
