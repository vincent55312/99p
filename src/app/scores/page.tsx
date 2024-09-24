"use client";
import { useRouter } from 'next/navigation';
import styled, { keyframes } from "styled-components";
import colors from "@/app/styles/globals.module.scss";
import { LoginStorage, QuizzScoreStorage } from "@/lib/localstorage-service";
import { useEffect, useState } from "react";
import anime from "animejs";
import confetti from "canvas-confetti";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.colorBackground};
  color: ${colors.colorText};
  padding: 20px;
  position: relative;
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

const Table = styled.table`
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin: 2rem 0;
`;

const TableHeader = styled.th`
  background-color: ${colors.colorPrimary};
  color: ${colors.colorText};
  padding: 1rem;
  border: 1px solid ${colors.colorSecondaryLight};
`;

const TableCell = styled.td`
  padding: 1rem;
  border: 1px solid ${colors.colorSecondaryLight};
  text-align: center;
`;

const ReplayButton = styled.button`
  padding: 1rem 2rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  color: ${colors.colorText};
  background-color: ${colors.colorPrimary};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
`;

export default function Page() {
  const router = useRouter();
  const [scores, setScores] = useState<{ teamA: number[], teamB: number[] }>({ teamA: [], teamB: [] });

  useEffect(() => {
    if (!LoginStorage.isLoggedIn()) {
      router.push("/");
    } else {
      const storedScores = QuizzScoreStorage.getScores();
      setScores(storedScores);
    }
  }, [router]);

  useEffect(() => {
    anime({
      targets: '.math-formula',
      translateY: [
        { value: -100, duration: 500 },
        { value: 0, duration: 500 }
      ],
      translateX: [
        { value: -50, duration: 500 },
        { value: 50, duration: 500 }
      ],
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(100)
    });
  }, []);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);

    return () => clearInterval(confettiInterval);
  }, []);

  const handleReplay = () => {
    QuizzScoreStorage.clearScores();
    router.push("/welcome");
  };

  const winningTeam = scores.teamA.length > scores.teamB.length ? "Equipe A" : "Equipe B";

  return (
    <Container>
      <Title>Bravo à l'équipe victorieuse : {winningTeam} !</Title>
      <Content>
        <Table>
          <thead>
            <tr>
              <TableHeader>Equipe</TableHeader>
              <TableHeader>Nombre de bonnes réponses</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Equipe A</TableCell>
              <TableCell>{scores.teamA.length}</TableCell>
            </tr>
            <tr>
              <TableCell>Equipe B</TableCell>
              <TableCell>{scores.teamB.length}</TableCell>
            </tr>
          </tbody>
        </Table>

        <ReplayButton onClick={handleReplay}>Rejouer</ReplayButton>
      </Content>
    </Container>
  );
}