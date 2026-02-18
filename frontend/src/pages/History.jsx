import { useState, useEffect } from "react";
import { fetchDailyPlan } from "../api/api";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";

export const History = () => {
  const [plans, setPlans] = useState([]);

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