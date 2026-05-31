import { useState } from "react";

import { Link } from "react-router-dom";

import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Buttons";
import GoogleButton from "../components/GoogleButton";

import { register } from "../../../services/authService";


interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export default function RegisterForm({
  onSuccess,
  onError,
}: RegisterFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      setPasswordError("");

      // Password validation
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

      // Confirm password validation
      if (password !== confirmPassword) {
        setPasswordError("رمزهای عبور یکسان نیستند");
        return;
      }

      const data = await register(phoneNumber, password);

      console.log("REGISTER RESPONSE:", data);

      if (!data.token) {
        const message =
          data.message === "Phone number already exists"
            ? "این شماره قبلاً ثبت شده است"
            : data.message || "خطایی رخ داده است";

        onError?.(message);
        return;
      }

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

      <Input
        label="تکرار رمز عبور"
        type="password"
        placeholder="••••••••"
        passwordValidation
        value={confirmPassword}
        onChange={(e) => {
          setPasswordError("");
          setConfirmPassword(e.target.value);
        }}
      />

      {passwordError && (
        <p className="mt-2 text-sm text-red-300">{passwordError}</p>
      )}

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
