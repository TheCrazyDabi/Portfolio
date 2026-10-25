import { Project, Certification, Experiment, Skill, Milestone, Profile, SiteSettings, MediaItem } from '../types/content';

export const initialProfile: Profile = {
  name: "Vasudev Saras K M",
  title: "Robotics & Automation Engineer",
  college: "Saintgits College of Engineering",
  degree: "B.Tech in Robotics & Automation Engineering",
  headline: "Engineering Intelligence. Designing Motion.",
  introduction: "I explore the intersection of robotics, embedded systems, intelligent software, and mechanical design to turn engineering ideas into working systems.",
  aboutBio: "Undergraduate engineer in Robotics & Automation at Saintgits College of Engineering. I focus on bridging physical mechanics with deterministic computing—from designing CAD linkages and Ackermann steering geometries in SolidWorks to architecting real-time embedded firmware on STM32/ESP32, autonomous control with ROS 2, and edge AI systems. I treat engineering as a craft of precision, where every tolerance, voltage rail, and packet header is accounted for.",
  publicEmail: "vasudevsaraskm@gmail.com",
  githubUrl: "https://github.com/thecrazydabi",
  linkedinUrl: "https://linkedin.com/in/vasudev-saras-km",
  resumeUrl: "", // Only shown when verified file is uploaded
  profileImageUrl: "",
  location: "Kerala, India",
  statusIndicator: "Available for Robotics & Embedded Systems Roles"
};

export const initialSiteSettings: SiteSettings = {
  siteTitle: "Vasudev Saras K M | Robotics & Automation Engineer",
  metaDescription: "Engineering Intelligence. Designing Motion. Explore robotics, mechanical CAD, embedded systems, and autonomous applications by Vasudev Saras K M.",
  showCertifications: true,
  showExperiments: true,
  showMilestones: true,
  showSystemArchitecture: true,
  enableHeroAnimations: true,
  githubRepoUrl: "https://github.com/thecrazydabi/Portfolio"
};

