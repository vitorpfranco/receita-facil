import { NavLink } from "react-router-dom";
import style from "./style.module.scss";

const Navbar: React.FC = () => {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            Receita
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            Sobre
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/biblioteca"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            Biblioteca
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/materiais"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            Materiais
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
