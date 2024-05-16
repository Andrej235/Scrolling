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

  const [orderedImages, setOrderedImages] = useState<string[]>([]);

  useEffect(() => setCurrentImage(0), [images]);

  useEffect(() => {
    if (!containerRef.current) return;

    previousStateRef.current = Flip.getState(containerRef.current.children);
    setOrderedImages(
      centerArrayAroundElement(images, images.indexOf(images[currentImage]))
    );

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
    setCurrentImage((currentImage + 1) % images.length);
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

function centerArrayAroundElement<T>(arrToCenter: T[], idx: number): T[] {
  const arr = arrToCenter.slice();
  const half = Math.floor(arr.length / 2);

  // if (idx === half) return arr;
  //1 2 3 4 /5\ 6 7 *8* 9

  let k = half - idx + (half < idx ? arr.length : 0);
  const n = arr.length;
  /* 
  for (let i = 0; i < k; i++) {
    let t = arr[n - 1];
    for (let j = 0; j < n; j++) {
      const t1 = arr[j];
      arr[j] = t;
      t = t1;
    }
  } */

  let safety = 0;
  let currentIdx = 0;
  let prev = arr[0];

  for (let i = 0; i < arr.length; i++) {
    currentIdx = (currentIdx + k) % n;
    const t = arr[currentIdx];
    arr[currentIdx] = prev;
    prev = t;

    if (currentIdx === safety) {
      currentIdx++;
      safety++;
      prev = arr[currentIdx];
    }
  }
  console.log(arr);

  return arr;
}
