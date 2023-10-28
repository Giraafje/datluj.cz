import React, { useState, useEffect } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';
import { useParams } from 'react-router-dom';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const gameType = Number(useParams().type)
  const [words, setWords] = useState([generateWord(6), generateWord(6), generateWord(6)]);
  const [mistakes, setMistakes] = useState(0)
  const [wordsCount, setWordsCount] = useState(0)
  const [wordsWithTypo, setWordsWithTypo] = useState([])
  const [minutes, setMinutes] = useState(gameType)
  const [seconds, setSeconds] = useState((gameType * 60))
  const [gameOver, setGameOver] = useState(false)
  
  const handleFinish = () => {
    setWordsCount((oldCount) => oldCount + 1)
    setWords((oldWords) => [...oldWords.slice(1), generateWord(6)])
  }

  const handleMistakes = (word) => {
    if (!wordsWithTypo.includes(word)) {
      setWordsWithTypo((oldWordsWithTypo) => [...oldWordsWithTypo, word].sort())
    }
    setMistakes((oldValue) => oldValue + 1)
  }

  useEffect(() => {
    if (gameType > 0) {
      setMinutes(minutes - 1)
      setSeconds(seconds - 1)
      
      const handleTimerSeconds = () => {
        setSeconds((oldSec) => (oldSec - 1));
      };

      const handleTimerMinutes = () => {
        setMinutes((oldMin) => oldMin - 1)
      };

      const handleGameOver = () => {
        clearTimeout(timerSec)
        clearTimeout(timerMin)
        setGameOver(true);
      };

      const timerSec = window.setInterval(handleTimerSeconds, 1000);
      const timerMin = window.setInterval(handleTimerMinutes, 60000);
      const timeOut = window.setTimeout(handleGameOver, (gameType * 60000) - 1000)

      return () => {
        window.clearInterval(timerSec)
        window.clearInterval(timerMin)
        window.clearTimeout(timeOut)
      };
    }
  }, []);

   
  return (
    <>
    <div className="stage">
      <div className="stage__mistakes">
        <span>Mistakes: {mistakes}</span>
        <span>Words: {wordsCount}</span>
      </div>

      <div className="stage__words">
        {words.map((word, idx) => <Wordbox 
          word={word} 
          key={word} 
          onFinish={handleFinish} 
          active={idx === 0 && !gameOver} 
          onMistake={handleMistakes}
          />)}
      </div>

      {gameType > 0 && 
        <div className="stage__timer">
        {gameOver ? '0 : 00' : `${minutes.toString()} : ${(seconds % 60).toString().padStart(2, "0")}`}
        </div>
      }
    </div>
      
    {gameOver && 
      <div className="stage">
        <h2 style={{textAlign: 'center', color: 'red'}}>GAME OVER</h2>
        <p>Your score: <b>{wordsCount - mistakes}</b> points</p>
        <p>You made a typo in the following words:</p>
        <ul>
          {wordsWithTypo.map((word) => <li style={{width: '20%'}} key={word}>{word}</li>)}
        </ul>
        <p>Try again for a better result!</p>
      </div>
      }
    </>
  );
};

export default Stage;
