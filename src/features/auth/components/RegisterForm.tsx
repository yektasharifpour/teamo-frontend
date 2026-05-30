import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Input from "../../../components/UI/Input";

import Button from "../../../components/UI/Buttons";

import GoogleButton from "../components/GoogleButton";

import { register } from "../../../services/authService";

import { useAuth } from "../../../hooks/useAuth";

export default function RegisterForm() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const auth = useAuth();

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      setError("");

      // Password validation
      if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[@#!\-]/.test(password) ||
        /[^A-Za-z0-9@#!\-]/.test(password)
      ) {
        return;
      }

      // Confirm password validation
      if (password !== confirmPassword) {
        setError("رمزهای عبور یکسان نیستند");

        return;
      }

      const data = await register(phoneNumber, password);

      if (!data.success && !data.token) {
        auth.logout();

        if (data.message === "Phone number already exists") {
          setError("این شماره قبلاً ثبت شده است");
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

      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}

      <Button onClick={handleRegister}>
        {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
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
          ورود
        </Link>
      </div>
    </div>
  );
}
