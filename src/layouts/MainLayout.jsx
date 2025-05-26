import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function MainLayout() {
  return (
    <>
      <SideBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
