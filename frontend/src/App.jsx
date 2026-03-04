import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { DailyPlan } from "./pages/DailyPlan";
import { About } from "./pages/About";
import { History } from "./pages/History";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GlobalStyles } from "./styles/GlobalStyle";
import { Tips } from "./pages/Tips";

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

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
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
