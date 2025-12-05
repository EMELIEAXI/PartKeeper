import styles from "../styles/Dashboard.module.css";
import "../global.css";
import LowStockList from "./LowStockList";
import RecentChanges from "./RecentChanges";
import StatsPanel from "./StatsPanel";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="PartKeeper logotyp" className={styles.logoImage} />
      </div>

      <div className={styles.wrapper}>
        <h1>Välkommen</h1>
        {isAuthenticated ? (
          <h2>{user?.firstName} {user?.lastName}</h2>
        ) : (
          <h2>Gäst</h2>
        )}

        <div className={styles.grid}>
          <div className={styles.stats}>
            <StatsPanel />
          </div>

          <div className={styles.low}>
            <LowStockList />
          </div>

          <div className={styles.recent}>
            <RecentChanges />
          </div>
        </div>
      </div>
    </div>
  );
}
