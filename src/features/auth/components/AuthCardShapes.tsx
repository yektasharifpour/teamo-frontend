import green from "../../../assets/shapes/green-wave.svg";
import blue1 from "../../../assets/shapes/blue-wave-1.svg";
import red1 from "../../../assets/shapes/pink-wave-1.svg";
import Shape from "../Shapes/Shape";

export default function AuthCardShapes() {
  return (
    <>
      {/* Green mobile */}
      <Shape
        src={green}
        className="
          block sm:hidden
          left-[10px]
          top-[-20px]
          w-[70px]
          z-30
        "
      />

      <Shape
        src={green}
        className="
          block sm:hidden
          left-[-15px]
          top-[20px]
          w-[55px]
          z-20
        "
      />

      {/* Green desktop */}
      <Shape
        src={green}
        className="
          hidden sm:block
          -left-[15%]
          top-[8%]
          w-[30%]
          z-30
        "
      />

      <Shape
        src={green}
        className="
          hidden sm:block
          -left-[16%]
          top-[26%]
          w-[17%]
          z-20
        "
      />

      {/* Blue mobile */}
      <Shape
        src={blue1}
        className="
          block sm:hidden
          right-[-5%]
          bottom-[4%]
          w-[70px]
          z-30
        "
      />

      <Shape
        src={blue1}
        className="
          block sm:hidden
          right-[-10%]
          bottom-[-1%]
          w-[55px]
          z-20
        "
      />

      {/* Blue desktop */}
      <Shape
        src={blue1}
        className="
          hidden sm:block
          -right-[15%]
          bottom-[3%]
          w-[30%]
          z-30
        "
      />

      <Shape
        src={blue1}
        className="
          hidden sm:block
          -right-[16%]
          -bottom-[2%]
          w-[17%]
          z-20
        "
      />
    </>
  );
}