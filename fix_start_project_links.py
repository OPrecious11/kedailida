import re
import glob

files = glob.glob("*.html")
pattern = re.compile(r'href="contact\.html"([^>]*)>(Start Project|Start a Project)<')

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    original = content

    content = pattern.sub(r'href="start-project.html"\1>\2<', content)

    if content != original:
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")