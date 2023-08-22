import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/navbar";
import { getSession } from "../services/token-repository";

const Layout: React.FC = () => {
  const { user } = getSession();

  const onLogout = () => {
    console.log("Logout");
  };

  return (
    <>
      <header>
        <span>KvnBurger</span>
        <NavBar user={user} onLogout={onLogout} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Laboratoria - Created by Kvn</footer>
    </>
  );
};

export default Layout;
