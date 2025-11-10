import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        title = soup.find("h1", {"id": "firstHeading"}).text.strip() if soup.find("h1", {"id": "firstHeading"}) else ""
        content_div = soup.find("div", {"id": "mw-content-text"})
        for s in content_div(['sup', 'table', 'img', 'script', 'style', 'tbody', 'noscript']):
            s.decompose()
        clean_text = " ".join([p.get_text(separator=" ", strip=True) for p in content_div.find_all("p", recursive=True)])
        return {"title": title, "content": clean_text, "raw_html": str(content_div)}
    except Exception as e:
        raise ValueError(f"Scraping error: {e}")
