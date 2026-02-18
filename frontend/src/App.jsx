import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { DailyPlan } from "./pages/DailyPlan";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GlobalStyles } from "./styles/GlobalStyle";
import { About } from "./pages/About";
import { Tips } from "./pages/Tips";

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tips"
          element={
            <ProtectedRoute>
              <Tips />
            </ProtectedRoute>
          }
        />
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
