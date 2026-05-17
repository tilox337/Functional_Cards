import { useEffect, useState } from "react";
import "./App.css";

const DeckForm = ({ decks, activeDeckNum, onChangeDeck }) => {
  return (
    <>
      {decks.map((deck, index) => {
        if (index === activeDeckNum)
          return <input key={deck.id} defaultValue={deck.name}></input>;
        else
          return (
            <button
              key={deck.id}
              onClick={() => {
                onChangeDeck(index);
              }}
            >
              {deck.name}
            </button>
          );
      })}
    </>
  );
};

const createCard = (front, back) => ({
  id: crypto.randomUUID(),
  frontSide: front,
  backSide: back,
});

const createDeck = (name, cards) => ({
  id: crypto.randomUUID(),
  name: name,
  cards: cards,
});

const ErrorMessage = ({ text }) => {
  if (!text) return null;
  return <p style={{ color: "red", fontSize: "12px" }}>{text}</p>;
};

function CardForm({ onAddSingleCard, onAddManyCards }) {
  const [frontSideText, setFrontSideText] = useState("");
  const [backSideText, setBackSideText] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=50")
      .then((response) => response.json())
      .then((data) => {
        const newCards = data.results.map((element) =>
          createCard(element.question, element.correct_answer),
        );
        onAddManyCards(newCards);
      });
  }, []);

  return (
    <>
      <div>
        <input
          onChange={(e) => setFrontSideText(e.target.value)}
          value={frontSideText}
          placeholder="Front Side"
        ></input>
        <input
          onChange={(e) => setBackSideText(e.target.value)}
          value={backSideText}
          placeholder="Back Side"
        ></input>
      </div>

      <ErrorMessage text={errMessage} />

      <button
        onClick={() => {
          if (frontSideText.trim() && backSideText.trim()) {
            onAddSingleCard(frontSideText, backSideText);
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
  const [decks, setDecks] = useState(() => [
    createDeck("asd", [createCard("asd", "qwe")]),
  ]);
  const [activeDeckNum, setDeckNum] = useState(0);

  const handleAddCard = (front, back, deckNum = activeDeckNum) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck, index) => {
        if (index !== deckNum) return deck;
        return {
          ...deck,
          cards: [...deck.cards, createCard(front, back)],
        };
      }),
    );
  };

  const handleAddCards = (newCards, deckNum = activeDeckNum) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck, index) => {
        if (index !== deckNum) return deck;
        return {
          ...deck,
          cards: [...deck.cards, ...newCards],
        };
      }),
    );
  };

  return (
    <>
      <button
        onClick={() => {
          setDecks([...decks, createDeck("new deck", [])]);
        }}
      >
        create deck
      </button>

      <DeckForm
        decks={decks}
        activeDeckNum={activeDeckNum}
        onChangeDeck={setDeckNum}
      />

      <CardForm
        onAddSingleCard={handleAddCard}
        onAddManyCards={handleAddCards}
      />

      {decks[activeDeckNum]?.cards.map((card) => (
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
