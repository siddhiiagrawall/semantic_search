import { useState } from "react";
import { apiFetch } from "../api/client";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";

export default function Search({ token }: { token: string | null }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {
    if (!query.trim()) {
      console.warn("Empty search blocked");
      setResults([]);
      return;
    }

    const res = await apiFetch("/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setResults(data);
    } else {
      console.error("Unexpected search response:", data);
      setResults([]);
    }
  }


  return (
    <>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {Array.isArray(results) &&
        results.map((r, i) => (
          <ResultCard key={i} result={r} />
        ))}
    </>
  );
}
