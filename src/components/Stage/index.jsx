import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

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

  const handleFinish = () => {
    setWords((oldWords) => [...oldWords.slice(1), generateWord(6)])
  }

  const handleMistakes = () => setMistakes((oldValue) => oldValue + 1)
 
  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, idx) => <Wordbox word={word} key={word} onFinish={handleFinish} active={idx === 0} onMistake={handleMistakes}/>)}
      </div>
    </div>
  );
};

export default Stage;
