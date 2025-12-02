import styles from "../../styles/AdminHandleProduct.module.css"
import type { Product, Category } from "../../interfaces"
import { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "../../services/Parts/parts.api";
import EditProductModal from "./EditProductModal";


export default function AdminHandleProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: "asc" | "desc" } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAll = async () => {
    try {
      const [allProducts, allCategories] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);
      setProducts(allProducts);
      setCategories(allCategories);
    } catch (err) {
      console.error("Fel vid hämtning", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <p>Laddar produkter...</p>

  
  // Filtrera produkter - sökrutan och i th
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
  
    return (
      p.productName.toLowerCase().includes(q) ||
      p.articleNumber.toLowerCase().includes(q) ||
      (p.description?.toLowerCase() ?? "").includes(q) ||
      (p.location?.toLowerCase() ?? "").includes(q) ||
      String(p.categoryId).includes(q)
    );
  });
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig) return 0;
  
    const { key, direction } = sortConfig;
  
    let A = a[key];
    let B = b[key];
  
    if (key === "createdAt") {
      A = A ? new Date(A).getTime() : 0;
      B = B ? new Date(B).getTime() : 0;
    }
  
    if (typeof A === "string" && typeof B === "string") {
      return direction === "asc"
        ? A.localeCompare(B)
        : B.localeCompare(A);
    }
  
    return direction === "asc"
      ? (A as number) - (B as number)
      : (B as number) - (A as number);
  });
  

const requestSort = (key: keyof Product) => {
  setSortConfig(prev =>
    prev?.key === key && prev.direction === "asc"
      ? { key, direction: "desc" }
      : { key, direction: "asc" }
  );
};

const sortArrow = (key: keyof Product) => {
  if (!sortConfig || sortConfig.key !== key) return "";
  return sortConfig.direction === "asc" ? " ▲" : " ▼";
};


  
  return (
    <div className={styles.productWrapper}>
      <h1>Hantera produkter</h1>

      <input 
      type="text" 
      placeholder="Sök produkt..."
      className={styles.searchInput} 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <table className={styles.tableContent}>
      <thead className={styles.tableHead}>
        <tr>
          <th onClick={() => requestSort("productName")}>Namn{sortArrow("productName")}</th>
          <th onClick={() => requestSort("articleNumber")}>Artnummer{sortArrow("articleNumber")}</th>
          <th onClick={() => requestSort("description")}>Beskrivning{sortArrow("description")}</th>
          <th onClick={() => requestSort("quantity")}>Antal{sortArrow("quantity")}</th>
          <th onClick={() => requestSort("categoryId")}>Leverantör{sortArrow("categoryId")}</th>
          <th onClick={() => requestSort("minimumStock")}>Minilager{sortArrow("minimumStock")}</th>
          <th onClick={() => requestSort("location")}>Plats{sortArrow("location")}</th>
          <th onClick={() => requestSort("createdAt")}>Skapad{sortArrow("createdAt")}</th>
        </tr>
      </thead>


        <tbody className={styles.tbodyContent}>
          {sortedProducts.map((p) => (
            <tr key={p.id} className={styles.tableRow}>
              <td>{p.productName}</td>
              <td>{p.articleNumber}</td>
              <td>{p.description}</td>
              <td>{p.quantity}</td>
              <td>{p.categoryId}</td>
              <td>{p.minimumStock}</td>
              <td>{p.location}</td>
              <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString("sv-SE") : "–"}</td>

              <td>
                <button
                className={styles.editBtn}
                onClick={() => setSelectedProduct(p)}
                >
                  Redigera / radera
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup modal om produkt är vald */}
      {selectedProduct && categories && (
        <EditProductModal
        product={selectedProduct}
        category={categories}
        onClose={() => setSelectedProduct(null)}
        onSaved={fetchAll}
        />
      )}
    </div>
  );
}