import { useEffect, useState } from "react";
import "./App.css";
import DeckForm from "./DeckForm";
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

  const handleDeleteCard = (deckId, deleteCardId) => {};
  const handleDeleteDeck = (deckToDeleteId) => {
    setDecks((prevDecks) =>
      prevDecks.filter((deck, index) => index !== activeDeckNum),
    );

    setDeckNum(0);
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
        onDeleteDeck={handleDeleteDeck}
      />

      <CardForm
        onAddSingleCard={handleAddCard}
        onAddManyCards={handleAddCards}
      />

      {decks[activeDeckNum] ? (
        decks[activeDeckNum]?.cards.map((card) => (
          <div className="card" key={card.id}>
            <div
              style={{ width: "45%" }}
              dangerouslySetInnerHTML={{ __html: card.frontSide }}
            />
            <div
              style={{ width: "45%" }}
              dangerouslySetInnerHTML={{ __html: card.backSide }}
            />
            <button onClick={() => handleDeleteCard(card.id)}>X</button>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default App;

//пара дней
