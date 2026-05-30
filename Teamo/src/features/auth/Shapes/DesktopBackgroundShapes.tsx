import red1 from "../../../assets/shapes/pink-wave-1.svg";
import red2 from "../../../assets/shapes/pink-wave-2.svg";
import blue2 from "../../../assets/shapes/blue-wave-2.svg";
import blue3 from "../../../assets/shapes/blue-wave-3.svg";
import blue4 from "../../../assets/shapes/blue-wave-4.svg";

export default function DesktopBackgroundShapes() {
  return (
    <>
      {/* red1 */}
      <img
        src={red1}
        className="
        absolute

        right-[-30%]
        top-0

        w-[85%]
        md:w-[50%]
        md:right-[5%]
        lg:w-[40%]
        lg:right-[10%]

        opacity-90
        pointer-events-none
        
          "
      />

      {/* red2 */}
      <img
        src={red2}
        className="
            absolute
            left-[0]
            bottom-[0]
            w-[40%]
            opacity-90
          "
      />

      {/* blue2 */}
      <img
        src={blue2}
        className="
            absolute
            right-[0]
            bottom-[0]
            w-[10%]
            opacity-90
          "
      />

      {/* blue3 */}
      <img
        src={blue3}
        className="
        absolute

        left-[20%]
        bottom-[5%]

        w-[30%]
        md:w-[26%]
        md:left-[2%]
        lg:w-[22%]
        lg:left-[20%]

        z-0
        pointer-events-none
          "
      />

      {/* blue4 */}
      <img
        src={blue4}
        className="
         absolute

        left-[-10%]
        top-0

        w-[60%]
        md:w-[50%]
        
        lg:w-[40%]
        lg:left-[10%]
        

        opacity-90
        pointer-events-none
          "
      />
    </>
  );
}
