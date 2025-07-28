import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, get, set, onValue } from "firebase/database";
import "./CharacterPanel.css"
import StructureIcon from "../../assets/images/Structure.png"

export default function CharacterPanel({ characterId }) {
    const [stats, setStats] = useState({
        current_hp: 0,
        current_heat: 0,
        structure: 0,
        stress: 0,
        max_hp: 0,
        max_heat: 0,
        char_current_hp: 0,
        char_max_hp: 0, 
    });

    // Carregar dados dos personagens
    useEffect(() => {
        const statsRef = ref(db, `characters/${characterId}`);
        const unsubscribe = onValue(statsRef, (snapshot) => {
            if (snapshot.exists()) { 
                setStats(snapshot.val());
            }
        });

        return () => unsubscribe();
    }, [characterId]);

    const updateStats = (newStats) => {
        setStats(newStats);
        set(ref(db, `characters/${characterId}`), newStats)
    };

    const changeHP = (delta) => {
        let newHP = stats.current_hp + delta;
        let newStructure = stats.structure;

        if (newHP <= 0) {
            if (newStructure > 0) {
                newStructure -= 1;

                const overflow = Math.abs(newHP);
                newHP = stats.max_hp - overflow;

                if (newHP < 0) newHP = 0;
            } else {
                newHP = 0;
            } 
        } else if (newHP > stats.max_hp) {
                newHP = stats.max_hp;
        }

        updateStats({ ...stats, current_hp: newHP, structure: newStructure })
    };

    const changeStructure = (delta) => {
        const newStructure = Math.min(4, Math.max(0, stats.structure + delta));
        updateStats({ ...stats, structure: newStructure });
    };

    const hpPercent = stats.max_hp > 0 ? (stats.current_hp / stats.max_hp) * 100 : 0;

    return (
        <div className="character-panel">
            <div className="hp-structure-container">
                <div>
                    <button onClick={() => changeStructure(-1)}>-</button>
                    <span>[{stats.structure}/4]</span>
                    <button onClick={() => changeStructure(1)}>+</button>
                </div>
                <div className="hp-container">
                    <img src={StructureIcon} /> 
                    <div>
                        <div className="hp-controls">
                            <span>HP:</span>
                            <div>
                                <button onClick={() => changeHP(-5)}>-5</button>
                                <button onClick={() => changeHP(-1)}>-</button>
                                <span>{stats.current_hp}/{stats.max_hp}</span>
                                <button onClick={() => changeHP(1)}>+</button>
                                <button onClick={() => changeHP(5)}>+5</button>
                            </div>
                        </div>
                        <div className="hp-bar-wrapper">
                            <div className="hp-bar" style={{ width: `${hpPercent}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}