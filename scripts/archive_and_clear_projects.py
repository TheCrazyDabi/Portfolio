import json
import re

with open('src/data/seedData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate export const initialProjects: Project[] = [ ... ];
match = re.search(r'export const initialProjects: Project\[\] = (\[[\s\S]*?\n\]);', content)

if match:
    projects_block = match.group(1)
    # Save to src/data/archivedProjects.ts for safe reference
    archived_file_content = f'''import {{ Project }} from '../types/content';\n\nexport const archivedProjects: Project[] = {projects_block};\n'''
    with open('src/data/archivedProjects.ts', 'w', encoding='utf-8') as f_arch:
        f_arch.write(archived_file_content)
    print('Safely archived existing projects into src/data/archivedProjects.ts')

    # Replace with empty array
    new_content = content[:match.start()] + 'export const initialProjects: Project[] = [];' + content[match.end():]
    with open('src/data/seedData.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('seedData.ts initialProjects cleared to []')
else:
    print('Could not match initialProjects block')
