import { useEffect, useState } from "react";
import "./App.css";
import DeckForm from "./DeckForm";
import CardForm from "./CardForm";

const createCard = (front, back, learned = false) => ({
  id: crypto.randomUUID(),
  frontSide: front,
  backSide: back,
  learned: learned,
});

const createDeck = (name, cards) => ({
  id: crypto.randomUUID(),
  name: name,
  cards: cards,
});

const App = () => {
  const [decks, setDecks] = useState(() => {
    const saved = localStorage.getItem("decks");
    return [createDeck("default", []), ...(saved ? JSON.parse(saved) : [])];
  });
  const [defId, setDefId] = useState(null);
  const [activeDeckNum, setDeckNum] = useState(0);
  const [cardToChange, setCardTochange] = useState(-1);

  useEffect(() => {
    setDefId(decks[0].id);
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "decks",
      JSON.stringify(decks.filter((deck) => deck.id !== defId)),
    );
  };
  useEffect(handleSave, [decks]);

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

  const handleDeleteCard = (deleteCardId) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck, index) => {
        if (index !== activeDeckNum) return deck;
        return {
          ...deck,
          cards: deck.cards.filter((card) => card.id !== deleteCardId),
        };
      }),
    );
  };
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
      {decks[activeDeckNum]?.id !== defId && decks[activeDeckNum] ? (
        <CardForm
          onAddSingleCard={handleAddCard}
          onAddManyCards={handleAddCards}
        />
      ) : null}

      {decks[activeDeckNum] ? (
        decks[activeDeckNum]?.cards.map((card, index) => (
          <div className="card" key={card.id}>
            {cardToChange !== index ? (
              <>
                <div
                  style={{ width: "45%" }}
                  dangerouslySetInnerHTML={{ __html: card.frontSide }}
                />
                <div
                  style={{ width: "45%" }}
                  dangerouslySetInnerHTML={{ __html: card.backSide }}
                />
                <input
                  type="checkbox"
                  checked={card.learned || false}
                  onChange={() => {
                    setDecks((prevDecks) =>
                      prevDecks.map((deck, dIdx) => {
                        if (dIdx !== activeDeckNum) return deck;

                        return {
                          ...deck,
                          cards: deck.cards.map((c) =>
                            c.id === card.id
                              ? { ...c, learned: !c.learned }
                              : c,
                          ),
                        };
                      }),
                    );
                  }}
                />

                <button
                  onClick={() => {
                    setCardTochange(index);
                  }}
                >
                  Change
                </button>
              </>
            ) : (
              <>
                <input
                  value={card.frontSide}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setDecks((prevDecks) =>
                      prevDecks.map((deck, index) => {
                        if (index !== activeDeckNum) return deck;
                        return {
                          ...deck,
                          cards: deck.cards.map((c) =>
                            c.id === card.id
                              ? { ...c, frontSide: newValue }
                              : c,
                          ),
                        };
                      }),
                    );
                  }}
                />
                <input
                  value={card.backSide}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setDecks((prevDecks) =>
                      prevDecks.map((deck, index) => {
                        if (index !== activeDeckNum) return deck;
                        return {
                          ...deck,
                          cards: deck.cards.map((c) =>
                            c.id === card.id ? { ...c, backSide: newValue } : c,
                          ),
                        };
                      }),
                    );
                  }}
                />
                <button onClick={() => setCardTochange(-1)}>apply</button>
              </>
            )}

            <button
              onClick={() => {
                handleDeleteCard(card.id);
                setCardTochange(-1);
              }}
            >
              X
            </button>
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
