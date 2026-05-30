import DesktopBackgroundShapes from "../Shapes/DesktopBackgroundShapes";
import MobileBackgroundShapes from "../Shapes/MobileBackgroundShapes";

export default function AuthBackground() {
  return (
    <>
      <div className="block sm:hidden">
        <MobileBackgroundShapes />
      </div>

      <div className="hidden sm:block">
        <DesktopBackgroundShapes />
      </div>
    </>
  );
}