import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";

export const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <BackRow>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Tillbaka
        </BackButton>
      </BackRow>
      <PageWrapper>
        <h2>Om balans</h2>
        <Card>
          <p>Balans är en app för dig som vill planera din dag utifrån den energi du har. Genom att välja aktiviteter och se hur de påverkar din energinivå kan du hitta en balans som fungerar för dig.</p>
        </Card>
        <Card>
          <h3>Hur funkar det?</h3>
          <p>1. Välj hur mycket energi du har idag (1-10)</p>
          <p>2. Lägg till aktiviteter som tar eller ger energi</p>
          <p>3. Se en sammanfattning av din dag</p>
        </Card>
      </PageWrapper>
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const PageWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 { 
    text-align: center; 
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);


  h3 { 
    margin: 0 0 12px 0; 
  }
  p { 
    margin: 0 0 8px 0; 
    line-height: 1.6; 
    color: var(--color-text);
  }
`;

const BackRow = styled.div`
  padding: 8px 16px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  font-size: 14px;
  padding: 4px 0;
  margin-bottom: 8px;

  &:hover {
    color: var(--color-primary);
  }
`;

