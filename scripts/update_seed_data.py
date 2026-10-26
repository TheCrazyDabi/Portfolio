import re

with open('src/data/seedData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. First Responder
content = re.sub(
    r'(id:\s*"proj-first-responder"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/first-responder-cover.svg"\2
      {
        url: "assets/projects/first-responder-cover.svg",
        caption: "Global Nav2 Costmap, Waypoint Trajectory & YOLOv8 Pathway Instance Segmentation"
      },
      {
        url: "assets/projects/first-responder-arch.svg",
        caption: "End-to-End Emergency Dispatch & Drive-by-Wire Mechatronic Architecture"
      }
    \3''',
    content
)

# 2. Equinox BAJA
content = re.sub(
    r'(id:\s*"proj-baja-equinox"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/abaja-2026-workshop.png"\2
      {
        url: "assets/projects/abaja-2026-workshop.png",
        caption: "Vasudev Saras on-site with Team Equinox during aBAJA SAE 2026 vehicle staging and technical scrutiny"
      },
      {
        url: "assets/projects/abaja-2026-transit.png",
        caption: "Vasudev Saras wearing official aBAJA 2026 national competition transit gear"
      },
      {
        url: "assets/projects/baja-suspension-kinematics.svg",
        caption: "Lotus SHARK Double-Wishbone Roll-Centre Synthesis & SolidWorks Ackermann Steering Analysis"
      }
    \3''',
    content
)

# 3. Silent Guardian
content = re.sub(
    r'(id:\s*"proj-silent-guardian"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/silent-guardian-cover.svg"\2
      {
        url: "assets/projects/silent-guardian-cover.svg",
        caption: "Silent Guardian live acoustic analysis dashboard with sensitive number redaction and intercept banner"
      }
    \3''',
    content
)

# 4. MediArm
content = re.sub(
    r'(id:\s*"proj-mediarm"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/mediarm-schematic.svg"\2
      {
        url: "assets/projects/mediarm-schematic.svg",
        caption: "MediArm 3-DOF manipulator kinematics, IBT-2 43A motor drivers, ESP32 web controller, and emergency E-Stop"
      }
    \3''',
    content
)

# 5. VYBE
content = re.sub(
    r'(id:\s*"proj-vybe"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/vybe-discovery-ui.svg"\2
      {
        url: "assets/projects/vybe-discovery-ui.svg",
        caption: "VYBE swipe-based tour package discovery interface, multi-role session flow, and TinkerHub Calicut sprint stats"
      }
    \3''',
    content
)

# 6. VEDA
content = re.sub(
    r'(id:\s*"proj-veda"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/veda-terminal-hud.svg"\2
      {
        url: "assets/projects/veda-terminal-hud.svg",
        caption: "V.E.D.A. verified diagnostic boot banner, Ollama token-by-token streaming REPL, and SQLite WAL"
      }
    \3''',
    content
)

# 7. NetSentinel
content = re.sub(
    r'(id:\s*"proj-netsentinel"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/netsentinel-terminal.svg"\2
      {
        url: "assets/projects/netsentinel-terminal.svg",
        caption: "NetSentinel v2.0 live terminal monitor detecting high-rate deauthentication floods"
      }
    \3''',
    content
)

# 8. Rakuzan SOC
content = re.sub(
    r'(id:\s*"proj-rakuzan-soc"[\s\S]*?coverImage:\s*)"[^"]+"([\s\S]*?galleryImages:\s*\[)[\s\S]*?(\],\s*technologies:)',
    r'''\1"assets/projects/rakuzan-soc-dashboard.svg"\2
      {
        url: "assets/projects/rakuzan-soc-dashboard.svg",
        caption: "Rakuzan SOC real-time entropy scanner dashboard showing flagged token alerts"
      }
    \3''',
    content
)

# Update initialMediaItems
media_block = '''export const initialMediaItems: MediaItem[] = [
  {
    id: "med-1",
    fileName: "abaja-2026-workshop.png",
    fileUrl: "assets/projects/abaja-2026-workshop.png",
    fileType: "image",
    fileSize: 674416,
    altText: "Vasudev Saras with Team Equinox during aBAJA SAE 2026 vehicle staging",
    category: "projects",
    uploadedAt: "2026-02-18T10:00:00Z"
  },
  {
    id: "med-2",
    fileName: "abaja-2026-transit.png",
    fileUrl: "assets/projects/abaja-2026-transit.png",
    fileType: "image",
    fileSize: 916340,
    altText: "Vasudev Saras wearing official aBAJA 2026 national competition transit gear",
    category: "projects",
    uploadedAt: "2026-02-18T11:00:00Z"
  },
  {
    id: "med-3",
    fileName: "vasudev-burgundy-portrait.jpg",
    fileUrl: "assets/profile/vasudev-burgundy-portrait.jpg",
    fileType: "image",
    fileSize: 123860,
    altText: "Vasudev Saras K M - Official Engineering Portrait",
    category: "profile",
    uploadedAt: "2026-02-15T12:00:00Z"
  },
  {
    id: "med-4",
    fileName: "vasudev-chibi-laptop-transparent.png",
    fileUrl: "assets/companion/vasudev-chibi-laptop-transparent.png",
    fileType: "image",
    fileSize: 815444,
    altText: "Illustrated Mini-Me Chibi Engineering Companion with Laptop and Reference Textbooks",
    category: "branding",
    uploadedAt: "2026-02-20T14:00:00Z"
  },
  {
    id: "med-5",
    fileName: "baja-suspension-kinematics.svg",
    fileUrl: "assets/projects/baja-suspension-kinematics.svg",
    fileType: "image",
    fileSize: 5605,
    altText: "Lotus SHARK Double-Wishbone & Ackermann Steering Kinematic Analysis",
    category: "projects",
    uploadedAt: "2026-02-19T09:00:00Z"
  },
  {
    id: "med-6",
    fileName: "first-responder-cover.svg",
    fileUrl: "assets/projects/first-responder-cover.svg",
    fileType: "image",
    fileSize: 5538,
    altText: "Autonomous First-Responder Jetson Orin Nano & Nav2 Global Costmap",
    category: "projects",
    uploadedAt: "2026-02-21T10:00:00Z"
  },
  {
    id: "med-7",
    fileName: "silent-guardian-cover.svg",
    fileUrl: "assets/projects/silent-guardian-cover.svg",
    fileType: "image",
    fileSize: 5356,
    altText: "Silent Guardian In-Browser Acoustic Call Firewall & OTP Redaction",
    category: "projects",
    uploadedAt: "2026-02-22T11:00:00Z"
  },
  {
    id: "med-8",
    fileName: "mediarm-schematic.svg",
    fileUrl: "assets/projects/mediarm-schematic.svg",
    fileType: "image",
    fileSize: 5692,
    altText: "MediArm 3-DOF Manipulator Kinematic Linkage & ESP32 Wiring",
    category: "projects",
    uploadedAt: "2026-02-22T12:00:00Z"
  }
];'''

content = re.sub(r'export const initialMediaItems: MediaItem\[\] = \[[\s\S]*?\];', media_block, content)

with open('src/data/seedData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('seedData.ts successfully updated with distinct assets and zero spam!')
