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
          mb-[2rem]
          mt-[-1rem]
          flex
          flex-row
          items-center
          justify-center
          px-[12rem]
        "
      >
        <img src={logo} className="w-[5rem]" />

        <img src={brand} className="w-[5rem]" />
      </div>

      <h2
        className="
          text-[3rem]
          font-bold
          text-white
        "
      >
        {title}
      </h2>
    </>
  );
}
