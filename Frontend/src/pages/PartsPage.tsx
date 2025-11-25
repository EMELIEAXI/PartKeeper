// import { useAuth } from "../context/AuthContext";
import products from "../mock/products"
import ProductSearch from "../components/parts-components/ProductSearch";
import { Plus } from "lucide-react"
import styles from "../styles/PartsPage.module.css"
import { useNavigate } from "react-router-dom";

export default function PartsPage() {
  // const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <>
    <div className={styles.componentsContainer}>
    <button className={styles.addBtn} onClick={() => navigate("/admin/create-product")} ><Plus size={15}/></button>
    <h1>Reservdelar</h1>

    <ProductSearch products={products}/>

    {/* {isAdmin && (
      // <AdminControls products={mockProducts}/>
    )} */}
    </div>
    </>
  );
}