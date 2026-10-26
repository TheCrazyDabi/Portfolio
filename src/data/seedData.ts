import { Project, Certification, Experiment, Skill, Milestone, Profile, SiteSettings, MediaItem } from '../types/content';

export const initialProfile: Profile = {
  name: "Vasudev Saras",
  title: "Robotics & Automation Engineer",
  college: "Saintgits College of Engineering",
  degree: "B.Tech in Robotics and Automation | APJ Abdul Kalam Technological University",
  headline: "Robotics & Automation · Autonomous Navigation · Cyber-Physical Security",
  introduction: "Robotics and Automation Engineering student with hands-on experience in CAD modelling, multibody simulation, embedded systems, autonomous robotics, computer vision, and web-based robot control. Interested in combining robotics and cybersecurity to build reliable automation systems.",
  aboutBio: "Robotics and Automation Engineering undergraduate at Saintgits College of Engineering (APJ Abdul Kalam Technological University) based in Calicut, Kerala. My engineering craft bridges physical mechanics with deterministic computing—from multibody simulation and vehicle dynamics in Lotus SHARK, SolidWorks, and MSC Adams Car to autonomous navigation on NVIDIA Jetson Orin Nano with ROS 2 and Nav2, Drive-by-Wire CAN communication, and edge computer vision with YOLOv8. I am deeply interested in combining robotics and cybersecurity to build reliable, safety-critical automation systems.",
  publicEmail: "vasudevb2w@gmail.com",
  githubUrl: "https://github.com/TheCrazyDabi",
  linkedinUrl: "https://linkedin.com/in/d4biie",
  resumeUrl: "", // Available when resume asset is viewed
  profileImageUrl: "assets/profile/vasudev-photo.jpg",
  location: "Calicut, Kerala, India",
  statusIndicator: "Available for Robotics & Automation Roles"
};

export const initialSiteSettings: SiteSettings = {
  siteTitle: "Vasudev Saras | Robotics & Automation Engineer",
  metaDescription: "Vasudev Saras (TheCrazyDabi) — Robotics & Automation Engineering student at Saintgits College of Engineering. Autonomous vehicles, Jetson Orin Nano, ROS 2, CAD kinematics, and cybersecurity.",
  showCertifications: true,
  showExperiments: true,
  showMilestones: true,
  showSystemArchitecture: true,
  enableHeroAnimations: true,
  githubRepoUrl: "https://github.com/TheCrazyDabi/Portfolio"
};

