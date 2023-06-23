import { useState, useEffect } from 'react';
import Card from './Card.js';
import './App.css';

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

function App() {
  const [cards, setCards] = useState(letters.map(letter => {
    return {value: letter, selected: false, clicked: false}
  }));

  const randomizeCards = () => {
    let newCards = JSON.parse(JSON.stringify(cards));
    newCards.forEach(card => card.selected = false); // reset .active

    let selected = []; // TODO: pick an unclicked one first'
    let unselected = [...newCards];

    while (selected.length < 10) {
      selected.push(...unselected.splice(rand(unselected.length), 1));
    }

    console.log('unselected', unselected.map(card => card.value)); // DEBUG
    console.log('selected', selected.map(card => card.value)); // DEBUG

    selected.forEach(card => card.selected = true);
    setCards(newCards);
  } 

  const handleClicked = id => {
    let newCards = JSON.parse(JSON.stringify(cards));
    let card = newCards.filter(card => card.value === id)[0];

    // TODO: branch into if clicked or not;

    card.clicked = true;
    setCards(newCards);
  }

  useEffect(randomizeCards, []);

  return (
    <div className="App">
      <header className="App-header">
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