import { useState, useEffect } from "react";
import { fetchDailyPlan } from "../api/api";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

export const History = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlans = async () => {
      const data = await fetchDailyPlan();
      setPlans(data);
    };
    loadPlans();
  }, []);

  return (
    <>
      <Navbar />
      <BackRow>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Tillbaka
        </BackButton>
      </BackRow>
      <PageWrapper>
        {plans.map((plan) => (
          <PlanCard key={plan._id}>
            <h3>{new Date(plan.date).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })}</h3>
            <p>Start: {plan.startingEnergy}→ Slut: {plan.currentEnergy}</p>
            <ActivityChips>
              {plan.activities.map(a => <Chip key={a._id} $positive={a.energyImpact > 0}>{a.name}</Chip>)}
            </ActivityChips>
          </PlanCard>
        ))}
      </PageWrapper>
    </>
  )
}

// ======= STYLED COMPONENTS ======= //

const PageWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;

  @media (min-width: 768px) {
    max-width: 700px;
    padding: 60px 16px;
  }
`;

const PlanCard = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;

  h3 {
    margin: 0 0 8px 0;
    text-transform: capitalize;
  }

  p {
    margin: 0 0 12px 0;
    color: var(--color-text-muted);
  }
`;

const ActivityChips = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.span`
  display: inline-block;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  gap: 8px;
  color: var(--color-text);
  background: ${props => props.$positive
    ? "var(--color-success-light)"
    : "var(--color-error-light)"
  };
  border: 1px solid ${props => props.$positive
    ? "var(--color-success)"
    : "var(--color-error)"
  };
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