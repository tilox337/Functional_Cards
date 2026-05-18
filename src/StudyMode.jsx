import React, { useState, useEffect } from "react";
//import "./StudyMode.css";

// Флаг для защиты от двойного запроса в React Strict Mode
let isFetched = false;

const Study = () => {
  const [decks, setDecks] = useState([]);
  const [activeDeckNumber, setActiveDeckNumber] = useState(0);
  const [nowCard, setNowCard] = useState(0);
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    // 1. Читаем сохраненные пользователем колоды из локала
    const saved = localStorage.getItem("decks");
    const userDecks = saved ? JSON.parse(saved) : [];

    // Создаем базовую чистую колоду default
    const defaultDeck = {
      id: crypto.randomUUID(), // Генерируем id, как это делает createDeck в App
      name: "default",
      cards: [],
    };

    if (isFetched) {
      setDecks([defaultDeck, ...userDecks]);
      return;
    }
    isFetched = true;

    // 2. Делаем точно такой же fetch, как в твоем CardForm, чтобы наполнить default карточками
    fetch("https://opentdb.com")
      .then((response) => response.json())
      .then((data) => {
        const apiCards = data.results.map((element) => ({
          id: crypto.randomUUID(),
          frontSide: element.question,
          backSide: element.correct_answer,
          learned: false,
        }));

        // Записываем карточки в default колоду
        defaultDeck.cards = apiCards;

        // Собираем массив в точности как в твоем App: сначала default с карточками, потом сохраненные
        setDecks([defaultDeck, ...userDecks]);
      })
      .catch((err) => {
        console.error("Ошибка загрузки карточек для default:", err);
        setDecks([defaultDeck, ...userDecks]);
      });
  }, []);

  const activeDeck = decks[activeDeckNumber];
  const cards = activeDeck?.cards || [];
  const currentCard = cards[nowCard];

  const changeCard = (step) => {
    if (cards.length > 0) {
      setNowCard((prev) => (prev + step + cards.length) % cards.length);
      setIsFront(true);
    }
  };

  const handleDeckChange = (index) => {
    setActiveDeckNumber(index);
    setNowCard(0);
    setIsFront(true);
  };

  const handleCheckboxChange = () => {
    if (!currentCard) return;

    // Обновляем learned в стейте
    const updatedDecks = decks.map((deck, dIdx) => {
      if (dIdx !== activeDeckNumber) return deck;
      return {
        ...deck,
        cards: deck.cards.map((card, cIdx) =>
          cIdx !== nowCard ? card : { ...card, learned: !card.learned },
        ),
      };
    });

    setDecks(updatedDecks);

    // Сохраняем в localStorage, полностью повторяя логику твоего App.jsx:
    // Отфильтровываем первую колоду (индекс 0), так как она является дефолтной
    const decksToSave = updatedDecks.filter((_, index) => index !== 0);
    localStorage.setItem("decks", JSON.stringify(decksToSave));
  };

  return (
    <div className="study-container">
      <div className="deck-nav">
        {decks.map((deck, index) => (
          <button
            key={deck.id || index}
            className={`deck-btn ${index === activeDeckNumber ? "active" : ""}`}
            onClick={() => handleDeckChange(index)}
          >
            {deck.name}
          </button>
        ))}
      </div>

      {currentCard ? (
        <div className="card-area">
          <div className="card-navigation-row">
            <button className="nav-arrow" onClick={() => changeCard(-1)}>
              {"<-"}
            </button>

            <button
              className={`flash-card ${isFront ? "front" : "back"}`}
              onClick={() => setIsFront((prev) => !prev)}
              dangerouslySetInnerHTML={{
                __html: isFront ? currentCard.frontSide : currentCard.backSide,
              }}
            />

            <button className="nav-arrow" onClick={() => changeCard(1)}>
              {"->"}
            </button>
          </div>

          <div className="card-counter">
            Карточка {nowCard + 1} из {cards.length}
          </div>

          <div className="learned-footer">
            <label>
              <input
                type="checkbox"
                checked={!!currentCard.learned}
                onChange={handleCheckboxChange}
              />
              <span> Learned</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="empty-deck-message">It is empty deck</div>
      )}
    </div>
  );
};

export default Study;
