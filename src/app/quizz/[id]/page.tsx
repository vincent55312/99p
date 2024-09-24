"use client";
import { useRouter } from 'next/navigation';
import styled from "styled-components";
import colors from "@/app/styles/globals.module.scss";
import { LoginStorage } from "@/lib/localstorage-service";
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
  flex-direction: space-between;
  align-items: center;
  flex-direction: column;
  margin: 3rem;
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
  max-width: 60%;
  text-align: center;
  @media (max-width: 480px) {
    max-width: 100%;
  }
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

interface QuizzData {
  id: number;
  question: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quizzData, setQuizzData] = useState<QuizzData | null>(null);

  useEffect(() => {
    if (!LoginStorage.isLoggedIn()) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetch('/quizz.json')
      .then(response => response.json())
      .then((data: QuizzData[]) => {
        const quizz = data.find((q: QuizzData) => q.id === parseInt(params.id));
        if (quizz) {
          setQuizzData(quizz);
        }
      });
  }, [params.id]);

  const handleCountdownEnd = () => {
    router.push(`/quizz-set-score/${parseInt(params.id)}`);
  };

  return (
    <Container>
      <Title>Question {params.id}</Title>
      <Content>
      <Question>
          {quizzData ? quizzData.question : <Loader />}
        </Question>
        <RoundTimer onEnd={handleCountdownEnd}/>
      </Content>
    </Container>
  );
}