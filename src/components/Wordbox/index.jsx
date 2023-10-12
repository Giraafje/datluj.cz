import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false)
  
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (lettersLeft) {
        if (e.code === `Key${lettersLeft[0].toUpperCase()}`) {
          setLettersLeft((oldWord) => oldWord.slice(1))
          setMistake(false)
        } else {
          setMistake(true)
        }
      } else {
        onFinish()
      }
      }      
    if (active) {document.addEventListener('keyup', handleKeyUp)};
    return () => {if (active) {document.removeEventListener('keyup', handleKeyUp)}};
  }, [lettersLeft, active]);
  
  return (
    <div className={mistake ? "wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;
