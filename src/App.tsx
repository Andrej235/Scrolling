import "./App.scss";
import ImageWithText from "./Components/ImageWithText/ImageWithText";
import useJumpyText from "./Hooks/UseJumpyText";

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

  return (
    <>
      <div className="text-container">
        <p>Hi</p>
        <br />
        <p id="jumpy">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          aliquam.
        </p>
      </div>

      {/*       <div className="text-container" id="sine-text">
        <p>Lorem, ipsum dolor.</p>
      </div> */}

      <ImageWithText
        direction="Normal"
        wrap="Reverse"
        text="Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos optio explicabo placeat vitae voluptas alias."
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
