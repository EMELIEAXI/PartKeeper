import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces";
import styles from "../../styles/ProductDetails.module.css";
// import { Plus, Minus } from "lucide-react";
import { getProductDetails } from "../../services/Parts/parts.api";
import { createTransaction } from "../../services/TransactionsApi";
import type { CreateTransactionPayload } from "../../services/TransactionsApi";

export default function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (productId === null || isNaN(productId)) return;

    async function load() {
      try {
        const data = await getProductDetails(productId);
        setProduct(data);
        setLocalQuantity(data.quantity);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  if (loading) return <p>Laddar...</p>;
  if (!product) return <p>Produkten hittades inte!</p>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload: CreateTransactionPayload = {
      productId: product!.id,
      quantityChange: -Math.abs(quantity),
      transactionType: "Remove",
      comment,
    };

    try {
      await createTransaction(payload);

      setSuccess("Uttag bekräftat.");

      setLocalQuantity((prev) => (prev !== null ? prev - quantity : quantity));

      setQuantity(1);
      setComment("");

      setShowForm(false);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ett okänt fel inträffade");
      }
    }
  }

  return (
    <div>
      <div className={styles.productWrapper}>
        <h1>{product.productName}</h1>

        <button className={styles.updateBtn}>redigera</button>

        <div className={styles.productImg}>
          <img
            src="https://cdn.pixabay.com/photo/2023/11/15/15/54/ai-generated-8390398_1280.jpg"
            alt="Produktbild"
          />
        </div>

        <div className={styles.plusMinusBtn}>
          <button
            className={styles.centerActionBtn}
            onClick={() => {
              setShowForm(true);
              setError("");
              setSuccess("");
            }}
          >
            Hämta
          </button>
        </div>

        {success && (
          <p className={styles.successMessage}>{success}</p>
        )}

        {showForm && (
          <div
            className={styles.modalBackdrop}
            onClick={() => setShowForm(false)}
          >
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Hämta reservdel</h3>

              {error && <p className={styles.error}>{error}</p>}

              <form onSubmit={handleSubmit} className={styles.form}>
                <label>Mängd:</label>
                <input
                  type="number"
                  min={1}
                  max={localQuantity ?? product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.input}
                />

                <label>Kommentar:</label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={styles.input}
                />

                <button type="submit" className={styles.confirmBtn}>
                  Bekräfta uttag
                </button>
              </form>

              <button
                className={styles.closeModalBtn}
                onClick={() => setShowForm(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        )}

        <table className={styles.productInfoTable}>
          <tbody>
            <tr>
              <th>Artikelnummer:</th>
              <td>{product.articleNumber}</td>
            </tr>
            <tr>
              <th>Beskrivning:</th>
              <td>{product.description}</td>
            </tr>
            <tr>
              <th>Lagerantal:</th>
              <td>{localQuantity}</td>
            </tr>
            <tr>
              <th>Hyllplats:</th>
              <td>{product.location}</td>
            </tr>
            <tr>
              <th>Kategori:</th>
              <td>{product.categoryId}</td>
            </tr>
            <tr>
              <th>Minimilager:</th>
              <td>{product.minimumStock}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
