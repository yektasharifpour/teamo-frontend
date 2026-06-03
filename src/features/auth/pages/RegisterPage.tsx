import { useState } from "react";

import AuthHeader from "../components/AuthHeader";
import { Navigate, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import AuthCard from "../components/AuthCard";
import AuthToast from "../components/AuthToast";
import AuthBackground from "../components/AuthBackground";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showErrorToast, setShowErrorToast] = useState(false);
  if (auth.isAuthenticated && !showModal) {
    return <Navigate to="/" replace />;
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

        {/* Logo */}
        <AuthCard>
          <AuthHeader title="ثبت نام" />

          <RegisterForm
            onSuccess={() => {
              setShowModal(true);
            }}
            onError={(message) => {
              setErrorMessage(message);
              setShowErrorToast(true);
            }}
          />
        </AuthCard>

        {/* Form */}
      </div>
      {showModal && (
        <AuthToast
          type="success"
          title="ثبت‌نام موفقیت‌آمیز بود"
          message="در حال انتقال به صفحه ثبت نام"
          onClose={() => {
            setShowModal(false);
            navigate("/login");
          }}
        />
      )}
      {showErrorToast && (
        <AuthToast
          type="error"
          title="خطا"
          message={errorMessage}
          onClose={() => {
            setShowErrorToast(false);
          }}
        />
      )}
    </div>
  );
}
