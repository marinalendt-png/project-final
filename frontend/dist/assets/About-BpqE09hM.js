import{u as i,j as r,N as t,s as o,l as e}from"./index-BFuSrCVB.js";const x=()=>{const a=i();return r.jsxs(r.Fragment,{children:[r.jsx(t,{}),r.jsx(s,{children:r.jsxs(l,{onClick:()=>a(-1),children:[r.jsx(o,{size:20})," Tillbaka"]})}),r.jsxs(d,{children:[r.jsx("h2",{children:"Om balans"}),r.jsx(n,{children:r.jsx("p",{children:"Balans är en app för dig som vill planera din dag utifrån den energi du har. Genom att välja aktiviteter och se hur de påverkar din energinivå kan du hitta en balans som fungerar för dig."})}),r.jsxs(n,{children:[r.jsx("h3",{children:"Hur funkar det?"}),r.jsx("p",{children:"1. Välj hur mycket energi du har idag (1-10)"}),r.jsx("p",{children:"2. Lägg till aktiviteter som tar eller ger energi"}),r.jsx("p",{children:"3. Se en sammanfattning av din dag"})]})]})]})},d=e.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 { 
    text-align: center; 
  }
`,n=e.div`
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
`,s=e.div`
  padding: 8px 16px;
`,l=e.button`
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
`;export{x as About};
