import "./App.css"
import { Link } from "react-router-dom"
import TextType from "./components/TextType/TextType"
import { Color } from "ogl"
import CharacterPortrait from "./components/CharacterPortrait/CharacterPortrait"
import portraitBuzz from "./assets/images/buzz.png"
import portraitFestor from "./assets/images/festor.png"
import portraitRenna from "./assets/images/renna.png"
import portraitTrex from "./assets/images/trex.png"
import portraitZe from "./assets/images/ze.png"


function App() {
  return (
    <div className="characters-container">
      <Link to="/buzz"><CharacterPortrait imgPersonagem={ portraitBuzz } /></Link>
      <Link to="/festor"><CharacterPortrait imgPersonagem={ portraitFestor } /></Link>
      <Link to="/renna"><CharacterPortrait imgPersonagem={ portraitRenna } /></Link>
      <Link to="/trex"><CharacterPortrait imgPersonagem={ portraitTrex } /></Link>
      <Link to="/ze"><CharacterPortrait imgPersonagem={ portraitZe } /></Link>
    </div>
  )
}

export default App
