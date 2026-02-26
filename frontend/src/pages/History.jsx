import { useState, useEffect } from "react";
import { fetchDailyPlan } from "../api/api";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import { ArrowLeft, CalendarBlank } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

export const History = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const getDaySummary = (start, end) => {
    const diff = end - start;
    if (diff >= 0) return "Energin höll i sig bra idag!";
    if (diff >= 2) return "Lite tyngre dag - men du tog dig igenom den.";
    return "Tuff dag idag. Lägg in en vilosam aktivitet extra i morgon";
  };

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
        {plans.length === 0 ? (
          <EmptyState>
            <span>🌿</span>
            <p>Du har inte loggat någon dag ännu!</p>
            <p>Gå tillbaka och planera din första dag.</p>
          </EmptyState>
        ) : (

          plans.map((plan) => (
            <PlanCard key={plan._id} $positive={plan.currentEnergy >= plan.startingEnergy}>
              <CardHeader>
                <CalendarBlank size={16} weight="fill" />
                <h3>{new Date(plan.date).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })}</h3>
              </CardHeader>

              <EnergyRow>
                <SummaryText>{getDaySummary(plan.startingEnergy, plan.currentEnergy)}</SummaryText>
                <EnergyNumbers>
                  <EnergyBlock>
                    <EnergyNum>{plan.startingEnergy}</EnergyNum>
                    <EnergyLabel>start</EnergyLabel>
                  </EnergyBlock>
                  <Arrow $positive={plan.currentEnergy >= plan.startingEnergy}>
                    {plan.currentEnergy >= plan.startingEnergy ? "↑" : "↓"}
                  </Arrow>
                  <EnergyBlock>
                    <EnergyNum $end $positive={plan.currentEnergy >= plan.startingEnergy}>
                      {plan.currentEnergy}
                    </EnergyNum>
                    <EnergyLabel>slut</EnergyLabel>
                  </EnergyBlock>
                </EnergyNumbers>
              </EnergyRow>

              <ActivityChips>
                {plan.activities.map(a => <Chip key={a._id} $positive={a.energyImpact > 0}>{a.name}</Chip>)}
              </ActivityChips>
            </PlanCard>
          ))
        )}
      </PageWrapper>
    </>
  )
}

// ======= STYLED COMPONENTS ======= //

const PageWrapper = styled.div`
  padding: 8px 16px 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 16px;
  color: var(--color-text);

  span {
    font-size: 48px;
  }
`;

const PlanCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(6px);
  border-left: 5px solid ${props => props.$positive ? "var(--color-forest)" : "var(--color-error)"};
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

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  color: var(--color-text-muted);

  h3 {
    margin: 0;
    text-transform: capitalize;
    font-size: 15px;
  }
`;

const EnergyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const EnergyNumbers = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-shrink: 0;
`;

const SummaryText = styled.p`
  flex: 1;
  font-size: 13px;
  color: var(--color-text-muted);
  font-style: italic;
  margin: 0 0 12px 0;
`;

const EnergyNum = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: ${({ $end, $positive }) =>
    !$end ? "var(--color-text-muted)" :
      $positive ? "var(--color-forest)" :
        "var(--color-error)"};
`;

const EnergyBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EnergyLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-muted);
`;

const Arrow = styled.span`
  font-size: 24px;
  align-self: center;
  color: ${({ $positive }) => $positive ? "var(--color-forest)" : "var(--color-error)"};
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
  color: var(--color-text);
  background: ${props => props.$positive
    ? "rgba(74, 124, 89, 0.15)"
    : "var(--color-error-light)"
  };
  border: 1px solid ${props => props.$positive
    ? "var(--color-forest)"
    : "var(--color-error)"
  };
`;

const BackRow = styled.div`
  padding: 4px 16px;
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