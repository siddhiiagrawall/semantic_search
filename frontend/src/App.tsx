import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/Header";
import Search from "./pages/Search";
import Login from "./pages/Login";
import History from "./pages/History";

export default function App() {
  const { token, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <Header
        token={token}
        onLoginClick={() => setShowLogin(true)}
        onLogout={logout}
      />

      {showLogin && (
        <Login
          onSuccess={login}
          onClose={() => setShowLogin(false)}
        />
      )}

      <Search token={token} />

      {token && <History token={token} />}
    </div>
  );
}
