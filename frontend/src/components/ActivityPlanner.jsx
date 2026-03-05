import styled, { keyframes, css } from "styled-components";
import { ActivityCard, activityIcon } from "./ActivityCard";
import { Acorn } from "@phosphor-icons/react";
import { Battery } from "./BatteryComponent";
import { useState, useRef, useEffect } from "react";

// This is where you plan your day.
export const ActivityPlanner = ({ activities, selectedActivities, energyLeft, batteryPulse, toggleActivity, showForm, setShowForm, handleAddActivity, onNext, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("alla");
  const nameInputRef = useRef(null);

  // New hook. useRef creates a reference to the namefield in the form. useEffect runs when showForm is changed. Focus will automatically move to the namefield so the user ca write in the field without clicking in it. 
  useEffect(() => {
    if (showForm) nameInputRef.current?.focus();
  }, [showForm]);

  return (
    <>
      <PlannerTitle>Planera din dag</PlannerTitle>

      <BatteryWrapper $pulse={batteryPulse}>
        <Battery energy={energyLeft} />
      </BatteryWrapper>

      <EnergyLabel>
        Du har {energyLeft} energi kvar idag
      </EnergyLabel>


      <OpenModalButton onClick={() => setShowModal(true)}>
        Välj aktiviteter
      </OpenModalButton>

      {selectedActivities.length > 0 && (
        <SelectedBox>
          <SelectedCount>
            {selectedActivities.length} {selectedActivities.length === 1 ? "aktivitet vald" : "aktiviteter valda"}
          </SelectedCount>
          <SelectedList>
            {activities.filter(a => selectedActivities.includes(a._id))
              .sort((a, b) => b.energyImpact - a.energyImpact)
              .map(a => {
                const Icon = activityIcon[a.name] || Acorn;
                return (
                  <SelectedChip key={a._id} $positive={a.energyImpact > 0}>
                    <Icon size={13} aria-hidden="true" />
                    {a.name}
                  </SelectedChip>
                );
              })}
          </SelectedList>
        </SelectedBox>
      )}

      {/* This is the popup window where the user can choose activities */}
      {showModal && (
        <ModalOverlay
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          onClick={() => setShowModal(false)}
          onKeyDown={(e) => { if (e.key === "Escape") setShowModal(false); }}
        >
          {/* Small batterycomponent is shown inside of the popup */}
          <ModalContent onClick={e => e.stopPropagation()}><Battery energy={energyLeft} size="small" />
            <ModalHeader>
              <h3 id="modal-title">Välj aktiviteter</h3>
              <CloseButton aria-label="Stäng" onClick={() => setShowModal(false)}>X</CloseButton>
            </ModalHeader>

            {/* Filter activities by different categories depending on category */}
            <CategoryFilters>
              {["alla", "rörelse", "vila", "jobb", "vardag"].map(cat => (
                <FilterButton
                  key={cat}
                  $active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </FilterButton>
              ))}
            </CategoryFilters>

            {/* Activities that gives energy, green ones */}
            <ActivitiesRow>
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

              {/* Activities that takes energy, red ones */}
              <ActivitiesColumn>
                <ColumnHeader>Tar energi</ColumnHeader>
                {activities
                  .filter((a) => a.energyImpact < 0)
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

            {/* This is the popup inside of the modal, where the user can create their own activity */}
            {showForm && (
              <FormOverlay onClick={() => setShowForm(false)}>
                <FormPopup onClick={e => e.stopPropagation()}>
                  <ModalHeader>
                    <h3>Lägg till aktivitet</h3>
                    <CloseButton aria-label="Stäng" onClick={() => setShowForm(false)}>X</CloseButton>
                  </ModalHeader>

                  <AddForm onSubmit={handleAddActivity}>
                    <label htmlFor="activity-name">Namn</label>
                    <Input id="activity-name" type="text" name="name" placeholder="Namn" required ref={nameInput} />

                    <label htmlFor="activity-energy">Energi</label>
                    <Select id="activity-energy" name="energyImpact" required>
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

// ======= KEYFRAMES ======= //

const batteryPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(168, 213, 186, 0.6)); }
  100% { transform: scale(1); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const chipIn = keyframes`
  from { opacity: 0; transform: translateY(6px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

// ======= STYLED COMPONENTS ======= //

const PlannerTitle = styled.h2`
  text-align: center;
`;

const BatteryWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
  ${props => props.$pulse && css`animation: ${batteryPulse} 0.4s ease-out;`}
`;

const EnergyLabel = styled.p`
  text-align: center;
  width: fit-content;
  background: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  border-radius: 20px;
  padding: 4px 16px;
  font-size: 15px;
  font-weight: 600;
  margin: 0 auto;
  color: var(--color-text);
`;

const OpenModalButton = styled.button`
  display: block;
  width: 100%;
  margin: 16px 0;
  padding: 12px 24px;
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

const SelectedBox = styled.div`
  background: var(--color-glass-card);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  animation: ${fadeUp} 0.3s ease-out;
`;

const SelectedCount = styled.p`
  margin: 0 0 10px 0;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  opacity: 0.6;
`;

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const SelectedChip = styled.span`
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--color-text);
  box-shadow: ${props => props.$positive
    ? "0 2px 8px rgba(74, 124, 89, 0.3)"
    : "0 2px 8px rgba(196, 122, 122, 0.3)"
  };
  background: ${props => props.$positive
    ? "var(--color-forest-subtle)"
    : "var(--color-error-light)"
  };
  border: 1px solid ${props => props.$positive
    ? "var(--color-forest)"
    : "var(--color-error-dark)"
  };

  animation: ${chipIn} 0.25s ease-out;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
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
  background: var(--color-overlay);
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
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px;
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
  font-size: 16px;

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
`;

const ShowButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

const NextButton = styled.button`
  padding: 12px 24px;
  width: 100%;
  border: none;
  border-radius: 20px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  font-size: 16px;
  `;

