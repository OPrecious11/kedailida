import re
import glob

files = glob.glob("*.html")
pattern = re.compile(r'<ul class="nav-links">\s*')

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    original = content

    def insert_home(match):
        block = match.group(0)
        return block + '          <li><a href="index.html">Home</a></li>\n          '

    # Only check for Home directly inside the nav-links opening tag, not the whole file
    already_has_home = re.search(r'<ul class="nav-links">\s*<li><a href="index\.html">Home</a></li>', content)

    if not already_has_home:
        content = pattern.sub(insert_home, content, count=1)

    if content != original:
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")