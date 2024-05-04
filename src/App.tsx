import "./App.scss";
import Carousel from "./Components/Carousel/Carousel";
import ImageWithText from "./Components/ImageWithText/ImageWithText";
import useJumpyText from "./Hooks/UseJumpyText";
import useTextAnimations from "./Hooks/UseTextAnimations";

function App() {
  /*   const split = useSplitText("#sine-text");
  useGSAP(() => {
    if (!split || !split.chars) return;

    split.chars.forEach((char, i) => {
      let frame = 0;
      gsap.to(char, {
        y: () =>
          Math.sin((i / split.chars!.length) * Math.PI * 2) * 100 + frame,
        onUpdate: () => {
          frame += 1;
        },
      });
    });
  }, [split]); */

  useJumpyText("#jumpy");

  useTextAnimations({
    element: "#title",
    animation: "jump",
    trigger: "mouseover",
  });

  return (
    <>
      <div className="text-container">
        <p>Hi</p>
        <p id="title">Timelines</p>
        <br />
        <p
          id="jumpy"
          style={{
            margin: "0 5vw",
          }}
        >
          Just like we've just seen with staggers, It's common to animate more
          than one thing. But what if we need more control over the order and
          timing of those animations?
        </p>
      </div>

      {/*       <div className="text-container" id="sine-text">
        <p>Lorem, ipsum dolor.</p>
      </div> */}

      <Carousel
        flyIn={true}
        animationProps={{
          inDuration: 1,
          outDuration: 0.5,
          visibleDuration: 1,
        }}
      >
        <p>First paragraph</p>
        <p>Second paragraph</p>
        <p>Third paragraph</p>
      </Carousel>

      <Carousel flyIn={{ from: "left", to: "right", offset: 100 }}>
        <p>First paragraph</p>
        <p>Second paragraph</p>
        <p>Third paragraph</p>
      </Carousel>

      <Carousel
        flyIn={{ from: "right", to: "left", inOffset: 200, outOffset: 300 }}
        animationProps={{
          inDuration: 0.5,
          outDuration: 0.5,
          visibleDuration: 1,
        }}
      >
        <p>First paragraph</p>
        <p>Second paragraph</p>
        <p>Third paragraph</p>
      </Carousel>

      <ImageWithText
        direction="Normal"
        wrap="Reverse"
        text="Timelines are the key to creating easily adjustable, resilient sequences of animations. When you add tweens to a timeline, by default they'll play one-after-another in the order they were added.
"
        imageUrl="https://picsum.photos/1920/1080"
        animated
        id="test"
        animationProps={{
          textAppearingType: "words",
        }}
      />
    </>
  );
}

export default App;
