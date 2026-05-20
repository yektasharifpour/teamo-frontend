import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import AuthBackground from "../components/AuthBackground";
import GoogleButton from "../components/GoogleButton";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Buttons";
import logo from "../../../assets/shapes/logo 1.svg";
import brand from "../../../assets/shapes/brand 1.svg";
import { X } from "lucide-react";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const [passwordError, setPasswordError] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const handleRegister = async () => {
    try {
      setError("");
      console.log({
        password,
        confirmPassword,
      });
      if (password !== confirmPassword) {
        setError("رمزهای عبور یکسان نیستند");

        return;
      }

      setIsLoading(true);

      const data = await register(phoneNumber, password);

      if (!data.token) {
        if (data.message === "Phone number already exists") {
          setError("این شماره قبلاً ثبت شده است");
        } else {
          setError("خطایی رخ داده است");
        }

        return;
      }

      auth.login(data.token, data.user);

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);

        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);

      setError("خطایی رخ داده است");
    } finally {
      setIsLoading(false);
    }
  };
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
          <div className="flex flex-row items-center  justify-center px-[12rem] mb-[2rem]  mt-[-1rem]">
            <img src={logo} className="w-[5rem]" />
            <img src={brand} className="w-[5rem]" />
          </div>
          <h2
            className="
              
              text-[3rem]
              font-bold
              text-white
              "
          >
            ثبت نام
          </h2>

          {/* Form */}
          <div className="mt-3 space-y-1">
            <Input
              label="شماره همراه"
              placeholder="09123456789"
              numeric
              value={phoneNumber}
              onChange={(e) => {
                setError("");

                setPhoneNumber(e.target.value);
              }}
            />
            <Input
              label="رمز عبور"
              type="password"
              placeholder="••••••••"
              passwordValidation
              value={password}
              onChange={(e) => {
                setError("");

                setPassword(e.target.value);
              }}
            />
            <Input
              label="تکرار رمز عبور"
              type="password"
              placeholder="••••••••"
              passwordValidation
              value={confirmPassword}
              onChange={(e) => {
                setError("");

                setConfirmPassword(e.target.value);
              }}
            />
            {error && (
              <p
                className="
                mt-2
      
                text-sm
                text-red-300
                "
              >
                {error}
              </p>
            )}
            <Button onClick={handleRegister}>
              {isLoading ? "در حال ثبت‌نام..." : "ثبت نام"}
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm">
              <span className="text-white/60">حساب کاربری دارید؟</span>

              <Link
                to="/login"
                className="
                font-medium
                text-pink-300
                transition
                hover:text-pink-200
                "
              >
                ورود به حساب
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="
    fixed
    right-6
    top-6
    z-50
    w-[360px]
    overflow-hidden
    rounded-3xl
    border
    border-green-400/20
    bg-[#1d3b2c]
    text-white
    shadow-[0_0_40px_rgba(74,222,128,0.25)]
    backdrop-blur-xl
    animate-[slideIn_.4s_ease]
  "
        >
          {/* Content */}
          <div className="flex items-start justify-between px-5 py-4">
            <div>
              <h2
                className="
          text-lg
          font-bold
          text-green-300
        "
              >
                ورود موفقیت‌آمیز بود
              </h2>

              <p className="mt-1 text-sm text-white/70">در حال انتقال...</p>
            </div>

            <button
              onClick={closeModal}
              className="
        text-white/50
        transition
        hover:text-white
      "
            >
              <X size={20} />
            </button>
          </div>

          {/* Time Bar */}
          <div
            className="
      h-1
      w-full
      origin-left
      bg-green-400
      animate-[timer_4s_linear]
    "
          />
        </div>
      )}
      {showErrorToast && (
        <div
          className="
    fixed
    right-6
    top-6
    z-50
    w-[360px]
    overflow-hidden
    rounded-3xl
    border
    border-red-400/20
    bg-[#3b1d1d]
    text-white
    shadow-[0_0_40px_rgba(248,113,113,0.25)]
    backdrop-blur-xl
    animate-[slideIn_.4s_ease]
  "
        >
          {/* Content */}
          <div className="flex items-start justify-between px-5 py-4">
            <div>
              <h2
                className="
          text-lg
          font-bold
          text-red-300
        "
              >
                خطا
              </h2>

              <p className="mt-1 text-sm text-white/70">
                لطفاً تمام فیلدها را پر کنید
              </p>
            </div>

            <button
              onClick={() => setShowErrorToast(false)}
              className="
        text-white/50
        transition
        hover:text-white
      "
            >
              <X size={20} />
            </button>
          </div>

          {/* Time Bar */}
          <div
            className="
      h-1
      w-full
      bg-red-400
      animate-[timer_4s_linear]
    "
          />
        </div>
      )}
    </div>
  );
}
