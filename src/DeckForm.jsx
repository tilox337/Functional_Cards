import { useEffect, useState } from "react";

const DeckForm = ({ decks, activeDeckNum, onChangeDeck, onChangeName }) => {
  return (
    <>
      {decks.map((deck, index) => {
        if (index === activeDeckNum)
          return (
            <input
              key={deck.id}
              value={deck.name}
              onChange={(e) => {
                onChangeName(e.target.value);
              }}
            ></input>
          );
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
