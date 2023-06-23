import { useState, useEffect } from 'react';
import Card from './Card.js';
import './App.css';

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

function App() {
  const [cards, setCards] = useState(letters.map(letter => {
    return {value: letter, selected: false, clicked: false}
  }));

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const randomizeCards = () => {
    setCards(prevCards => {
      let newCards = JSON.parse(JSON.stringify(prevCards));
      newCards.forEach(card => card.selected = false); // reset .active
  
      let selected = []; // TODO: pick an unclicked one first'
      let unselected = [...newCards];
  
      while (selected.length < 10) {
        selected.push(...unselected.splice(rand(unselected.length), 1));
      }
  
      console.log('unselected', unselected.map(card => card.value)); // DEBUG
      console.log('selected', selected.map(card => card.value)); // DEBUG
  
      selected.forEach(card => card.selected = true);
      return newCards;
    })
  } 

  const handleClicked = id => {
    if (cards.filter(card => card.value === id)[0].clicked)
      clickedOld();
    else 
      clickedNew(id);
  }

  const clickedNew = id => {
    setCards(prevCards => {
      let newCards = JSON.parse(JSON.stringify(prevCards));
      let card = newCards.filter(card => card.value === id)[0];
      card.clicked = true;
      return newCards;
    });

    setScore(prevScore => prevScore + 1);
    randomizeCards();
  }

  const clickedOld = (newCards, card) => {
    setScore(0);
    // randomizeCards(true);
  }

  useEffect(randomizeCards, []);

  useEffect(() => {if (score > streak) setStreak(score);}, [score])

  return (
    <div className="App">
      <header className="App-header">
        <div className="stats">
          <div className="score">{`Score: ${score}`}</div>
          <div className="streak">{`Streak: ${streak}`}</div>
        </div>
        <div className="card-container">
          {cards.filter(card => card.selected).map(card => 
            <Card 
              key={card.value}
              id={card.value} // change
              value={card.value} 
              clicked={card.clicked}
              handleClicked={handleClicked}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

function rand(x) {return Math.floor(Math.random()*x);}