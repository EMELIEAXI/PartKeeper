import styles from "../styles/Dashboard.module.css";
import { Link } from "react-router-dom";
import type { Product } from "../interfaces";
import { getLowstock } from "../services/Parts/parts.api";
import { useState, useEffect } from "react";

export default function LowStockList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const totalPages = Math.ceil(products.length / pageSize);
  const currentPageItems = products.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getLowstock();
        setProducts(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Fel vid hämtning";
        setError(message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Laddar lågt lagersaldo...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0)
    return <p>Inga produkter med kritiskt lågt lagersaldo.</p>;

  return (
    <section className={styles["dashboard-section"]}>
      <h3>Lågt lagersaldo</h3>

      <ul className={styles.list}>
        {currentPageItems.map((p) => (
          <li key={p.id}>
            <Link to={`/parts/${p.id}`}>
              {p.productName}
              <span className={styles.warnQty}>{p.quantity} kvar</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button 
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Föregående
        </button>

        <span>Sida {page} / {totalPages}</span>

        <button 
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Nästa
        </button>
      </div>
    </section>
  );
}
