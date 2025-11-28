import { useEffect, useState } from "react";
import styles from "../styles/HistoryPage.module.css";

export const API_BASE = "https://localhost:7089/api/transactions";

interface Transaction {
  transactionId: number;
  productId: number;
  productName: string;
  quantityChange: number;
  newQuantity: number;
  comment: string | null;
  transactionType: string;
  timeStamp: string;
  user: string;
}

interface Product {
  productId: number;
  productName: string;
}

interface PaginatedProducts {
  items: Product[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productFilter, setProductFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");

  async function fetchTransactions() {
    try {
      const response = await fetch(API_BASE, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Transaction[] = await response.json();
      setTransactions(data);
      setFiltered(data);
    } catch (err) {
      console.error("Kunde inte hämta transaktioner:", err);
    }
  }

  async function fetchProducts() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:7089/api/Parts?page=1&pageSize=100`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data: PaginatedProducts = await response.json();
      console.log("Produkter från API:", data);
      setProducts(data.items);
    } catch (err) {
      console.error("Kunde inte hämta produkter:", err);
    }
  }

  fetchTransactions();
  fetchProducts();
}, []);

  function applyFilters() {
    let list = [...transactions];

    if (productFilter) {
      list = list.filter((t) => t.productName === productFilter);
    }

    if (typeFilter) {
      list = list.filter((t) => t.transactionType === typeFilter);
    }

    if (fromDate) {
      list = list.filter(
        (t) => new Date(t.timeStamp) >= new Date(fromDate)
      );
    }

    if (toDate) {
      list = list.filter(
        (t) => new Date(t.timeStamp) <= new Date(toDate)
      );
    }

    setFiltered(list);
  }

  return (
    <div className={styles.wrapper}>
      <h2>Transaktionshistorik</h2>

      <div className={styles.filterBox}>
        <div>
          <label>Reservdel:</label>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="">Alla</option>
            {products.map((p) => (
              <option key={p.productId} value={p.productName}>
                {p.productName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Typ:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Alla</option>
            <option value="Add">Inleverans</option>
            <option value="Remove">Uttag</option>
          </select>
        </div>

        <div>
          <label>Från datum:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div>
          <label>Till datum:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button className={styles.filterBtn} onClick={applyFilters}>
          Filtrera
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Reservdel</th>
              <th>Förändring</th>
              <th>Nytt antal</th>
              <th>Kommentar</th>
              <th>Typ</th>
              <th>Tidpunkt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.transactionId}>
                <td>{t.productName}</td>
                <td>{t.quantityChange}</td>
                <td>{t.newQuantity}</td>
                <td>{t.comment}</td>
                <td>{t.transactionType}</td>
                <td>{new Date(t.timeStamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
