import React from "react";
import styled, { keyframes } from "styled-components";

const TopNavBarSC = styled.div`
  display: flex;
  width: 100%;
  height: 130px;
  border-bottom: 1px solid lightgray;
`;

const TitleSC = styled.div`
  font-size: 75px;
  font-weight: bold;
  margin: auto;
`;
type TopNavBarProps = {};

const TopNavBar: React.FC<TopNavBarProps> = () => {
  return (
    <TopNavBarSC>
      <TitleSC>Wordle</TitleSC>
    </TopNavBarSC>
  );
};

export default TopNavBar;