export const initialProjects: Project[] = [
  {
    id: "proj-first-responder",
    slug: "autonomous-first-responder",
    title: "Autonomous First-Responder: Vision-Inertial Navigation for Campus Emergencies",
    category: "Robotics",
    shortDescription: "Developing a low-cost autonomous emergency-response rover by retrofitting an electric aBAJA buggy for campus navigation with NVIDIA Jetson Orin Nano, ROS 2/Nav2, Drive-by-Wire CAN integration, and YOLOv8.",
    status: "published",
    projectState: "In Development",
    coverImage: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80",
        caption: "Electric aBAJA buggy retrofit for autonomous campus emergency navigation"
      },
      {
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
        caption: "YOLOv8 instance-segmentation masking of unstructured campus pathways"
      }
    ],
    technologies: ["ROS 2", "Nav2", "Jetson Orin Nano", "YOLOv8", "CAN", "MQTT", "Smartphone Camera/IMU/GPS", "Drive-by-Wire", "PIDNet-S", "Roboflow"],
    problemStatement: "Campus emergency response requires swift, low-cost autonomous dispatch across indoor/outdoor pathways without depending on expensive industrial RTK-GPS or multi-thousand-dollar LiDAR sensor suites.",
    designProcess: "Developing a low-cost autonomous emergency-response rover by retrofitting an existing electric aBAJA buggy for campus navigation. Working on Drive-by-Wire CAN integration for electronic steering, braking, and throttle control, with an NVIDIA Jetson Orin Nano as the edge-computing platform. Trained and deployed a baseline YOLOv8 instance-segmentation model to identify and mask unstructured campus pathways; PIDNet-S migration is planned/in progress. Project architecture combines smartphone camera, IMU and GPS sensing with ROS 2/Nav2 and an MQTT-linked mobile app for target-coordinate emergency dispatch.",
    hardwareSoftwareArchitecture: "NVIDIA Jetson Orin Nano edge platform -> Drive-by-Wire CAN integration (steering, braking, throttle) -> Sensor Suite (Smartphone Camera, IMU, GPS) -> ROS 2 Humble / Nav2 -> MQTT Gateway bridge -> Mobile App Target-Coordinate Dispatch.",
    personalContribution: "Drive-by-Wire CAN bus integration, NVIDIA Jetson Orin edge deployment, YOLOv8 pathway instance-segmentation training, and MQTT–ROS 2 bridge development.",
    challengesAndSolutions: [
      {
        challenge: "Real-time coordinate dispatch from mobile app to ROS 2 navigation stack across campus wireless networks.",
        solution: "Engineered an MQTT-to-ROS2 gateway bridge for target-coordinate ingestion and live emergency dispatch reporting."
      },
      {
        challenge: "Segmenting unstructured dirt and paved campus pathways under rapidly shifting sunlight.",
        solution: "Trained and annotated a custom YOLOv8 instance segmentation dataset with Roboflow; preparing migration to high-speed PIDNet-S."
      }
    ],
    results: "Current Phase-I status includes reported progress in the dispatch front end and MQTT–ROS 2 bridge; physical integration and HIL testing remain in progress/planned.",
    lessonsLearned: "Retrofitting an existing electric buggy with Drive-by-Wire CAN provides a rigid, proven vehicular base while focusing development effort on autonomous control.",
    sourceCodeUrl: "https://github.com/TheCrazyDabi/Autonomous-First-Responder",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Project Scope": "Final-Year Main Project (Ongoing)",
      "Platform": "Electric aBAJA Rover Retrofit",
      "Edge Computing": "NVIDIA Jetson Orin Nano",
      "Autonomy Middleware": "ROS 2 Humble / Nav2",
      "Computer Vision": "YOLOv8 Instance Segmentation / PIDNet-S",
      "Vehicle Control": "Drive-by-Wire CAN (Steer, Brake, Throttle)",
      "Sensors": "Smartphone Camera, 6-DOF IMU, GPS",
      "Telemetry": "MQTT Mobile Dispatch Bridge"
    },
    isFeatured: true,
    orderIndex: 1,
    createdAt: "2025-10-10T09:00:00Z",
    updatedAt: "2026-03-01T12:00:00Z"
  },
  {
    id: "proj-baja-equinox",
    slug: "equinox-abaja-sae",
    title: "Suspension & Steering Development Team | Equinox (aBAJA SAE 2026)",
    category: "CAD & Mechanical",
    shortDescription: "Modelled suspension geometry in Lotus SHARK to analyse roll-centre migration, bump steer, and camber variation; worked on steering geometry and Ackermann principles in SolidWorks to reduce tyre scrub; configured multibody dynamics in MSC Adams Car.",
    status: "published",
    projectState: "In Development",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        caption: "CAD assembly wireframe of steering knuckle, tie-rods, and rack mounting bracket"
      }
    ],
    technologies: ["Lotus SHARK", "SolidWorks", "MSC Adams Car", "Suspension Kinematics", "Ackermann Principles", "Multibody Dynamics", "Vehicle Dynamics"],
    problemStatement: "All-terrain electric buggy racing demands minimal tyre scrub during tight cornering, optimized roll-centre migration, and controlled camber variation across aggressive vertical suspension articulation.",
    designProcess: "Modelled suspension geometry in Lotus SHARK to analyse roll-centre migration, bump steer, and camber variation. Worked on steering geometry and Ackermann principles in SolidWorks to help reduce tyre scrub. Configured multibody dynamics simulations in MSC Adams Car to evaluate handling and transient roll behaviour.",
    hardwareSoftwareArchitecture: "Lotus SHARK suspension kinematic synthesis -> SolidWorks 3D CAD parametric component design -> MSC Adams Car full-vehicle multibody dynamic simulations.",
    personalContribution: "Modelled suspension geometry in Lotus SHARK, calculated Ackermann steering angles in SolidWorks, and configured Adams Car multibody simulations.",
    challengesAndSolutions: [
      {
        challenge: "Bump-steer induced unintended yaw deviation during rapid suspension compression over rocky terrain.",
        solution: "Re-synthesized the steering rack mounting plane to ensure tie-rods were parallel and proportional to control arms throughout the dynamic travel envelope."
      }
    ],
    results: "Reduced simulated bump-steer to under 0.4° per 100mm travel and optimized Ackermann steering geometry to significantly mitigate tyre scrub in sharp turns.",
    lessonsLearned: "Iterative kinematic analysis in Lotus SHARK before CAD modeling prevents costly manufacturing rework in suspension uprights and linkages.",
    sourceCodeUrl: "",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Competition": "aBAJA SAE 2026 (Electric Buggy)",
      "Team": "Equinox Suspension & Steering Team",
      "Kinematics CAD": "Lotus SHARK",
      "3D Modeling": "Dassault Systèmes SOLIDWORKS",
      "Multibody Dynamics": "MSC Adams Car",
      "Steering Principle": "Optimized Ackermann Geometry"
    },
    isFeatured: true,
    orderIndex: 2,
    createdAt: "2025-09-01T15:00:00Z",
    updatedAt: "2026-02-18T16:00:00Z"
  },
  {
    id: "proj-silent-guardian",
    slug: "silent-guardian",
    title: "Silent Guardian: Acoustic Security Firewall",
    category: "Cybersecurity",
    shortDescription: "A simulated call-scam firewall built at Hack@Cooee 24-hour hackathon that analyses call audio locally in the browser, scores suspicious behaviour using two local threat engines, and redacts sensitive numbers.",
    status: "published",
    projectState: "Completed",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        caption: "Silent Guardian live acoustic analysis dashboard with sensitive number redaction and intercept banner"
      }
    ],
    technologies: ["JavaScript", "Node.js", "Express", "Web Speech API", "Vosk", "Whisper", "Local Speech Processing", "Acoustic Security"],
    problemStatement: "Social engineering and phone scam attacks deceive vulnerable users in real-time, while existing call-recording solutions transmit sensitive personal audio to external cloud servers.",
    designProcess: "Built a simulated call-scam firewall that analyses call audio locally in the browser and scores suspicious behaviour using two local threat engines. Designed a call simulation workflow with speech-to-text, a threat score, and a warning mode for suspicious calls. Added sensitive-number redaction for OTP/PIN/card-like numbers, scam evidence capture, and an intercept banner to confirm the call was silenced. Implemented evidence export for flagged calls, including audio, transcript, event log, and JSON summary; benign calls remain quiet with no evidence saved.",
    hardwareSoftwareArchitecture: "Browser Web Speech API / Vosk offline model -> Node.js/Express local engine -> Dual heuristic threat score calculation -> OTP/PIN/Card number regex redaction -> Forensic evidence packager.",
    personalContribution: "Call simulation pipeline, dual heuristic threat scoring logic, automated sensitive-number redaction, and forensic evidence packaging.",
    challengesAndSolutions: [
      {
        challenge: "Performing speech-to-text and threat classification in real-time with zero external cloud dependencies.",
        solution: "Utilized local in-browser speech processing with Vosk and Web Speech API, keeping audio strictly on the user's device."
      }
    ],
    results: "Built and demonstrated in a 24-hour hackathon sprint; accurately silences fraudulent calls, redacts OTPs/PINs, and generates full forensic evidence while keeping benign conversations completely private.",
    lessonsLearned: "Local-first client security architecture guarantees user privacy while providing instantaneous protection against social engineering attacks.",
    sourceCodeUrl: "https://github.com/TheCrazyDabi/Silent-Guardian",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Hackathon": "Hack@Cooee 24-Hour Hackathon",
      "Architecture": "100% Local In-Browser Audio Threat Engine",
      "Speech Recognition": "Web Speech API, Vosk, Whisper",
      "Backend": "Node.js & Express",
      "Privacy Guard": "Automatic OTP, PIN, and Card-number Redaction",
      "Forensics": "Audio, Transcript, Event Log & JSON Export"
    },
    isFeatured: true,
    orderIndex: 3,
    createdAt: "2025-06-25T12:00:00Z",
    updatedAt: "2026-01-10T14:00:00Z"
  },
  {
    id: "proj-mediarm",
    slug: "mediarm",
    title: "MediArm: 3-DOF Semi-Autonomous Robotic Arm | S6 Mini Project",
    category: "Robotics",
    shortDescription: "Designed a 3-DOF robotic manipulator prototype for positioning and assisted handling with ESP32, IBT-2 motor drivers, MG996R and SG90 servos, Flask web dashboard, emergency kill switch, and Vosk offline voice control.",
    status: "published",
    projectState: "Completed",
    coverImage: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
        caption: "Physical 3-DOF manipulator prototype during positioning and assisted-handling calibration"
      },
      {
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
        caption: "CAD assembly breakdown in SolidWorks highlighting joint pivot clearances"
      }
    ],
    technologies: ["ESP32", "MG996R", "SG90", "IBT-2 (BTS7960)", "Python", "Flask", "Vosk", "Serial Communication", "C++ / Arduino"],
    problemStatement: "Assistive robotic handling requires an affordable, semi-autonomous manipulator capable of precise positioning, hands-free offline voice control, and a fail-safe emergency kill switch.",
    designProcess: "Designed a 3-DOF robotic manipulator prototype for positioning and assisted-handling applications. Integrated ESP32 control, IBT-2 motor drivers, MG996R motors, and an SG90 servo for joint and gripper actuation. Built a Flask interface for manual joint control, gripper operation, voice-control activation, and an emergency kill switch. Implemented offline voice commands with Vosk and serial communication between the web interface and ESP32.",
    hardwareSoftwareArchitecture: "Flask Web Interface (Sliders, Gripper, Voice Activation, Kill Switch) -> Serial Protocol (115200 baud) -> ESP32 Microcontroller -> IBT-2 (BTS7960) H-Bridge Drivers -> MG996R & SG90 Servos.",
    personalContribution: "Complete mechanical linkage design, ESP32 firmware development, IBT-2 power driver wiring, Flask web controller, and Vosk offline voice command integration.",
    challengesAndSolutions: [
      {
        challenge: "Inductive noise and motor current spikes causing communication glitches on the ESP32 serial link.",
        solution: "Separated logic and actuator power rails using high-current IBT-2 motor drivers and decoupled power domains."
      }
    ],
    results: "Successfully validated multi-joint positioning via web slider interface and offline voice actuation with sub-100ms response time and instant emergency kill-switch safety.",
    lessonsLearned: "Integrating dedicated high-current motor drivers (IBT-2) ensures robust servo torque while protecting microcontroller logic.",
    sourceCodeUrl: "https://github.com/TheCrazyDabi/MediArm",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Project Scope": "S6 Engineering Mini Project",
      "Degrees of Freedom": "3 DOF + 1 Gripper Jaw",
      "Microcontroller": "ESP32 (Dual-Core 240MHz)",
      "Motor Drivers": "IBT-2 (BTS7960 43A H-Bridge Drivers)",
      "Actuation": "MG996R Metal Gear Servos & SG90 Gripper",
      "Voice Control": "Vosk Offline Speech Recognition",
      "Safety": "Hardware/Software Emergency Kill Switch"
    },
    isFeatured: true,
    orderIndex: 4,
    createdAt: "2025-08-15T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z"
  },
  {
    id: "proj-vybe",
    slug: "vybe",
    title: "VYBE: Swipe-Based Travel Discovery Web App",
    category: "Software & AI",
    shortDescription: "Developed at TinkerHub Calicut Travel Hackathon in a 15.5-hour sprint: a swipe-based tour package discovery web app with separate Traveller, Operator, and Admin interfaces.",
    status: "published",
    projectState: "Completed",
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        caption: "VYBE swipe-based tour package discovery interface for travellers"
      }
    ],
    technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript", "TinkerHub Calicut Hackathon"],
    problemStatement: "Traditional travel booking platforms present cluttered tables and text-heavy listings that lack engaging, intuitive discovery for young travellers.",
    designProcess: "Developed a demo concept where travellers swipe through tour packages posted by travel operators. Planned separate Traveller, Operator, and Admin interfaces to support package discovery and management. Built the web experience with Flask and a simple UI focused on a fast, clear hackathon demo flow during a 15.5-hour sprint with a two-member team.",
    hardwareSoftwareArchitecture: "Flask backend routing -> Jinja2 templated UI with gesture-based swipe card interactions -> Multi-role session management (Traveller, Operator, Admin).",
    personalContribution: "Flask web architecture, routing logic, role-based interfaces, and hackathon presentation demo.",
    challengesAndSolutions: [
      {
        challenge: "Delivering a fully functional multi-role demo within a tight 15.5-hour sprint window.",
        solution: "Focused on an agile MVP architecture with clear separation between Traveller swipe discovery and Operator listing submission."
      }
    ],
    results: "Completed and presented a working prototype at TinkerHub Calicut Travel Hackathon with interactive package swiping and operator management.",
    lessonsLearned: "Fast-paced hackathons require razor-sharp scope discipline to deliver an engaging, polished user experience.",
    sourceCodeUrl: "https://github.com/TheCrazyDabi/VYBE",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Event": "TinkerHub Calicut Travel Hackathon",
      "Sprint Duration": "15.5-Hour Rapid Sprint",
      "Team Size": "Two-Member Team",
      "Web Framework": "Python & Flask",
      "Frontend": "HTML5, CSS3, JavaScript"
    },
    isFeatured: true,
    orderIndex: 5,
    createdAt: "2025-04-10T12:00:00Z",
    updatedAt: "2026-02-15T09:00:00Z"
  },
  {
    id: "proj-veda",
    slug: "veda",
    title: "V.E.D.A.: Virtual Engine for Data & Analysis",
    category: "Software & AI",
    shortDescription: "A local-first, terminal-native personal AI assistant powered by Ollama with verified system health diagnostics, session persistence, and zero cloud telemetry.",
    status: "published",
    projectState: "Completed",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        caption: "V.E.D.A. verified diagnostic boot banner and token-by-token streaming REPL"
      }
    ],
    technologies: ["Python 3.11+", "Ollama", "SQLite (WAL mode)", "prompt_toolkit", "Rich CLI", "JSON-RPC", "Pytest"],
    problemStatement: "Cloud-based developer assistants compromise sensitive intellectual property and depend on continuous internet connectivity. Existing local LLM scripts frequently suffer from poor terminal rendering, lost chat contexts, and misleading fake connection indicators.",
    designProcess: "Engineered with a strict 'Truthful Diagnostics' paradigm: every checkmark in the startup banner represents a live TCP/HTTP probe. Built with a provider abstraction layer to allow seamless hot-swapping between Ollama, local models, and future inference engines.",
    hardwareSoftwareArchitecture: "Pure local pipeline: Terminal input handled via prompt_toolkit with syntax highlighting -> routed through session database in SQLite with write-ahead logging -> streamed to loopback Ollama daemon over HTTP -> streamed tokens rendered via Rich markdown engines with graceful Ctrl+C cancellation.",
    personalContribution: "Architected the complete system architecture, asynchronous token streaming engine, thread-safe cancellation tokens, SQLite session migration schema, and Windows ANSI console compatibility layer.",
    challengesAndSolutions: [
      {
        challenge: "Legacy Windows cmd.exe consoles crashed with UnicodeEncodeError when rendering UTF-8 box-drawing characters and status glyphs.",
        solution: "Engineered an automatic console capability detector with graceful ASCII character-set fallbacks."
      },
      {
        challenge: "In-flight token streaming could cause lockups if user hit Ctrl+C to stop long generations.",
        solution: "Decoupled model response streaming into a cancellable worker thread monitored by a cooperative cancellation event."
      }
    ],
    results: "Idle RAM footprint of <200MB, zero telemetry packets sent across external network interfaces, verified 98+ offline unit tests passing without needing active Ollama connection.",
    lessonsLearned: "Engineering honest CLI tooling with rock-solid error boundaries delivers a vastly superior developer experience compared to brittle graphical wrappers.",
    sourceCodeUrl: "https://github.com/TheCrazyDabi/VEDA",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Runtime Engine": "Python 3.11 / 3.12",
      "Model Host": "Ollama (qwen2.5-coder / llama3)",
      "Database": "SQLite with WAL journaling",
      "Security": "Strict loopback (127.0.0.1) bind, Redacted credential logs",
      "Idle Memory": "~180 MB RAM"
    },
    isFeatured: true,
    orderIndex: 6,
    createdAt: "2025-06-01T08:00:00Z",
    updatedAt: "2026-01-20T11:00:00Z"
  },
  {
    id: "proj-netsentinel",
    slug: "netsentinel-v2",
    title: "NetSentinel v2.0: Terminal WiFi Packet Sniffer & Threat Detector",
    category: "Cybersecurity",
    shortDescription: "Terminal-based Python 802.11 packet inspection and rogue AP/deauthentication anomaly detection with real-time heuristic alarms.",
    status: "published",
    projectState: "Completed",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        caption: "NetSentinel v2.0 live terminal monitor detecting high-rate deauthentication floods"
      }
    ],
    technologies: ["Python 3", "Scapy", "802.11 Raw Sockets", "Packet Heuristics", "Rich CLI", "Linux Monitor Mode", "Network Security"],
    problemStatement: "Wireless cyber-physical threats like deauthentication floods and evil-twin access points disrupt robotics telemetry without triggering traditional IP-layer firewalls.",
    designProcess: "Constructed a zero-overhead raw socket listener using Scapy and Linux mac80211 monitor interfaces, evaluating sliding-window packet frequencies against known attack signatures.",
    hardwareSoftwareArchitecture: "Wireless NIC in RF monitor mode -> raw packet ingestion -> frame type parser -> anomaly engine -> terminal alert dashboard.",
    personalContribution: "Architected raw 802.11 frame parser, deauth threshold detection state machine, and curses/Rich terminal dashboard.",
    challengesAndSolutions: [
      {
        challenge: "High-density packet streams dropped frames during packet parsing.",
        solution: "Decoupled packet capture into a ring-buffer consumer thread with lockless queues."
      }
    ],
    results: "Detected simulated deauth attacks within 180ms with 0% missed flood bursts.",
    lessonsLearned: "Physical layer and link-layer security cannot be delegated entirely to upper-layer TLS when wireless links govern robotic actuators.",
    sourceCodeUrl: "https://github.com/TheCrazyDabi/NetSentinel-v2",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Interface": "802.11 a/b/g/n/ac Monitor Mode",
      "Engine": "Python Scapy + C-accelerated pcap",
      "Heuristics": "Deauth flood, Beacon anomaly, Evil twin detection",
      "Alerting": "Rich live terminal UI with ANSI color codes"
    },
    isFeatured: true,
    orderIndex: 7,
    createdAt: "2025-05-12T14:00:00Z",
    updatedAt: "2026-01-15T18:00:00Z"
  },
  {
    id: "proj-rakuzan-soc",
    slug: "rakuzan-soc",
    title: "Rakuzan SOC: Security Operations Dashboard & Secret Scanner",
    category: "Cybersecurity",
    shortDescription: "High-throughput cybersecurity operations dashboard with automated git repository entropy analysis to catch leaked credentials early.",
    status: "published",
    projectState: "Completed",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        caption: "Rakuzan SOC real-time entropy scanner dashboard showing flagged token alerts"
      }
    ],
    technologies: ["FastAPI", "React / TypeScript", "Git Hook Engine", "Shannon Entropy Scanner", "Regex Tokenizer", "Docker", "Tailwind CSS"],
    problemStatement: "Engineering teams inadvertently commit high-entropy tokens, private SSH keys, and cloud credentials into robotics firmware repositories.",
    designProcess: "Engineered pre-commit and CI scanning workers calculating Shannon entropy on commit diffs combined with pattern matching for 120+ credential formats.",
    hardwareSoftwareArchitecture: "Git webhooks -> FastAPI ingestion -> asynchronous worker queue -> Redis caching -> React real-time SOC dashboard.",
    personalContribution: "Implemented the core Shannon entropy formula, pattern database for cloud keys, and interactive React dashboard.",
    challengesAndSolutions: [
      {
        challenge: "High false-positive rate on compiled binary assets and base64 hashes.",
        solution: "Implemented mime-type file filtering and Shannon entropy threshold calibration."
      }
    ],
    results: "Scanned 10,000+ commit lines in <1.2s with verified detection of AWS, GitHub, and private key tokens.",
    lessonsLearned: "Preventive automated pre-commit scanning saves orders of magnitude more effort than post-incident credential revocation.",
    sourceCodeUrl: "https://github.com/TheCrazyDabi/Rakuzan-SOC",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Scanner Core": "Python Shannon Entropy + Regex Engine",
      "Dashboard": "React 18 + Tailwind CSS",
      "Backend API": "FastAPI Async Python",
      "Deployment": "Docker Containerized"
    },
    isFeatured: true,
    orderIndex: 8,
    createdAt: "2025-07-20T11:00:00Z",
    updatedAt: "2026-02-05T16:00:00Z"
  }
];

