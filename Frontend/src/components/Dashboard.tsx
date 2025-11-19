import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css"

// type DashboardProps = {
//   //Skicka props som data från API eller context (senare)
// };

export default function Dashboard() {
  return (
    <>
    <div className={styles["dashboard-wrapper"]}>
      <h1>Välkommen till PartKeeper anslagstavla</h1>
        <section className={styles["dashboard-section"]}>
          <h3>Varning</h3>
            <h4>Produkter med lågt lagersaldo</h4>
              <ul>
                <Link to="{./produkt.id}" className={styles["dash-link"]}>Produkt</Link>
                <Link to="{./product.id}" className={styles["dash-link"]}>Produkt</Link>
                <Link to="{./product.id}" className={styles["dash-link"]}>Produkt</Link>
                
              </ul>
        </section>

        <section className={styles["dashboard-section"]}>
          <h3>Varning</h3>
            <h4>Produkter med lågt lagersaldo</h4>
              <ul>
                <li>Produkt 1</li>
                <li>Produkt 2</li>
                <li>Produkt 3</li>
              </ul>
        </section>
    </div>
    </>
  );
}