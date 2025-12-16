from exa_py import Exa
from app.core.config import EXA_API_KEY

exa = Exa(EXA_API_KEY)

def semantic_search(query: str):
    response = exa.search(
        query,
        num_results=5,
    )

    return [
        {
            "title": r.title,
            "url": r.url,
            "score": round(r.score, 3) if r.score is not None else None
        }
        for r in response.results
    ]

