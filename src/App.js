import { useState, useEffect } from 'react';
import Card from './Card.js';
import Stats from './Stats.js';
import Header from './Header.js'
import './App.css';

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]

function App() {
  const [cards, setCards] = useState(letters.map(letter => {
    return {id: letter, selected: false, clicked: false}
  }));

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const randomizeCards = () => {
    setCards(prevCards => {
      let newCards = JSON.parse(JSON.stringify(prevCards));
      newCards.forEach(card => card.selected = false); // reset .active
  
      let selected = [];
      let unselected = [...newCards];

      // Guarentee at least 1 unclicked item is selected
      let unselectedUnclicked = unselected.filter(card => !card.clicked);
      let unselectedClicked = unselected.filter(card => card.clicked);
      selected.push(...unselectedUnclicked.splice(rand(unselectedUnclicked.length), 1));
      unselected = unselectedUnclicked.concat(unselectedClicked);
  
      while (selected.length < 12)
        selected.push(...unselected.splice(rand(unselected.length), 1));
  
      console.log('unselected', unselected.map(card => card.id)); // DEBUG
      console.log('selected', selected.map(card => card.id)); // DEBUG
  
      selected.forEach(card => card.selected = true);
      return newCards;
    })
  } 

  const handleClicked = id => {
    if (cards.filter(card => card.id === id)[0].clicked)
      clickedOld();
    else 
      clickedNew(id);
  }

  const clickedNew = id => {
     // TODO: check win condition

    setCards(prevCards => {
      let newCards = JSON.parse(JSON.stringify(prevCards));
      let card = newCards.filter(card => card.id === id)[0];
      card.clicked = true;
      return newCards;
    });

    setScore(prevScore => prevScore + 1);
    randomizeCards();
  }

  const clickedOld = () => {
    setScore(0);
    setCards(prevCards => {
      let newCards = JSON.parse(JSON.stringify(prevCards));
      newCards.forEach(card => card.clicked = false);
      return newCards;
    });
    randomizeCards();
  }

  useEffect(randomizeCards, []);

  useEffect(() => {if (score > streak) setStreak(score);}, [score])

  return (
    <div className="App">
      <header className="App-header">
        <div class="game-container">
          <Header />
          <Stats score={score} streak={streak}/>
          <div className="card-container">
            {cards.filter(card => card.selected).map(card =>
              <Card
                key={card.id}
                id={card.id} // change
                clicked={card.clicked}
                handleClicked={handleClicked}
              />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

function rand(x) {return Math.floor(Math.random()*x);}