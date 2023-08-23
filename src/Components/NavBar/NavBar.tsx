import { User } from "../../models/user";

type NavBarProps = {
  onLogout: () => void;
  user: User;
};

const NavBar: React.FC<NavBarProps> = ({ onLogout, user }) => {
  const userSignedIn = user.id > 0;

  return (
    userSignedIn && (
      <nav>
        <ul>
          <li>
            <a href="#" onClick={onLogout}>
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    )
  );
};

export default NavBar;
