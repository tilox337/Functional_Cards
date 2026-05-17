import { useEffect, useState } from "react";

const DeckForm = ({
  decks,
  activeDeckNum,
  onChangeDeck,
  onChangeName,
  onDeleteDeck,
}) => {
  return (
    <>
      {decks.map((deck, index) => {
        return (
          <div key={deck.id}>
            {index === activeDeckNum ? (
              <>
                <input
                  value={deck.name}
                  onChange={(e) => {
                    onChangeName(e.target.value);
                  }}
                />
                <button onClick={onDeleteDeck}>X</button>
              </>
            ) : (
              <button
                onClick={() => {
                  onChangeDeck(index);
                }}
              >
                {deck.name}
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default DeckForm;
