type Props = {
  children: React.ReactNode;
};

export default function AuthCard({ children }: Props) {
  return (
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

      {children}
    </div>
  );
}
