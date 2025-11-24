import { useParams } from "react-router-dom";
import type { Product } from "../../interfaces"
import styles from "../../styles/ProductDetails.module.css"
import { Plus, Minus } from "lucide-react"

type Props = { products: Product[] };

export default function ProductDetails({ products }: Props) {
  const { id } = useParams();
  const productId = Number(id);

  const product = products.find(p => p.productId === productId);

  if (!product) return <p>Produkten hittades inte!</p>

  return (
    <div className={styles.productWrapper}>
      <h1>{product.productName}</h1>

      <button className={styles.updateBtn}>redigera</button>

      <div className={styles.productImg}>
      <img src="https://cdn.pixabay.com/photo/2023/11/15/15/54/ai-generated-8390398_1280.jpg" alt="Bromsbelägg" />
      </div>

      <div className={styles.plusMinusBtn}>
        <button><Minus/></button>
        <button><Plus/></button>
      </div>

      <table className={styles.productInfoTable}>
        <tbody>
          <tr>
            <th>Artikelnummer: </th>
            <td>{product.articleNumber}</td>
          </tr>

          <tr>
            <th>Beskrivning: </th>
            <td>{product.description}</td>
          </tr>

          <tr>
            <th>Lagerantal: </th>
            <td>{product.quantity}</td>
          </tr>
          
          <tr>
            <th>Hyllplats:</th>
            <td>{product.location}</td>
          </tr>

          <tr>
            <th>Kategori: </th>
            <td>{product.categoryId}</td>
          </tr>

          <tr>
            <th>Minimilager: </th>
            <td>{product.minimumStock}</td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}