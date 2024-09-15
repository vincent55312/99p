"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { LoginStorage } from "@/lib/localstorage-service";
import styled, { keyframes } from "styled-components";
import Header from "@/components/header";
import colors from "@/app/styles/globals.module.scss";
import anime from "animejs";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  position: relative;
  background-color: ${colors.colorBackground};
  color: ${colors.colorText};
`;

const CardsGrid = styled.div`
  display: flex;
  flex-direction: row;
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
  width: 18rem;
  height: 18rem;
`;

const ChooseText = styled.div`
  grid-column: span 3;
  text-align: center;
  font-size: 2rem;
  color: ${colors.colorText};
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

  return (
    <>      
      <Container>
        <CardsGrid>
          <Card onClick={() => handleCardClick(1)}>Culture générale</Card>
          <Card onClick={() => handleCardClick(2)}>Calculs commerciaux</Card>
          <Card onClick={() => handleCardClick(3)}>Négociation</Card>
          </CardsGrid>
        <CardsGrid>
        <ChooseText>Choisissez votre quizz 😃</ChooseText>
        </CardsGrid>
        <CardsGrid>
        <Card onClick={() => handleCardClick(4)}>Petit rappel</Card>
          <Card onClick={() => handleCardClick(5)}>CEJM</Card>
          <Card onClick={() => handleCardClick(6)}>Digitalisation</Card>
        </CardsGrid>
      </Container>
    </>
  );
}
