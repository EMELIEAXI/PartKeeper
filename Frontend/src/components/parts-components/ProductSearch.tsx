import { useState } from "react";
import type { Product } from "../../interfaces/index";
import { Link } from "react-router-dom";
import styles from "../../styles/ProductSearch.module.css"

type Props = { products: Product[] };

export default function ProductSearch({ products }: Props) {
  const [query, setQuery] = useState("");

  const filtered = products.filter(p => p.productName.toLowerCase().includes(query.toLowerCase()) || 
  p.articleNumber.toLowerCase().includes(query.toLowerCase())
);

  return (
    <div className={styles.contentWrapper}>
      <h3>Sök reservdelar</h3>
      <input 
      type="text"
      placeholder="Sök efter namn eller artikelnummer..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className={styles.inputbox}
      />

      <div className={styles.filterOption}>
        <button>Produktnamn</button>
        <button>Kategori</button>
        <button>Datum</button>
      </div>

      <ul className={styles.conentList}>
        {filtered.map(p => (
          <li key={p.productId}>
            <Link to={`/parts/${p.productId}`}>
            {p.productName} ({p.quantity})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}