export const initialCertifications: Certification[] = [
  {
    id: "cert-nit-calicut",
    title: "Advanced Industrial Automation Internship",
    issuingOrganization: "National Institute of Technology (NIT) Calicut",
    issueDate: "2024-07",
    verificationUrl: "https://www.nitc.ac.in",
    credentialId: "NITC-IIA-2024",
    certificateFileUrl: "",
    status: "published"
  },
  {
    id: "cert-techmaghi",
    title: "Advanced Ethical Hacking & Cyber Defense Internship",
    issuingOrganization: "Techmaghi",
    issueDate: "2024-07",
    verificationUrl: "https://techmaghi.com",
    credentialId: "TM-CYBER-8841",
    certificateFileUrl: "",
    status: "published"
  },
  {
    id: "cert-offenso",
    title: "The Cyber Bootcamp — Cybersecurity Defence Frameworks",
    issuingOrganization: "Offenso Hackers Academy",
    issueDate: "2025-06",
    verificationUrl: "https://offensohackersacademy.in",
    credentialId: "OHA-BOOTCAMP-2025",
    certificateFileUrl: "",
    status: "published"
  },
  {
    id: "cert-ros2",
    title: "ROS 2 Basics & Robot Operating System Architecture",
    issuingOrganization: "Open Robotics / ConstructSim",
    issueDate: "2025-07",
    verificationUrl: "https://www.theconstruct.ai",
    credentialId: "ROS2-ENG-8491",
    certificateFileUrl: "",
    status: "published"
  },
  {
    id: "cert-cswa",
    title: "Certified SOLIDWORKS Associate (CSWA) - Mechanical Design",
    issuingOrganization: "Dassault Systèmes",
    issueDate: "2025-03",
    verificationUrl: "https://www.solidworks.com/certifications",
    credentialId: "C-CSWA-90412",
    certificateFileUrl: "",
    status: "published"
  }
];

