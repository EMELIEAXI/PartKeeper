import { Link } from "react-router-dom";
import styles from "../styles/AdminPage.module.css"

export default function AdminPage() {

  return (
    <>
      <ul className={styles.adminMenu}>
        <h3>Användare</h3>
        <li><Link className={styles.linkMenu} to="/admin/create-user">Skapa ny användare ➜</Link></li>
        <li><Link className={styles.linkMenu} to="/admin/handle-user">Hantera användare ➜</Link></li>
        <h3>Produkter</h3>
        <li><Link className={styles.linkMenu} to="/admin/create-product">Skapa ny produkt ➜</Link></li>
        <li><Link className={styles.linkMenu} to="/admin/handle-product">Hantera produkter ➜</Link></li>
        <h3>Nånting mer?</h3>
        <li><Link className={styles.linkMenu} to="/admin/create-user">Skapa ny användare ➜</Link></li>
        <li><Link className={styles.linkMenu} to="/admin/create-user">Skapa ny användare ➜</Link></li>
      </ul>
    </>
  );
}