// src/features/home/pages/HomePage.tsx

import { useAuth } from "../../../hooks/useAuth";
import LandingPage from "./LandingPage";
import DashboardPage from "./DashboardPage";

export default function HomePage() {
  const auth = useAuth();

  return auth.isAuthenticated ? <DashboardPage /> : <LandingPage />;
}
