import re
import glob

files = glob.glob("*.html")
pattern = re.compile(
    r'(<li><a href="contact\.html"[^<]*>Contact</a></li>)(\s*)(</ul>\s*</nav>)'
)

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    original = content

    if '>Jobs</a>' not in content:
        content = pattern.sub(r'\1\2          <li><a href="careers.html">Jobs</a></li>\2\3', content)

    if content != original:
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")