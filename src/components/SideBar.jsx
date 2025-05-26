import ThemesToggle from "./ThemesToggle";
import { Button } from "./ui/button";

function SideBar() {
  return (
    <div className="bg-[#373B53] flex items-center justify-between md:flex-col md:h-full md:fixed mf:left-0 md:top-0 md:bottom-0  md:z-999 rounded-tr-2xl">
      <img src="../images/sidebar_logo.svg" alt="images of person logo" />
      <div className="mr-5 md:mr-0 md:mb-5 ">
        <ThemesToggle />
      </div>
    </div>
  );
}

export default SideBar;