export const initialProjects: Project[] = [
  {
    id: "proj-mediarm",
    slug: "mediarm",
    title: "MediArm: Articulated Assistive Robotic Manipulator",
    category: "Robotics",
    shortDescription: "A multi-DOF robotic manipulator engineered for assistive medical supply handling with analytical inverse kinematics and low-latency web teleoperation.",
    status: "published",
    projectState: "Prototype Validated",
    coverImage: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
        caption: "Physical manipulator prototype during Cartesian trajectory calibration"
      },
      {
        url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
        caption: "CAD assembly breakdown in SolidWorks highlighting joint pivot clearances"
      }
    ],
    technologies: ["C++ / Embedded C", "ESP32", "Analytical Inverse Kinematics", "SolidWorks", "WebSockets", "Python / FastAPI", "3D Printing (PETG)"],
    problemStatement: "Commercial healthcare manipulators are cost-prohibitive for small clinics, while open-source educational arms lack load-carrying rigidity, closed-loop position stability, and intuitive remote teleoperation.",
    designProcess: "Engineered in SolidWorks from foundational free-body diagrams to calculate joint torque margins under maximum payload extension. Designed dual-bearing elbow and shoulder pivots, 3D printed with reinforced PETG infill to minimize structural deflection.",
    hardwareSoftwareArchitecture: "Layered architecture: Top layer runs a browser-based Cartesian jog interface communicating via WebSockets to a local gateway. The gateway solves 3D analytical inverse kinematics and streams 16-bit PWM pulse durations to an ESP32 micro-controller driving high-torque coreless digital servos.",
    personalContribution: "Spearheaded complete mechanical linkage CAD modeling, structural stress calculations, analytical inverse kinematic trigonometry in C++, PCB power distribution circuit layout, and firmware development.",
    challengesAndSolutions: [
      {
        challenge: "Simultaneous multi-joint acceleration caused inductive voltage sags, triggering brownout resets on the ESP32 logic rail.",
        solution: "Separated logic and servo power rails using an optocoupled buck converter and deployed a 4700µF low-ESR electrolytic capacitor reservoir to buffer peak transients."
      },
      {
        challenge: "Mechanical backlash in geared servos compounded angular error at the end-effector tip over reach distances > 350mm.",
        solution: "Implemented software backlash compensation calibration curves and optimized gear teeth mesh tolerances in CAD."
      }
    ],
    results: "Achieved repeatable ±1.8 mm positioning accuracy at 350 mm reach radius with a tested payload capacity of 420 grams, maintaining sub-45ms latency over local teleoperation.",
    lessonsLearned: "Mechanical stiffness is as critical as control software; decoupling power supply domains early saves dozens of firmware debugging hours.",
    sourceCodeUrl: "https://github.com/thecrazydabi/MediArm",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "Degrees of Freedom": "5 DOF + 1 Gripper Jaw",
      "Reach Radius": "385 mm",
      "Maximum Payload": "420 g",
      "Actuation": "High-Torque Metal Gear Digital Servos",
      "Microcontroller": "ESP32 dual-core 240MHz",
      "Control Protocol": "WebSocket JSON over 2.4GHz 802.11n",
      "Primary Material": "PETG / Carbon-Fiber Reinforced PLA"
    },
    isFeatured: true,
    orderIndex: 1,
    createdAt: "2025-08-15T10:00:00Z",
    updatedAt: "2026-02-10T14:30:00Z"
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
    sourceCodeUrl: "https://github.com/thecrazydabi/VEDA",
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
    orderIndex: 2,
    createdAt: "2025-06-01T08:00:00Z",
    updatedAt: "2026-01-20T11:00:00Z"
  },
  {
    id: "proj-vybe",
    slug: "vybe",
    title: "VYBE: AI Travel Discovery & Marketplace",
    category: "Software & AI",
    shortDescription: "Full-stack travel discovery marketplace featuring gesture-based trip matching, verified operator onboarding, and transparent itinerary budgeting.",
    status: "published",
    projectState: "Completed",
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        caption: "VYBE discovery UI with swipe cards and interactive itinerary breakdown"
      }
    ],
    technologies: ["Flask 3.1", "Python", "Supabase PostgreSQL", "SQLAlchemy 2.0", "Cloudflare R2", "Vercel Serverless", "Android Native (Jetpack Compose)", "Razorpay Webhooks"],
    problemStatement: "Travel discovery is fragmented across clunky search engines loaded with deceptive pricing and unverified operators. Modern travellers crave an interactive, mood-based discovery format backed by verified operators.",
    designProcess: "Constructed dual-tier client interfaces (Responsive PWA + Native Android APK) backed by a serverless WSGI Flask backend. Designed strict multi-role relational schemas enforcing verified operator credential review before package publication.",
    hardwareSoftwareArchitecture: "Vercel Serverless Python WSGI routing -> Flask Blueprints -> SQLAlchemy 2.0 ORM -> Supabase Cloud PostgreSQL (Transaction Pooler port 6543) -> Media assets stored in Cloudflare R2 S3-compatible object buckets.",
    personalContribution: "Engineered the full-stack Flask architecture, Supabase database schema with Row-Level Security, Razorpay payment verification webhooks, and the Android client bridge.",
    challengesAndSolutions: [
      {
        challenge: "Serverless lambda cold-starts and connection limit exhaustion when spiking multiple concurrent DB queries.",
        solution: "Switched to Supabase transaction pooler on port 6543 and implemented pre-warmed database engine pooling."
      }
    ],
    results: "98 automated integration tests passing, sub-800ms global serverless response latency, live multi-platform deployment on Vercel.",
    lessonsLearned: "Designing clear relational data boundaries and strict role permissions upfront prevents systemic architectural debt.",
    sourceCodeUrl: "https://github.com/thecrazydabi/VYBE",
    demoUrl: "https://vybe-travel-marketplace.vercel.app",
    documentationUrl: "",
    specifications: {
      "Backend Framework": "Flask 3.1 + SQLAlchemy 2.0",
      "Database": "Supabase Cloud PostgreSQL 15",
      "Deployment": "Vercel Serverless (Python 3.11 Runtime)",
      "Object Storage": "Cloudflare R2 Bucket",
      "Payment Gateway": "Razorpay Signature Verification"
    },
    isFeatured: true,
    orderIndex: 3,
    createdAt: "2025-04-10T12:00:00Z",
    updatedAt: "2026-02-15T09:00:00Z"
  },
  {
    id: "proj-baja-sae",
    slug: "baja-sae-2027",
    title: "Baja SAE 2027: Steering Kinematics & Chassis Integration",
    category: "CAD & Mechanical",
    shortDescription: "Kinematic synthesis and CAD engineering of an Ackermann steering mechanism, suspension uprights, and CAN-bus telemetry integration for an all-terrain vehicle.",
    status: "published",
    projectState: "In Development",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        caption: "CAD assembly wireframe of steering knuckle, tie-rods, and rack mounting bracket"
      }
    ],
    technologies: ["SolidWorks", "Ackermann Kinematics", "Finite Element Analysis (FEA)", "CAN-Bus 2.0B", "Telemetry Electronics", "GD&T", "Additive Prototyping"],
    problemStatement: "Off-road all-terrain racing demands minimum turn radii and zero bump-steer across 150mm of vertical wheel articulation, while enduring violent dynamic impact loads without structural deformation.",
    designProcess: "Calculated ideal Ackermann geometry curves based on track width and wheelbase. Modeled complete 3D parametric components in SolidWorks (F1 Model.SLDPRT), iteratively optimizing tie rod length and rack height to align instantaneous steering center with suspension A-arm sweep planes.",
    hardwareSoftwareArchitecture: "Mechanical system paired with on-vehicle embedded telemetry: Hall-effect steering angle sensors and wheel-speed encoders feeding an STM32 data logger transmitting over a 500kbps CAN-bus network to an onboard telemetry display.",
    personalContribution: "Lead CAD designer for the steering assembly, tie-rod linkage kinematic calculations, SolidWorks parametric models, and sensor bracket placement.",
    challengesAndSolutions: [
      {
        challenge: "Bump-steer induced unintended yaw deviation during rapid damper compression over rocky terrain.",
        solution: "Re-synthesized the steering rack mounting plane to ensure tie-rods were exactly parallel and proportional to upper and lower control arms throughout the dynamic travel envelope."
      }
    ],
    results: "Reduced simulated bump-steer to under 0.4° per 100mm travel and cut knuckle mass by 14% through structural pocketing in SolidWorks while preserving safety factor > 2.2.",
    lessonsLearned: "Dynamic suspension kinematics cannot be treated in isolation; mechanical geometry and sensor placements must be co-engineered.",
    sourceCodeUrl: "",
    demoUrl: "",
    documentationUrl: "",
    specifications: {
      "CAD Platform": "Dassault Systèmes SOLIDWORKS",
      "Steering Principle": "78% Modified Ackermann Geometry",
      "Wheel Travel": "150 mm dynamic vertical travel",
      "Telemetry Bus": "CAN 2.0B at 500 kbps",
      "Knuckle Material": "Al 6061-T6 (Target Machining Specification)"
    },
    isFeatured: true,
    orderIndex: 4,
    createdAt: "2025-09-01T15:00:00Z",
    updatedAt: "2026-02-18T16:00:00Z"
  }
];

