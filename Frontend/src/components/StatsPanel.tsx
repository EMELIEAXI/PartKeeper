import styles from "../styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import { getToken } from "../services/Authentication/auth.api";
import type { Product, Transaction } from "../interfaces";

interface Stats {
  totalProducts: number;
  categories: number;
  transactionsToday: number;
}

export default function StatsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const token = getToken();

        const productsRes = await fetch("https://localhost:7089/api/Parts", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!productsRes.ok) throw new Error("Fel vid hämtning av produkter");

        const products: Product[] = await productsRes.json();

        const transactionsRes = await fetch(
          "https://localhost:7089/api/transactions",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!transactionsRes.ok)
          throw new Error("Fel vid hämtning av transaktioner");

        const transactions: Transaction[] = await transactionsRes.json();

        const totalProducts = products.length;

        const categories = new Set(
          products
            .map((p) => p.categoryId)
            .filter((c) => c !== undefined && c !== null)
        ).size;

        const today = new Date().toISOString().split("T")[0];

        const transactionsToday = transactions.filter((t) => {
          const dateString =
            typeof t.timeStamp === "string"
              ? t.timeStamp
              : new Date(t.timeStamp).toISOString();

          return dateString.startsWith(today);
        }).length;

        setStats({ totalProducts, categories, transactionsToday });
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Fel vid hämtning av statistik";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Laddar statistik...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles["dashboard-section"]}>
      <h4>Statistik</h4>
      <ul className={styles.list}>
        <li>Totalt antal produkter: {stats?.totalProducts}</li>
        <li>Kategorier: {stats?.categories}</li>
        <li>Transaktioner idag: {stats?.transactionsToday}</li>
      </ul>
    </section>
  );
}
