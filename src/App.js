import { useState, useEffect } from 'react';
import Card from './Card.js';
import './App.css';

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

function App() {
  const [cards, setCards] = useState(letters.map(letter => {
    return {value: letter, active: false, clicked: false}
  }));

  const randomizeCards = () => {
    let newCards = JSON.parse(JSON.stringify(cards));
    let random = Math.floor(Math.random()*26);

    newCards[random].value = 'Test';
    newCards[random].clicked = true;
    setCards(newCards);
  } 

  useEffect(randomizeCards, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="card-container">
          {cards.map(card => <Card value={card.value} clicked={card.clicked}/>)}
        </div>
      </header>
    </div>
  );
}

export default App;
