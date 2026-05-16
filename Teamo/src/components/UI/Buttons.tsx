type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-pink-600
          to-pink-500
          py-4
          text-lg
          font-bold
          text-white
          shadow-[0_0_30px_rgba(255,0,110,0.35)]
          transition-all
          hover:scale-[1.02]
          hover:shadow-[0_0_40px_rgba(255,0,110,0.55)]
          active:scale-[0.98]
          
        "
    >
      {children}
    </button>
  );
}
