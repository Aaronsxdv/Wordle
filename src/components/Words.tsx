/* eslint-disable eqeqeq */
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const WordSC = styled.div`
  display: flex;
  width: fit-content;
  margin: auto;
  margin-bottom: 20px;
`;
const flipAnimation = keyframes`
  0% {
    transform: rotateX(180deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;

const Square = styled.div<{
  isGuessed?: boolean;
  isDisplaced?: boolean;
  isChecked?: boolean;
}>`
  width: 120px;
  height: 120px;
  border: 2px solid gray;
  background-color: ${(props) =>
    props.isGuessed
      ? "#6AAA64"
      : props.isDisplaced
      ? "#F5BC39"
      : props.isChecked
      ? "grey"
      : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  line-height: 120px;
  font-weight: bold;
  margin: 5px;
  transition: background-color 0.5s;
  animation: ${(props) =>
    props.isGuessed || props.isDisplaced
      ? css`
          ${flipAnimation} 0.5s forwards
        `
      : "none"};
  transform-style: preserve-3d;
  color: ${(props) =>
    props.isGuessed || props.isDisplaced || props.isChecked
      ? "white"
      : "black"};
`;

const ContainerSC = styled.div`
  margin-bottom: 120px;
`;

type WordsProps = {
  targetWords: string[];
  currentWordIndex: number;
  setcurrentWordIndex: (index: number) => void;
  words: string[];
  setWords: (words: string[]) => void;
};

type WordProps = {
  currentWord: string;
  targetWord: string;
};

const Word = ({ currentWord, targetWord }: WordProps) => {
  const squares = [];

  for (let i = 0; i < 5; i++) {
    const isGuessed =
      targetWord != ""
        ? currentWord[i]?.toLowerCase() === targetWord[i]
        : false;
    const isDisplaced =
      targetWord != ""
        ? targetWord.includes(currentWord[i].toLowerCase())
        : false;
    squares.push(
      <Square
        key={i}
        isGuessed={isGuessed}
        isDisplaced={isDisplaced}
        isChecked={targetWord != ""}
      >
        {currentWord[i]}
      </Square>
    );
  }

  return <WordSC>{squares}</WordSC>;
};

function Words({ targetWords, words }: WordsProps) {
  return (
    <ContainerSC>
      <Word currentWord={words[0]} targetWord={targetWords[0]} />
      <Word currentWord={words[1]} targetWord={targetWords[1]} />
      <Word currentWord={words[2]} targetWord={targetWords[2]} />
      <Word currentWord={words[3]} targetWord={targetWords[3]} />
      <Word currentWord={words[4]} targetWord={targetWords[4]} />
    </ContainerSC>
  );
}

export default Words;
