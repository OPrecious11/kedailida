import re
import glob

files = glob.glob("*.html")
hamburger_html = '''      <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
'''
script_tag = '<script src="js/nav-mobile.js"></script>\n'

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    original = content

    # Turn <nav> into <nav class="nav-wrap" id="navWrap">
    content = re.sub(r'<nav>', '<nav class="nav-wrap" id="navWrap">', content, count=1)

    # Insert hamburger button right after </nav>
    if 'id="hamburgerBtn"' not in content:
        content = re.sub(r'(</nav>\s*)', r'\1' + hamburger_html, content, count=1)

    # Add nav-mobile.js before </body> if not already present
    if 'js/nav-mobile.js' not in content:
        content = content.replace('</body>', script_tag + '</body>')

    if content != original:
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")