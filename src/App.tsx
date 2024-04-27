import "./App.scss";
import TypingText from "./Components/TypingText/TypingText";

function App() {
  return (
    <div id="container">
      {/*       <Canvas
        camera={{ position: [0, 0, 5] }}
      >
        <spotLight intensity={100} position={[0, 10, 0]} />
        <Cube />
      </Canvas> */}
      {/*       <FloatingText id="hello" yJump={-100} stagger={0.03} duration={0.225}>
        Hello world!
      </FloatingText> */}

      <TypingText staticText="Hello world!" typingText="Hello world!" />
    </div>
  );
}

export default App;
