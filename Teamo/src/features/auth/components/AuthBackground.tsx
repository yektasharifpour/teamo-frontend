import blue1 from "../../../assets/shapes/blue-wave-1.svg";
import blue2 from "../../../assets/shapes/blue-wave-2.svg";
import blue3 from "../../../assets/shapes/blue-wave-3.svg";
import blue4 from "../../../assets/shapes/blue-wave-4.svg";

import green from "../../../assets/shapes/green-wave.svg";

import red1 from "../../../assets/shapes/pink-wave-1.svg";
import red2 from "../../../assets/shapes/pink-wave-2.svg";


export default function AuthBackground() {
  return (
    <>
      {/* Red Shapes */}
      <img
        src={red1}
        className="
            absolute
            right-[10rem]
            top-[2rem]
            w-[50rem]
            opacity-90
          "
      />

      <img
        src={red2}
        className="
            absolute
            left-[0]
            bottom-[0]
            w-[40rem]
            opacity-90
          "
      />

      {/* Green Shape */}
      <img
        src={green}
        className="
            absolute
            left-[30rem]
            top-[15rem]
            w-[15rem]
            z-20
          "
      />
      <img
        src={green}
        className="
            absolute
            left-[27rem]
            top-[23rem]
            w-[10rem]
          "
      />

      {/* Blue Bottom Shapes */}
      <img
        src={blue1}
        className="
            absolute
            bottom-[10rem]
            right-[30rem]
            w-[15rem]
            z-20
          "
      />
            <img
        src={blue1}
        className="
            absolute
            bottom-[5rem]
            right-[25rem]
            w-[15rem]
          "
      />

      <img
        src={blue2}
        className="
            absolute
            bottom-[0]
            right-[0]
            w-[10rem]
          "
      />

      {/* Small Cyan */}
      <img
        src={blue3}
        className="
            absolute
            bottom-[2rem]
            left-[25rem]
            w-[25rem]
          "
      />

      <img
        src={blue4}
        className="
            absolute
            top-[0]
            left-[15rem]
            w-[40rem]
          "
      />
    </>
  );
}
