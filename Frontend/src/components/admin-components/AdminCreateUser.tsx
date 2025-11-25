import type { CreateUserRequest } from "../../interfaces/CreateUserRequest";
import styles from "../../styles/AdminCreateUser.module.css"
import { useState } from "react";

export default function AdminCreateUser() {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    admin: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({ 
      ...prev, 
      [name]: type ==="checkbox" || type === "radio" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const requestBody: CreateUserRequest = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      admin: formData.admin,
    };

    try {
      const response = await fetch("https://localhost:5001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Kunde inte lägga till användare");

      setMessage("✔️ Användare registrerad!");
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        admin: false,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMessage("❌ Fel: " + err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="background-wrapper">

      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h2>Registrera nytt konto</h2>
        
        <fieldset className={styles.adminFieldset}>

          <div className={styles.formColumn}>
            <label htmlFor="email">Mailadress: </label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="exempel@hotmail.com"
            value={formData.email}
            onChange={handleChange}
            required />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="firstNamn">Förnamn: </label>
            <input 
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Sara..."
            value={formData.firstName}
            onChange={handleChange}
            required />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="lastName">Efternamn: </label>
            <input 
            type="text"
            name="lastName"
            placeholder="Karlsson..."
            value={formData.lastName}
            onChange={handleChange}
            required />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="phoneNumber">Telefonnummer: </label>
            <input 
            type="text"
            id="phone"
            name="phone"
            placeholder="07* *** ** **"
            value={formData.phone}
            onChange={handleChange}
            />
          </div>

          <div className={styles.formColumn}>
            <label>Användarroll </label>

            <label htmlFor="role"> 
            <input 
            type="radio"
            name="role"
            value="user"
            checked={!formData.admin}
            onChange={() => setFormData(prev => ({ ...prev, admin: false }))}
            />
            Användare
            </label>

            <label htmlFor="role">
              <input 
              type="radio"
              name="role"
              value="user"
              checked={formData.admin}
              onChange={() => setFormData(prev => ({ ...prev, admin: true }))}
              />
              Admin
            </label>
          </div>

          <div className={styles.formColumn}>
            <button type="submit" disabled={loading}>
              {loading ? "Registrerar..." : "Registrera användare"}
            </button>
          </div>

          {message && <p>{message}</p>}

        </fieldset>

      </form>
    </div>
  );
}