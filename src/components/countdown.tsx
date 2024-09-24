import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TimerCircle = styled.svg`
  width: 200px;
  height: 200px;
`;

const TimerText = styled.text`
  font-size: 2rem;
  fill: ${props => props.color};
  text-anchor: middle;
  dominant-baseline: middle;
`;

const NextButton = styled.button<{ color: string }>`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: ${props => props.color};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RoundTimer = ({ onEnd }: { onEnd: () => void }) => {
  const duration = 90;
  const initialColor = '#009000';
  const warningColor = '#FFA500';
  const dangerColor = '#FF0000';
  
  const [remainingTime, setRemainingTime] = useState(duration);
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onEnd]);

  useEffect(() => {
    if (remainingTime === 60) {
      setColor(warningColor);
    } else if (remainingTime === 30) {
      setColor(dangerColor);
    }
  }, [remainingTime]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (remainingTime / duration) * circumference;

  return (
    <TimerContainer>
      <TimerCircle>
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <TimerText x="100" y="100" color={color}>
          {remainingTime}
        </TimerText>
      </TimerCircle>
      <NextButton color={color} onClick={onEnd}>
        Afficher la réponse
      </NextButton>
    </TimerContainer>
  );
};

export default RoundTimer;

