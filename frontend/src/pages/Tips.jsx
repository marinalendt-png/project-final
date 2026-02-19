import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

export const Tips = () => {
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
        <h2>Tips och råd</h2>
        <Card>
          <h3>Förstå din energi</h3>
          <LinkItem href="https://www.youtube.com/watch?v=XB8MrKHHkGU" target="_blank" rel="noopener noreferrer">
            Spoon Theory - Planera din energi (YouTube)
          </LinkItem>
        </Card>

        <Card>
          <h3>Stresshantering</h3>
          <LinkItem href="https://www.1177.se/Skane/liv--halsa/stresshantering-och-somn/" target="_blank" rel="noopener noreferrer">
            1177 - Stresshantering och sömn
          </LinkItem>
          <LinkItem href="https://dinpsykiskahalsa.se/artiklar/nar-livet-kanns-jobbigt/stress/" target="_blank" rel="noopener noreferrer">
            Din Psykiska Hälsa – Stress
          </LinkItem>
          <LinkItem href="https://www.hjarnfonden.se/hjarnhalsa/stress/8-tips-for-att-minska-stressen/" target="_blank" rel="noopener noreferrer">
            Hjärnfonden – 8 tips för att minska stressen
          </LinkItem>
        </Card>

        <Card>
          <h3>Sömn</h3>
          <LinkItem href="https://www.1177.se/Vasterbotten/liv--halsa/stresshantering-och-somn/somnskola/" target="_blank" rel="noopener noreferrer">
            1177 – Sömnsskola
          </LinkItem>
          <LinkItem href="https://www.suntarbetsliv.se/rapporterat/5-tips-for-battre-somn/" target="_blank" rel="noopener noreferrer">
            Sunt Arbetsliv – 5 tips för bättre sömn
          </LinkItem>
        </Card>

        <Card>
          <h3>Rörelse</h3>
          <LinkItem href="https://www.stressfrikropp.com/post/tr%C3%A4na-utan-bakslag-med-utmattningssyndrom" target="_blank" rel="noopener noreferrer">
            Stressfri Kropp – Träna utan bakslag med utmattningssyndrom
          </LinkItem>
          <LinkItem href="https://www.hjarnfonden.se/hjarnhalsa/fysisk-aktivitet/fysisk-traning-och-depression/" target="_blank" rel="noopener noreferrer">
            Hjärnfonden – Fysisk träning och depression
          </LinkItem>
        </Card>
      </PageWrapper>
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const PageWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 { text-align: center; }

  @media (min-width: 768px) {
    padding: 32px 16px;
  }
`;

const Card = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;

  h3 { margin: 0 0 12px 0; }

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const LinkItem = styled.a`
  display: block;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: white;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  border: 1px solid var(--color-border);

  &:last-child { margin-bottom: 0; }

  &:hover {
    background: var(--color-border);
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