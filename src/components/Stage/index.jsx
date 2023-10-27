import React, { useState } from 'react';
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
  const [words, setWords] = useState(['jahoda', 'malina', 'jablko']);
  const [mistakes, setMistakes] = useState(0)
  const [wordsCount, setWordsCount] = useState(0)
  const [wordsWithTypo, setWordsWithTypo] = useState([])
  console.log(wordsWithTypo)

  const gameType = Number(useParams().type)
  
  const handleFinish = () => {
    setWordsCount((oldCount) => oldCount + 1)
    setWords((oldWords) => [...oldWords.slice(1), generateWord(6)])
  }

  const handleMistakes = (word) => {
    if (!wordsWithTypo.includes(word)) {
      setWordsWithTypo((oldWordsWithTypo) => [...oldWordsWithTypo, word])
    }
    setMistakes((oldValue) => oldValue + 1)
  }
 
  return (
    <div className="stage">
      <div className="stage__mistakes">
        <span>Mistakes: {mistakes}</span>
        <span>Words: {wordsCount}</span>
      </div>
      <div className="stage__words">
        {words.map((word, idx) => <Wordbox word={word} key={word} onFinish={handleFinish} active={idx === 0} onMistake={handleMistakes}/>)}
      </div>
      <div className="stage__timer">0 : 00</div>
    </div>
  );
};

export default Stage;
