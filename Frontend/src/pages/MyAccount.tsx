import { useAuth } from "../context/AuthContext"; 

export default function MyAccount() {
  const { isAdmin } = useAuth();

  return (
    <div>
      <h1>Mitt konto</h1>

      {isAdmin && (
        <button>Hantera användare (endast admin)</button>
      )}
    </div>
  );
}