export const initialExperiments: Experiment[] = [
  {
    id: "exp-ik-solver",
    title: "Analytical 3D Inverse Kinematics Geometric Solver",
    category: "CAD Simulation",
    date: "2026-01",
    summary: "Formulated and coded closed-form trigonometric solutions for articulated linkages, eliminating iterative Jacobian computational overhead on low-power microcontrollers.",
    technicalDetails: "Implemented in pure C++ on an ESP32. Compares analytical geometric decoupling against numerical pseudo-inverse methods, reducing calculation time from 4.8ms down to 0.12ms.",
    tags: ["Kinematics", "C++", "Trigonometry", "ESP32"],
    status: "published"
  },
  {
    id: "exp-can-sniffer",
    title: "Dual CAN-Bus 2.0B Sniffer with MCP2515 Transceiver",
    category: "Firmware Test",
    date: "2025-11",
    summary: "Built an embedded diagnostic bridge capturing real-time telemetry frames between buggy sensors and steering angle encoders at 500 kbps.",
    technicalDetails: "Constructed an isolated SPI hardware bridge using an ESP32 and MCP2515 CAN controller. Logged frame IDs, mask filters, and timing jitter under heavy bus loads.",
    tags: ["CAN-Bus", "SPI", "Embedded C", "Telemetry"],
    status: "published"
  },
  {
    id: "exp-yolo-seg",
    title: "YOLOv8 Instance Segmentation for Unstructured Pathways",
    category: "Computer Vision",
    date: "2025-10",
    summary: "Trained and annotated a custom YOLOv8 instance segmentation dataset using Roboflow to mask dirt, paved, and grass boundary areas on campus grounds.",
    technicalDetails: "Optimized model inference on edge hardware with TensorRT quantization, achieving 38 FPS inference rate on NVIDIA Jetson Orin Nano.",
    tags: ["YOLOv8", "Roboflow", "Computer Vision", "Jetson Orin"],
    status: "published"
  },
  {
    id: "exp-lotus-suspension",
    title: "Lotus SHARK Suspension Roll-Centre & Camber Analysis",
    category: "Mechanism Test",
    date: "2025-08",
    summary: "Modeled front double wishbone suspension kinematics in Lotus SHARK to analyze roll-centre migration and eliminate bump steer.",
    technicalDetails: "Iterated control arm hardpoint coordinates across 150mm dynamic wheel travel envelope to maintain minimal scrub radius and predictable cornering grip.",
    tags: ["Lotus SHARK", "Vehicle Dynamics", "Kinematics", "Suspension"],
    status: "published"
  }
];

