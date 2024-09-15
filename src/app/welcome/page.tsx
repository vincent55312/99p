"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { TitleH1, Paragraph } from "../fonts";
import { LoginStorage } from "@/lib/localstorage-service";
import styled, { keyframes } from "styled-components";
import anime from "animejs";

const MainTitle = styled(TitleH1)`
  font-family: var(--font-nerko-one);
  font-size: 3rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WelcomeTitle = styled(TitleH1)`
  font-family: var(--font-nerko-one);
  font-size: 2rem;
  text-align: center;
  position: absolute;
  top: calc(50% + 8em);
  left: 50%;
  transform: translateX(-50%);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  position: relative;
  cursor: pointer;
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

const AuthorNames = styled(Paragraph)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1rem;
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

export default function Welcome() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!LoginStorage.isLoggedIn()) {
      router.push("/");
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

  const handleContainerClick = () => {
    router.push("/start-quizz");
  };

  return (
    <>
      <Container onClick={handleContainerClick}>
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
        <div>
          <MainTitle>99 Problèmes, <br />1 Solution</MainTitle>
          <WelcomeTitle>Welcome</WelcomeTitle>
        </div>
        <AuthorNames>par Aurore et Elsa</AuthorNames>
      </Container>
    </>
  );
}
