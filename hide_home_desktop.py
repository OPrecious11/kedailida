import re
import glob

files = glob.glob("*.html")
pattern = re.compile(r'<li><a href="index\.html">Home</a></li>')

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    original = content

    content = pattern.sub('<li class="nav-home-link"><a href="index.html">Home</a></li>', content)

    if content != original:
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")