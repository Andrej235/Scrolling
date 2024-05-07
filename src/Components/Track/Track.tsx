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

      const currentX = childRelativeLeft - childRect.width;
      gsap.set(child, {
        left: currentX,
      });

      (child as HTMLElement).dataset.originalLeft = childRect.left.toString();
      (child as HTMLElement).dataset.hiddenLeft = currentX.toString();
      (child as HTMLElement).dataset.width = childRect.width.toString();

      hiddenTrackItemsQueue.current.enqueue(child);
    }
  });

  const hideElement = contextSafe((element: Element) => {
    gsap.set(element, {
      left: parseFloat((element as HTMLElement).dataset.hiddenLeft!),
    });

    hiddenTrackItemsQueue.current.enqueue(element);
  });

  const showElement = contextSafe((element: Element) => {
    if (!trackRectRef.current) return;

    //TODO: replace with a prop
    const distanceBetweenElements = 70;

    const trackRect = trackRectRef.current;
    const visibleX =
      trackRect.left - parseInt((element as HTMLElement).dataset.originalLeft!);

    const absoluteVisibleX = parseInt((element as HTMLElement).dataset.width!);
    const absoluteVisibleXPercent =
      (absoluteVisibleX + distanceBetweenElements) /
      (trackRect.width + absoluteVisibleX);

    const timeline = gsap.timeline();
    const totalDuration = 2.5;

    timeline.to(element, {
      left: visibleX + distanceBetweenElements,
      duration: totalDuration * absoluteVisibleXPercent,
      ease: "none",
      onComplete: showNext,
    });

    timeline.to(element, {
      left: visibleX + trackRect.width,
      duration: totalDuration * (1 - absoluteVisibleXPercent),
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
