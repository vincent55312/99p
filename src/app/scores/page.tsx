"use client";
import { useRouter } from 'next/navigation';
import styled, { keyframes } from "styled-components";
import colors from "@/app/styles/globals.module.scss";
import { LoginStorage, QuizzScoreStorage } from "@/lib/localstorage-service";
import { useEffect, useState } from "react";
import anime from "animejs";

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

const MathBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const generateRandomPosition = () => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  return { top: `${top}%`, left: `${left}%` };
};

const generateRandomAnimation = () => {
  const direction = Math.random() > 0.5 ? 1 : -1;
  const duration = Math.random() * 20 + 10;
  const translateX = direction * (Math.random() * 200 - 100);
  const translateY = direction * (Math.random() * 200 - 100);
  return keyframes`
    0% { transform: translate(0, 0); }
    100% { transform: translate(${translateX}vw, ${translateY}vh); }
  `;
};

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MathFormula = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: ${generateRandomColor};
  animation: ${generateRandomAnimation} 10s linear infinite;
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

const formulas = [
  "E = mc^2",
  "a^2 + b^2 = c^2",
  "F = ma",
  "V = IR",
  "P = IV",
  "Δx = v0t + 1/2at^2",
  "λ = h/p",
  "pV = nRT",
  "∫f(x)dx = F(x) + C",
  "i^2 = -1",
  "sin(θ) = opp/hyp",
  "cos(θ) = adj/hyp",
  "tan(θ) = opp/adj",
  "e^(iπ) + 1 = 0",
  "∇·E = ρ/ε₀",
  "∇×B - (1/c²)∂E/∂t = μ₀J",
  "∇·B = 0",
  "∇×E + ∂B/∂t = 0",
  "E = hf",
  "ΔS ≥ 0"
];

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

  const handleReplay = () => {
    QuizzScoreStorage.clearScores();
    router.push("/welcome");
  };

  return (
    <Container>
      <MathBackground>
        {formulas.map((formula, index) => {
          const { top, left } = generateRandomPosition();
          return (
            <MathFormula
              key={index}
              style={{ top, left, color: generateRandomColor() }}
              className="math-formula"
            >
              {formula}
            </MathFormula>
          );
        })}
      </MathBackground>
      <Title>Récapitulatif des scores</Title>
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