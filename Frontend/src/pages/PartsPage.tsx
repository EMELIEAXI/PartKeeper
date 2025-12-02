import { useEffect, useState } from "react";
import ProductSearch from "../components/parts-components/ProductSearch";
import type { Product } from "../interfaces";
import { getAllProducts} from "../services/Parts/parts.api"; 
import { useAuth } from "../context/AuthContext";
import styles from "../styles/PartsPage.module.css"
import { useNavigate } from "react-router-dom";

export default function PartsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
      if (!isAuthenticated) return;

    async function load() {
         setLoading(true);
      setError("");

      try {
        const data = await getAllProducts(); 
        setProducts(data);
      } catch (err) {
        console.error("Kunde inte hämta produkter", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <h2>Du måste logga in för att se produkterna.</h2>;
  if (loading) return <h2>Laddar produkter...</h2>;
  if (error) return <h2>{error}</h2>;
  if (products.length === 0) return <h2>Inga produkter hittades.</h2>;

  return (
    <>
    <div className={styles.componentsContainer}>
      <h1>Reservdelar</h1>
      <div className={styles.topRow}>
        <button className={styles.addBtn} onClick={() => navigate("/admin/create-product")}>+</button>
      </div>
      <ProductSearch products={products} />
    </div>
    </>
  );
}


// import { useAuth } from "../context/AuthContext";
// import products from "../mock/products"
// import ProductSearch from "../components/parts-components/ProductSearch";

// export default function PartsPage() {
//   // const { isAdmin } = useAuth();

//   return (
//     <>
//     <h1>Reservdelar</h1>

//     <ProductSearch products={products}/>

//     {/* {isAdmin && (
//       // <AdminControls products={mockProducts}/>
//     )} */}
//     </>
//   );
// }