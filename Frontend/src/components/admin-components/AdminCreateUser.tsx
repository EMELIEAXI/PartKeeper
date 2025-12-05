import type { CreateUserRequest } from "../../interfaces/CreateUserRequest";
import { registerUser } from "../../services/Authentication/auth.api";
import styles from "../../styles/AdminCreateUser.module.css"
import { useState } from "react";

export default function AdminCreateUser() {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({ 
      ...prev, 
      [name]: type ==="checkbox" ? checked : value,
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
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
    };

    try {
      await registerUser(requestBody);

      setMessage("✔️ Användare registrerad!");
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber: "",
        role: "user", //Default
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
        <legend className={styles.srOnly}>Användarinformation</legend>

          <div className={styles.formColumn}>
            <label htmlFor="email">Email: </label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="exempel@hotmail.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="firstName">Förnamn: </label>
            <input 
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Sara..."
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="lastName">Efternamn: </label>
            <input 
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Karlsson..."
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="password">Lösenord: </label>
            <input 
            type="password"
            id="password"
            name="password"
            placeholder="Minst 6 tecken vara ett icke alfabetiskt..."
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="phoneNumber">Telefonnummer: </label>
            <input 
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="07* *** ** **"
            value={formData.phoneNumber}
            onChange={handleChange}
            autoComplete="tel"
            />
          </div>

          <div className={styles.formColumn}>
            <label>Användarroll: </label>

            <label htmlFor="role-user"> 
              <input 
              type="radio"
              id="role-user"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
              />
              Användare
            </label>

            <label htmlFor="role-admin">
              <input 
              type="radio"
              id="role-admin"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
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