import { useEffect, useState } from "react";
import "./App.css";

const createCard = (front, back) => ({
  id: crypto.randomUUID(),
  frontSide: front,
  backSide: back,
});
const createDeck = (name, cards) => ({ id: crypto.randomUUID(), cards: cards });

function CardForm({ onAddCard }) {
  const [frontSideText, setFrontSideText] = useState("");
  const [backSideText, setBackSideText] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=50")
      .then((response) => response.json())
      .then((data) => data.results)
      .then((results) =>
        results.map((element) => {
          onAddCard(element.question, element.correct_answer);
        }),
      );
  }, []);

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
    </>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [deckNum, setDeckNum] = useState(0);
  const handleAddCard_ = (deckNum, front, back) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck, index) => {
        if (index !== deckNum) return deck;
        else
          return {
            ...deck,
            cards: [...deck.cards, createCard(front, back)],
          };
      }),
    );
  };

  const handleAddCard = (front, back) => {
    setCards((prevCards) => [...prevCards, createCard(front, back)]);
  };

  return (
    <>
      <CardForm onAddCard={handleAddCard} />
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div
            style={{ width: "50%" }}
            dangerouslySetInnerHTML={{ __html: card.frontSide }}
          />
          <div
            style={{ width: "50%" }}
            dangerouslySetInnerHTML={{ __html: card.backSide }}
          />
        </div>
      ))}
    </>
  );
}

export default App;

//пара дней
