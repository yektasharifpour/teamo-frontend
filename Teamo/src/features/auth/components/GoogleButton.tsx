export default function GoogleButton() {
  return (
    <button
      className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/90
          py-4
          text-black
          backdrop-blur-md
          transition-all
          hover:bg-white
        "
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
        alt="google"
        className="h-5 w-5"
      />

      <span className="font-medium">ورود با گوگل</span>
    </button>
  );
}
