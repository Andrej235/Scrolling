import "./App.scss";
import useAppearingText from "./Hooks/UseAppearingText";
import useFloatingText from "./Hooks/UseFloatingText";

function App() {
  useAppearingText("#test");
  const playAnimation = useFloatingText("#test");

  return (
    <>
      <div className="text-container">Hi</div>

      <div id="test" className="text-container" onClick={playAnimation}>
        <p>Hello world!</p>
      </div>
    </>
  );
}

export default App;
