import { Link } from "react-router-dom"
import "./Header.css"
import arrow from "../../assets/images/arrow.png"
import elipse from "../../assets/images/Ellipse 1.svg"
import portraitBuzz from "../../assets/images/buzz.png"
import portraitFestor from "../../assets/images/festor.png"
import portraitRenna from "../../assets/images/renna.png"
import portraitTrex from "../../assets/images/trex.png"
import portraitZe from "../../assets/images/ze.png"


export default function Header({ characterId, characterData }) {
    const portraits = {
        buzz: portraitBuzz,
        festor: portraitFestor,
        renna: portraitRenna,
        trex: portraitTrex,
        ze: portraitZe,
    }

    return (
        <header>
            <div className="botao-header">
                <Link to="/"><img src={ arrow } /></Link>
            </div>
            <div className="header-character">
                <h2 style={{ fontSize: '48px' }}>Æsubject</h2>
                <h2 style={{ fontSize: '98px', width: '18rem' }}>{characterId.toUpperCase()}</h2>
                <img src={ elipse } className="giro-loop" />
            </div>
            <div className="header-flavor">
                <h3 style={{ fontSize: '48px' }}># {characterData.flavor.toUpperCase()}</h3>
                <div className="decoration-bar" style={{ backgroundColor: `${characterData.cor}` }}></div>
            </div>
            <div className="header-portrait">
                <img src={portraits[characterId]} alt={characterId} />
            </div>
        </header>
    )
}