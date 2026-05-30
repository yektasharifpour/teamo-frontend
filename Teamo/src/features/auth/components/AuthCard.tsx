import green from "../../../assets/shapes/green-wave.svg";
import blue1 from "../../../assets/shapes/blue-wave-1.svg";
import AuthCardShapes from "./AuthCardShapes";

type Props = {
  children: React.ReactNode;
};

export default function AuthCard({ children }: Props) {
  return (
    <div
      className="
        relative
        z-30
        w-[88%]
        sm:w-[82%]
        md:w-[78%]
        lg:w-[70%]
        xl:w-[45rem]
        
        max-w-[45rem]

        rounded-[32px]
        md:rounded-[40px]

        border
        border-white/20
        bg-white/3

        px-5
        py-7

        sm:px-6
        sm:py-8

        md:px-20
        md:py-15
        
      
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
      {/*Green and blue shapes */}
     <AuthCardShapes />
      {children}
    </div>
  );
}
