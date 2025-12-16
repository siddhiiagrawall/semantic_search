import { useState } from "react";
import { apiFetch } from "../api/client";

export default function Login({
  onSuccess,
  onClose,
}: {
  onSuccess: (token: string) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    const endpoint = isRegister ? "/auth/register" : "/auth/login";

    const res = await apiFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.detail || "Something went wrong");
      return;
    }

    // After register, login automatically
    if (isRegister) {
      const loginRes = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();
      onSuccess(loginData.access_token);
    } else {
      onSuccess(data.access_token);
    }

    onClose();
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 20 }}>
      <h3>{isRegister ? "Register" : "Login"}</h3>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isRegister ? "Register" : "Login"}
      </button>

      <p
        style={{ cursor: "pointer" }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "New user? Register"}
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
