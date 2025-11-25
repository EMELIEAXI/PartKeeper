import styles from "../../styles/AdminHandleUser.module.css"
import type { User } from "../../interfaces/User"

type Props = { users: User[] };

export default function AdminHandleUser({ users }: Props) {
  
  if (!users || users.length === 0) {
    return <p>Inga användare hittades!</p>
  }

  const handleEdit = (userId: number) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId: number) => {
    console.log("Delete user:", userId);
  };

  return (
    <div>
      <h2>Användaradministration</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(users[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {users.map((user) => (
            <tr key={user.userId}>
              {Object.keys(user).map((key) => (
                <td key={key}>{String(user[key as keyof User])}</td>
              ))}

              <td>
                <button onClick={() => handleEdit(user.userId)}>Edit</button>
                <button onClick={() => handleDelete(user.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}