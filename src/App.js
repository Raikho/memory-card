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
    let selectedCards = [];

    let card = null;
    while (selectedCards.length < 10) {
      do {
        card = newCards[rand(26)];
        console.log('picked card: ', card)
      } while(card.active);
      selectedCards.push(card);
    }

    selectedCards.forEach(card => card.clicked);
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

function rand(x) {return Math.floor(Math.random()*x);}