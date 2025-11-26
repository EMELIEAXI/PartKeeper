import styles from "../../styles/AdminCreateUser.module.css"


export default function AdminCreateProduct() {
 
  return (
    <div className="background-wrapper">

    <form className={styles.formWrapper}>
      <h2>Registrera nytt konto</h2>
      
      <fieldset className={styles.adminFieldset}>

        <div className={styles.formColumn}>
          <label htmlFor="productName">Produktnamn: </label>
          <input 
          type="text"
          id="productName"
          name="productName"
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
          <button type="submit">
            {"Skapa ny produkt"}
          </button>
        </div>

      </fieldset>

    </form>
  </div>
  )
}