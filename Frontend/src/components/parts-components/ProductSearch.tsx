import { useState, useEffect } from "react";
import styles from "../../styles/ProductSearch.module.css";
import "../../global.css";
import type { Product } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/logo.png";

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const { user } = useAuth();

  const [sortBy, setSortBy] = useState("productName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [mobileColumn, setMobileColumn] = useState("articleNumber");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const pageSize = 20;

  const fetchProducts = async () => {
    const url = new URL("https://localhost:7089/api/Parts");

    url.searchParams.append("page", page.toString());
    url.searchParams.append("pageSize", pageSize.toString());
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("sortOrder", sortOrder);

    if (query) {
      url.searchParams.append("search", query);
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    const data = await res.json();
    setProducts(data.items);
    setTotalPages(data.totalPages);
  };

  function handleSort(column: string) {
    if (sortBy === column) {
      setSortOrder(order => (order === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sortBy, sortOrder, page]);

  return (
    <div className={styles.pageWrapper}>
      
      <div className={styles.logoContainer}>
        <img src={logo} alt="PartKeeper logotyp" className={styles.logoImage} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <div className={styles.titleCenter}>
            <h1>Alla Produkter</h1>
          </div>

          {user?.role === "Admin" && (
          <button className={styles.addBtn} onClick={() => navigate("/admin/create-product")}>+</button>
          )}
        </div>

        <div className={styles.filterBox}>
          <div>
            <label>Sök produkt:</label>
            <input
              type="text"
              placeholder="Sök efter namn eller artikelnummer..."
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => handleSort("productName")}>Namn</th>

                <th className={styles.mobileOnly}>
                  <select 
                    value={mobileColumn}
                    onChange={(e) => setMobileColumn(e.target.value)}
                    className={styles.mobileSelect}
                  >
                    <option value="articleNumber">Artikelnummer</option>
                    <option value="categoryName">Leverantör</option>
                  </select>
                </th>

                <th 
                  className={styles.desktopOnly}
                  onClick={() => handleSort("articleNumber")}
                >
                  Artikelnummer
                  </th>

                <th 
                  className={styles.desktopOnly}
                  onClick={() => handleSort("category")}
                >
                  Leverantör
                  </th>

                <th onClick={() => handleSort("quantity")}>Saldo</th>
              </tr>
            </thead>

            <tbody>
              {products.map(p => (
                <tr 
                  key={p.id}
                  onClick={() => navigate(`/parts/${p.id}`)}
                  className={styles.rowClickable}
                >
                  <td>{p.productName}</td>

                  <td className={styles.mobileOnly}>
                    {mobileColumn === "articleNumber" && p.articleNumber}
                    {mobileColumn === "categoryName" && p.categoryName}
                  </td>

                  <td className={styles.desktopOnly}>{p.articleNumber}</td>
                  <td className={styles.desktopOnly}>{p.categoryName}</td>

                  <td>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Föregående
            </button>

            <span>Sida {page} / {totalPages}</span>

            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              Nästa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
