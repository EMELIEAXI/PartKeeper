import { useAuth } from "../context/AuthContext"
import styles from "../styles/Sidebar.module.css"
import { X } from "lucide-react"
import { Link } from "react-router-dom"

type SidebarProps = {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { logout, user, isAdmin } = useAuth();

  const fullName = user
  ? `${user.firstName} ${user.lastName}${isAdmin ? " - Admin" :""}`
  : "";

  return (
    <>
    { open && <div className={styles["overlay"]} onClick={onClose}></div>}

    <aside className={open ? `${styles["sidebar"]} ${styles["show"]}` : styles["sidebar"]}>

      <button className={styles["close-btn"]} onClick={onClose}><X size={20}/></button>

      <h3>Meny</h3>
      {user && <h4 className={styles.userName}>{fullName}</h4>}
      <Link to="/home" onClick={onClose}>Hem</Link>
      <Link to="/parts" onClick={onClose}>Reservdelar</Link>
      <Link to="/history" onClick={onClose}>Historik</Link>
      
      {isAdmin && (
        <Link to="/admin/handle-user" onClick={onClose}>Hantera användare</Link>
        )}
      {isAdmin && (
        <Link to="/admin" onClick={onClose}>Admininställningar</Link>
        )}

      <button onClick={logout} className={styles["logout-btn"]}>Logga ut</button>
    </aside>
    </>
  );
}