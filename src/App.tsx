import "./App.scss";
import useTextAnimations from "./Hooks/UseTextAnimations";

function App() {
  const a = useTextAnimations({
    element: "#test",
    animation: "jump",
    yJump: -100,
    stagger: 0.5,
    // toggleActions: "play none none reverse",
  });

  return (
    <>
      <div className="text-container">Hi</div>

      <div id="test" className="text-container" onClick={a}>
        <p
          style={{
            margin: "2rem",
          }}
        >
          Hello world! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Eveniet laudantium molestias sequi vero quia assumenda eos cum,
          pariatur inventore excepturi voluptatibus laboriosam praesentium sint
          quisquam ut doloribus omnis hic tempore sequi provident deleniti
          repudiandae facere! Laborum ratione eaque est delectus.
        </p>
      </div>
    </>
  );
}

export default App;
