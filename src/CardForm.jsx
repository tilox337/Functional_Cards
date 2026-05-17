import { useEffect, useState } from "react";

const createCard = (front, back) => ({
  id: crypto.randomUUID(),
  frontSide: front,
  backSide: back,
});

const ErrorMessage = ({ text }) => {
  if (!text) return null;
  return <p style={{ color: "red", fontSize: "12px" }}>{text}</p>;
};

const CardForm = ({ onAddSingleCard, onAddManyCards }) => {
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
};

export default CardForm;
