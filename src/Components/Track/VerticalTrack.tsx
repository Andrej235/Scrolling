import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Track.scss";
import { useGSAP } from "@gsap/react";
import { Queue } from "../../Types/Queue";

interface TrackProps {
  children: JSX.Element[] | JSX.Element;
  distanceBetweenElements: number;
  totalDuration: number;
  direction?: "Up" | "Down";
}

type PrecalculatedElement = {
  element: Element;
  start: number;
  startVisible: number;
  finish: number;
  height: number;
};

export default function VerticalTrack({
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
  const visibleElementTimelines = useRef<Queue<gsap.core.Timeline>>(
    new Queue<gsap.core.Timeline>()
  );

  useEffect(() => {
    console.log("Render");
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
    console.log("Initialize");
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    trackRectRef.current = trackRect;

    const children = trackRef.current.children[0].children;
    const isUp = direction && direction === "Up";

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childRect = child.getBoundingClientRect();
      const childRelativeTop = trackRect.top - childRect.top;

      const topOuterEdge = childRelativeTop - childRect.height;
      const topInnerEdge = childRelativeTop;
      const bottomOuterEdge = childRelativeTop + trackRect.height;
      const bottomInnerEdge = bottomOuterEdge - childRect.height;

      const current: PrecalculatedElement = {
        element: child,
        start: isUp ? bottomOuterEdge : topOuterEdge,
        startVisible: isUp ? bottomInnerEdge : topInnerEdge,
        finish: isUp ? topOuterEdge : bottomOuterEdge,
        height: childRect.height,
      };
      hideElement(current);
    }
  });

  const hideElement = contextSafe((element: PrecalculatedElement) => {
    gsap.set(element.element, {
      top: element.start,
    });

    visibleElementTimelines.current.dequeue();
    hiddenTrackItemsQueue.current.enqueue(element);
  });

  const showElement = contextSafe((element: PrecalculatedElement) => {
    if (!trackRectRef.current) return;

    const absoluteTravelDistancePercent = 0.07;
    //   (element.height + distanceBetweenElements) /
    //   (trackRectRef.current.height + element.height);
    // console.log(absoluteTravelDistancePercent);

    const timeline = gsap.timeline();

    //Put this stuff into a different component? Its not really efficient
    visibleElementTimelines.current.enqueue(timeline);

    timeline.to(element.element, {
      top:
        element.startVisible +
        (direction && direction == "Up"
          ? distanceBetweenElements
          : -distanceBetweenElements),
      duration: totalDuration * absoluteTravelDistancePercent,
      ease: "none",
      onComplete: showNext,
    });

    timeline.to(element.element, {
      top: element.finish,
      duration: totalDuration * (1 - absoluteTravelDistancePercent),
      ease: "none",
      onComplete: () => {
        hideElement(element);
      },
    });
  });

  return (
    <div
      className="vertical-track track"
      ref={trackRef}
      onMouseOver={() =>
        visibleElementTimelines.current.toArray().forEach((tl) => tl.pause())
      }
      onMouseLeave={() =>
        visibleElementTimelines.current.toArray().forEach((tl) => tl.resume())
      }
    >
      <div>{children}</div>
    </div>
  );
}
