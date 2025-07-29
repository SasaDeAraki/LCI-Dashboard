import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import Header from "../Header/Header";
import { getDatabase, ref, get } from "firebase/database";
import { motion } from "framer-motion";


export default function CharacterPage() {
    const { characterId } = useParams();
    const [characterData, setCharacterData] = useState(null);

    const pageVariants = {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    }

    useEffect(() => {
        const db = getDatabase();
        const characterRef = ref(db, `characters/${characterId}`);

        get(characterRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setCharacterData(snapshot.val());
                } else {
                    console.log("Nenhum dado encontrado para este personagem.")
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar dados do personagem: ", error)
            })
    }, [characterId]);

    if (!characterData) return <div></div>

    return(
        <motion.div 
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
        >
            <Header characterId={ characterId } characterData={ characterData }/>
            <CharacterPanel characterId={ characterId } />
        </motion.div>
    );
}