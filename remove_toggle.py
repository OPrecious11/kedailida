import re
import sys
import glob

pattern_button = re.compile(
    r'\s*<button class="theme-toggle".*?</button>\s*',
    re.DOTALL
)
pattern_script = re.compile(
    r'\s*<script src="js/theme\.js"></script>\s*'
)

files = glob.glob("*.html")
if not files:
    print("No .html files found in this folder. Run this from inside your kedailida project folder.")
    sys.exit(1)

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    new_content = pattern_button.sub("\n", content)
    new_content = pattern_script.sub("\n", new_content)
    if new_content != content:
        with open(f, "w", encoding="utf-8") as file:
            file.write(new_content)
        print(f"Updated: {f}")
    else:
        print(f"No toggle found: {f}")