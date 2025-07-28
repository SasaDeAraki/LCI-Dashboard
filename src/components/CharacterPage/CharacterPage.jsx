import { useParams } from "react-router-dom";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import Header from "../Header/Header";

export default function CharacterPage() {
    const { characterId } = useParams();

    return(
        <div>
            <Header characterId={ characterId }/>
            <CharacterPanel characterId={ characterId } />
        </div>
    );
}