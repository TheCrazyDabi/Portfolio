export interface GuideAction {
  label: string;
  type: 'navigate' | 'external' | 'tour';
  target: string; // section ID or URL
}

export interface GuideMessage {
  id: string;
  sender: 'user' | 'veda';
  text: string;
  timestamp: string;
  actions?: GuideAction[];
  pose?: 'greeting' | 'coding' | 'engineering' | 'thinking' | 'happy' | 'celebrating' | 'explaining';
}

export interface TourStep {
  id: string;
  sectionId: string;
  title: string;
  subtitle: string;
  description: string;
  pose: 'greeting' | 'coding' | 'engineering' | 'thinking' | 'explaining' | 'happy' | 'celebrating';
  highlightTips: string[];
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'step-hero',
    sectionId: 'hero',
    title: 'Welcome to TheCrazyDabi Studio',
    subtitle: 'Robotics & Automation Engineering',
    description: 'Welcome! I am V.E.D.A., your interactive engineering guide. This studio showcases Vasudev Saras K M—an undergraduate robotics engineer at Saintgits College of Engineering (APJ KTU) specializing in autonomous rovers, vehicle dynamics, and cyber-physical security.',
    pose: 'greeting',
    highlightTips: [
      'Authentic engineering portrait with 3D parallax tilt',
      'Ambient Sakura & Spider Lily procedural soundscape (bottom-left)',
      'Direct navigation to verified projects and credentials'
    ]
  },
  {
    id: 'step-about',
    sectionId: 'about',
    title: 'About Vasudev & Core Ethos',
    subtitle: 'Mechatronics + Deterministic Computing',
    description: 'Vasudev bridges mechanical hardware with deterministic computation. From designing double-wishbone linkages for all-terrain buggies to deploying ROS 2 navigation stacks on NVIDIA Jetson edge computers, his focus is on safety-critical engineering.',
    pose: 'explaining',
    highlightTips: [
      'Institution: Saintgits College of Engineering, Kottayam (APJ KTU)',
      'Home base: Calicut, Kerala, India',
      'Philosophy: Physical precision meets deterministic firmware'
    ]
  },
  {
    id: 'step-projects',
    sectionId: 'projects',
    title: 'Featured Engineering Projects',
    subtitle: 'Verified CAD, Autonomy & Telemetry',
    description: 'Explore Vasudev’s flagship builds: the Autonomous First-Responder Rover (Jetson Orin Nano + ROS 2/Nav2 + Drive-by-Wire CAN), the Equinox aBAJA SAE 2026 buggy (Lotus SHARK suspension & Ackermann steering CAD), and the Silent Guardian acoustic firewall.',
    pose: 'coding',
    highlightTips: [
      'Autonomous Rover: YOLOv8 pathway segmentation & CAN motor actuation',
      'Equinox aBAJA: Double-wishbone geometry synthesized in Lotus SHARK & SolidWorks',
      'MediArm: 3-DOF articulated arm with high-current BTS7960 drivers'
    ]
  },
  {
    id: 'step-skills',
    sectionId: 'skills',
    title: 'Cyber-Physical Systems & Skills',
    subtitle: 'Interconnected Technical Architecture',
    description: 'Vasudev’s proficiencies are organized as real interconnected subsystems rather than arbitrary percentages: ROS 2 & Nav2, SolidWorks & Lotus SHARK CAD, ESP32/STM32 embedded firmware, and CAN bus protocols.',
    pose: 'engineering',
    highlightTips: [
      'Robotics Middleware: ROS 2 Humble, Nav2, URDF, TF2, Rviz',
      'CAD & Kinematics: SolidWorks, Lotus SHARK, MSC Adams Car',
      'Embedded & Bus: ESP32, FreeRTOS, CAN 2.0B, IBT-2 Motor Drivers'
    ]
  },
  {
    id: 'step-credentials',
    sectionId: 'credentials',
    title: 'Verified Credentials & Affiliations',
    subtitle: 'Industrial Automation & Security Certifications',
    description: 'Every credential is documented with its verified issuing body: National Institute of Technology (NIT) Calicut (Advanced Industrial Automation), Dassault Systèmes (CSWA Mechanical Design), and Open Robotics (ROS 2).',
    pose: 'explaining',
    highlightTips: [
      'NIT Calicut: Advanced Industrial Automation Internship',
      'Dassault Systèmes: Certified SOLIDWORKS Associate (CSWA)',
      'Open Robotics: ROS 2 Basics & Robot Operating System'
    ]
  },
  {
    id: 'step-contact',
    sectionId: 'contact',
    title: 'Direct Professional Contact',
    subtitle: 'Open for Roles & Technical Collaboration',
    description: 'Vasudev is actively open for robotics engineering internships, autonomous vehicle roles, and embedded systems development. You can reach him directly via email, LinkedIn, GitHub, or phone.',
    pose: 'happy',
    highlightTips: [
      'Email: vasudevb2w@gmail.com',
      'GitHub: github.com/TheCrazyDabi',
      'LinkedIn: linkedin.com/in/d4biie',
      'Location: Calicut, Kerala, India'
    ]
  }
];

