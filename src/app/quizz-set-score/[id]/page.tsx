"use client";
import { useRouter } from 'next/navigation';
import styled from "styled-components";
import colors from "@/app/styles/globals.module.scss";
import { LoginStorage, QuizzScoreStorage } from "@/lib/localstorage-service";
import { useEffect, useState } from "react";
import RoundTimer from "@/components/countdown";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.colorBackground};
  color: ${colors.colorText};
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  padding-top: 5rem;
  text-align: center;
  color: ${colors.colorPrimary};

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  border-radius: 0.5rem;
`;

const Question = styled.li`
  font-size: 1.5rem;
  color: ${colors.colorText};
  background-color: ${colors.colorPrimary};
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  list-style: none;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const Answer = styled.li`
  font-size: 1.2rem;
  color: ${colors.colorText};
  background-color: ${colors.colorSuccess};
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  list-style: none;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const Loader = styled.div`
  border: 4px solid ${colors.colorSecondaryLight};
  border-top: 4px solid ${colors.colorPrimary};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const TeamButton = styled.button`
  padding: 1rem 2rem;
  margin: 1rem;
  font-size: 1.5rem;
  color: ${colors.colorText};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &.teamA {
    background-color: red;
  }

  &.teamB {
    background-color: blue;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    margin: 0.5rem;
  }
`;

interface QuizzData {
  id: number;
  question: string;
  answer: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quizzData, setQuizzData] = useState<QuizzData | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  useEffect(() => {
    if (!LoginStorage.isLoggedIn()) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetch('/quizz.json')
      .then(response => response.json())
      .then((data: QuizzData[]) => {
        setTotalQuestions(data.length);
        const quizz = data.find((q: QuizzData) => q.id === parseInt(params.id));
        if (quizz) {
          setQuizzData(quizz);
        }
      });
  }, [params.id]);

  const handleTeamClick = (team: 'A' | 'B') => {
    const nextId = parseInt(params.id) + 1;
    if (team === 'A') {
      QuizzScoreStorage.addScoreTeamA(parseInt(params.id));
    } else {
      QuizzScoreStorage.addScoreTeamB(parseInt(params.id));
    }
    if (nextId > totalQuestions) {
      router.push("/scores");
    } else {
      router.push(`/quizz/${nextId}`);
    }
  };

  return (
    <Container>
      <Title>Réponse de la question {params.id}</Title>
      <Content>
        <Question>
          {quizzData ? quizzData.question : <Loader />}
        </Question>
        <Answer>
          {quizzData ? `Réponse: ${quizzData.answer}` : <Loader />}
        </Answer>
        <div>
            Choisissez l'équipe qui a donné la bonne réponse :
          <TeamButton className="teamA" onClick={() => handleTeamClick('A')}>Equipe A</TeamButton>
          <TeamButton className="teamB" onClick={() => handleTeamClick('B')}>Equipe B</TeamButton>
        </div>
      </Content>
    </Container>
  );
}