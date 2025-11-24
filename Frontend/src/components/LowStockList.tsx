import styles from "../styles/Dashboard.module.css"
import { Link } from "react-router-dom";
import type { Product } from "../interfaces"


type Props = { products?: Product[] };

export default function LowStockList({ products = [] }: Props) {
  const LowStock = products.filter(p => p.quantity <= p.minimumStock);

  if (LowStock.length === 0) return null;

  return (
    <section className={styles["dashboard-section"]}>
      <h3>Varning</h3>
        <h4>Produkter med kritiskt lågt lagersaldo</h4>
          <ul className={styles["list"]}>
            {LowStock.map(p => (
              <li key={p.productId}>
                <Link to={`/parts/${p.productId}`}>
                  {p.productName} <span className={styles["warnQty"]}>{p.quantity} kvar</span>
                </Link>
              </li>
            ))}  
          </ul>
    </section>
  );
}