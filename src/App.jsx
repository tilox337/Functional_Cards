import { useState } from "react";
import "./App.css";

const createCard = (front = "", back = "") => ({
  frontSide: front,
  backSide: back,
});

function App() {
  const [cards, setCards] = useState([createCard("xuy", "zalupa")]);
  //const [deck, setDeck] = useState({ name: "dasd" });

  const addCard = (front, back) => {
    setCards([...cards, createCard(front, back)]);
  };

  return (
    <>
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <div>{card.frontSide}</div>
          <div>{card.backSide}</div>
        </div>
      ))}
      <button
        onClick={() => {
          addCard("xuy", "zalupa");
        }}
      >
        kd
      </button>
    </>
  );
}

export default App;
