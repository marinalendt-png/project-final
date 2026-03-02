import { useState, useEffect } from "react";
import { fetchDailyPlan, patchDailyPlan } from "../api/api";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import { ArrowLeft, CalendarBlank, CaretDown } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { EnergyGraf } from "../components/EnergyHistory.jsx"

export const History = () => {
  const [plans, setPlans] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [notes, setNotes] = useState({});

  const navigate = useNavigate();

  const getDaySummary = (start, end) => {
    const diff = end - start;
    if (diff >= 0) return "Energin höll i sig bra idag!";
    if (diff >= -2) return "Lite tyngre dag - men du tog dig igenom den.";
    return "Tuff dag idag. Lägg in en vilosam aktivitet extra i morgon";
  };

  useEffect(() => {
    const loadPlans = async () => {
      const data = await fetchDailyPlan();
      setPlans(data);
      const notesMap = {};
      data.forEach(p => { notesMap[p._id] = p.notes || ""; });
      setNotes(notesMap);
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
          <>
            <EnergyGraf plans={plans} />

            {plans.map((plan) => (
              <PlanCard
                key={plan._id}
                $energy={plan.currentEnergy}
                $open={openId === plan._id}
                onClick={() => setOpenId(openId === plan._id ? null : plan._id)}
              >
                <CardHeader $open={openId === plan._id}>
                  <CalendarBlank size={16} weight="fill" />
                  <h3>{new Date(plan.date).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })}</h3>
                  <CaretDown size={14} style={{ marginLeft: "auto", transition: "transform 0.2s", transform: openId === plan._id ? "rotate(180deg)" : "rotate(0deg)" }} />
                </CardHeader>
                {openId === plan._id && (
                  <>
                    <EnergyRow>
                      <EnergyNumbers>
                        <EnergyBlock>
                          <EnergyNum>{plan.startingEnergy}</EnergyNum>
                          <EnergyLabel>start</EnergyLabel>
                        </EnergyBlock>
                        <Arrow $energy={plan.currentEnergy}>
                          {plan.currentEnergy >= plan.startingEnergy ? "↑" : "↓"}
                        </Arrow>
                        <EnergyBlock>
                          <EnergyNum $end $energy={plan.currentEnergy}>
                            {plan.currentEnergy}
                          </EnergyNum>
                          <EnergyLabel>slut</EnergyLabel>
                        </EnergyBlock>
                      </EnergyNumbers>
                    </EnergyRow>
                    <ActivityChips>
                      {plan.activities.map(a => <Chip key={a._id} $positive={a.energyImpact > 0}>{a.name}</Chip>)}
                    </ActivityChips>
                    <NoteArea
                      value={notes[plan._id] ?? ""}
                      onChange={e => setNotes(prev => ({ ...prev, [plan._id]: e.target.value }))}
                      onBlur={() => patchDailyPlan(plan._id, { notes: notes[plan._id] })}
                      onClick={e => e.stopPropagation()}
                      placeholder="Egna tankar om dagen..."
                      rows={2}
                    />
                  </>
                )}
              </PlanCard>
            ))}
          </>
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
  background: var(--color-glass-card);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(6px);
  border-left: 5px solid ${props => {
    if (props.$energy >= 7) return "var(--color-energy-high)";
    if (props.$energy >= 4) return "var(--color-energy-mid)";
    return "var(--color-energy-low)";
  }};

  border-radius: 12px;
  padding: ${props => props.$open ? "10px 16px" : "8px 10px"};
  margin-bottom: 10px;
  cursor: pointer;

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

const EnergyNum = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  color: ${({ $end, $energy }) =>
    !$end ? "var(--color-text-muted)" :
      $energy >= 7 ? "var(--color-forest)" :
        $energy >= 4 ? "var(--color-energy-mid-dark)" :
          "var(--color-error)"
  };
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
  color: ${({ $energy }) =>
    $energy >= 7 ? "var(--color-forest)" :
      $energy >= 4 ? "var(--color-energy-mid-dark)" :
        "var(--color-error)"
  };
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
    : "var(--color-error-dark)"
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

const NoteArea = styled.textarea`
  width: 100%;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-input-bg);
  font-size: 14px;
  color: var(--color-text);
  resize: none;
  font-family: inherit;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`;