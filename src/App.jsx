import { useState } from "react";
import "./App.css";

const createCard = (front, back) => ({
  id: crypto.randomUUID(),
  frontSide: front,
  backSide: back,
});

function CardForm({ onAddCard }) {
  const [frontSideText, setFrontSideText] = useState("");
  const [backSideText, setBackSideText] = useState("");
  const [errMessage, setErrMessage] = useState("");

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
      <p>{errMessage}</p>
      {/*вынести как отдельный компонент */}
      <button
        onClick={() => {
          if (frontSideText.trim() && backSideText.trim()) {
            onAddCard(frontSideText, backSideText);
          } else {
            setTimeout(() => {
              setErrMessage("");
            }, 3000);
            setErrMessage("invalid text");
          }

          setFrontSideText("");
          setBackSideText("");
        }}
      >
        kd
      </button>
    </>
  );
}

function App() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (front, back) => {
    setCards([...cards, createCard(front, back)]);
  };

  return (
    <>
      <CardForm onAddCard={handleAddCard} />
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div>{card.frontSide}</div>
          <div>{card.backSide}</div>
        </div>
      ))}
    </>
  );
}

export default App;

//пара дней
