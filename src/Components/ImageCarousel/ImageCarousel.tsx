import { useEffect, useRef, useState } from "react";
import "./ImageCarousel.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
gsap.registerPlugin(Flip);

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousStateRef = useRef<Flip.FlipState | null>(null);

  function getPreviousImageIdx() {
    return currentImage - 1 < 0 ? images.length - 1 : currentImage - 1;
  }

  function getNextImageIdx() {
    return currentImage + 1 > images.length - 1 ? 0 : currentImage + 1;
  }

  const [orderedImages, setOrderedImages] = useState<string[]>([]);

  useEffect(() => setCurrentImage(0), [images]);

  useEffect(() => {
    if (!containerRef.current) return;

    previousStateRef.current = Flip.getState(containerRef.current.children);

    setOrderedImages(centerArrayAroundElement(images, currentImage));
    console.log(orderedImages);

    animateFrom();
  }, [currentImage, containerRef.current]);

  const { contextSafe } = useGSAP();

  const animateFrom = contextSafe(() => {
    if (!previousStateRef.current) return;

    /*     Flip.from(previousStateRef.current, {
      duration: 1,
      absolute: true,
    }); */
  });

  const moveToNextImage = contextSafe(() => {
    setCurrentImage(getNextImageIdx());
  });

  return (
    <div
      className="image-carousel"
      onClick={moveToNextImage}
      ref={containerRef}
    >
      {orderedImages.map((image) => (
        <img
          key={image}
          src={image}
          alt="Image"
          className="image-carousel-item"
        />
      ))}
    </div>
  );
}

function centerArrayAroundElement<T>(arr: T[], idx: number): T[] {
  const half = Math.floor(arr.length / 2);

  

/*   if (idx === half + 1) return arr;

  if (idx > half + 1) {
    const leftPart = arr.slice(idx - half, idx);
    const rightPart = [...arr.slice(idx + 1), ...arr.slice(0, idx - half)];
    return [...leftPart, arr[idx], ...rightPart];
  }

  const leftPart = [...arr.slice(idx + half + 1), ...arr.slice(0, idx)];
  const rightPart = arr.slice(idx + 1, idx + half + 1);
  return [...leftPart, arr[idx], ...rightPart]; */
}
