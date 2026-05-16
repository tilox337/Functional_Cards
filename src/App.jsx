import { useState } from "react";
import "./App.css";

const createCard = (front, back) => ({
  id: crypto.randomUUID(),
  frontSide: front,
  backSide: back,
});
const createDeck = (name, cards) => ({ id: crypto.randomUUID() });

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
      <p style={{ color: "red", fontSize: "12px" }}>{errMessage}</p>
      {/*вынести err как отдельный компонент*/}
      <button
        onClick={() => {
          if (frontSideText.trim() && backSideText.trim()) {
            onAddCard(frontSideText, backSideText);
            setFrontSideText("");
            setBackSideText("");
          } else {
            setTimeout(() => {
              setErrMessage("");
            }, 3000);
            setErrMessage("invalid text");
            setFrontSideText(frontSideText.trim());
            setBackSideText(backSideText.trim());
          }
        }}
      >
        kd
      </button>
      <button
        onClick={() => {
          fetch("https://opentdb.com/api.php?amount=50")
            .then((response) => response.json())
            .then((data) => data.results)
            .then((results) =>
              results.map((element) => {
                //console.log(element.question + " " + element.correct_answer);
                onAddCard(element.question, element.correct_answer);
              }),
            );
        }}
      >
        fetch
      </button>
    </>
  );
}

function App() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (front, back) => {
    setCards((prevCards) => [...prevCards, createCard(front, back)]);
  };

  return (
    <>
      <CardForm onAddCard={handleAddCard} />
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div dangerouslySetInnerHTML={{ __html: card.frontSide }} />
          <div dangerouslySetInnerHTML={{ __html: card.backSide }} />
        </div>
      ))}
    </>
  );
}

export default App;

//пара дней
