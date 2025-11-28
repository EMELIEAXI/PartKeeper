import { useState } from "react"
import styles from "../../styles/AdminCreateUser.module.css"
import type { CreateProductRequest } from "../../interfaces/CreateProductRequest"
import { createProduct } from "../../services/Parts/parts.api";


export default function AdminCreateProduct() {
  const [formData, setFormData] = useState<CreateProductRequest>({
    productName: "",
    articleNumber: "",
    description: "",
    categoryId: 0,
    quantity: 0,
    location: "",
    minimumStock: 0,
    createdAt: new Date(),
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createProduct(formData);
      setMessage("✔️ Produkt skapad!");
      setFormData({
        productName: "",
        articleNumber: "",
        description: "",
        categoryId: 0,
        quantity: 0,
        location: "",
        minimumStock: 0,
        createdAt: new Date(),
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Kunde inte skapa produkt: " + err.message);
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <div className="background-wrapper">

    <form className={styles.formWrapper} onSubmit={handleSubmit}>
      <h2>Registrera ny produkt</h2>
      
      <fieldset className={styles.adminFieldset}>

        <div className={styles.formColumn}>
          <label htmlFor="productName">Produktnamn: </label>
          <input 
          type="text"
          id="productName"
          name="productName"
          placeholder="Stålvajer..."
          value={formData?.productName}
          onChange={handleChange}
          required />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="articleNumber">Artikelnummer: </label>
          <input 
          type="text"
          id="articleNumber"
          name="articleNumber"
          placeholder="126432..."
          value={formData?.articleNumber}
          onChange={handleChange}
          required />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="description">Beskrivning: </label>
          <input 
          type="text"
          name="description"
          id="description"
          placeholder="Max 100 ord..."
          value={formData?.description}
          onChange={handleChange}
          required />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="quantity">Antal: </label>
          <input 
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Antal..."
          value={formData?.quantity}
          onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="location">Hyllplats: </label>
          <input 
          type="text"
          id="location"
          name="location"
          placeholder="Hyllplats nr..."
          value={formData?.location}
          onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="minimumStock">Minimum lagersaldo: </label>
          <input 
          type="number"
          id="minimumStock"
          name="minimumStock"
          placeholder="Minsta lagersaldo..."
          value={formData?.minimumStock}
          onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="categoryId">Kategori: </label>
          <input 
          type="number"
          id="categoryId"
          name="categoryId"
          placeholder="Kategori nummer..."
          value={formData?.categoryId}
          onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <button type="submit" disabled={loading}>
            {loading ? "Skapar..." : "Skapa ny produkt"}
          </button>
        </div>

        {message && <p>{message}</p>}
      </fieldset>

    </form>
  </div>
  );
}