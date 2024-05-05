import { useGSAP } from "@gsap/react";
import "./Navigation.scss";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { useRef } from "react";
gsap.registerPlugin(Flip);

export default function Navigation() {
  const { contextSafe } = useGSAP();
  const selectedNavigationItemRef = useRef<number>(0);
  const navigationContainerRef = useRef<HTMLDivElement>(null);

  const playAnimation = contextSafe((i: number) => {
    if (
      !navigationContainerRef.current ||
      selectedNavigationItemRef.current === i
    )
      return;

    const oldSelectedNavigationItemsState = Flip.getState(
      ".navigation-item.selected"
    );
    const newSelectedNavigationItemsState = Flip.getState(
      navigationContainerRef.current?.children[i]
    );
    const selectionIndicatorState = Flip.getState(".selection-indicator");

    gsap.set(".selection-indicator", {
      gridRow: i + 1,
    });

    navigationContainerRef.current?.children[
      selectedNavigationItemRef.current
    ].classList.remove("selected");

    navigationContainerRef.current?.children[i].classList.add("selected");
    const timeline = Flip.from(oldSelectedNavigationItemsState, {
      duration: 0.33,
    });

    timeline.add(
      Flip.from(selectionIndicatorState, {
        duration: 0.17 * Math.abs(i - selectedNavigationItemRef.current),
        ease: "sine.inOut",
      }),
      0
    );

    function addNavigationItemsToTimeline(item: Element) {
      timeline.to(
        item,
        {
          x: "1.5em",
          duration: 0.2,
          repeatDelay: 0.04 * Math.abs(i - selectedNavigationItemRef.current),
          yoyo: true,
          repeat: 1,
        },
        "<+0.075"
      );
    }

    if (selectedNavigationItemRef.current < i) {
      for (let j = selectedNavigationItemRef.current + 1; j < i; j++)
        addNavigationItemsToTimeline(
          navigationContainerRef.current?.children[j]
        );
    } else {
      for (let j = selectedNavigationItemRef.current - 1; j > i; j--)
        addNavigationItemsToTimeline(
          navigationContainerRef.current?.children[j]
        );
    }

    timeline.add(
      Flip.from(newSelectedNavigationItemsState, {
        duration: 0.33,
      }),
      "<"
    );

    selectedNavigationItemRef.current = i;
  });

  return (
    <div className="navigation" ref={navigationContainerRef}>
      <div
        onClick={() => playAnimation(0)}
        className="navigation-item selected"
      >
        Home
      </div>
      <div onClick={() => playAnimation(1)} className="navigation-item">
        Projects
      </div>
      <div onClick={() => playAnimation(2)} className="navigation-item">
        Info
      </div>
      <div onClick={() => playAnimation(3)} className="navigation-item">
        Contact
      </div>
      <div onClick={() => playAnimation(4)} className="navigation-item">
        FAQ
      </div>
      <div className="selection-indicator">●</div>
    </div>
  );
}
