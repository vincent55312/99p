"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { LoginStorage } from "@/lib/localstorage-service";
import styled from "styled-components";
import Header from "@/components/header";
import colors from "@/app/styles/globals.module.scss";
import anime from "animejs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  background-color: ${colors.colorBackground};
  color: ${colors.colorText};
  padding: 20px;
`;

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 20px;
`;

const Card = styled.div`
  background-color: ${colors.colorPrimary};
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  text-align: center;
  color: ${colors.colorText};
  flex: 1 1 calc(30% - 2rem);
  max-width: 18rem;
  min-width: 10rem;
  aspect-ratio: 1 / 1;

  @media (max-width: 768px) {
    flex: 1 1 calc(45% - 2rem);
  }
  
  @media (max-width: 480px) {
    flex: 1 1 calc(100% - 2rem);
  }
`;

const ChooseText = styled.div`
  text-align: center;
  font-size: 2rem;
  color: ${colors.colorText};
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export default function StartQuizz() {
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

  const handleCardClick = (cardNumber: number) => {
    console.log(`Card ${cardNumber} clicked`);
  };

  const handleCard2Click = () => {
    router.push("/rules-q2");
  };

  return (
    <>      
      <Container>
        <ChooseText>Choisissez votre quizz 😃</ChooseText>
        <CardsGrid>
          <Card onClick={() => handleCardClick(1)}>Culture générale</Card>
          <Card onClick={() => handleCard2Click()}>Calculs commerciaux</Card>
          <Card onClick={() => handleCardClick(3)}>Négociation</Card>
          <Card onClick={() => handleCardClick(4)}>Petit rappel</Card>
          <Card onClick={() => handleCardClick(5)}>CEJM</Card>
          <Card onClick={() => handleCardClick(6)}>Digitalisation</Card>
        </CardsGrid>
      </Container>
    </>
  );
}
