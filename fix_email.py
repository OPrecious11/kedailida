import re
import glob

files = glob.glob("**/*.html", recursive=True) + glob.glob("**/*.js", recursive=True)
old_email = "careers@kedailida.com"
new_email = "info@kedailida.com"

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    original = content

    content = content.replace(old_email, new_email)

    if content != original:
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")