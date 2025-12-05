import { useEffect, useState } from "react";
import styles from "../styles/HistoryPage.module.css";
import logo from "../assets/logo.png";

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

  const [infoFieldMobile, setInfoFieldMobile] = useState("lager");
  const [infoFieldTabletDropdown, setInfoFieldTabletDropdown] = useState("kommentar");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1040);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1040);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        const response = await fetch(
          `https://localhost:7089/api/Parts?page=1&pageSize=100`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data: PaginatedProducts = await response.json();
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

    if (productFilter) list = list.filter((t) => t.productName === productFilter);
    if (typeFilter) list = list.filter((t) => t.transactionType === typeFilter);
    if (fromDate) list = list.filter((t) => new Date(t.timeStamp) >= new Date(fromDate));
    if (toDate) list = list.filter((t) => new Date(t.timeStamp) <= new Date(toDate));

    setFiltered(list);
    setPage(1);
  }

  function renderField(t: Transaction, field: string) {
    switch (field) {
      case "lager":
        return t.newQuantity;
      case "kommentar":
        return t.comment || "-";
      case "typ":
        return t.transactionType === "Add" ? "Inleverans" : "Uttag";
      case "användare":
        return t.user || "-";
      case "tid":
        return new Date(t.timeStamp).toLocaleString();
      default:
        return "-";
    }
  }

  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentTransactions = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="PartKeeper logotyp" className={styles.logoImage} />
      </div>

      <div className={styles.wrapper}>
        <h1>Transaktionshistorik</h1>

        <div className={styles.filterBox}>
          <div>
            <label>Reservdel:</label>
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
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
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">Alla</option>
              <option value="Add">Inleverans</option>
              <option value="Remove">Uttag</option>
            </select>
          </div>

          <div>
            <label>Från datum:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div>
            <label>Till datum:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
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

                {isTablet && (
                  <>
                    <th>Lagervärde</th>
                    <th>Typ</th>
                    <th>
                      <select
                        className={styles.infoSelect}
                        value={infoFieldTabletDropdown}
                        onChange={(e) => setInfoFieldTabletDropdown(e.target.value)}
                      >
                        <option value="kommentar">Kommentar</option>
                        <option value="användare">Användare</option>
                        <option value="tid">Tidpunkt</option>
                      </select>
                    </th>
                  </>
                )}

                {isMobile && (
                  <th>
                    <select
                      className={styles.infoSelect}
                      value={infoFieldMobile}
                      onChange={(e) => setInfoFieldMobile(e.target.value)}
                    >
                      <option value="lager">Lagervärde</option>
                      <option value="kommentar">Kommentar</option>
                      <option value="typ">Typ</option>
                      <option value="användare">Användare</option>
                      <option value="tid">Tidpunkt</option>
                    </select>
                  </th>
                )}

                {!isMobile && !isTablet && (
                  <>
                    <th>Lagervärde</th>
                    <th>Kommentar</th>
                    <th>Typ</th>
                    <th>Användare</th>
                    <th>Tidpunkt</th>
                  </>
                )}
              </tr>
            </thead>

                <tbody>
                {currentTransactions.map((t) => (
                    <tr key={t.transactionId}>
                    <td>{t.productName}</td>
                    <td>{t.quantityChange}</td>

                    {isTablet && (
                        <>
                        <td>{renderField(t, "lager")}</td>
                        <td className={t.transactionType === "Add" ? styles.inleverans : styles.uttag}>
                            {renderField(t, "typ")}
                        </td>
                        <td>{renderField(t, infoFieldTabletDropdown)}</td>
                        </>
                    )}

                    {isMobile && (
                    <td
                        className={
                        infoFieldMobile === "typ"
                            ? renderField(t, infoFieldMobile) === "Inleverans"
                            ? styles.inleverans
                            : renderField(t, infoFieldMobile) === "Uttag"
                            ? styles.uttag
                            : ""
                            : ""
                        }
                    >
                        {renderField(t, infoFieldMobile)}
                    </td>
                    )}

                    {!isMobile && !isTablet && (
                        <>
                        <td>{renderField(t, "lager")}</td>
                        <td>{renderField(t, "kommentar")}</td>
                        <td className={renderField(t, "typ") === "Inleverans" ? styles.inleverans : styles.uttag}>
                            {renderField(t, "typ")}
                        </td>
                        <td>{renderField(t, "användare")}</td>
                        <td>{renderField(t, "tid")}</td>
                        </>
                    )}
                    </tr>
                ))}

                {totalPages > 1 && (
                    <tr>
                    <td colSpan={isMobile ? 3 : isTablet ? 5 : 7} className={styles.paginationRow}>
                        <div className={styles.pagination}>
                        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                            Föregående
                        </button>
                        <span>
                            Sida {page} / {totalPages}
                        </span>
                        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                            Nästa
                        </button>
                        </div>
                    </td>
                    </tr>
                )}
                </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