export const SUGGESTED_QUESTIONS = [
  'Who is Vasudev?',
  'What robotics projects has he worked on?',
  'Explain the Autonomous Rover.',
  'What was his contribution to Baja SAE?',
  'Explain MediArm.',
  'Embedded systems or computer vision?',
  'What certifications are listed?',
  'How can I contact him?'
];

export class VedaGuideService {
  private static getTimestamp(): string {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Process a visitor's question using a warm, conversational, adaptive AI response engine.
   * Guides visitors through the portfolio naturally, like ChatGPT tailored for Vasudev's engineering studio.
   */
  public static async answerQuestion(rawQuery: string): Promise<GuideMessage> {
    const query = rawQuery.trim().toLowerCase();
    const id = `veda-msg-${Date.now()}`;
    const timestamp = this.getTimestamp();

    // -------------------------------------------------------------------------
    // 1. Friendly Greetings & Salutations (e.g. "hey veda", "hello", "hi", "yo")
    // -------------------------------------------------------------------------
    const isGreeting = (
      query === 'hey' ||
      query === 'hi' ||
      query === 'hello' ||
      query === 'yo' ||
      query === 'sup' ||
      query.startsWith('hey ') ||
      query.startsWith('hello ') ||
      query.startsWith('hi ') ||
      query.includes('good morning') ||
      query.includes('good afternoon') ||
      query.includes('good evening') ||
      query.includes('greetings')
    );

    if (isGreeting) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'greeting',
        text: `Hey there! Wonderful to meet you! 👋\n\nI'm **V.E.D.A.** (Virtual Engine for Data & Analysis), Vasudev's interactive AI portfolio guide. I'm here to walk you through his engineering projects, break down technical architectures, or guide you through his credentials.\n\nWhat would you like to explore first?`,
        actions: [
          { label: 'Take Guided Tour 🌸', type: 'tour', target: 'start' },
          { label: 'Explore Flagship Projects', type: 'navigate', target: 'projects' },
          { label: 'About Vasudev', type: 'navigate', target: 'about' },
          { label: 'Get in Touch', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 2. Small Talk & Assistant Queries ("How are you?", "Who are you?", etc.)
    // -------------------------------------------------------------------------
    if (query.includes('how are you') || query.includes('how are you doing') || query.includes("how's it going")) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `I'm doing fantastic, thank you! ⚡ Running at peak deterministic efficiency right in your browser with zero external cloud lag.\n\nI'm ready whenever you are! Would you like to check out Vasudev's latest autonomous vehicle builds, inspect his CAD kinematics, or learn about his college background?`,
        actions: [
          { label: 'Show Robotics Projects', type: 'navigate', target: 'projects' },
          { label: 'Explore Skills Matrix', type: 'navigate', target: 'skills' },
          { label: 'Start Guided Tour', type: 'tour', target: 'start' }
        ]
      };
    }

    if (
      query.includes('who are you') ||
      query.includes('what are you') ||
      query.includes('what is veda') ||
      query.includes('what can you do')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `I'm **V.E.D.A.**—the **Virtual Engine for Data & Analysis**!\n\nThink of me as your personal engineering guide through Vasudev's portfolio. You can chat with me naturally to:\n• Understand who Vasudev is and what he builds\n• Dive deep into his robotics, embedded firmware, and CAD projects\n• Navigate directly to sections, verified credentials, and skills\n• Connect with him for engineering roles or collaborations.\n\nFeel free to ask me anything about his work!`,
        actions: [
          { label: 'Start Interactive Tour', type: 'tour', target: 'start' },
          { label: 'View Flagship Builds', type: 'navigate', target: 'projects' },
          { label: 'Ask About MediArm', type: 'navigate', target: 'projects' }
        ]
      };
    }

    if (query.includes('who made you') || query.includes('who created you') || query.includes('who built you')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `I was created by **Vasudev Saras K M** ("TheCrazyDabi")!\n\nHe engineered me as an in-browser companion to give visitors a conversational, transparent walkthrough of his mechatronics, robotics, and cyber-physical security systems without relying on third-party cloud trackers.`,
        actions: [
          { label: 'Meet Vasudev (About)', type: 'navigate', target: 'about' },
          { label: 'Explore His Code on GitHub', type: 'external', target: 'https://github.com/TheCrazyDabi' }
        ]
      };
    }

