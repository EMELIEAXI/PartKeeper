import { Link } from "react-router-dom";
import styles from '../styles/NavMenu.module.css'
import { Home, Wrench, History, Settings, Menu } from "lucide-react"
import { useAuth } from "../context/AuthContext";

type NavMenuProps = {
  onOpenSidebar: () => void;
}

export default function NavMenu({ onOpenSidebar }: NavMenuProps) {
  const { isAdmin } = useAuth();

  return (
    <>
    <nav className={styles["nav-wrapper"]}>
      <Link to="/home" className={styles["nav-link"]}><Home size={24}/>Home</Link>
      <Link to="/parts" className={styles["nav-link"]}><Wrench size={24}/>Reservdelar</Link>
      <Link to="/history" className={styles["nav-link"]}><History size={24}/>Historik</Link>
      {isAdmin && (
        <Link to="/admin" className={styles["nav-link"]}><Settings size={24}/>Admin</Link>
      )}
      <button onClick={onOpenSidebar}><Menu size={28} /></button>
    </nav>
    </>
  );
}