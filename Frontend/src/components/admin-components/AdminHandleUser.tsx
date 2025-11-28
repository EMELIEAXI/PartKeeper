import styles from "../../styles/AdminHandleUser.module.css"
import type { User } from "../../interfaces/User"
import { useState } from "react";
import AdminEditUserForm from "./AdminEditUserForm";
import { useEffect } from "react";
import { fetchAllUsers } from "../../services/Authentication/auth.api";

export default function AdminHandleUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null); 
  
    useEffect(() => {
    loadUsers();
  }, []);

 async function loadUsers() {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Laddar...</p>;

  if (users.length === 0) return <p>Inga användare hittades.</p>;

const handleEdit = (user: User) => {
  setEditingUser(user);
};
const reloadUsers = async () => {
  try {
    const data = await fetchAllUsers();
    setUsers(data);
  } catch (err) {
    console.error("Kunde inte hämta användare:", err);
  }
};

  const handleDelete = (userId: number) => {
    console.log("Delete user:", userId);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Användaradministration</h2>

      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.userInfo}>
              <p><strong>Användarnamn:</strong> {user.userName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Förnamn:</strong> {user.firstName}</p>
              <p><strong>Efternamn:</strong> {user.lastName}</p>
              <p><strong>Telefon:</strong> {user.phoneNumber}</p>
              <p><strong>Roll:</strong> {user.role}</p>
            </div>
            <div className={styles.userActions}>
              <button className={styles.editBtn} onClick={() => handleEdit(user)}>Redigera</button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(user.id)}>Ta bort</button>
            </div>
          </div>
        ))}
      </div>

      {editingUser && (
        <AdminEditUserForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={reloadUsers}
        />
      )}
    </div>
  );
}