import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import GoogleButton from "../components/GoogleButton";

import Input from "../../../components/UI/Input";

import Button from "../../../components/UI/Buttons";

import { login } from "../../../services/authService";

import { useAuth } from "../../../hooks/useAuth";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const auth = useAuth();

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

      <div
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-2
          text-sm
        "
      >
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
  );
}
