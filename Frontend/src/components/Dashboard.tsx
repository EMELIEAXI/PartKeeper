import styles from "../styles/Dashboard.module.css";
import LowStockList from "./LowStockList";
import RecentChanges from "./RecentChanges";
import StatsPanel from "./StatsPanel";

export default function Dashboard() {
  return (
    <div className={styles["dashboard-wrapper"]}>
      <h1>Välkommen till PartKeeper</h1>

      <div className={styles.grid}>
        <StatsPanel />
        <LowStockList />
        <RecentChanges />
      </div>
    </div>
  );
}
