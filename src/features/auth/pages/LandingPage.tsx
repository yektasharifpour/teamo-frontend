import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1f1b4b] text-white">
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Teamo</h1>

        <p className="text-white/70">مدیریت تیم و همکاری گروهی</p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/login"
            className="
              rounded-xl
              bg-pink-500
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-pink-400
            "
          >
            ورود
          </Link>

          <Link
            to="/register"
            className="
              rounded-xl
              border
              border-white/20
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-white/10
            "
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
}
