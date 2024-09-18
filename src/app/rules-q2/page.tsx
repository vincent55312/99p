"use client";
import { useRouter } from 'next/navigation';
import styled from "styled-components";
import colors from "@/app/styles/globals.module.scss";
import { LoginStorage } from "@/lib/localstorage-service";
import { useEffect } from "react";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  padding-top: 5rem;
  text-align: center;
  color: ${colors.colorText};

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  background-color: ${colors.colorPrimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 20px;
  border-radius: 0.5rem;
`;

const ContentButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 20px;
`;

const GoButton = styled.button`
  padding: 1rem 2rem;
  margin: 2rem;
  font-size: 1.5rem;
  background-color: ${colors.colorPrimary};
  color: ${colors.colorText};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
`;

const Question = styled.li`
    font-size: 30px;
    color: black;
`;

export default function RulesPage() {
  const router = useRouter();
  useEffect(() => {
    if (!LoginStorage.isLoggedIn()) {
      router.push("/");
    }
  }, [router]);

  const handleGoClick = () => {
    router.push("/quizz/1");
  };

  return (
    <Container>
      <Title>Règles du jeu</Title>
      <Content>
        <Question>
            Equipe A contre Equipe B
        </Question>
        <Question>
            30 questions
        </Question>
        <Question>
            Chaque personne devra réponse à 5 questions avant de swichter avec une personne de son équipe
        </Question>
        <Question>1m30 pour répondre</Question>
        <Question>
            Vous gagnez des points à chaque bonne réponse
        </Question>
        <Question>
            L'équipe qui gagne le plus de questions remporte la partie
        </Question>
      </Content>
      <ContentButton>
      <GoButton onClick={handleGoClick}>Commencer</GoButton>
      </ContentButton>

    </Container>
  );
}
