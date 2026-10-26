import { Project } from '../types/content';

export const archivedProjects: Project[] = [
  {
    id: "proj-first-responder",
    slug: "autonomous-first-responder",
    title: "Autonomous First-Responder: Vision-Inertial Navigation for Campus Emergencies",
    category: "Robotics",
    shortDescription: "Developing a low-cost autonomous emergency-response rover by retrofitting an electric aBAJA buggy for campus navigation with NVIDIA Jetson Orin Nano, ROS 2/Nav2, Drive-by-Wire CAN integration, and YOLOv8.",
    status: "published",
    projectState: "In Development",
    coverImage: "assets/projects/first-responder-cover.svg",
    galleryImages: [
      {
        url: "assets/projects/first-responder-cover.svg",
        caption: "Global Nav2 Costmap, Waypoint Trajectory & YOLOv8 Pathway Instance Segmentation"
      },
      {
        url: "assets/projects/first-responder-arch.svg",
        caption: "End-to-End Emergency Dispatch & Drive-by-Wire Mechatronic Architecture"
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
    coverImage: "assets/projects/abaja-2026-workshop.png",
    galleryImages: [
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
    coverImage: "assets/projects/silent-guardian-cover.svg",
    galleryImages: [
      {
        url: "assets/projects/silent-guardian-cover.svg",
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
    coverImage: "assets/projects/mediarm-schematic.svg",
    galleryImages: [
      {
        url: "assets/projects/mediarm-schematic.svg",
        caption: "MediArm 3-DOF manipulator kinematics, IBT-2 43A motor drivers, ESP32 web controller, and emergency E-Stop"
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
    coverImage: "assets/projects/vybe-discovery-ui.svg",
    galleryImages: [
      {
        url: "assets/projects/vybe-discovery-ui.svg",
        caption: "VYBE swipe-based tour package discovery interface, multi-role session flow, and TinkerHub Calicut sprint stats"
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
    id: "proj-netsentinel",
    slug: "netsentinel-v2",
    title: "NetSentinel v2.0: Terminal WiFi Packet Sniffer & Threat Detector",
    category: "Cybersecurity",
    shortDescription: "Terminal-based Python 802.11 packet inspection and rogue AP/deauthentication anomaly detection with real-time heuristic alarms.",
    status: "published",
    projectState: "Completed",
    coverImage: "assets/projects/netsentinel-terminal.svg",
    galleryImages: [
      {
        url: "assets/projects/netsentinel-terminal.svg",
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
    orderIndex: 6,
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
    coverImage: "assets/projects/rakuzan-soc-dashboard.svg",
    galleryImages: [
      {
        url: "assets/projects/rakuzan-soc-dashboard.svg",
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
    orderIndex: 7,
    createdAt: "2025-07-20T11:00:00Z",
    updatedAt: "2026-02-05T16:00:00Z"
  }
];
