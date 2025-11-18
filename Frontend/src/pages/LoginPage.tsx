import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <form action="">
        <h2>Logga in</h2>
        <fieldset>
          <div>
            <label htmlFor="name">Användarnamn </label>
            <input type="email" placeholder="exempel@hotmail.com" required/>
          </div>

          <div>
            <label htmlFor="password">Lösenord </label>
            <input type="password" required/>
          </div>

          <a href="#">Har du glömt ditt användarnamn eller lösenord?</a>

          <div>
            <button onClick={handleLogin}>Logga in</button>
          </div>

        </fieldset>
      </form>
    </div>
  );
}