export const initialCertifications: Certification[] = [
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
  },
  {
    id: "cert-embedded",
    title: "Embedded Systems & Bare-Metal C Programming",
    issuingOrganization: "ARM University Program / FastBit",
    issueDate: "2024-11",
    verificationUrl: "https://www.arm.com",
    credentialId: "ARM-EMB-1038",
    certificateFileUrl: "",
    status: "published"
  },
  {
    id: "cert-iot-sec",
    title: "Cyber-Physical Systems & IoT Device Security",
    issuingOrganization: "IEEE Technical Society",
    issueDate: "2024-08",
    verificationUrl: "https://www.ieee.org",
    credentialId: "IEEE-CPS-7721",
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
    summary: "Formulated and coded closed-form trigonometric solutions for 5-axis articulated linkages, eliminating iterative Jacobian computational overhead on low-power microcontrollers.",
    technicalDetails: "Implemented in pure C++ on an ESP32. Compares analytical geometric decoupling against numerical pseudo-inverse methods, reducing single-target calculation time from 4.8ms down to 0.12ms.",
    tags: ["Kinematics", "C++", "Trigonometry", "ESP32"],
    status: "published"
  },
  {
    id: "exp-can-sniffer",
    title: "Dual CAN-Bus 2.0B Sniffer with MCP2515 Transceiver",
    category: "Firmware Test",
    date: "2025-11",
    summary: "Built an embedded diagnostic bridge capturing real-time telemetry frames between chassis sensors and steering angle encoders at 500 kbps.",
    technicalDetails: "Constructed an isolated SPI hardware bridge using an ESP32 and MCP2515 CAN controller. Logged frame IDs, mask filters, and timing jitter under heavy bus loads (80% bus saturation).",
    tags: ["CAN-Bus", "SPI", "Embedded C", "Telemetry"],
    status: "published"
  },
  {
    id: "exp-aruco-pose",
    title: "ArUco Marker 6-DoF Pose Estimation for Gripper Docking",
    category: "Computer Vision",
    date: "2025-09",
    summary: "Calibrated camera intrinsic matrix and estimated 3D translation/rotation vectors (rvec/tvec) for automated object pick-and-place alignment.",
    technicalDetails: "Utilized OpenCV camera calibration with a 9x6 checkerboard pattern. Calculated homography transformations to stream real-time docking offsets directly to the robot arm controller.",
    tags: ["OpenCV", "Python", "Pose Estimation", "Vision"],
    status: "published"
  },
  {
    id: "exp-stepper-microstep",
    title: "TMC2209 StealthChop vs SpreadCycle Current Waveform Analysis",
    category: "Mechanism Test",
    date: "2025-05",
    summary: "Analyzed current ripple and acoustic resonance across 1/16 and 1/64 microstepping modes on bipolar NEMA 17 stepper motors.",
    technicalDetails: "Measured shunt resistor voltage drop on a digital oscilloscope. Quantified torque loss vs silent operation trade-offs at varying RPM thresholds for precision actuator positioning.",
    tags: ["Actuators", "TMC2209", "Current Sensing", "Oscilloscope"],
    status: "published"
  }
];

