import { Link } from "react-router-dom";
import "./Nav.css";

const Navi = () => {
  return (
    <nav className="navBar">
      <ul className="navMenu">
        <li className="navItem">
          <Link to="/map">Map</Link>
        </li>
        <li className="navItem">
          <Link to="/main">Main</Link>
        </li>
        <li className="navItem">
          <Link to="/Board">Board</Link>
        </li>
      </ul>

      <div className="navProfile">
        <Link to="/mypage" className="profile-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
        </Link>

        <Link to="/" className="logout-small">
          로그아웃
        </Link>
      </div>
    </nav>
  );
};

export default Navi;
