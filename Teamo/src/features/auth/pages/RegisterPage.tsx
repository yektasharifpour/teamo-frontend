import { useState } from "react";

import AuthHeader from "../components/AuthHeader";

import RegisterForm from "../components/RegisterForm";

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
        <div
          className="
            relative
            z-10
            w-full
            max-w-[45rem]
            min-h-[46rem]
            rounded-[40px]
            border
            border-white/20
            bg-white/3
            px-20
            py-15
            backdrop-blur-[15px]
            shadow-[0_0_80px_rgba(255,255,255,0.08)]
            
          "
        >
          {/* Border Glow */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[40px]
              border
              border-white/10
            "
          />

          {/* Logo */}
          <AuthHeader title="ثبت نام" />

          <RegisterForm />
          {/* Form */}
        </div>
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
