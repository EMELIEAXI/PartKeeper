import { useState } from "react";
import { updateUser } from "../../services/Authentication/auth.api";
import type { User } from "../../interfaces/User";
import styles from "../../styles/AdminHandleUser.module.css";

type Props = {
  user: User;
  onClose: () => void;
  onSaved: () => void;
};

export default function AdminEditUserForm({ user, onClose, onSaved }: Props) {
  const [form, setForm] = useState<User>(user);
  const [loading, setLoading] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

   const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!form.id) {
        alert("Användar-id saknas!");
        setLoading(false);
        return;
      }

      await updateUser(form.id.toString(), {
        userName: form.userName,
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        Role: form.role
      });

      onSaved();
      onClose();
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Kunde inte spara användaren");
    }

    setLoading(false);
  };

  return (
 <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form className={styles.formWrapper} onSubmit={handleSave}>
          <h2>Redigera användare</h2>

          <div className={styles.formColumn}>
            <label htmlFor="userName">Användarnamn:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="firstName">Förnamn:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="lastName">Efternamn:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formColumn}>
            <label htmlFor="phoneNumber">Telefon:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formColumn}>
            <label>Roll:</label>
            <label htmlFor="user">
              <input
                type="radio"
                id="user"
                name="role"
                value="User"
                checked={form.role === "User"}
                onChange={handleChange}
              />
              Användare
            </label>

            <label htmlFor="admin">
              <input
                type="radio"
                id="admin"
                name="role"
                value="Admin"
                checked={form.role === "Admin"}
                onChange={handleChange}
              />
              Admin
            </label>
          </div>

          <div className={styles.formColumn}>
            <button type="submit" disabled={loading}>
              {loading ? "Sparar..." : "Spara"}
            </button>
            <button type="button" onClick={onClose}>
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