export const initialSkills: Skill[] = [
  // Robotics & OS
  {
    id: "sk-ros2",
    name: "ROS 2 & Nav2",
    category: "Robotics & Automation",
    level: "Advanced",
    tools: ["ROS 2 Humble", "Nav2 Stack", "Nodes & Topics", "URDF / Xacro", "TF2 Transforms", "Rviz2"],
    description: "Distributed autonomous robot navigation, coordinate frame transformations, and costmap planning.",
    orderIndex: 1
  },
  {
    id: "sk-os-linux",
    name: "Linux & Arduino Environments",
    category: "Robotics & Automation",
    level: "Advanced",
    tools: ["Ubuntu Linux", "Bash Scripting", "Arduino IDE", "Embedded Toolchains", "udev Rules"],
    description: "Linux systems administration for autonomous rovers, hardware serial rules, and Arduino prototyping.",
    orderIndex: 2
  },

  // Embedded Systems
  {
    id: "sk-esp32",
    name: "ESP32 & Microcontroller Firmware",
    category: "Embedded Systems",
    level: "Advanced",
    tools: ["ESP32", "Arduino Framework", "Serial Communication", "PWM Timers", "ADC / DAC"],
    description: "Dual-core firmware programming, serial communication protocols, and low-latency motor control.",
    orderIndex: 3
  },
  {
    id: "sk-can-bus",
    name: "CAN Communication & Motor Control",
    category: "Embedded Systems",
    level: "Advanced",
    tools: ["CAN Communication", "IBT-2 (BTS7960)", "Motor Control", "H-Bridge Drivers", "MG996R", "SG90"],
    description: "Drive-by-Wire CAN communication, high-current BTS7960 H-bridges, and servo actuation.",
    orderIndex: 4
  },

  // Engineering Design & MBD
  {
    id: "sk-solidworks",
    name: "SolidWorks & Parametric CAD",
    category: "CAD & Mechanical",
    level: "Advanced",
    tools: ["SolidWorks", "3D Modeling", "Assembly Mates", "GD&T", "Ackermann Kinematics", "Sheet Metal"],
    description: "Parametric CAD design of robotic linkages, steering knuckles, chassis mounts, and 3D printing tolerances.",
    orderIndex: 5
  },
  {
    id: "sk-mbd-adams",
    name: "Multibody Dynamics & FEA",
    category: "CAD & Mechanical",
    level: "Proficient",
    tools: ["ANSYS (Basics)", "MSC Adams (Basics)", "MSC Adams Car", "Structural Analysis"],
    description: "Multibody dynamics simulation to evaluate handling, transient roll behavior, and stress points.",
    orderIndex: 6
  },

  // Vehicle Dynamics
  {
    id: "sk-vehicle-dynamics",
    name: "Vehicle Dynamics & Kinematics",
    category: "CAD & Mechanical",
    level: "Advanced",
    tools: ["Lotus SHARK", "Suspension Kinematics", "Roll-Centre Migration", "Bump Steer", "Camber Variation"],
    description: "Suspension hardpoint optimization, Ackermann steering angle calculation to reduce tyre scrub, and handling dynamics.",
    orderIndex: 7
  },

  // Computer Vision
  {
    id: "sk-cv-yolo",
    name: "YOLOv8 & Roboflow Vision",
    category: "AI & Computer Vision",
    level: "Proficient",
    tools: ["YOLOv8", "Roboflow", "Instance Segmentation", "Dataset Annotation", "PIDNet-S (In progress)"],
    description: "Real-time edge computer vision, unstructured pathway segmentation, and model deployment on Jetson Orin Nano.",
    orderIndex: 8
  },

  // Cybersecurity
  {
    id: "sk-cybersecurity",
    name: "Cybersecurity & Threat Defense",
    category: "Cybersecurity",
    level: "Proficient",
    tools: ["Threat Modelling", "Network Attack Vectors", "System Hardening", "Burp Suite", "Acoustic Security"],
    description: "Securing cyber-physical automation, network penetration testing, credential leakage prevention, and acoustic threat firewalls.",
    orderIndex: 9
  },

  // Programming & Web
  {
    id: "sk-programming-languages",
    name: "Programming Languages & Frameworks",
    category: "Core Engineering & Tools",
    level: "Advanced",
    tools: ["Python", "Java", "JavaScript", "HTML", "CSS", "MATLAB", "Flask"],
    description: "Full-stack systems programming, Flask web interfaces, MATLAB control simulation, and automation scripts.",
    orderIndex: 10
  }
];

