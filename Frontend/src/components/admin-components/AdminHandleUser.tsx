import styles from "../../styles/AdminHandleUser.module.css"
import type { User } from "../../interfaces/User"
import { useState } from "react";
import AdminEditUserForm from "./AdminEditUserForm";
import { useEffect } from "react";
import { fetchAllUsers } from "../../services/Authentication/auth.api";
import { deleteUser } from "../../services/Authentication/auth.api";
import ConfirmModal from "./ConfirmModal";

export default function AdminHandleUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null); 
  const [deleteUserTarget, setDeleteUserTarget] = useState<User | null>(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  
    useEffect(() => {
    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, roleFilter]); 

 async function loadUsers() {
  try {
    const data = await fetchAllUsers(query, roleFilter); // <-- SKICKAR FILTER
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

//   const handleDelete = async (user: User) => {
//   const confirmDelete = window.confirm(
//     `Är du säker att du vill ta bort ${user.userName}? Du kan inte ångra dig sen.`
//   );

//   if (!confirmDelete) return;
//   try {
//     await deleteUser(user.id.toString()); // kalla backend
//     // uppdatera listan
//     setUsers(users.filter(u => u.id !== user.id));
//   } catch (err) {
//     console.error(err);
//     alert("Kunde inte ta bort användaren.");
//   }
// };

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.title}>Användaradministration</h2> */}

      <div className={styles.userList}>
        <input 
        type="text"
        placeholder="Sök efter användare..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
        className={styles.inputbox}
      />
      <select
  className={styles.inputbox}
  value={roleFilter}
  onChange={(e) => setRoleFilter(e.target.value)}
>
  <option value="">Alla roller</option>
  <option value="Admin">Admin</option>
  <option value="User">User</option>
</select>
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
              <button
  className={styles.deleteBtn}
  onClick={() => setDeleteUserTarget(user)}
>
  Ta bort
</button>
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
   
    {deleteUserTarget && (
  <ConfirmModal
    title="Bekräfta borttagning"
    message={`Är du säker att du vill ta bort ${deleteUserTarget.userName}? Du kan inte ångra dig sen.`}
    onCancel={() => setDeleteUserTarget(null)}
    onConfirm={async () => {
      try {
        await deleteUser(deleteUserTarget.id.toString()); // kalla backend
        setUsers(users.filter(u => u.id !== deleteUserTarget.id));
      } catch (err) {
        console.error(err);
        alert("Kunde inte ta bort användaren.");
      } finally {
        setDeleteUserTarget(null);
      }
    }}
  />
  )}
 </div>
  );
}