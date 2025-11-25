import { useAuth } from "../context/AuthContext"
import styles from "../styles/Sidebar.module.css"
import { X } from "lucide-react"
import { Link } from "react-router-dom"

type SidebarProps = {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { logout, isAdmin } = useAuth();

  return (
    <>
    { open && <div className={styles["overlay"]} onClick={onClose}></div>}

    <aside className={open ? `${styles["sidebar"]} ${styles["show"]}` : styles["sidebar"]}>

      <button className={styles["close-btn"]} onClick={onClose}><X size={20}/></button>

      <h3>Meny</h3>
      {isAdmin && (<h5>Inloggad som administratör</h5>)}
      <Link to="/home" onClick={onClose}>Hem</Link>
      <Link to="/parts" onClick={onClose}>Reservdelar</Link>
      <Link to="/history" onClick={onClose}>Historik</Link>
      <Link to="/my-account" onClick={onClose}>Mitt konto</Link>
      
      {isAdmin && (
        <Link to="/admin/handleAccounts" onClick={onClose}>Hantera användare</Link>
        )}
      {isAdmin && (
        <Link to="/admin" className={styles["nav-link"]}>Admininställningar</Link>
        )}

      <button onClick={logout} className={styles["logout-btn"]}>Logga ut</button>
    </aside>
    </>
  );
}