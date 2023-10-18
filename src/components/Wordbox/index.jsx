import React, { useState, useEffect } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false)

  useEffect(() => {
      const handleKeyUp = (e) => {
          if (e.code === `Key${lettersLeft[0].toUpperCase()}`) {
            setLettersLeft((oldWord) => oldWord.slice(1))
            setMistake(false)
          } else {
            setMistake(true)
            onMistake()
          }
      }
      if (active) {
        document.addEventListener('keyup', handleKeyUp);
      if (lettersLeft.length === 0) {
        onFinish()
      }
      return () => document.removeEventListener('keyup', handleKeyUp);
      }      
  }, [lettersLeft, active, onMistake]);
  
  return (
    <div className={mistake ? "wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;
