import re

with open('src/data/seedData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate the proj-veda block
pattern = r',\s*\{\s*id:\s*"proj-veda"[\s\S]*?updatedAt:\s*"2026-01-20T11:00:00Z"\s*\}'
new_content, count = re.subn(pattern, '', content)

if count > 0:
    print(f'Matched and removed {count} occurrence(s) of proj-veda')
    # Update NetSentinel from 7 to 6
    new_content = re.sub(r'(id:\s*"proj-netsentinel"[\s\S]*?orderIndex:\s*)7', r'\g<1>6', new_content)
    # Update Rakuzan SOC from 8 to 7
    new_content = re.sub(r'(id:\s*"proj-rakuzan-soc"[\s\S]*?orderIndex:\s*)8', r'\g<1>7', new_content)

    with open('src/data/seedData.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('seedData.ts updated successfully')
else:
    print('Could not find pattern, searching substring...')
    start_idx = content.find('id: "proj-veda"')
    print('Start index:', start_idx)
