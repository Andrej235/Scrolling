import { useState } from "react";
import "./App.scss";
import Carousel from "./Components/Carousel/Carousel";
import Icon from "./Components/Icon/Icon";
import ImageWithText from "./Components/ImageWithText/ImageWithText";
import Navigation from "./Components/Navigation/Navigation";
import Track from "./Components/Track/Track";
import useJumpyText from "./Hooks/UseJumpyText";
import useScrambledText from "./Hooks/UseScrambledText";
import useTextAnimations from "./Hooks/UseTextAnimations";
import ImageCarousel from "./Components/ImageCarousel/ImageCarousel";

function App() {
  const [isTrackPaused, setIsTrackPaused] = useState(false);

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

        <Carousel
          flyIn={{ from: "right", to: "left", inOffset: 200, outOffset: 300 }}
          showIndicators
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

        <ImageCarousel
          images={[
            "img/1.jpg",
            "img/2.jpg",
            "img/3.jpg",
            "img/4.jpg",
            "img/5.jpg",
          ]}
        />
      </div>

      <div
        id="vertical-track-testing-container"
        style={{
          position: "absolute",
          top: "0%",
          left: "100%",
          transform: "translateX(-100%)",
          width: "3rem",
          height: "70vh",
        }}
        onClick={() => setIsTrackPaused(!isTrackPaused)}
      >
        <Track
          distanceBetweenElements={35}
          totalDuration={1}
          type="vertical"
          isPaused={isTrackPaused}
        >
          <Icon className="icon-bottom-track" name="link" />
          <Icon className="icon-bottom-track" name="thumbs-up" />
          <Icon className="icon-bottom-track" name="arrow-circle-left" />
          <Icon className="icon-bottom-track" name="code" />
          <Icon className="icon-bottom-track" name="youtube-square" />
          <Icon className="icon-bottom-track" name="upload" />
          <Icon className="icon-bottom-track" name="align-left" />
          <Icon className="icon-bottom-track" name="address-book" />
          <Icon className="icon-bottom-track" name="volume-control-phone" />
          <Icon className="icon-bottom-track" name="phone" />
          <Icon className="icon-bottom-track" name="taxi" />
          <Icon className="icon-bottom-track" name="bank" />
          <Icon className="icon-bottom-track" name="linkedin" />
          <Icon className="icon-bottom-track" name="thumbs-down" />
          <Icon className="icon-bottom-track" name="arrows-h" />
          <Icon className="icon-bottom-track" name="jsfiddle" />
          <Icon className="icon-bottom-track" name="adjust" />
          <Icon className="icon-bottom-track" name="xing" />
          <Icon className="icon-bottom-track" name="telegram" />
          <Icon className="icon-bottom-track" name="lastfm" />
          <Icon className="icon-bottom-track" name="hacker-news" />
          <Icon className="icon-bottom-track" name="asl-interpreting" />
          <Icon className="icon-bottom-track" name="krw" />
          <Icon className="icon-bottom-track" name="google-plus-square" />
        </Track>
      </div>

      <div
        id="vertical-track-testing-container-2"
        style={{
          position: "absolute",
          top: "100vh",
          left: "100%",
          transform: "translateX(-100%)",
          width: "3rem",
          height: "100vh",
        }}
      >
        <Track
          distanceBetweenElements={35}
          totalDuration={2}
          type="vertical"
          direction="Up"
        >
          <p>01</p>
          <p>02</p>
          <p>03</p>
          <p>04</p>
          <p>05</p>
          <p>06</p>
          <p>07</p>
          <p>08</p>
          <p>09</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
          <p>15</p>
          <p>16</p>
          <p>17</p>
          <p>18</p>
          <p>19</p>
          <p>20</p>
          <p>21</p>
          <p>22</p>
          <p>23</p>
          <p>24</p>
          <p>25</p>
        </Track>
      </div>

      <div
        id="horizontal-track-testing-container"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
          <Track
            distanceBetweenElements={175}
            totalDuration={1}
            direction="Left"
            pauseStateMouseHoverTriggers={true}
          >
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <p>Third paragraph</p>
            <p>Fourth paragraph</p>
            <p>Fifth paragraph</p>
          </Track>
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
          <Track
            distanceBetweenElements={125}
            totalDuration={2}
            pauseStateMouseHoverTriggers={true}
          >
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

          <Track
            distanceBetweenElements={75}
            totalDuration={2.5}
            pauseStateMouseHoverTriggers={true}
          >
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <p>Third paragraph</p>
            <p>Fourth paragraph</p>
            <p>Fifth paragraph</p>
          </Track>

          <br />

          <Track
            distanceBetweenElements={200}
            totalDuration={3}
            pauseStateMouseHoverTriggers={true}
          >
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
          <Track
            distanceBetweenElements={75}
            totalDuration={0.5}
            direction="Left"
            pauseStateMouseHoverTriggers={true}
          >
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

          <Track
            distanceBetweenElements={75}
            totalDuration={2.5}
            direction="Left"
            pauseStateMouseHoverTriggers={true}
          >
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <p>Third paragraph</p>
            <p>Fourth paragraph</p>
            <p>Fifth paragraph</p>
          </Track>

          <br />

          <Track
            distanceBetweenElements={75}
            totalDuration={0.5}
            direction="Left"
            pauseStateMouseHoverTriggers={true}
          >
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
          <Track
            distanceBetweenElements={75}
            totalDuration={2.5}
            pauseStateMouseHoverTriggers={true}
          >
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

          <Track
            distanceBetweenElements={75}
            totalDuration={2.5}
            direction="Left"
          >
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <p>Third paragraph</p>
            <p>Fourth paragraph</p>
            <p>Fifth paragraph</p>
          </Track>

          <br />

          <Track
            distanceBetweenElements={75}
            totalDuration={2.5}
            direction="Left"
          >
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
          <Track distanceBetweenElements={75} totalDuration={2.5}>
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

          <Track distanceBetweenElements={75} totalDuration={0.1}>
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <p>Third paragraph</p>
            <p>Fourth paragraph</p>
            <p>Fifth paragraph</p>
            <p>Sixth paragraph</p>
            <p>Seventh paragraph</p>
            <p>Eighth paragraph</p>
            <p>Ninth paragraph</p>
            <p>Tenth paragraph</p>
          </Track>

          <br />

          <Track
            distanceBetweenElements={75}
            totalDuration={2.5}
            direction="Left"
          >
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
          <Track
            distanceBetweenElements={5}
            totalDuration={0.15}
            pauseStateMouseHoverTriggers={true}
          >
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
        </div>
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
