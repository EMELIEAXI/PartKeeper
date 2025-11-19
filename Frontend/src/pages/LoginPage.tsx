import { useAuth } from "../context/AuthContext"
import styles from "../styles/LoginPage.module.css"

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <form action="" className={styles ["form-wrapper"]}>
        <h2>Logga in</h2>
        <fieldset>
          <div className={styles ["form-colum"]}>
            <label htmlFor="name">Användarnamn </label>
            <input type="email" placeholder="exempel@hotmail.com" required/>
          </div>

          <div className={styles ["form-colum"]}>
            <label htmlFor="password">Lösenord </label>
            <input type="password" required/>
          </div>

          <a href="#">Har du glömt ditt användarnamn eller lösenord?</a>

          <div className={styles ["form-button"]}>
            <button onClick={handleLogin}>Logga in</button>
          </div>

        </fieldset>
      </form>
    </div>
  );
}