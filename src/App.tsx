import "./App.scss";
import ImageWithText from "./Components/ImageWithText/ImageWithText";

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

  return (
    <>
      <div className="text-container">Hi</div>

      {/*       <div className="text-container" id="sine-text">
        <p>Lorem, ipsum dolor.</p>
      </div> */}

      <ImageWithText
        direction="Normal"
        wrap="Reverse"
        text="Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos optio explicabo placeat vitae voluptas alias."
        imageUrl="https://picsum.photos/1920/1080"
      />
    </>
  );
}

export default App;
