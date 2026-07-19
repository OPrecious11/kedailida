import re
import glob

pattern = re.compile(r'href="contact\.html">Work with us</a>')

files = glob.glob("*.html")
for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    new_content = pattern.sub('href="careers.html">Work with us</a>', content)
    if new_content != content:
        with open(f, "w", encoding="utf-8") as file:
            file.write(new_content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")