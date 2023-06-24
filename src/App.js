import { useState, useEffect } from 'react';
import Card from './Card.js';
import Stats from './Stats.js';
import Header from './Header.js'
import './App.css';

let birds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]
birds = ['bird0', 'bird1', 'bird2', 'bird3', 'bird4', 'bird5', 'bird6', 'bird7', 'bird8', 'bird9', 'bird10',
         'bird11', 'bird12', 'bird13', 'bird14', 'bird15', 'bird16', 'bird17', 'bird18', 'bird19', 'bird20'];

function App() {
  const [cards, setCards] = useState(birds.map((bird, index) => {
    return {id: index, selected: false, clicked: false, value: bird}
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
      selected.push(...unselectedUnclicked.splice(randIndex(unselectedUnclicked), 1));
      unselected = unselectedUnclicked.concat(unselectedClicked);
  
      while (selected.length < 8)
        selected.push(...unselected.splice(randIndex(unselected), 1));
  
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
        <div className="game-container">
          <Header 
            numImages={birds.length}
            hasWon={true}
            handleReset={null}
          />
          <Stats score={score} streak={streak}/>
          <div className="card-container">
            {cards.filter(card => card.selected).map(card =>
              <Card
                key={card.id}
                id={card.id} // change
                value={card.value}
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

function randIndex(array) {return Math.floor(Math.random() * array.length);}