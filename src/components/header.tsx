"use client";
import styled from "styled-components";
import { TitleH1 } from "@/app/fonts";
import globals from "@/app/styles/globals.module.scss";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: ${globals.colorPrimary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled(TitleH1)`
  font-family: var(--font-barlow);
  font-size: 2rem;
  text-align: center;
  color: ${globals.colorText};
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>99 Problèmes, 1 Solution</HeaderTitle>
    </HeaderContainer>
  );
}
