import styled from "styled-components";
import { ActivityCard } from "./ActivityCard";
import { Battery } from "./BatteryComponent";
import { useState } from "react";

export const ActivityPlanner = ({ activities, selectedActivities, energyLeft, batteryPulse, toggleActivity, showForm, setShowForm, handleAddActivity, onNext, onBack, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("alla");

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Planera din dag</h2>

      <BatteryWrapper $pulse={batteryPulse}>
        <Battery energy={energyLeft} />
      </BatteryWrapper>

      <OpenModalButton onClick={() => setShowModal(true)}>
        Välj aktiviteter
      </OpenModalButton>

      {selectedActivities.length > 0 && (
        <SelectedBox>
          <SelectedList>
            {activities.filter(a => selectedActivities.includes(a._id)).map(a => (
              <SelectedChip key={a._id} $positive={a.energyImpact > 0}>
                {a.name} ({a.energyImpact > 0 ? "+" : ""}{a.energyImpact})
              </SelectedChip>
            ))}
          </SelectedList>
        </SelectedBox>
      )}

      {showModal && (
        <ModalOverlay role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={() => setShowModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}><Battery energy={energyLeft} size="small" />
            <ModalHeader>
              <h3 id="modal-title">Välj aktiviteter</h3>
              <CloseButton aria-label="Stäng" onClick={() => setShowModal(false)}>x</CloseButton>
            </ModalHeader>

            <CategoryFilters>
              {["alla", "rörelse", "vila", "jobb", "vardag"].map(cat => (
                <FilterButton
                  key={cat}
                  $active={activeCategory == cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </FilterButton>
              ))}
            </CategoryFilters>

            <ActivitiesRow>
              <ActivitiesColumn>
                <ColumnHeader>Tar energi</ColumnHeader>
                {activities
                  .filter((a) => a.energyImpact < 0)
                  .filter(a => activeCategory === "alla" || a.category === activeCategory)
                  .map((activity) => (
                    < ActivityCard
                      key={activity._id}
                      activity={activity}
                      selected={selectedActivities.includes(activity._id)}
                      onClick={() => toggleActivity(activity._id)}
                      onDelete={onDelete}
                    />
                  ))}
              </ActivitiesColumn>

              <ActivitiesColumn>
                <ColumnHeader>Ger energi</ColumnHeader>
                {activities
                  .filter((a) => a.energyImpact > 0)
                  .filter(a => activeCategory === "alla" || a.category === activeCategory)
                  .map((activity) => (
                    <ActivityCard
                      key={activity._id}
                      activity={activity}
                      selected={selectedActivities.includes(activity._id)}
                      onClick={() => toggleActivity(activity._id)}
                      onDelete={onDelete}
                    />
                  ))}
              </ActivitiesColumn>
            </ActivitiesRow>
            {showForm && (
              <FormOverlay onClick={() => setShowForm(false)}>
                <FormPopup onClick={e => e.stopPropagation()}>
                  <ModalHeader>
                    <h3>Lägg till aktivitet</h3>
                    <CloseButton aria-label="Stäng" onClick={() => setShowForm(false)}>X</CloseButton>
                  </ModalHeader>

                  <AddForm onSubmit={handleAddActivity}>
                    <label htmlFor="activity-name">Namn</label>
                    <Input id="activity-name" type="text" name="name" placeholder="Namn" required />

                    <label htmlFor="activity-energy">Energi</label>
                    <Select id="energyImpact" name="energyImpact" required>
                      <option value="">Energi</option>
                      <option value="-3">-3</option>
                      <option value="-2">-2</option>
                      <option value="-1">-1</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Select>

                    <label htmlFor="activity-category">Kategori</label>
                    <Select id="activity-category" name="category" required>
                      <option value="kategori">Kategori</option>
                      <option value="rörelse">Rörelse</option>
                      <option value="vila">Vila</option>
                      <option value="jobb">Jobb</option>
                      <option value="vardag">Vardag</option>
                    </Select>
                    <AddButton type="submit">Lägg till aktivitet</AddButton>
                  </AddForm>
                </FormPopup>
              </FormOverlay>
            )}

            <ToggleFormButton onClick={() => setShowForm(true)}>
              + Lägg till egen aktivitet
            </ToggleFormButton>

            <DoneButton onClick={() => setShowModal(false)}>
              Klar
            </DoneButton>
          </ModalContent>
        </ModalOverlay >
      )}
      <ShowButtonWrapper>
        <NextButton onClick={onNext}>Se min dag</NextButton>
      </ShowButtonWrapper>
    </>
  );
};

// ======= STYLED COMPONENTS ======= //

const BatteryWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;

  ${props => props.$pulse && `
  animation: batteryPulse 0.4s ease-out;
  `}

  @keyframes batteryPulse {
    0 % { transform: scale(1); }
    50% {transform: scale(1.1); filter: drop-shadow(0 0  20px rgba(168, 213, 186, 0.6)); }
    100% {transform: scale(1); }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {margin: 0; }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-text);
`;

const OpenModalButton = styled.button`
  display: block;
  margin: 16px auto;
  padding: 12px 24px;
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  background: white;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

const SelectedBox = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
`;

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const SelectedChip = styled.span`
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  color: var(--color-text);
  background: ${props => props.$positive
    ? "rgba(74, 124, 89, 0.15)"
    : "var(--color-primary-light)"
  };
  border: 1px solid ${props => props.$positive
    ? "var(--color-forest)"
    : "var(--color-primary)"
  };
`;

const ActivitiesRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;

  @media (min-width: 400px) {
    flex-direction: row;
  }
`;

const ActivitiesColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ColumnHeader = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
  text-align: center;
`;

const FormOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200; 
`;

const FormPopup = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 85%;
  max-width: 360px;
`;

const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 13px;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  background: white;
`;

const AddButton = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  flex-shrink: 0;
`;

const ToggleFormButton = styled.button`
  display: block;
  margin: 16px auto 0;
  padding: 10px 20px;
  background: var(--color-primary);
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
   opacity: 0.7;
  }
`;

const DoneButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  background: white;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

const ShowButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

const NextButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 20px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

const CategoryFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterButton = styled.button`
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid ${props => props.$active ? "var(--color-primary)" : "var(--color-border)"};
  background: ${props => props.$active ? "var(--color-primary)" : "transparent"};
  color: ${props => props.$active ? "white" : "var(--color-text)"};
  font-size: 13px;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s ease;
`;