import styles from "../styles/Dashboard.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Transaction } from "../interfaces";
import { getToken } from "../services/Authentication/auth.api";

export default function RecentChanges() {
  const [changes, setChanges] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const token = getToken();

        const res = await fetch("https://localhost:7089/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Kunde inte hämta transaktioner");

        const all: Transaction[] = await res.json();

        const recent = all
          .sort(
            (a, b) =>
              new Date(b.timeStamp).getTime() -
              new Date(a.timeStamp).getTime()
          )
          .slice(0, 5);

        setChanges(recent);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Fel vid hämtning";
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
      <h4>Senaste ändringar</h4>

      <ul className={styles.list}>
        {changes.map((t) => (
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
    </section>
  );
}

