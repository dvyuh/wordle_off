import { useState} from "react";
import Home from "./screens/Home";
import SinglePlayer from "./screens/SinglePlayer";
import Background from "./components/background";
import OneVsOne from "./screens/OneVsOne";

import './App.css'


function App() {
  const [screen, setScreen] = useState("home");

  let content;
  if (screen === "single") {
    content = <SinglePlayer onMenu={() => setScreen("home")} />;
  } else if (screen === "versus") {
    content = <OneVsOne onBack={() => setScreen("home")} />;
  } else {
    content = (
      <Home
        onSinglePlayer={() => setScreen("single")}
        onOneVsOne={() => setScreen("versus")}
      />
    );
  }

  return (
    <>
      <Background />
      <div style={{ position: "relative", zIndex: 1 }}>{content}</div>
    </>
  );
}

export default App
