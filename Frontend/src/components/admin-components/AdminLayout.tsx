import { Outlet, useNavigate } from "react-router-dom";
import styles from "../../styles/AdminPage.module.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className={styles.adminContainer}>
      <h1>Admin</h1>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>tillbaka</button>

      {/* Här renderas undersidorna */}
      <Outlet />
    </div>
  );
}