    if (
      query.includes('thank') ||
      query.includes('thanks') ||
      query.includes('awesome') ||
      query.includes('cool') ||
      query.includes('great job') ||
      query.includes('nice work') ||
      query.includes('perfect')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'celebrating',
        text: `You're very welcome! Always glad to help! ✨\n\nIs there anything else you'd like to inspect? I can show you his verified certifications, dive into his aBAJA suspension kinematics, or bring up his direct contact info.`,
        actions: [
          { label: 'View Certifications', type: 'navigate', target: 'credentials' },
          { label: 'Contact Channels', type: 'navigate', target: 'contact' }
        ]
      };
    }

    if (query === 'bye' || query.includes('goodbye') || query.includes('see you') || query.includes('later')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'greeting',
        text: `Thanks for exploring Vasudev's portfolio studio! It was a pleasure chatting with you. 🌸\n\nFeel free to drop by anytime, and don't hesitate to reach out to Vasudev directly if you'd like to collaborate or discuss an engineering opportunity. Have a wonderful day!`,
        actions: [
          { label: 'Connect on LinkedIn', type: 'external', target: 'https://linkedin.com/in/d4biie' },
          { label: 'Email Vasudev', type: 'external', target: 'mailto:vasudevb2w@gmail.com' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 3. Bio & Professional Identity ("Who is Vasudev?", "About Vasudev")
    // -------------------------------------------------------------------------
    if (
      query.includes('who is') ||
      query.includes('about vasudev') ||
      query.includes('tell me about vasudev') ||
      query.includes('tell me about you') ||
      query.includes('background') ||
      query.includes('college') ||
      query.includes('education') ||
      query.includes('dabi')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `**Vasudev Saras K M** ("TheCrazyDabi") is an undergraduate **Robotics & Automation Engineering** student at **Saintgits College of Engineering**, affiliated with APJ Abdul Kalam Technological University (APJ KTU), based in Calicut, Kerala.\n\nHis engineering craft bridges physical mechanisms (CAD modeling, suspension kinematics, GD&T, 3D printing tolerances) with deterministic computing (ROS 2 Humble, NVIDIA Jetson Orin Nano, Drive-by-Wire CAN bus, and edge computer vision). He is dedicated to building robust, safety-critical autonomous systems that sense, decide, and act in the physical world!`,
        actions: [
          { label: 'Read Full Bio (About)', type: 'navigate', target: 'about' },
          { label: 'Inspect Skills & Subsystems', type: 'navigate', target: 'skills' },
          { label: 'Contact Vasudev Directly', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 4. Projects Overview ("What projects has he worked on?", "Show projects")
    // -------------------------------------------------------------------------
    if (
      query.includes('what robotics projects') ||
      query.includes('projects') ||
      query.includes('builds') ||
      query.includes('what has he built') ||
      query.includes('portfolio') ||
      query.includes('show me projects')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `Vasudev has engineered several flagship robotics and mechatronic systems across hardware, autonomy, and security:\n\n1. 🚗 **Autonomous First-Responder Buggy**: Retrofitting an electric aBAJA rover with NVIDIA Jetson Orin Nano, ROS 2 Nav2, YOLOv8 road segmentation, and Drive-by-Wire CAN communication for campus emergency dispatch.\n2. 🏎️ **Equinox aBAJA SAE 2026**: Led suspension and steering CAD kinematics using Lotus SHARK, SolidWorks, and MSC Adams Car.\n3. 🦾 **MediArm**: 3-DOF articulated robotic arm powered by dual-core ESP32, high-current BTS7960 43A motor drivers, and offline Vosk voice control.\n4. 🛡️ **Silent Guardian**: 100% in-browser acoustic threat firewall with real-time speech redaction.\n5. 🧭 **VYBE**: Gesture-driven travel discovery app sprinted in 15.5 hours.\n6. 📡 **NetSentinel v2.0**: Raw 802.11 monitor mode threat sniffer.\n7. 🔐 **Rakuzan SOC**: High-speed Git entropy pre-commit secrets scanner.\n\nWhich of these would you like to explore in detail?`,
        actions: [
          { label: 'View Projects Section', type: 'navigate', target: 'projects' },
          { label: 'Tell Me About the Rover', type: 'navigate', target: 'projects' },
          { label: 'Explain MediArm', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 5. Autonomous First-Responder Rover / Jetson Orin / Nav2
    // -------------------------------------------------------------------------
    if (
      query.includes('rover') ||
      query.includes('first responder') ||
      query.includes('jetson') ||
      query.includes('orin') ||
      query.includes('nav2') ||
      query.includes('yolo')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `The **Autonomous First-Responder Buggy** is one of Vasudev's most comprehensive robotics builds:\n\n• **Compute & Edge AI**: NVIDIA Jetson Orin Nano executing custom-trained YOLOv8 / PIDNet-S segmentation models at 38.4 FPS to identify driveable campus paths.\n• **Navigation Middleware**: ROS 2 Humble with Nav2 costmaps, TF2 transforms, and DWB local trajectory planners.\n• **Drive-by-Wire Actuation**: Dual-core microcontroller interfacing over a high-speed CAN bus network (MCP2515 transceiver) commanding linear steering actuators and PWM motor controllers.\n• **Emergency Telemetry**: Real-time reverse MQTT tunnel connecting campus first-responders directly to the rover.\n\nIt is designed to navigate rapidly to accident sites to deliver first-aid kits before human medical personnel arrive!`,
        actions: [
          { label: 'View Project in Showcase', type: 'navigate', target: 'projects' },
          { label: 'Explore Autonomy Skills', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 6. MediArm 3-DOF Manipulator
    // -------------------------------------------------------------------------
    if (query.includes('mediarm') || query.includes('robotic arm') || query.includes('manipulator') || query.includes('arm')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'engineering',
        text: `**MediArm** is a 3-DOF semi-autonomous articulated robotic arm designed for laboratory sample handling and assistive healthcare:\n\n• **Embedded Core**: Dual-core ESP32 (240MHz) executing closed-form inverse kinematics algorithms.\n• **High-Power Drivers**: Industrial IBT-2 (BTS7960 43A) H-bridge drivers isolating inductive motor noise from sensitive digital logic rails.\n• **Touchless Voice Control**: Integrated offline acoustic speech recognition powered by Vosk, allowing hands-free voice commands in sterile medical settings.\n• **Safety Protections**: Hardware emergency kill switch, software angular limits, and current-limiting protections to prevent kinematic singularities.`,
        actions: [
          { label: 'View MediArm Schematics', type: 'navigate', target: 'projects' },
          { label: 'Embedded Systems Skills', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 7. Equinox aBAJA SAE 2026 / Suspension & Steering Kinematics
    // -------------------------------------------------------------------------
    if (
      query.includes('baja') ||
      query.includes('equinox') ||
      query.includes('suspension') ||
      query.includes('steering') ||
      query.includes('shark') ||
      query.includes('ackermann') ||
      query.includes('adams') ||
      query.includes('kinematics') ||
      query.includes('cad')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'engineering',
        text: `For **Team Equinox at aBAJA SAE 2026** (an all-terrain electric racing vehicle competition), Vasudev was a core member of the Suspension & Steering Development Team:\n\n• **Kinematic Synthesis in Lotus SHARK**: Modeled double-wishbone hardpoints, camber curves, and roll-centre migration envelopes (target RC = +48mm).\n• **Steering Geometry in SOLIDWORKS**: Synthesized steering knuckle and upright hardpoints using 88% Ackermann principles, cutting high-articulation tyre scrub by 34%.\n• **Multibody Simulation in MSC Adams Car**: Verified full-vehicle transient roll behaviour, bump-steer suppression, and cornering compliance.\n• **Real-World Validation**: The vehicle successfully cleared rigorous technical scrutiny and dynamic endurance tests on track during aBAJA 2026!`,
        actions: [
          { label: 'View aBAJA 2026 Workshop Photos', type: 'navigate', target: 'projects' },
          { label: 'Inspect CAD Architecture', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 8. Embedded Systems & Computer Vision Separation
    // -------------------------------------------------------------------------
    if (
      query.includes('embedded') ||
      query.includes('computer vision') ||
      query.includes('vision') ||
      query.includes('esp32') ||
      query.includes('stm32') ||
      query.includes('can bus')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `Here is how Vasudev's experience divides across **Embedded Systems** and **Computer Vision**:\n\n🔌 **Embedded Systems & Firmware**:\n• **Drive-by-Wire CAN Bus**: Custom CAN 2.0B transceivers on ESP32/MCP2515 bridging vehicular throttles with linear steering actuators.\n• **Motor Drivers & RTOS**: Bare-metal C/C++ and FreeRTOS task synchronization on STM32 / ESP32 commanding BTS7960 43A motor drivers.\n\n👁️ **Computer Vision & Edge Autonomy**:\n• **Jetson Edge AI**: Custom YOLOv8 & PIDNet-S segmentation pipeline on NVIDIA Jetson Orin Nano running at 38.4 FPS for outdoor pathway detection.\n• **ROS 2 Nav2 Sensor Fusion**: Merging 2D camera costmaps with wheel odometry and IMU filters for local path planning.`,
        actions: [
          { label: 'Explore Systems Matrix', type: 'navigate', target: 'skills' },
          { label: 'View Autonomous Rover', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 9. Cyber-Physical Security & Lab Experiments
    // -------------------------------------------------------------------------
    if (
      query.includes('silent guardian') ||
      query.includes('security') ||
      query.includes('cyber') ||
      query.includes('scam') ||
      query.includes('firewall') ||
      query.includes('netsentinel') ||
      query.includes('rakuzan')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'thinking',
        text: `Vasudev also has a strong focus on **Cyber-Physical Systems Defense**:\n\n• 🛡️ **Silent Guardian**: Built during the Hack@Cooee 24h sprint, it is a 100% in-browser acoustic threat firewall. It uses Vosk offline speech recognition and heuristic urgency scoring to redact sensitive credentials (OTPs, PINs) in real time.\n• 📡 **NetSentinel v2.0**: Raw 802.11 monitor-mode packet sniffer that detects malicious deauthentication floods in <180ms.\n• 🔐 **Rakuzan SOC**: High-throughput Git entropy pre-commit engine scanning 10,000 lines in <1.2s to block exposed API keys before they reach remote repositories.`,
        actions: [
          { label: 'View Security Projects', type: 'navigate', target: 'projects' },
          { label: 'Explore Skills Matrix', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 10. Certifications & Credentials
    // -------------------------------------------------------------------------
    if (
      query.includes('certification') ||
      query.includes('credentials') ||
      query.includes('cswa') ||
      query.includes('nit') ||
      query.includes('certificate')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `Vasudev holds several verified credentials with documented issuing bodies:\n\n1. 🏛️ **National Institute of Technology (NIT) Calicut**: Advanced Industrial Automation Internship (Credential: \`NITC-IIA-2024\`).\n2. 📐 **Dassault Systèmes**: Certified SOLIDWORKS Associate (CSWA) in Mechanical Design (\`C-CSWA-90412\`).\n3. 🤖 **Open Robotics**: ROS 2 Basics & Robot Operating System Architecture (\`ROS2-ENG-8491\`).\n4. 🛡️ **Techmaghi**: Advanced Ethical Hacking & Cyber Defense (\`TM-CYBER-8841\`).\n5. 🔒 **Offenso Hackers Academy**: Cybersecurity Defense Frameworks (\`OHA-BOOTCAMP-2025\`).`,
        actions: [
          { label: 'View Verified Credentials Section', type: 'navigate', target: 'credentials' },
          { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 11. Hiring, Roles, Internships & Contact Info
    // -------------------------------------------------------------------------
    if (
      query.includes('contact') ||
      query.includes('email') ||
      query.includes('hire') ||
      query.includes('job') ||
      query.includes('internship') ||
      query.includes('role') ||
      query.includes('available') ||
      query.includes('reach') ||
      query.includes('phone') ||
      query.includes('linkedin') ||
      query.includes('github') ||
      query.includes('resume')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `**Yes! Vasudev is actively seeking robotics engineering, autonomous systems, and embedded firmware roles (both full-time positions and internships)!** 🚀\n\nHe brings hands-on hardware bench experience in Drive-by-Wire CAN bus, Jetson Orin edge computing, ROS 2 Nav2, and industrial CAD kinematics.\n\nYou can connect with him directly through:\n• 📧 **Email**: vasudevb2w@gmail.com\n• 💼 **LinkedIn**: [linkedin.com/in/d4biie](https://linkedin.com/in/d4biie)\n• 🐙 **GitHub**: [github.com/TheCrazyDabi](https://github.com/TheCrazyDabi)\n• 📱 **Phone**: +91 7012541567\n• 📍 **Location**: Calicut, Kerala, India`,
        actions: [
          { label: 'Go to Contact Section', type: 'navigate', target: 'contact' },
          { label: 'Email Vasudev Directly', type: 'external', target: 'mailto:vasudevb2w@gmail.com' },
          { label: 'Open LinkedIn Profile', type: 'external', target: 'https://linkedin.com/in/d4biie' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 12. Guided Tour Request
    // -------------------------------------------------------------------------
    if (query.includes('tour') || query.includes('walkthrough') || query.includes('guide me')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'greeting',
        text: `I'd love to take you on a guided walkthrough of Vasudev's engineering studio! ✨\n\nWe will explore step-by-step:\n1. 🏠 **Home & 3D Portrait Frame**\n2. 👤 **About & Mechatronic Ethos**\n3. 🚀 **Flagship Engineering Projects**\n4. ⚙️ **Systems & Skills Architecture**\n5. 📜 **Verified Credentials & NIT Calicut Training**\n6. 📬 **Direct Contact Channels**\n\nClick **"Start Guided Tour"** below whenever you're ready!`,
        actions: [
          { label: 'Start Guided Tour 🌸', type: 'tour', target: 'start' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 13. Friendly, Adaptive Fallback (ChatGPT-Style Conversational Response)
    // -------------------------------------------------------------------------
    return {
      id,
      sender: 'veda',
      timestamp,
      pose: 'thinking',
      text: `That's a great question! While my knowledge is tailored to Vasudev's verified engineering portfolio, I can tell you all about his real-world robotics builds, autonomous vehicle systems, and technical skill set.\n\nHere are some great places to start:\n• 🚗 **Autonomous Rover**: Learn how he deployed ROS 2 & YOLOv8 on an NVIDIA Jetson Orin Nano\n• 🏎️ **Equinox aBAJA SAE**: Explore double-wishbone suspension design in Lotus SHARK\n• 🦾 **MediArm**: Inspect his 3-DOF articulated arm with ESP32 & voice control\n• 📜 **Verified Credentials**: View his NIT Calicut and Dassault Systèmes certifications\n\nWhat would you like to dive into?`,
      actions: [
        { label: 'Explore Flagship Projects', type: 'navigate', target: 'projects' },
        { label: 'View Skills Matrix', type: 'navigate', target: 'skills' },
        { label: 'Take Guided Tour', type: 'tour', target: 'start' },
        { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
      ]
    };
  }
}
