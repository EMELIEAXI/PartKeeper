import styles from "../styles/Dashboard.module.css";
import LowStockList from "./LowStockList";
import RecentChanges from "./RecentChanges";
import StatsPanel from "./StatsPanel";
import { useAuth } from "../context/AuthContext";



export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className={styles["dashboard-wrapper"]}>
      <h1>Välkommen till PartKeeper</h1>
      {isAuthenticated ? ( 
        <>
      <h2> {user?.firstName} {user?.lastName}</h2>
      </> ) : 
      (<h2>Gäst</h2>)}

      <div className={styles.grid}>
        <StatsPanel />
        <LowStockList />
        <RecentChanges />
      </div>
    </div>
  );
}
