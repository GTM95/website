import urllib.request
import re
import json

def get_ddg_image(query):
    url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query + " wikimedia commons")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Find something resembling an image URL from wikimedia in the HTML
        match = re.search(r'(https://upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+)', html)
        if match:
            return match.group(1)
        match = re.search(r'(https://upload\.wikimedia\.org/wikipedia/commons/[^"]+\.(?:jpg|png))', html)
        if match:
            return match.group(1)
    except Exception as e:
        return None
    return None

queries = {
    'VHS': 'VHS cassette tape',
    'VHS-C': 'VHS-C cassette tape',
    'MiniDV': 'MiniDV cassette tape',
    'Hi8': 'Hi8 cassette tape',
    'Audio': 'compact audio cassette tape',
    '8mm': '8mm film reel'
}

for q, terms in queries.items():
    print(f"URL_{q} = {get_ddg_image(terms)}")
