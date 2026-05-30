import logo from "../../../assets/shapes/logo 1.svg";

import brand from "../../../assets/shapes/brand 1.svg";

type Props = {
  title: string;
};

export default function AuthHeader({ title }: Props) {
  return (
    <>
      {/* Logo */}
      <div
        className="
        mb-6
        flex
        items-center
        justify-center
        gap-2
        "
      >
        <img
          src={logo}
          className="    
          h-8
          w-auto
          md:h-10"
        />

        <img
          src={brand}
          className="   
          h-8
          w-auto
          md:h-10"
        />
      </div>

      <h2
        className="
        text-4xl
        md:text-[3rem]
        font-bold
        text-white
        "
      >
        {title}
      </h2>
    </>
  );
}
