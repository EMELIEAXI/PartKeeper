import styles from "../styles/Dashboard.module.css"
import { Link } from "react-router-dom";
import type { Product } from "../interfaces"
import { getLowstock } from "../services/Parts/parts.api";
import { useState, useEffect } from "react";


export default function LowStockList() {
const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getLowstock();
        setProducts(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err : any) {
        console.error("Kunde inte hämta produkter med låg lager", err);
        setError(err?.message || "Fel vid hämtning");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
      load();
    }, []);
     if (loading) return <p>Laddar lågt lagersaldo...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>Inga produkter med kritiskt lågt lagersaldo.</p>;


  // const LowStock = products.filter(p => p.quantity <= p.minimumStock);

  // if (LowStock.length === 0) return null;

  return (
    <section className={styles["dashboard-section"]}>
      <h3>Varning</h3>
        <h4>Produkter med kritiskt lågt lagersaldo</h4>
          <ul className={styles["list"]}>
            {products.map(p => (
              <li key={p.id}>
                <Link to={`/parts/${p.id}`}>
                  {p.productName} <span className={styles["warnQty"]}>{p.quantity} kvar</span>
                </Link>
              </li>
            ))}  
          </ul>
    </section>
  );
}