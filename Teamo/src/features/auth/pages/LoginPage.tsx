import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthBackground from "../components/AuthBackground";
import GoogleButton from "../components/GoogleButton";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Buttons";
import logo from "../../../assets/shapes/logo 1.svg";
import brand from "../../../assets/shapes/brand 1.svg";
import { login } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import { X } from "lucide-react";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const [showErrorToast, setShowErrorToast] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      setIsLoading(true);

      setError("");
      if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[@#!\-]/.test(password) ||
        /[^A-Za-z0-9@#!\-]/.test(password)
      ) {
        return;
      }
      const data = await login(phoneNumber, password);

      if (!data.success && !data.token) {
        auth.logout();

        if (data.message === "Invalid phone or password") {
          setError("نام کاربری یا رمز عبور نادرست است");
        } else {
          setError("خطایی رخ داده است");
        }

        return;
      }
      auth.login(data.token, data.user);

      navigate("/");
    } catch (error) {
      console.error(error);

      setError("Something went wrong");
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
            ورود
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
            {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
            <div className="flex justify-start">
              <Link
                to="/forgot-password"
                className="
                 text-sm
                  text-white/100
                 transition
                 hover:text-pink-300
                 "
              >
                رمز خود را فراموش کرده‌اید؟
              </Link>
            </div>

            <Button onClick={handleLogin}>
              {isLoading ? "در حال ورود..." : "ورود"}
            </Button>

            <div className="pt-2">
              <GoogleButton />
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm">
              <span className="text-white/60">حساب کاربری ندارید؟</span>

              <Link
                to="/register"
                className="
                font-medium
                text-pink-300
                transition
                hover:text-pink-200
                "
              >
                ساخت حساب
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
