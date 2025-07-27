import { Link } from "react-router-dom"
import CharacterPanel from "./components/CharacterPanel"

function App() {
  return (
    <div>
      <ul>
        <li><Link to={"/buzz"}>Ver Buzz</Link></li>
        <li><Link to={"/festor"}>Ver Festor</Link></li>
        <li><Link to={"/renna"}>Ver Renna</Link></li>
        <li><Link to={"/trex"}>Ver Trex</Link></li>
        <li><Link to={"/ze"}>Ver Zé</Link></li>
      </ul>
    </div>
  )
}

export default App
