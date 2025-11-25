import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import styles from "../styles/LoginPage.module.css"
import { useState } from "react";

export default function LoginPage() {
  const { login, loginDev } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const success = await login(email, password);

    if (success) {
      navigate("/home");
    } else {
      setError("Fel användare eller lösenord");
    }
  };


  return (
    <div>
      <form className={styles ["form-wrapper"]} onSubmit={handleLogin}>
        <h2>Logga in</h2>

        <fieldset>
          <div className={styles ["form-colum"]}>
            <label htmlFor="name">Användarnamn </label>
            <input 
            id="name" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exempel@hotmail.com" 
            required
            />
          </div>

          <div className={styles ["form-colum"]}>
            <label htmlFor="password">Lösenord </label>
            <input 
            id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <a href="#">Har du glömt ditt användarnamn eller lösenord?</a>

          <div className={styles ["form-button"]}>
            <button type="submit">Logga in</button> 

            {/* DEV-MODE INLOGG */}
            <hr />
            <p><strong>Dev-mode: login</strong></p>
            
            <button
            type="button"
            onClick={() => {
              loginDev("user");
              navigate("/home");
            }}>
              Logga in som användare *Dev-mode*
              </button>

            <button
            type="button"
            onClick={() => {
              loginDev("admin");
              navigate("/home")
            }}>
              Logga in som admin *Dev-mode*
            </button>
          </div>

        </fieldset>
      </form>
    </div>
  );
}