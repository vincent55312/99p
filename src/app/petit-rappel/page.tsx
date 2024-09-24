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
  background-color: ${colors.colorBackground};
  color: ${colors.colorText};

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  padding-top: 5rem;
  text-align: center;
  color: ${colors.colorPrimary};
  font-weight: bold;
  padding-bottom: 2rem;
  @media (max-width: 480px) {
    font-size: 2rem;
    padding-top: 2rem;
  }
`;

const Content = styled.div`
  background-color: ${colors.colorPrimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 30px;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Formula = styled.li`
  font-size: 1.2rem;
  color: ${colors.colorText};
  margin: 10px 0;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 5px 0;
  }
`;

const ContentButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }
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
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.colorSecondary};
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    margin: 1rem;
  }
`;

export default function ReminderPage() {
  const router = useRouter();
  useEffect(() => {
    if (!LoginStorage.isLoggedIn()) {
      router.push("/");
    }
  }, [router]);

  const handleGoClick = () => {
    router.push("/rules-q2");
  };

  return (
    <Container>
      <Title>Rappel Formules</Title>
      <Content>
        <Formula>TVA 20 % devient 1.20</Formula>
        <Formula>TVA 10% devient 1.10</Formula>
        <Formula>TVA 5.5 % devient 1.055</Formula>
        <Formula>TVA à 20%</Formula>
        <Formula>PVHT : PVTTC / TVA (1.20)</Formula>
        <Formula>PVHT : PVHT + Marge</Formula>
        <Formula>PVTTC : PVHT X TVA (1.20)</Formula>
        <Formula>PVTTC : PAHT X COEFFICIENT MULTIPLICATEUR</Formula>
      </Content>
      <ContentButton>
        <GoButton onClick={handleGoClick}>Aller au quizz commercial</GoButton>
      </ContentButton>
    </Container>
  );
}
