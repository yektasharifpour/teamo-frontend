import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  numeric?: boolean;
  passwordValidation?: boolean;
  error?: string;
  value?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  numeric = false,
  passwordValidation = false,
  error = "",
  value,
  onChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const [internalError, setInternalError] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label
        className="
          text-[18px]
          font-medium
          text-white/80
        "
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          inputMode={numeric ? "numeric" : undefined}
          pattern={numeric ? "[0-9]*" : undefined}
          value={value}
          onChange={onChange}
          onInput={(e) => {
            const value = e.currentTarget.value;

            // Numeric Validation
            if (numeric) {
              if (/[^0-9]/.test(value)) {
                setInternalError("فقط عدد مجاز است");
              } else if (value.length === 11 && !value.startsWith("0")) {
                setInternalError("شماره همراه نامعتبر است");
              } else {
                setInternalError("");
              }

              e.currentTarget.value = value.replace(/\D/g, "");
            }

            // Password Validation
            if (passwordValidation) {
              // فقط کاراکترهای مجاز
              if (/[^A-Za-z0-9@#!\-]/.test(value)) {
                setInternalError(
                  "رمز عبور باید فقط شامل حروف انگلیسی، اعداد و @#!- باشد",
                );
              }

              // حداقل ۸ کاراکتر
              else if (value.length < 8) {
                setInternalError("رمز عبور باید حداقل ۸ کاراکتر باشد");
              }

              // حداقل یک حرف بزرگ
              else if (!/[A-Z]/.test(value)) {
                setInternalError("رمز عبور باید حداقل یک حرف بزرگ داشته باشد");
              }

              // حداقل یک کاراکتر خاص
              else if (!/[@#!\-]/.test(value)) {
                setInternalError("رمز عبور باید شامل یکی از @#!- باشد");
              } else {
                setInternalError("");
              }
            }
          }}
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/8
            px-5
            py-4
            text-white
            outline-none
            backdrop-blur-md
            placeholder:text-white/30
            focus:border-pink-400
            focus:ring-2
            focus:ring-pink-400/30
            transition-all
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="
              absolute
              left-4
              top-[50%]
              h-[56px]
              -translate-y-1/2
              text-white/50
              transition
              hover:text-white
            "
          >
            {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
          </button>
        )}
      </div>
      {(internalError || error) && (
        <span
          className="
      mt-2
      text-sm
      text-red-300
    "
        >
          {internalError ? internalError : error}
        </span>
      )}
    </div>
  );
}
