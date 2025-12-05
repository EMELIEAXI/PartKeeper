import styles from "../styles/Dashboard.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Transaction } from "../interfaces";
import { getToken } from "../services/Authentication/auth.api";

export default function RecentChanges() {
  const [changes, setChanges] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const totalPages = Math.ceil(changes.length / pageSize);
  const currentPageItems = changes.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const load = async () => {
      try {
        const token = getToken();

        const res = await fetch("https://localhost:7089/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Kunde inte hämta transaktioner");

        const all: Transaction[] = await res.json();

        const sorted = all.sort(
          (a, b) =>
            new Date(b.timeStamp).getTime() -
            new Date(a.timeStamp).getTime()
        );

        setChanges(sorted);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Fel vid hämtning";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Laddar senaste ändringar...</p>;
  if (error) return <p>{error}</p>;
  if (changes.length === 0) return <p>Inga historikändringar ännu.</p>;

  return (
    <section className={styles["dashboard-section"]}>
      <h3>Senaste ändringar</h3>

      <ul className={styles.list}>
        {currentPageItems.map((t) => (
          <li key={t.transactionId}>
            <Link to={`/parts/${t.productId}`}>
              <span>{t.productName}</span>
              <span>{new Date(t.timeStamp).toLocaleDateString()}</span>

              <span
                className={
                  t.quantityChange > 0
                    ? styles.positiveChange
                    : styles.negativeChange
                }
              >
                {t.quantityChange > 0
                  ? `+${t.quantityChange}`
                  : t.quantityChange}
              </span>
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
