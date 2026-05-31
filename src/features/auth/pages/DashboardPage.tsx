import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function DashboardPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#1f1b4b] text-white flex flex-col items-center justify-center gap-4">
      <h1>Dashboard</h1>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-500 px-4 py-2"
      >
        خروج از حساب
      </button>
    </div>
  );
}
