import { Link, useNavigate } from "react-router-dom";
import {
  Navbar as NavbarReactstrap,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux/es/exports";
import styles from "./navbar.module.scss";
import {
  fetchCurrentUser,
  fetchMoney,
  logOut,
} from "../../Redux/slices/session";
import { toast } from "react-toastify";

function Navbar() {
  const { username, cash, id } = useSelector((state) => state.session);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getMoney() {
    await dispatch(fetchMoney()).unwrap();
    await dispatch(fetchCurrentUser()).unwrap();
    toast.success(
      `Ministry of love sent your $. This should last for 6 months!!!`,
      {
        position: "bottom-left",
      }
    );
  }

  function handleLogOut() {
    dispatch(logOut());
    toast.success(`You have successfully logged out`, {
      position: "bottom-left",
    });
    navigate("/");
  }

  return (
    <NavbarReactstrap className={styles.navbar}>
      <NavbarBrand to="/" tag={Link}>
        <img src="http://localhost:3000/brand.png" alt="brand" />
      </NavbarBrand>
      {id && (
        <Button
          color="success"
          outline
          size="lg"
          onClick={() => {
            getMoney();
          }}
        >
          <i className="far fa-money-bill-alt" />
          {` Get Your Universal Income $$$`}
        </Button>
      )}
      <Nav>
        <NavItem className={styles.navitem}>
          <NavLink to="/login" tag={Link}>
            <i className="fas fa-user-alt" style={{ fontSize: "36px" }} />
          </NavLink>
          {username && ` ${username}`}
          <br></br>
          {(cash === 0 || cash) && `${cash} €`}
        </NavItem>
        &nbsp; &nbsp;
        {id && (
          <Button
            color="success"
            outline
            size="md"
            onClick={() => {
              handleLogOut();
            }}
          >
            <i className="fas fa-door-open" />
            {` Log Out`}
          </Button>
        )}
      </Nav>
    </NavbarReactstrap>
  );
}

export default Navbar;
