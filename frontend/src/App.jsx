import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react"; //för att få bättre prestande i Lighthouse, koden laddas bara när anv navigerar dit. 
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { DailyPlan } from "./pages/DailyPlan";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GlobalStyles } from "./styles/GlobalStyle";
import { Tips } from "./pages/Tips";


const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const History = lazy(() => import("./pages/History").then(m => ({ default: m.History })));

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <main>
        <Suspense fallback={<div>Laddar...</div>}>
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
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter >
  );
};