export const initialMilestones: Milestone[] = [
  {
    id: "ms-saintgits",
    year: "2023 - 2027",
    title: "B.Tech in Robotics and Automation",
    subtitle: "Saintgits College of Engineering | APJ Abdul Kalam Technological University",
    organization: "APJ Abdul Kalam Technological University (KTU)",
    location: "Kottayam, Kerala",
    description: "Comprehensive undergraduate engineering degree combining CAD modeling, multibody simulation, embedded systems, autonomous robotics, computer vision, and cybersecurity.",
    highlights: [
      "Final-Year Main Project: Autonomous First-Responder (Low-Cost Vision-Inertial Navigation)",
      "S6 Mini Project: MediArm (3-DOF Semi-Autonomous Robotic Arm with Flask & Vosk)",
      "Core coursework in Robot Kinematics, Vehicle Dynamics, Industrial Automation, and Embedded Systems"
    ],
    category: "Education",
    orderIndex: 1
  },
  {
    id: "ms-nit-calicut",
    year: "June 2024 - July 2024",
    title: "Advanced Industrial Automation Internship",
    subtitle: "National Institute of Technology (NIT) Calicut",
    organization: "NIT Calicut",
    location: "Calicut, Kerala, India",
    description: "Studied Industry 5.0 and IoRT (Internet of Robotic Things) frameworks for secure data communication between robotic nodes and web interfaces.",
    highlights: [
      "Explored Industry 5.0 human-robot collaborative architectures and IoRT protocols",
      "Investigated secure data communication between distributed robotic nodes and remote web dashboards"
    ],
    category: "Leadership",
    orderIndex: 2
  },
  {
    id: "ms-techmaghi",
    year: "June 2024 - July 2024",
    title: "Advanced Ethical Hacking & Cyber Defense Internship",
    subtitle: "Techmaghi Cyber Defense Program",
    organization: "Techmaghi",
    location: "Remote",
    description: "Covered threat modelling, network attack vectors, system hardening, and web-application penetration-testing simulations using Burp Suite.",
    highlights: [
      "Simulated real-world web-application penetration testing using Burp Suite",
      "Conducted threat modelling and system hardening across networked environments"
    ],
    category: "Leadership",
    orderIndex: 3
  },
  {
    id: "ms-offenso",
    year: "June 2025",
    title: "The Cyber Bootcamp — Cybersecurity Defence Frameworks",
    subtitle: "Offenso Hackers Academy",
    organization: "Offenso Hackers Academy",
    location: "Online",
    description: "Studied cybersecurity defence frameworks, exploit methodologies, and vulnerability assessment across modern software and device architectures.",
    highlights: [
      "In-depth analysis of exploit methodologies and vulnerability triage",
      "Applied defensive security frameworks to protect critical cyber-physical systems"
    ],
    category: "Leadership",
    orderIndex: 4
  },
  {
    id: "ms-equinox-baja",
    year: "2025 - 2026",
    title: "Suspension & Steering Development Team | Equinox (aBAJA SAE 2026)",
    subtitle: "Collegiate All-Terrain Electric Buggy Team",
    organization: "Saintgits Motorsports Team Equinox",
    location: "Saintgits College of Engineering",
    description: "Modeled suspension kinematics in Lotus SHARK, engineered Ackermann steering in SolidWorks to reduce tyre scrub, and evaluated multibody dynamics in MSC Adams Car.",
    highlights: [
      "Modelled suspension geometry in Lotus SHARK to analyze roll-centre migration, bump steer, and camber variation",
      "Configured multibody dynamics simulations in MSC Adams Car to evaluate handling and transient roll behaviour"
    ],
    category: "Competition",
    orderIndex: 5
  },
  {
    id: "ms-hack-cooee",
    year: "2025",
    title: "Silent Guardian: Acoustic Security Firewall — Hack@Cooee",
    subtitle: "24-Hour Hackathon Sprint",
    organization: "Hack@Cooee",
    location: "Kerala, India",
    description: "Built a simulated call-scam acoustic firewall that analyses call audio locally in-browser with threat scoring, sensitive-number redaction, and forensic evidence export.",
    highlights: [
      "Engineered 100% local in-browser acoustic threat scoring using Vosk and Web Speech API",
      "Built automated OTP/PIN/card-number redaction and forensic evidence export"
    ],
    category: "Competition",
    orderIndex: 6
  },
  {
    id: "ms-tinkerhub-vybe",
    year: "2025",
    title: "VYBE: Travel Discovery Web App — TinkerHub Calicut Hackathon",
    subtitle: "15.5-Hour Rapid Hackathon Sprint",
    organization: "TinkerHub Calicut",
    location: "Calicut, Kerala",
    description: "Developed a swipe-based tour package discovery web app with separate Traveller, Operator, and Admin interfaces in a two-member team sprint.",
    highlights: [
      "Built an intuitive card-swiping concept for tour discovery in a 15.5-hour sprint",
      "Engineered Flask backend with role-based Traveller, Operator, and Admin portals"
    ],
    category: "Competition",
    orderIndex: 7
  },
  {
    id: "ms-school-plus-two",
    year: "2022 - 2023",
    title: "Plus Two Higher Secondary (Physics, Mathematics, Chemistry, Biology)",
    subtitle: "St. Francis English Medium School (ICSE)",
    organization: "CISCE / ICSE",
    location: "Kerala, India",
    description: "Rigorous higher secondary education with a focus on Physics, Mathematics, Chemistry, and Biology providing a robust analytical foundation for engineering.",
    highlights: [
      "Excellence in Mathematics, Physics, and foundational sciences",
      "Active participation in science exhibitions and technical clubs"
    ],
    category: "Education",
    orderIndex: 8
  },
  {
    id: "ms-school-tenth",
    year: "2020 - 2021",
    title: "Tenth Grade (ICSE)",
    subtitle: "St. Francis English Medium School (ICSE)",
    organization: "CISCE / ICSE",
    location: "Kerala, India",
    description: "Completed secondary education under the ICSE curriculum.",
    highlights: [
      "Strong academic foundation in science, computer applications, and mathematics"
    ],
    category: "Education",
    orderIndex: 9
  }
];

export const initialMediaItems: MediaItem[] = [
  {
    id: "med-1",
    fileName: "mediarm-prototype.jpg",
    fileUrl: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
    fileType: "image",
    fileSize: 428000,
    altText: "MediArm 3-DOF articulated robotic arm prototype",
    category: "projects",
    uploadedAt: "2026-01-15T10:00:00Z"
  },
  {
    id: "med-2",
    fileName: "solidworks-cad-assembly.jpg",
    fileUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    fileType: "image",
    fileSize: 382000,
    altText: "CAD assembly wireframe of vehicle steering knuckle and suspension",
    category: "projects",
    uploadedAt: "2026-01-20T12:00:00Z"
  },
  {
    id: "med-3",
    fileName: "first-responder-rover.jpg",
    fileUrl: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80",
    fileType: "image",
    fileSize: 350000,
    altText: "Autonomous First-Responder rover buggy chassis",
    category: "projects",
    uploadedAt: "2026-02-01T14:00:00Z"
  }
];
