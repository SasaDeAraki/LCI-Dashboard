import { useParams } from "react-router-dom";
import CharacterPanel from "./CharacterPanel";

export default function CharacterPage() {
    const { characterId } = useParams();

    return(
        <div>
            <h1>Painel do Personagem: {characterId.toUpperCase()}</h1>
            <CharacterPanel characterId={ characterId } />
        </div>
    );
}