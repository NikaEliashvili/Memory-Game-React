import { useEffect, useState } from "react";
import "./App.css";
import { cardsImages } from "./cardsImages";
import Card from "./components/Card";
import ResetMatch from "./components/ResetMatch";

function App() {
  const [cards, setCards] = useState([]);
  const [chooseOne, setChooseOne] = useState(null);
  const [chooseTwo, setChooseTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  function shuffleCards() {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5) //Fisher-Yates algorithm to shuffle array in place
      .map((card) => ({
        ...card,
        id: Math.floor(Math.random() * 10000),
      }));
    setCards(shuffledCards);
  }

  function handleClick(card) {
    if ((!chooseOne || !chooseTwo) && !card.isMatched) {
      chooseOne && chooseOne.id !== card.id
        ? setChooseTwo(card)
        : setChooseOne(card);
    }
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (chooseOne && chooseTwo) {
      if (chooseOne.src === chooseTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === chooseOne.src
              ? { ...card, isMatched: true }
              : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
    if (cards) {
      let isTrue = false;
      let count = 0;
      cards.forEach((card) => {
        isTrue = true;
        if (!card.isMatched) {
          count++;
        }
      });
      if (count === 0 && isTrue) {
        setIsFinished(true);
      }
    }
  }, [chooseOne, chooseTwo]);

  function resetTurn() {
    setChooseOne(null);
    setChooseTwo(null);
    setIsFinished(false);
    setTurns((prevTurns) => prevTurns + 1);
  }

  function resetGame() {
    setChooseOne(null);
    setChooseTwo(null);
    setIsFinished(false);
    setTurns(0);
    shuffleCards();
  }

  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={resetGame}>New Game</button>
        <div className="cards-grid">
          {cards &&
            cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleClick={handleClick}
                flipped={
                  card.id === chooseOne?.id ||
                  card.id === chooseTwo?.id ||
                  card.isMatched
                }
                disabled={chooseOne && chooseTwo}
              />
            ))}
        </div>
        <p>Turns: {turns}</p>
        {isFinished && <ResetMatch resetGame={resetGame} />}
      </div>
    </>
  );
}

export default App;
