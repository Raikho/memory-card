import { useState } from 'react';
import Card from './Card.js';
import './App.css';

function App() {
  const [cards, setCards] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

  return (
    <div className="App">
      <header className="App-header">
        <div className="card-container">
          {cards.map(card => <Card value={card}/>)}
        </div>
      </header>
    </div>
  );
}

export default App;
