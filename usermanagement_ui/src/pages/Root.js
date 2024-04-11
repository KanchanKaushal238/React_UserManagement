import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigartion";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
