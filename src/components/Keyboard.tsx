import React from "react";
import styled from "styled-components";

const KeySC = styled.div<{
  isDisplaced: boolean;
  isGuessed: boolean;
  isSpecial: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isSpecial ? "130px" : "90px")};
  height: 120px;
  background-color: ${(props) => (props.isGuessed ? "#6AAA64" : "lightgray")};
  color: ${(props) => (props.isDisplaced ? "white" : "black")};
  border-radius: 5px;
  font-weight: bold;
  margin: 0 5px;
  font-size: 35px;
  user-select: none;
  cursor: pointer;
`;

const KeyboardSC = styled.div`
  display: flex;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Row1 = styled.div`
  margin: auto;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
`;

const Row2 = styled.div`
  margin: auto;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 10px;
`;

const Row3 = styled.div`
  margin: auto;
  text-align: center;
  display: grid;
  grid-template-columns: auto repeat(7, 1fr) auto;
  gap: 10px;
`;

type Props = {
  words: string[];
  setWords: (words: string[]) => void;
  setCurrentWordIndex: (index: number) => void;
  targetWord: string;
  currentWordIndex: number;
  endGame: () => void;
  targetWords: string[];
  setTargetWords: (words: string[]) => void;
};

function Keyboard({
  words,
  setWords,
  setCurrentWordIndex,
  targetWord,
  currentWordIndex,
  endGame,
  targetWords,
  setTargetWords,
}: Props) {
  const allWords = require("an-array-of-english-words").filter(
    (x: string) => x.length === 5
  );
  const keyboardLetters = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  const addLetter = (letter: string) => {
    if (words[currentWordIndex].length < 5) {
      const updatedWords = [...words];
      updatedWords[currentWordIndex] += letter;
      setWords(updatedWords);
    }
  };

  const eraseLetter = () => {
    if (words[currentWordIndex].length > 0) {
      const updatedWords = [...words];
      updatedWords[currentWordIndex] = updatedWords[currentWordIndex].slice(
        0,
        -1
      );
      setWords(updatedWords);
    }
  };

  const keys = keyboardLetters.map((x) => (
    <KeySC
      key={x}
      isDisplaced={false}
      isGuessed={false}
      isSpecial={false}
      onClick={() => {
        addLetter(x);
      }}
    >
      {x}
    </KeySC>
  ));

  return (
    <KeyboardSC>
      <GridContainer>
        <Row1>{keys.slice(0, 10)}</Row1>

        <Row2>
          <KeySC
            isDisplaced={false}
            isGuessed={false}
            isSpecial={false}
            onClick={() => {
              addLetter("A");
            }}
          >
            A
          </KeySC>
          {keys.slice(11, 18)}
          <KeySC
            isDisplaced={false}
            isGuessed={false}
            isSpecial={false}
            onClick={() => {
              addLetter("L");
            }}
          >
            L
          </KeySC>
        </Row2>
        <Row3>
          <KeySC
            isDisplaced={false}
            isGuessed={false}
            isSpecial={true}
            onClick={() => {
              if (
                currentWordIndex === 4 ||
                words[currentWordIndex].toLowerCase() === targetWord
              ) {
                endGame();
              }
              if (allWords.includes(words[currentWordIndex].toLowerCase())) {
                const newArray = [...targetWords];
                newArray[currentWordIndex] = targetWord;
                setTargetWords(newArray);

                setCurrentWordIndex(currentWordIndex + 1);
              }
            }}
          >
            Enter
          </KeySC>
          {keys.slice(19)}
          <KeySC
            isDisplaced={false}
            isGuessed={false}
            isSpecial={true}
            onClick={() => eraseLetter()}
          >
            {"<="}
          </KeySC>
        </Row3>
      </GridContainer>
    </KeyboardSC>
  );
}

export default Keyboard;
