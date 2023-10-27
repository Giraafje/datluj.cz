import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './style.css'

const StartPage = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState("0")
    
    const handleSelect = (e) => {
        console.log("selected", e.target.value)
        setSelected(e.target.value)
    }

    const handleClick = () => navigate(`game/${selected}`)

    return (
        <div className="game-selection">
            <span>
                <label>Which type of game do you want to play?</label>    
                <select value={selected} onChange={handleSelect}>
                    <option value="0">Without time limit</option>
                    <option value="1">Challenge 1 minute</option>
                    <option value="2">Challenge 2 minutes</option>
                    <option value="5">Challenge 5 minutes</option>
                </select>
            </span>
            <div className="start-button">
                <button onClick={handleClick}>Start</button>
            </div>
        </div>
    )
};

export default StartPage;