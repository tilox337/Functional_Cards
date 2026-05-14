import { useState } from "react";
import "./App.css";

const createCard = (front = frontSideText, back = backSideText) => ({
  id: crypto.randomUUID(),
  frontSide: front,
  backSide: back,
});

function App() {
  const [cards, setCards] = useState([]);
  const [frontSideText, setFrontSideText] = useState("");
  const [backSideText, setBackSideText] = useState("");
  //const [deck, setDeck] = useState({ name: "dasd" });

  const handleAddCard = (front, back) => {
    setCards([...cards, createCard(front, back)]);
  };

  return (
    <>
      <div>
        <input
          onChange={(e) => {
            setFrontSideText(e.target.value);
          }}
          value={frontSideText}
        ></input>
        <input
          onChange={(e) => {
            setBackSideText(e.target.value);
          }}
          value={backSideText}
        ></input>
      </div>
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div>{card.frontSide}</div>
          <div>{card.backSide}</div>
        </div>
      ))}
      <button
        onClick={() => {
          handleAddCard(frontSideText, backSideText);
          setFrontSideText("");
          setBackSideText("");
        }}
      >
        kd
      </button>
    </>
  );
}

export default App;

//пара дней
