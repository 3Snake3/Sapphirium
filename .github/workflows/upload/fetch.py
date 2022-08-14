import json
import urllib3

url = "https://api.github.com/repos/3Snake3/Sapphirium/releases/latest"
http = urllib3.PoolManager()
release_raw = http.request("GET", url).data
release = json.loads(release_raw)
tag = release["tag_name"]
print(f"::set-output name=tag::{tag}")
