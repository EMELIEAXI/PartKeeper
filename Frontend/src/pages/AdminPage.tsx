import { Link } from "react-router-dom";
import styles from "../styles/AdminPage.module.css"
import ExportToCSV from "../components/ExporttoCSV";

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
        <h3>Leverantörer</h3>
        <li><Link className={styles.linkMenu} to="/admin/handle-distributor">Lägg till och hantera leverantörer ➜</Link></li>
        <h3>Övrigt</h3>
        <li>
          <ExportToCSV filename="produkter.csv" />
        </li>
      
      </ul>
    </>
  );
}