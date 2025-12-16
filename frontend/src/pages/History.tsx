import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function History({ token }: { token: string }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const res = await apiFetch("/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(await res.json());
    }
    load();
  }, []);

  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {items.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </div>
  );
}