export const initialSkills: Skill[] = [
  // Robotics & Automation
  {
    id: "sk-ros2",
    name: "ROS 2 & Robot Systems",
    category: "Robotics & Automation",
    level: "Proficient",
    tools: ["ROS 2 Humble", "Nodes & Topics", "URDF / Xacro", "TF2 Transforms", "Rviz2", "Micro-ROS"],
    description: "Distributed robotic control architecture, inter-process communication, and kinematics visualization.",
    orderIndex: 1
  },
  {
    id: "sk-kinematics",
    name: "Robot Kinematics & Dynamics",
    category: "Robotics & Automation",
    level: "Advanced",
    tools: ["Forward & Inverse Kinematics", "DH Parameters", "Trajectory Planning", "Joint Torque Sizing"],
    description: "Analytical geometric solvers and spatial coordinate frame transformations for robotic arms and mechanisms.",
    orderIndex: 2
  },
  {
    id: "sk-actuators",
    name: "Actuators & Motion Control",
    category: "Robotics & Automation",
    level: "Advanced",
    tools: ["Coreless Servos", "NEMA Steppers", "TMC2209 SilentStep", "BLDC Motor Basics", "PID Tuning"],
    description: "PWM pulse generation, closed-loop position control, and driver thermal management.",
    orderIndex: 3
  },

  // Embedded Systems
  {
    id: "sk-microcontrollers",
    name: "Microcontrollers & Hardware",
    category: "Embedded Systems",
    level: "Advanced",
    tools: ["ESP32 / ESP-IDF", "STM32 (ARM Cortex-M)", "Arduino", "FreeRTOS Tasks", "Bare-Metal Registers"],
    description: "Real-time task scheduling, ISR interrupt handlers, and low-power hardware configurations.",
    orderIndex: 4
  },
  {
    id: "sk-protocols",
    name: "Embedded Protocols & Busses",
    category: "Embedded Systems",
    level: "Advanced",
    tools: ["CAN-Bus 2.0B", "I2C", "SPI", "UART / RS-485", "WebSockets"],
    description: "Multi-device sensor integration, packet serialization, and noise-tolerant communication.",
    orderIndex: 5
  },
  {
    id: "sk-pcb",
    name: "Circuit Design & Power Distribution",
    category: "Embedded Systems",
    level: "Proficient",
    tools: ["KiCad", "Schematic Capture", "Power Rails", "Optoisolation", "Decoupling Networks"],
    description: "Voltage regulation, transient suppression, and breadboard to prototype circuit realization.",
    orderIndex: 6
  },

  // CAD & Mechanical
  {
    id: "sk-solidworks",
    name: "SolidWorks & Parametric CAD",
    category: "CAD & Mechanical",
    level: "Advanced",
    tools: ["Dassault Systèmes SOLIDWORKS", "3D Parametric Modeling", "Assembly Mates", "Sheet Metal & Weldments"],
    description: "Complex mechanism design, tolerance stack-up analysis, and functional assembly construction.",
    orderIndex: 7
  },
  {
    id: "sk-mechanisms",
    name: "Mechanism Synthesis & Vehicle Design",
    category: "CAD & Mechanical",
    level: "Proficient",
    tools: ["Ackermann Steering", "Suspension Geometry", "Linkage Synthesis", "GD&T Principles"],
    description: "Turning kinematics, tie-rod positioning, and dynamic wheel travel optimization.",
    orderIndex: 8
  },
  {
    id: "sk-rapid-fab",
    name: "Rapid Prototyping & Additive Mfg",
    category: "CAD & Mechanical",
    level: "Advanced",
    tools: ["FDM 3D Printing", "PETG / PLA-CF Slicing", "Infill Engineering", "Mechanical Fasteners"],
    description: "Designing for manufacturing (DFM), press-fit tolerances, and durable structural brackets.",
    orderIndex: 9
  },

  // AI & Computer Vision
  {
    id: "sk-opencv",
    name: "Computer Vision & Pose Estimation",
    category: "AI & Computer Vision",
    level: "Proficient",
    tools: ["OpenCV (Python/C++)", "ArUco Markers", "Color Thresholding", "Edge Detection", "Camera Calibration"],
    description: "Visual servoing, geometric marker tracking, and real-time robotic vision pipelines.",
    orderIndex: 10
  },
  {
    id: "sk-local-ai",
    name: "Local AI & Agentic Architectures",
    category: "AI & Computer Vision",
    level: "Proficient",
    tools: ["Ollama", "Local LLM Inference", "Prompt Engineering", "Vector Embeddings", "Deterministic Fallbacks"],
    description: "Privacy-preserving local assistants, command parsers, and offline data analysis engines.",
    orderIndex: 11
  },

  // Cybersecurity & Systems
  {
    id: "sk-cyber-physical",
    name: "Cyber-Physical & Robotics Security",
    category: "Cybersecurity",
    level: "Proficient",
    tools: ["Firmware Integrity", "CAN-Bus Attack Vectors", "Loopback Isolation", "Redacted Logging", "Secure Teleop"],
    description: "Protecting actuator interfaces, preventing unauthorized bus injections, and robust input validation.",
    orderIndex: 12
  },

  // Core Engineering & Tools
  {
    id: "sk-languages",
    name: "Programming Languages & Systems",
    category: "Core Engineering & Tools",
    level: "Advanced",
    tools: ["C / C++", "Python 3", "TypeScript / JavaScript", "Linux / Bash", "Git & GitHub"],
    description: "Writing high-performance algorithmic firmware, automation scripts, and reproducible codebases.",
    orderIndex: 13
  }
];

