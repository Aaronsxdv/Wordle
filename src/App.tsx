import React, { useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/Keyboard";
import Popup from "./components/Popup";
import TopNavBar from "./components/TopNavBar";
import Words from "./components/Words";

const ContainerSC = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PopupTitleSC = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-top: 10px;
`;

const InputSC = styled.input`
  width: 70%;
  padding: 10px;
  font-size: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonSC = styled.button`
  width: 30%;
  padding: 10px;
  font-size: 32px;
  border: 2px solid black;
  border-radius: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  background: none;
`;
function App() {
  const [targetWord, setTargetWord] = useState("");
  const [targetWords, setTargetWords] = useState(["", "", "", "", ""]);
  const [currentWordIndex, setcurrentWordIndex] = useState(0);
  const [words, setWords] = useState(["", "", "", "", ""]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Track if the popup with input is open or not
  const endGame = () => {
    console.log("end game");
    if (words[currentWordIndex].toLowerCase() === targetWord) {
      setIsGameFinished(true);
    } else {
      setIsGameOver(true);
    }
  };
  const handleCurrentWordIndexChange = (index: number) => {
    if (index < words.length) {
      setcurrentWordIndex(index);
    } else {
      setcurrentWordIndex(0);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleStartGame(); // Handle form submission or any other logic
    }
  };
  const handleStartGame = () => {
    if (targetWord.length > 0) {
      setIsPopupOpen(false); // Close the popup
    }
  };

  const handleTargetWordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTargetWord(event.target.value); // Update the target word state
  };

  return (
    <>
      {isPopupOpen ? (
        <Popup onClose={handleStartGame}>
          <PopupTitleSC>Enter your word:</PopupTitleSC>
          <InputSC
            type="text"
            value={targetWord}
            onChange={handleTargetWordChange}
            onKeyDown={handleKeyDown}
          />
          <ButtonSC onClick={handleStartGame}>OK</ButtonSC>
        </Popup>
      ) : (
        <>
          <TopNavBar />
          <ContainerSC>
            <Words
              targetWords={targetWords}
              currentWordIndex={currentWordIndex}
              setcurrentWordIndex={handleCurrentWordIndexChange}
              words={words}
              setWords={setWords}
            />
            {isGameOver && (
              <Popup onClose={() => setIsGameOver(!isGameOver)}>
                Game Over
              </Popup>
            )}
            {isGameFinished && (
              <Popup onClose={() => setIsGameFinished(!isGameFinished)}>
                Game Finished
              </Popup>
            )}

            <Keyboard
              targetWord={targetWord}
              targetWords={targetWords}
              setTargetWords={setTargetWords}
              words={words}
              currentWordIndex={currentWordIndex}
              setCurrentWordIndex={handleCurrentWordIndexChange}
              setWords={setWords}
              endGame={endGame}
            />
          </ContainerSC>
        </>
      )}
    </>
  );
}

export default App;
