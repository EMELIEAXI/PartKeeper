import { useState } from "react";
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
  // const handleLogin = () => {
  //   login();
  //   navigate("/home");
  // };

  const handleLogin = async (e) => {
  e.preventDefault();
    setError("");

  try {
    await login(email, password);
    navigate("/home");
  } catch {
    setError("Felaktiga uppgifter");
  }
};


  return (
    <div>
      <form onSubmit={handleLogin} className={styles ["form-wrapper"]}>
        <h2>Logga in</h2>

        <fieldset>
          <div className={styles ["form-colum"]}>
            <label htmlFor="name">Användarnamn </label>
            <input id="name" 
              type="email" 
              placeholder="exempel@hotmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          </div>

          <div className={styles ["form-colum"]}>
            <label htmlFor="password">Lösenord </label>
            <input id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
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