import { X } from "lucide-react";

type Props = {
  title: string;

  message: string;

  type: "success" | "error";

  onClose: () => void;
};

export default function AuthToast({ title, message, type, onClose }: Props) {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        fixed
        right-6
        top-6
        z-50
        w-[360px]
        overflow-hidden
        rounded-3xl
        border
        text-white
        backdrop-blur-xl
        animate-[slideIn_.4s_ease]

        ${
          isSuccess
            ? `
              border-green-400/20
              bg-[#1d3b2c]
              shadow-[0_0_40px_rgba(74,222,128,0.25)]
            `
            : `
              border-red-400/20
              bg-[#3b1d1d]
              shadow-[0_0_40px_rgba(248,113,113,0.25)]
            `
        }
      `}
    >
      {/* Content */}
      <div
        className="
          flex
          items-start
          justify-between
          px-5
          py-4
        "
      >
        <div>
          <h2
            className={`
              text-lg
              font-bold

              ${isSuccess ? "text-green-300" : "text-red-300"}
            `}
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-white/70
            "
          >
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            text-white/50
            transition
            hover:text-white
          "
        >
          <X size={20} />
        </button>
      </div>

      {/* Timer Bar */}
      <div
        className={`
          h-1
          w-full
          animate-[timer_4s_linear]

          ${isSuccess ? "bg-green-400" : "bg-red-400"}
        `}
      />
    </div>
  );
}
