export default function ResultCard({ result }: any) {
  return (
    <div>
      <a href={result.url} target="_blank">
        {result.title}
      </a>
      <p>Score: {result.score ?? "N/A"}</p>
    </div>
  );
}
