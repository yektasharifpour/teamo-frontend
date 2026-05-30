import red1 from "../../../assets/shapes/pink-wave-1.svg";
import red2 from "../../../assets/shapes/pink-wave-2.svg";
import blue2 from "../../../assets/shapes/blue-wave-2.svg";
import blue4 from "../../../assets/shapes/blue-wave-4.svg";

export default function MobileBackgroundShapes() {
  return (
    <>
      {/* red1 */}
          <img
        src={red1}
        className="
        absolute

        right-[-30%]
        top-[4%]

        w-[85%]
        md:w-[50%]
        md:right-[5%]
        lg:w-[40%]
        lg:right-[5%]

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
      {/* blue4 */}
          <img
        src={blue4}
        className="
        absolute

        right-[30%]
        top-0

        w-[85%]
        md:w-[50%]
        md:right-[5%]
        lg:w-[40%]
        lg:right-[5%]

        opacity-90
        pointer-events-none
          "
      />
    </>
  );
}