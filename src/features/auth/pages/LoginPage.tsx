import { useState } from "react";
import LoginForm from "../components/LoginForm";
import AuthBackground from "../components/AuthBackground";
import AuthToast from "../components/AuthToast";
import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  if (auth.isAuthenticated) {
    if (auth.isAuthenticated && !showModal) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1f1b4b]">
      {/* Background Shapes */}
      <div className="absolute inset-0 ">
        <AuthBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        {/* Glass Card */}
        <AuthCard>
          {/* Logo */}
          <AuthHeader title="ورود" />

          {/* Form */}
          <LoginForm
            onSuccess={() => {
              setShowModal(true);
            }}
            onError={(message) => {
              setErrorMessage(message);
              setShowErrorToast(true);
            }}
          />
        </AuthCard>
      </div>
      {showModal && (
        <AuthToast
          type="success"
          title="ورود موفقیت‌آمیز بود"
          message="در حال انتقال..."
          onClose={() => {
            setShowModal(false);
            navigate("/");
          }}
        />
      )}
      {showErrorToast && (
        <AuthToast
          type="error"
          title="خطا"
          message={errorMessage}
          onClose={() => setShowErrorToast(false)}
        />
      )}
    </div>
  );
}
