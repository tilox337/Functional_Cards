import { useEffect, useState } from "react";
import "./App.css";
import DeckForm from "./DeckFormDec";
import CardForm from "./CardForm";

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

const App = () => {
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
        onChangeName={(name) => {
          setDecks((prevDecks) =>
            prevDecks.map((deck, index) => {
              if (index !== activeDeckNum) return deck;
              return {
                ...deck,
                name: name,
              };
            }),
          );
        }}
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
};

export default App;

//пара дней
