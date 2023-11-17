import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mt-1 m-14 flex flex-col gap-2 items-center justify-center">
      <Outlet />
    </div>
  );
};

export default Layout;