export const initialMilestones: Milestone[] = [
  {
    id: "ms-saintgits",
    year: "2023 - Present",
    title: "B.Tech in Robotics & Automation Engineering",
    subtitle: "Saintgits College of Engineering, Kottayam",
    organization: "APJ Abdul Kalam Technological University (KTU)",
    location: "Kottayam, Kerala",
    description: "Rigorous undergraduate program combining mechanical systems, electronics, microcontrollers, control systems engineering, and automated manufacturing.",
    highlights: [
      "Core coursework in Kinematics & Dynamics of Robots, Industrial Automation, Control Systems, Embedded Systems",
      "Active participant in collegiate robotics societies and engineering technical symposiums"
    ],
    category: "Education",
    orderIndex: 1
  },
  {
    id: "ms-baja",
    year: "2025 - 2026",
    title: "Steering & Telemetry Lead — Baja SAE / Motorsports",
    subtitle: "Collegiate All-Terrain Vehicle Engineering Team",
    organization: "Saintgits Motorsports / Baja SAE Team",
    location: "Saintgits College of Engineering",
    description: "Engineered the front steering assembly, Ackermann geometry modeling in SolidWorks, and telemetry electronics integration for the competitive vehicle.",
    highlights: [
      "Synthesized 78% Ackermann geometry mitigating bump steer across 150mm vertical suspension travel",
      "Designed and tested CAN-Bus sensor data acquisition unit with STM32"
    ],
    category: "Competition",
    orderIndex: 2
  },
  {
    id: "ms-veda-launch",
    year: "2025",
    title: "Architected & Released V.E.D.A. Local-First Engine",
    subtitle: "Independent Open Source Systems Project",
    organization: "thecrazydabi",
    location: "Personal Laboratory",
    description: "Conceptualized and built a zero-telemetry local AI terminal companion with verified truthful diagnostics and SQLite WAL persistence.",
    highlights: [
      "Built resilient streaming REPL with prompt_toolkit and Rich",
      "Created 98+ offline unit tests with pytest ensuring rock-solid stability"
    ],
    category: "Project Milestone",
    orderIndex: 3
  },
  {
    id: "ms-mediarm-proto",
    year: "2025",
    title: "Constructed MediArm Articulated Manipulator",
    subtitle: "Assistive Healthcare Robotics Research",
    organization: "Robotics Laboratory",
    location: "Saintgits Campus",
    description: "Designed, 3D printed, wired, and programmed a 5-DOF robotic arm featuring analytical inverse kinematic trigonometry and WebSocket teleoperation.",
    highlights: [
      "Engineered high-torque dual bearing pivots in SolidWorks",
      "Achieved sub-45ms latency control over local network"
    ],
    category: "Project Milestone",
    orderIndex: 4
  }
];

export const initialMediaItems: MediaItem[] = [
  {
    id: "med-1",
    fileName: "mediarm-prototype.jpg",
    fileUrl: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
    fileType: "image",
    fileSize: 428000,
    altText: "MediArm 5-DOF articulated robotic arm prototype",
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
    fileName: "veda-terminal-session.jpg",
    fileUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    fileType: "image",
    fileSize: 295000,
    altText: "V.E.D.A. verified diagnostic terminal interface",
    category: "projects",
    uploadedAt: "2026-02-01T14:00:00Z"
  }
];
