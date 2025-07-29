import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, get, set, onValue } from "firebase/database";
import "./CharacterPanel.css"
import StructureIcon from "../../assets/images/Structure.png"
import StressIcon from "../../assets/images/Stress.png"
import EditIcon from "../../assets/images/edit.png"
import { AnimatePresence, motion } from 'framer-motion'

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

    const [editingField, setEditingField] = useState(null); // 'char_hp', 'hp', 'heat'
    const [editValues, setEditValues] = useState({ current: 0, max: 0 });

    const fieldMap = {
    char_hp: { current: 'char_current_hp', max: 'char_max_hp' },
    hp: { current: 'current_hp', max: 'max_hp' },
    heat: { current: 'current_heat', max: 'max_heat' }
    };

    const fieldLabels = {
    char_hp: 'Pilot HP',
    hp: 'HP',
    heat: 'Heat'
    };

    const openEditModal = (field) => {
    setEditingField(field);
    const { current, max } = fieldMap[field];
    setEditValues({
        current: stats[current],
        max: stats[max]
    });
    };

    const handleSaveEdit = () => {
    const { current, max } = fieldMap[editingField];
    const updatedStats = {
        ...stats,
        [current]: editValues.current,
        [max]: editValues.max
    };
    updateStats(updatedStats);
    setEditingField(null);
    };


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

    const changeCharHP = (delta) => {
        let newCharHP = stats.char_current_hp + delta;

        if (newCharHP < 0) {
            newCharHP = 0;
        } else if (newCharHP > stats.char_max_hp) {
            newCharHP = stats.char_max_hp;
        }

        updateStats({ ...stats, char_current_hp: newCharHP })
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

    const changeHeat = (delta) => {
        let newHeat = stats.current_heat + delta;
        let newStress = stats.stress;

        if (newHeat > stats.max_heat) {
            const overflow = newHeat - stats.max_heat;

            if (newStress > 0) {
                newStress -= 1;
                newHeat = overflow - 1;
                if (newHeat < 0) newHeat = 0;
            } else {
                newHeat = stats.max_heat;
            }
        } else if (newHeat < 0) {
            newHeat = 0;
        }

        updateStats({ ...stats, current_heat: newHeat, stress: newStress });
    };



    const changeStructure = (delta) => {
        const newStructure = Math.min(4, Math.max(0, stats.structure + delta));
        updateStats({ ...stats, structure: newStructure });
    };

    const changeStress = (delta) => {
        const newStress = Math.min(4, Math.max(0, stats.stress + delta));
        updateStats({ ...stats, stress: newStress });
    };

    const charHpPercent = stats.char_max_hp > 0 ? (stats.char_current_hp / stats.char_max_hp) * 100 : 0;
    const hpPercent = stats.max_hp > 0 ? (stats.current_hp / stats.max_hp) * 100 : 0;
    const heatPercent = stats.max_heat > 0 ? (stats.current_heat / stats.max_heat) * 100 : 0;

    return (
        <div className="character-panel">
            <div className="hp-structure-container">
                <div className="hp-container">
                    <div>
                        <div className="hp-controls">
                            <span>Pilot HP:</span>
                            <div className="button-char-hp">
                                <button onClick={() => changeCharHP(-5)}>-5</button>
                                <button onClick={() => changeCharHP(-1)}>-</button>
                                <span>{stats.char_current_hp}/{stats.char_max_hp}</span>
                                <button onClick={() => changeCharHP(1)}>+</button>
                                <button onClick={() => changeCharHP(5)}>+5</button>
                            </div>
                        </div>
                        <div className="char-hp-bar-wrapper">
                            <div className="char-hp-bar" style={{ width: `${charHpPercent}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="edit-button" onClick={() => openEditModal('char_hp')}>
                    <img src={EditIcon} />
                </div>
            </div>
            <div className="hp-structure-container">
                <div className="struct-buttons">
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
                <div className="edit-button" onClick={() => openEditModal('hp')}>
                    <img src={EditIcon} />
                </div>
            </div>
            <div className="hp-structure-container">
                <div className="struct-buttons">
                    <button onClick={() => changeStress(-1)}>-</button>
                    <span>[{stats.stress}/4]</span>
                    <button onClick={() => changeStress(1)}>+</button>
                </div>
                <div className="hp-container">
                    <img src={StressIcon} /> 
                    <div>
                        <div className="hp-controls">
                            <span>Heat:</span>
                            <div className="button-heat">
                                <button onClick={() => changeHeat(-5)}>-5</button>
                                <button onClick={() => changeHeat(-1)}>-</button>
                                <span>{stats.current_heat}/{stats.max_heat}</span>
                                <button onClick={() => changeHeat(1)}>+</button>
                                <button onClick={() => changeHeat(5)}>+5</button>
                            </div>
                        </div>
                        <div className="hp-bar-wrapper">
                            <div className="heat-bar" style={{ width: `${heatPercent}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="edit-button" onClick={() => openEditModal('heat')}>
                    <img src={EditIcon} />
                </div>
            </div>
            <AnimatePresence>
                {editingField && (
                    <div
                        className="modal-overlay"
                        onClick={() => setEditingField(null)} // Fecha ao clicar fora
                        style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999,
                        }}
                    >
                        <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()} // Impede o clique de fechar ao clicar dentro
                        style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                        >
                        <h3>Editar {fieldLabels[editingField]}</h3>
                        <label>
                            Atual:
                            <input
                            type="number"
                            value={editValues.current}
                            onChange={(e) =>
                                setEditValues({ ...editValues, current: Number(e.target.value) })
                            }
                            />
                        </label>
                        <label>
                            Máximo:
                            <input
                            type="number"
                            value={editValues.max}
                            onChange={(e) =>
                                setEditValues({ ...editValues, max: Number(e.target.value) })
                            }
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={() => setEditingField(null)}>Cancelar</button>
                            <button onClick={handleSaveEdit}>Salvar</button>
                        </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}