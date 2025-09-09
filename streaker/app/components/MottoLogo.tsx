import React from "react";
import styled from "styled-components/native";

export const MottoLogo = () => {

  return (
    <LogoWrapper>
      <Logo source={require("@/assets/images/streaker-logo.png")} />
      <Tagline>Build habits, keep the streak.</Tagline>
    </LogoWrapper>
  );
}

const LogoWrapper = styled.View`
  align-items: center;
  justify-content: start;
`;


const Logo = styled.Image`
  width: 120px;
  height: 120px;
  resize-mode: contain;
`;

const Tagline = styled.Text`
  font-size: 16px;
  color: #5b5a60;
  text-align: center;
`;