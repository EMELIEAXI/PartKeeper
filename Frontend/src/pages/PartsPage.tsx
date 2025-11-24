// import { useAuth } from "../context/AuthContext";
import products from "../mock/products"
import ProductSearch from "../components/parts-components/ProductSearch";

export default function PartsPage() {
  // const { isAdmin } = useAuth();

  return (
    <>
    <h1>Reservdelar</h1>

    <ProductSearch products={products}/>

    {/* {isAdmin && (
      // <AdminControls products={mockProducts}/>
    )} */}
    </>
  );
}