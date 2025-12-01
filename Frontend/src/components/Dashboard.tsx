import styles from "../styles/Dashboard.module.css"
import LowStockList from "./LowStockList";
import RecentChanges from "./RecentChanges";


// type DashboardProps = {
//   //Skicka props som data från API eller context (senare)
// };

export default function Dashboard() {
  return (
    <>
    <div className={styles["dashboard-wrapper"]}>
      <h1>Välkommen till PartKeeper anslagstavla</h1>

      <div className={styles.grid}>
        <LowStockList />

        <RecentChanges />
      </div>

    </div>
    </>
  );
}