import { useState } from "react";
import type { Category, Product } from "../../interfaces";
import { updateProduct, deleteProduct } from "../../services/Parts/parts.api"
import styles from "../../styles/ProductModal.module.css";

interface Props {
  product: Product;
  category: Category[];
  onClose: () => void;
  onSaved: () => void;
}

export default function EditProductModal({ product, category, onClose, onSaved }: Props) {

  // const [formData, setFormData] = useState<Product>(product);

  const [formData, setFormData] = useState({
    id: product.id,
    productName: product.productName ?? "",
    articleNumber: product.articleNumber ?? "",
    description: product.description ?? "",
    quantity: product.quantity ?? 0,
    categoryId: product.categoryId,
    minimumStock: product.minimumStock ?? 0,
    location: product.location ?? "",
    createdAt: product.createdAt,
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: 
      name === "quantity" || 
      name === "minimumStock" || 
      name === "categoryId"
        ? Number(value)
        : value,
    }));
  }

  async function handleSave() {
    console.log("Saving product with data:", formData);
    try {
      setSaving(true);
      await updateProduct(product.id, formData);
      setMessage("✔️ Produkten uppdaterades!")
      onSaved();
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      console.error(err);
      setMessage("Fel vid uppdatering, inget ändrades!")
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Är du säker att du vill radera produkten?")) return;

    try {
      await deleteProduct(product.id);
      alert("🗑️ Produkten raderades!");
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Fel vid radering");
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Redigera produkt</h2>

        <label htmlFor="productName">Produktnamn:</label>
        <input
          name="productName"
          id="productName"
          value={formData.productName}
          onChange={handleChange}
        />

        <label htmlFor="articleNumber">Artikelnummer:</label>
        <input
          name="articleNumber"
          id="articleNumber"
          value={formData.articleNumber}
          onChange={handleChange}
        />

        <label htmlFor="description">Beskrivning:</label>
        <input
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="quantity">Antal:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <label htmlFor="categoryId">Kategori:</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          >

          {category.map(cat => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <label htmlFor="minimumStock">Minimilager: </label>
        <input
          type="number"
          id="minimumStock"
          name="minimumStock"
          value={formData.minimumStock}
          onChange={handleChange}
        />

        <label htmlFor="location">Hyllplats: </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveBtn} disabled={saving}>Spara</button>
          <button onClick={handleDelete} className={styles.deleteBtn}>Radera</button>
          <button onClick={onClose} className={styles.closeBtn}>Stäng</button>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
