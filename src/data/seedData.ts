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

export const initialProjects: Project[] = [];

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
    year: "10 - 11 October",
    title: "VYBE: Travel Discovery Web App — TinkerSpace Calicut Hackathon",
    subtitle: "15.5-Hour Rapid Hackathon Sprint (10 - 11 October)",
    organization: "TinkerSpace Calicut",
    location: "TinkerSpace, Calicut, Kerala",
    description: "Developed a swipe-based tour package discovery web app with separate Traveller, Operator, and Admin interfaces during the hackathon on 10 - 11 October at TinkerSpace Calicut.",
    highlights: [
      "Built an intuitive card-swiping concept for tour discovery in a 15.5-hour sprint at TinkerSpace Calicut (10 - 11 October)",
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
    category: "profile",
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
];
