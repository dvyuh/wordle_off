import { useState} from "react";
import Home from "./screens/Home";
import SinglePlayer from "./screens/SinglePlayer";
import Background from "./components/background";


import './App.css'


function App() {
  const [screen, setScreen] = useState("home");
  return(
    <>
  
  <Background />
    <div style={{ position: "relative", zIndex: 1 }}>
      {screen === "single" ? (
        <SinglePlayer onMenu={() => setScreen("home")} />
      ) : (
        <Home onSinglePlayer={() => setScreen("single")} />
      )}
    </div>
    </>);
};

export default App
