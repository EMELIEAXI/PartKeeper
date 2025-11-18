import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavMenu() {
  const { logout } = useAuth();

  return (
    <nav>
      <Link to="/home" >Hem</Link>
      <Link to="/parts" >Reservdelar</Link>
      <button onClick={logout}>Logga ut</button>
    </nav>
  );
}