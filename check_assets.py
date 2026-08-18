import re
import glob
import os

# Find every "assets/something.ext" reference across all html and js files.
# Matches content inside quotes so filenames with spaces/parentheses work correctly.
pattern = re.compile(r'assets/[^"\']+?\.(?:jpg|jpeg|png|gif|webp|mp4|svg)', re.IGNORECASE)

referenced = {}  # path -> list of files that reference it

for filepath in glob.glob("**/*.html", recursive=True) + glob.glob("**/*.js", recursive=True):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    for match in pattern.findall(content):
        referenced.setdefault(match, []).append(filepath)

# Build a case-insensitive lookup of what's actually in assets/
actual_files = {}
if os.path.isdir("assets"):
    for f in os.listdir("assets"):
        actual_files[f.lower()] = f
else:
    print("No 'assets' folder found in this directory. Run this from your kedailida project root.")
    exit()

print(f"Found {len(referenced)} unique image/video references across your project.\n")

missing = []
case_mismatch = []
ok_count = 0

for ref_path, used_in in referenced.items():
    filename = ref_path.split("assets/", 1)[1]
    exact_path = os.path.join("assets", filename)

    if os.path.isfile(exact_path):
        ok_count += 1
        continue

    lower_filename = filename.lower()
    if lower_filename in actual_files:
        case_mismatch.append((filename, actual_files[lower_filename], used_in))
    else:
        missing.append((filename, used_in))

print(f"✅ {ok_count} references are correct (exact match found)\n")

if case_mismatch:
    print(f"⚠️  {len(case_mismatch)} references have a CASE/SPACING MISMATCH (may work locally, breaks on live site):\n")
    for filename, real_name, used_in in case_mismatch:
        print(f"   Code says:  assets/{filename}")
        print(f"   Real file:  assets/{real_name}")
        print(f"   Used in:    {', '.join(set(used_in))}")
        print()

if missing:
    print(f"❌ {len(missing)} references point to files that DON'T EXIST at all in assets/:\n")
    for filename, used_in in missing:
        print(f"   assets/{filename}")
        print(f"   Used in: {', '.join(set(used_in))}")
        print()

if not case_mismatch and not missing:
    print("Everything checks out — no broken image references found.")