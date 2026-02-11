import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { DailyPlan } from "./pages/DailyPlan";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/daily" element={<DailyPlan />} />
      </Routes>
    </BrowserRouter>
  );
};
