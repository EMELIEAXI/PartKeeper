import { Link } from "react-router-dom";
import styles from '../styles/NavMenu.module.css'
import { Home, Wrench, History, Menu } from "lucide-react"

type NavMenuProps = {
  onOpenSidebar: () => void;
}

export default function NavMenu({ onOpenSidebar }: NavMenuProps) {

  return (
    <>
    <nav className={styles["nav-wrapper"]}>
      <Link to="/home" className={styles["nav-link"]}><Home size={24}/>Hem</Link>
      <Link to="/parts" className={styles["nav-link"]}><Wrench size={24}/>Reservdelar</Link>
      <Link to="/history" className={styles["nav-link"]}><History size={24}/>Historik</Link>
      <button onClick={onOpenSidebar}><Menu size={28} /></button>
    </nav>
    </>
  );
}