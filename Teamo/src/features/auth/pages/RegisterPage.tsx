import { useState } from "react";

import AuthHeader from "../components/AuthHeader";

import RegisterForm from "../components/RegisterForm";
import AuthCard from "../components/AuthCard";
import AuthToast from "../components/AuthToast";
import AuthBackground from "../components/AuthBackground";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const [showErrorToast, setShowErrorToast] = useState(false);

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

          <RegisterForm />
        </AuthCard>

        {/* Form */}
      </div>
      {showModal && (
        <AuthToast
          type="success"
          title="ثبت نام موفقیت‌آمیز بود"
          message="در حال انتقال..."
          onClose={closeModal}
        />
      )}
      {showErrorToast && (
        <AuthToast
          type="error"
          title="خطا"
          message="لطفاً تمام فیلدها را پر کنید"
          onClose={() => setShowErrorToast(false)}
        />
      )}
    </div>
  );
}
