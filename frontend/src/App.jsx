import { useState} from "react";
import Home from "./screens/Home";
import SinglePlayer from "./screens/SinglePlayer";


import './App.css'


function App() {
  const [screen, setScreen] = useState("home");

  if(screen == "single"){
    return<SinglePlayer onMenu={() => setScreen("home")} />
  }
  return <Home onSinglePlayer={() => setScreen("single")} />

}

export default App
