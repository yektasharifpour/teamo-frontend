import { useState } from "react";
import { Link } from "react-router-dom";

import GoogleButton from "../components/GoogleButton";

import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Buttons";

import { login } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const auth = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setPasswordError("");

      if (password.length < 8) {
        setPasswordError("رمز عبور باید حداقل ۸ کاراکتر باشد");
        return;
      }

      if (!/[A-Z]/.test(password)) {
        setPasswordError("رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد");
        return;
      }

      if (!/\d/.test(password)) {
        setPasswordError("رمز عبور باید حداقل یک عدد داشته باشد");
        return;
      }

      if (!/[@#!\-]/.test(password)) {
        setPasswordError(
          "رمز عبور باید حداقل یکی از کاراکترهای @ # ! - را داشته باشد",
        );
        return;
      }

      if (/[^A-Za-z0-9@#!\-]/.test(password)) {
        setPasswordError("رمز عبور شامل کاراکترهای غیرمجاز است");
        return;
      }

      const data = await login(phoneNumber, password);

      console.log("LOGIN RESPONSE:", data);

      if (!data.token) {
        const message =
          data.message === "Invalid phone or password"
            ? "نام کاربری یا رمز عبور نادرست است"
            : data.message || "خطایی رخ داده است";

        onError?.(message);
        return;
      }

      auth.login(data.token, data.user);
      onSuccess?.();
    } catch (error) {
      console.error(error);

      onError?.("خطایی رخ داده است");
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
          setPasswordError("");
          setPassword(e.target.value);
        }}
      />

      {passwordError && (
        <p className="mt-2 text-sm text-red-300">{passwordError}</p>
      )}

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
