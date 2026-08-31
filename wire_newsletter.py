import re
import glob

FORMSPREE_ID = "meaqekkg"  # <-- replace this once, top of the script

files = glob.glob("*.html")

form_pattern = re.compile(
    r'<form class="footer-newsletter-form">\s*'
    r'<input type="email" placeholder="Email" required>\s*'
    r'<button type="submit">Join</button>\s*'
    r'</form>'
)

replacement = f'''<form class="footer-newsletter-form" id="newsletterForm" action="https://formspree.io/f/{FORMSPREE_ID}" method="POST">
              <input type="email" name="email" placeholder="Email" required>
              <button type="submit">Join</button>
            </form>
            <p class="newsletter-status" id="newsletterStatus"></p>'''

script_tag = '<script src="js/newsletter.js"></script>\n'

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    original = content

    if 'id="newsletterForm"' not in content:
        content = form_pattern.sub(replacement, content)

    if 'js/newsletter.js' not in content and 'id="newsletterForm"' in content:
        content = content.replace('</body>', script_tag + '</body>')

    if content != original:
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Updated: {f}")
    else:
        print(f"No change: {f}")