import "./App.scss";
import Carousel from "./Components/Carousel/Carousel";
import Icon from "./Components/Icon/Icon";
import ImageWithText from "./Components/ImageWithText/ImageWithText";
import Navigation from "./Components/Navigation/Navigation";
import Track from "./Components/Track/Track";
import useJumpyText from "./Hooks/UseJumpyText";
import useScrambledText from "./Hooks/UseScrambledText";
import useTextAnimations from "./Hooks/UseTextAnimations";

function App() {
  useJumpyText("#jumpy");
  useScrambledText("#scrambled-text");

  useTextAnimations({
    element: "#title",
    animation: "jump",
    trigger: "mouseover",
  });

  return (
    <>
      <Navigation />

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

      <div
        style={{
          width: "50%",
          border: "1px solid #fff",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          boxSizing: "border-box",
          padding: "1rem 0",
        }}
      >
        <Track>
          <Icon className="icon-bottom-track" name="link" />
          <Icon className="icon-bottom-track" name="thumbs-up" />
          <Icon className="icon-bottom-track" name="arrow-circle-left" />
          <Icon className="icon-bottom-track" name="code" />
          <Icon className="icon-bottom-track" name="youtube-square" />
          <Icon className="icon-bottom-track" name="thumbs-o-up" />
          <Icon className="icon-bottom-track" name="align-left" />
          <Icon className="icon-bottom-track" name="address-book" />
          <Icon className="icon-bottom-track" name="volume-control-phone" />
          <Icon className="icon-bottom-track" name="phone" />
          <Icon className="icon-bottom-track" name="taxi" />
          <Icon className="icon-bottom-track" name="bank" />
        </Track>

        <br />

        <Track>
          <p>First paragraph</p>
          <p>Second paragraph</p>
          <p>Third paragraph</p>
          <p>Fourth paragraph</p>
          <p>Fifth paragraph</p>
        </Track>

        <br />

        <Track>
          <Icon className="icon-bottom-track" name="address-card" />
          <Icon className="icon-bottom-track" name="apple" />
          <Icon className="icon-bottom-track" name="arrows-alt" />
          <Icon className="icon-bottom-track" name="bell" />
          <Icon className="icon-bottom-track" name="birthday-cake" />
          <Icon className="icon-bottom-track" name="book" />
          <Icon className="icon-bottom-track" name="calendar" />
          <Icon className="icon-bottom-track" name="camera" />
          <Icon className="icon-bottom-track" name="car" />
          <Icon className="icon-bottom-track" name="coffee" />
          <Icon className="icon-bottom-track" name="cog" />
          <Icon className="icon-bottom-track" name="envelope" />
        </Track>
      </div>

      <div className="text-container">
        <p
          id="scrambled-text"
          style={{
            margin: "0 5vw",
          }}
        >
          By default GSAP will use px and degrees for transforms but you can use
          other units like, vw, radians or even do your own JS calculations or
          relative values!
        </p>
      </div>

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
        text="Timelines are the key to creating easily adjustable, resilient sequences of animations. When you add tweens to a timeline, by default they'll play one-after-another in the order they were added."
        imageUrl="https://picsum.photos/1920/1080"
        animated
        id="image-with-text"
        animationProps={{
          textAppearingType: "words",
        }}
      />
    </>
  );
}

export default App;
