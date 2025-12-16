export default function Header({
  token,
  onLoginClick,
  onLogout,
}: {
  token: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>AI Semantic Search</h2>

      {token ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLoginClick}>Login</button>
      )}
    </div>
  );
}
