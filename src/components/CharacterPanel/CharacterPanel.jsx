import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, get, set, onValue } from "firebase/database";

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

    // Atualizar valor 
    const handleChange = (field, value) => {
        const newStats = { ...stats, [field]: Number(value) };
        setStats(newStats);
        set(ref(db, `characters/${characterId}`), newStats);
    };

    return (
        <div>
            <h2>{characterId.toUpperCase()}</h2>
            {["current_hp", "current_heat", "structure", "stress", "max_hp", "max_heat", "char_current_hp", "char_max_hp"].map((field) => (
                <div key={field}>
                    <label>{field.toUpperCase()}: </label>
                    <input 
                        type="number"
                        value={stats[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                    />
                </div>
            ))}
        </div>
    )
}