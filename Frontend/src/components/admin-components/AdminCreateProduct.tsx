import styles from "../../styles/AdminCreateUser.module.css"


export default function AdminCreateProduct() {
 
  return (
    <div className="background-wrapper">

    <form className={styles.formWrapper}>
      <h2>Registrera ny produkt</h2>
      
      <fieldset className={styles.adminFieldset}>

        <div className={styles.formColumn}>
          <label htmlFor="productName">Produktnamn: </label>
          <input 
          type="text"
          id="productName"
          name="productName"
          placeholder="Stålvajer..."
          // value={formData?.productName}
          // onChange={handleChange}
          required />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="firstNamn">Artikelnummer: </label>
          <input 
          type="text"
          id="firstName"
          name="firstName"
          placeholder="12643..."
          // value={formData?.articleNumber}
          // onChange={handleChange}
          required />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="description">Beskrivning: </label>
          <input 
          type="text"
          name="description"
          id="description"
          placeholder="Max 100 ord..."
          // value={formData?.description}
          // onChange={handleChange}
          required />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="quantity">Antal: </label>
          <input 
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Antal..."
          // value={formData?.quantity}
          // onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="location">Hyllplats: </label>
          <input 
          type="text"
          id="location"
          name="location"
          placeholder="Hyllplats nr..."
          // value={formData?.quantity}
          // onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="minimumStock">Minimum lagersaldo: </label>
          <input 
          type="number"
          id="minimumStock"
          name="minimumStock"
          placeholder="Minsta lagersaldo..."
          // value={formData?.quantity}
          // onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <label htmlFor="categoryId">Kategori: </label>
          <input 
          type="number"
          id="categoryId"
          name="categoryId"
          placeholder="Kategori nummer..."
          // value={formData?.quantity}
          // onChange={handleChange}
          />
        </div>

        <div className={styles.formColumn}>
          <button type="submit">
            {"Skapa ny produkt"}
          </button>
        </div>

      </fieldset>

    </form>
  </div>
  )
}