import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { DailyPlan } from "./pages/DailyPlan";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/daily"
          element={
            <ProtectedRoute>
              <DailyPlan />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
