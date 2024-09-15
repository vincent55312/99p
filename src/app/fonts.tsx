import globals from "./styles/globals.module.scss";
import styled from "styled-components";

export const TitleH1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${globals.colorText};
`;

export const TitleH2 = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${globals.colorText};
`;

export const TitleH3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${globals.colorText};
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${globals.colorText};
`;

export const Link = styled.a`
  font-size: 1rem;
  font-weight: 400;
  color: ${globals.colorText};
  text-decoration: underline;
`;

export const BoldText = styled(Paragraph)`
  font-weight: 700;
`;