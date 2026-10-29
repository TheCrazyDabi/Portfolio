import { getLocalizedVedaReply, resolveVedaLanguage, VedaReplyLanguage } from './vedaLocalization';

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
  spokenLanguage?: 'en-IN' | 'ml-IN';
  actions?: GuideAction[];
  pose?: 'greeting' | 'coding' | 'engineering' | 'thinking' | 'happy' | 'celebrating' | 'explaining';
  navigationTarget?: string; // Optional section ID if intent requires smooth page navigation
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
    description: 'Welcome! I am ELIZ, your interactive portfolio guide. This studio showcases Vasudev Saras K M, a Robotics and Automation Engineering student at Saintgits College of Engineering (APJ KTU).',
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
   * Answer portfolio questions and lightweight small talk with a friendly local guide.
   */
  public static async answerQuestion(
    rawQuery: string,
    currentSection?: string,
    preferredLanguage: VedaReplyLanguage = 'auto',
    conversationContext: GuideMessage[] = [],
  ): Promise<GuideMessage> {
    const id = `veda-msg-${Date.now()}`;
    const timestamp = this.getTimestamp();

    const raw = rawQuery.trim();
    const replyLanguage = resolveVedaLanguage(raw, preferredLanguage);
    if (!raw) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'greeting',
        text: `Hey! I'm **ELIZ** 😊 I can chat, answer questions about Vasudev, or help you find something around the portfolio. What's on your mind?`,
        actions: [
          { label: 'Explore Projects 🚀', type: 'navigate', target: 'projects' },
          { label: 'Start Guided Tour 🌸', type: 'tour', target: 'start' }
        ]
      };
    }

    if (replyLanguage !== 'english') {
      return {
        id,
        sender: 'veda',
        timestamp,
        spokenLanguage: replyLanguage === 'malayalam' ? 'ml-IN' : 'en-IN',
        ...getLocalizedVedaReply(raw, replyLanguage),
      };
    }

    const clean = raw.toLowerCase().replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim();
    const tokens = new Set(clean.split(' '));

    // Helper predicate to check if clean text contains a phrase or token
    const has = (keyword: string) => clean.includes(keyword);
    const hasToken = (t: string) => tokens.has(t);

    const recentUserMessage = [...conversationContext].reverse().find((message) => message.sender === 'user')?.text;
    const recentAssistantMessage = [...conversationContext].reverse().find((message) => message.sender === 'veda')?.text;
    const isFollowUp = /^(tell me more|more details|go on|continue|why|how so|what about that|and that|explain it|what do you mean)\b/.test(clean);
    const followUpContext = isFollowUp ? [recentUserMessage, recentAssistantMessage].filter(Boolean).join(' ') : '';
    const topicText = followUpContext
      ? followUpContext.toLowerCase().replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim()
      : clean;
    const topicHas = (keyword: string) => topicText.includes(keyword);

    // -------------------------------------------------------------------------
    // 1. Explicit Page Navigation Commands (Self-Adaptive Navigation)
    // -------------------------------------------------------------------------
    const isNavRequest = has('go to ') || has('navigate to ') || has('scroll to ') || has('take me to ') || has('jump to ') || has('open ');
    
    if (isNavRequest || clean === 'projects' || clean === 'baja' || clean === 'skills' || clean === 'contact' || clean === 'about' || clean === 'credentials') {
      if (has('project') || clean === 'projects') {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'coding',
          navigationTarget: 'projects',
          text: `Navigating directly to **Featured Engineering Projects**! 🚀\n\nHere you can inspect Vasudev's Autonomous First-Responder Rover, Equinox aBAJA SAE vehicle kinematics, and the MediArm 3-DOF robotic arm.`,
          actions: [
            { label: 'Autonomous Rover 🚗', type: 'navigate', target: 'projects' },
            { label: 'Equinox aBAJA 🏎️', type: 'navigate', target: 'projects' },
            { label: 'MediArm Arm 🦾', type: 'navigate', target: 'projects' }
          ]
        };
      }

      if (has('about') || has('bio') || clean === 'about') {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'explaining',
          navigationTarget: 'about',
          text: `Navigating to **About Vasudev & Core Ethos**! 👤\n\nLearn about his background at Saintgits College of Engineering (APJ KTU), his core engineering philosophy, and his home base in Calicut, Kerala.`,
          actions: [
            { label: 'Read Full Bio', type: 'navigate', target: 'about' },
            { label: 'View Skills', type: 'navigate', target: 'skills' }
          ]
        };
      }

      if (has('skill') || has('tech stack') || clean === 'skills') {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'engineering',
          navigationTarget: 'skills',
          text: `Navigating to **Cyber-Physical Systems & Skills Matrix**! ⚙️\n\nExplore interconnected subsystems across ROS 2 Humble, SolidWorks CAD, embedded firmware (ESP32/STM32), and Drive-by-Wire CAN bus networks.`,
          actions: [
            { label: 'Inspect Architecture', type: 'navigate', target: 'skills' },
            { label: 'Explore Projects', type: 'navigate', target: 'projects' }
          ]
        };
      }

      if (has('certif') || has('credential') || has('cswa') || clean === 'credentials') {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'explaining',
          navigationTarget: 'credentials',
          text: `Navigating to **Verified Credentials & Affiliations**! 📜\n\nReview verified certifications from NIT Calicut (Industrial Automation), Dassault Systèmes (CSWA), and Open Robotics (ROS 2).`,
          actions: [
            { label: 'Inspect NIT Calicut Credential', type: 'navigate', target: 'credentials' },
            { label: 'Inspect CSWA Certification', type: 'navigate', target: 'credentials' }
          ]
        };
      }

      if (has('contact') || has('reach') || has('hire') || clean === 'contact') {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'happy',
          navigationTarget: 'contact',
          text: `Navigating to **Direct Professional Contact**! 📬\n\nVasudev is open for robotics engineering internships and full-time opportunities. All verified communication channels are ready below.`,
          actions: [
            { label: 'Email Vasudev Directly', type: 'external', target: 'mailto:vasudevb2w@gmail.com' },
            { label: 'Open LinkedIn Profile', type: 'external', target: 'https://linkedin.com/in/d4biie' }
          ]
        };
      }

      if (has('veda') || has('terminal') || clean === 'terminal') {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'thinking',
          navigationTarget: 'veda',
          text: `Here is **ELIZ**! ⚡\n\nAsk about the portfolio or use the quick commands to navigate.`,
          actions: [
            { label: 'Run Help Command', type: 'navigate', target: 'veda' },
            { label: 'Explore Projects', type: 'navigate', target: 'projects' }
          ]
        };
      }

      if (has('home') || has('hero') || has('top')) {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'greeting',
          navigationTarget: 'hero',
          text: `Returning to the **Hero Overview** at the top of the studio! 🌸`,
          actions: [
            { label: 'Explore Projects', type: 'navigate', target: 'projects' },
            { label: 'Start Guided Tour', type: 'tour', target: 'start' }
          ]
        };
      }
    }

    // -------------------------------------------------------------------------
    // 2. Self-Adaptive Portfolio & Architecture Queries
    // -------------------------------------------------------------------------
    if (
      has('adaptive') ||
      has('self adaptive') ||
      has('how does this adapt') ||
      has('accuracy') ||
      has('deterministic') ||
      has('architecture') && has('veda')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'thinking',
        text: `ELIZ is a portfolio guide. The console uses local topic matching and prepared responses to answer common questions and navigate to sections. Its responses describe the information documented in this portfolio; they do not verify hardware or benchmark results.`,
        actions: [
          { label: 'Inspect Skills Matrix', type: 'navigate', target: 'skills' },
          { label: 'View Verified Credentials', type: 'navigate', target: 'credentials' },
          { label: 'Take Guided Tour', type: 'tour', target: 'start' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 3. Current Section & Context Inquiries
    // -------------------------------------------------------------------------
    if (
      has('where am i') ||
      has('what section is this') ||
      has('explain this section') ||
      has('what am i looking at')
    ) {
      const active = currentSection || 'hero';
      const step = TOUR_STEPS.find(s => s.sectionId === active) || TOUR_STEPS[0];
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: step.pose,
        text: `You are currently viewing the **${step.title}** (${step.subtitle}) section!\n\n${step.description}\n\nKey highlights here:\n${step.highlightTips.map(t => `• ${t}`).join('\n')}`,
        actions: [
          { label: 'Take Full Guided Tour 🌸', type: 'tour', target: 'start' },
          { label: 'Explore Projects', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 4. Guided Tour Request
    // -------------------------------------------------------------------------
    if (has('tour') || has('walkthrough') || has('guide me') || has('show me around') || has('take tour')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'greeting',
        text: `I'd love to give you an interactive tour of Vasudev's engineering portfolio! ✨\n\nWe will walk through:\n1. 🏠 **Home & Authentic Portrait Frame**\n2. 👤 **About & Mechatronic Ethos**\n3. 🚀 **Flagship Engineering Projects**\n4. ⚙️ **Cyber-Physical Systems & Skills**\n5. 📜 **Verified Credentials & NIT Calicut Training**\n6. 📬 **Direct Contact Channels**\n\nClick **"Start Guided Tour"** below to begin!`,
        actions: [
          { label: 'Start Guided Tour 🌸', type: 'tour', target: 'start' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 5. Flagship: Autonomous First-Responder Buggy / Rover
    // -------------------------------------------------------------------------
    if (
      has('rover') ||
      has('first responder') ||
      has('orin') ||
      has('jetson') ||
      has('nav2') ||
      has('yolo') ||
      has('pidnet') ||
      has('drive by wire') ||
      has('dbw') ||
      has('can bus') ||
      (has('autonomous') && !has('baja'))
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `🚗 **Autonomous First-Responder Buggy / Rover**\n\nOne of Vasudev's flagship autonomy builds, engineered for emergency response across large campuses:\n\n• **Compute & Edge AI**: NVIDIA Jetson Orin Nano running custom-trained YOLOv8 and PIDNet-S pathway segmentation models at **38.4 FPS** to identify driveable corridors.\n• **Navigation Middleware**: ROS 2 Humble with Nav2 costmaps, TF2 coordinate transforms, and DWB local trajectory planners.\n• **Drive-by-Wire Actuation**: Dual-core microcontroller interfacing over a high-speed CAN 2.0B network (MCP2515 transceiver) commanding linear steering actuators and PWM motor controllers.\n• **Emergency Telemetry**: Real-time reverse MQTT tunnel connecting campus first responders directly to the vehicle.\n\nIt is engineered to dispatch medical supplies autonomously to accident sites before personnel arrive!`,
        actions: [
          { label: 'View in Projects Showcase', type: 'navigate', target: 'projects' },
          { label: 'Inspect Autonomy Skills', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 6. Flagship: Equinox aBAJA SAE 2026 Vehicle Dynamics
    // -------------------------------------------------------------------------
    if (
      has('baja') ||
      has('abaja') ||
      has('equinox') ||
      has('suspension') ||
      has('steering') ||
      has('shark') ||
      has('lotus') ||
      has('ackermann') ||
      has('double wishbone') ||
      has('wishbone') ||
      has('adams') ||
      has('kinematics') ||
      (has('car') && !has('arm')) ||
      (has('vehicle') && !has('arm'))
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'engineering',
        text: `🏎️ **Team Equinox at aBAJA SAE 2026**\n\nVasudev is part of Team Equinox's Suspension & Steering Development Team. The portfolio documents suspension geometry work in Lotus SHARK, steering geometry and Ackermann principles in SOLIDWORKS, and multibody dynamics work in MSC Adams Car. The project entry does not yet include verified performance measurements or competition results.`,
        actions: [
          { label: 'View aBAJA Workshop Gallery', type: 'navigate', target: 'projects' },
          { label: 'Inspect CAD Architecture', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 7. Flagship: MediArm 3-DOF Robotic Manipulator
    // -------------------------------------------------------------------------
    if (
      has('mediarm') ||
      has('arm') ||
      has('manipulator') ||
      has('prosthetic') ||
      has('rehab') ||
      has('rehabilitation') ||
      has('bts7960') ||
      has('ibt-2') ||
      has('inverse kinematics') ||
      has('ik')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'engineering',
        text: `🦾 **MediArm: 3-DOF Robotic Arm Prototype**\n\nThe S6 mini project combines ESP32 control, IBT-2 motor drivers, MG996R and SG90 servos, a Flask web interface, and offline voice commands using Vosk. The portfolio also describes an emergency kill switch. It is intended as a positioning and assisted-handling prototype; the project page can be updated with confirmed build and test results.`,
        actions: [
          { label: 'View MediArm Schematics', type: 'navigate', target: 'projects' },
          { label: 'Explore Embedded Skills', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 8. Cyber-Physical Security (Silent Guardian)
    // -------------------------------------------------------------------------
    if (
      has('silent guardian') ||
      has('security') ||
      has('cyber') ||
      has('cybersecurity') ||
      has('acoustic firewall') ||
      has('firewall') ||
      has('scam') ||
      has('speech redaction')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'thinking',
        text: `🛡️ **Cybersecurity Project: Silent Guardian**\n\nSilent Guardian is a call-scam firewall prototype developed for a Hack@Cooee 24-hour hackathon. The portfolio describes local speech processing, suspicious-call scoring, sensitive-number redaction, and evidence export.`,
        actions: [
          { label: 'View Security Projects', type: 'navigate', target: 'projects' },
          { label: 'Explore Skills Matrix', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 8B. VYBE: Travel Discovery Web App (TinkerSpace Calicut Hackathon)
    // -------------------------------------------------------------------------
    if (has('vybe') || has('travel discovery') || has('tinkerspace')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `🧭 **VYBE: Swipe-Based Travel Discovery Web App**\n\nDeveloped during a **15.5-hour hackathon sprint on October 10–11, 2026 at TinkerSpace Calicut**. The prototype focused on swipe-based tour discovery, with Traveller, Operator, and Admin roles planned for the experience. The project record lists a two-member team.`,
        actions: [
          { label: 'View Milestones (Trajectory)', type: 'navigate', target: 'journey' },
          { label: 'Explore Code on GitHub', type: 'external', target: 'https://github.com/TheCrazyDabi/VYBE' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 9. General Projects Overview
    // -------------------------------------------------------------------------
    if (
      has('what projects') ||
      has('what has he built') ||
      has('what did he build') ||
      has('project') ||
      has('builds') ||
      has('portfolio') ||
      has('what are his projects') ||
      has('show projects')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `The portfolio currently features these projects:\n\n1. 🚗 **Autonomous First-Responder**: An emergency-response rover project in development, using a buggy platform, Jetson Orin Nano, ROS 2/Nav2, and Drive-by-Wire integration.\n2. 🏎️ **Equinox aBAJA SAE 2026**: Suspension and steering development work with Team Equinox, using Lotus SHARK, SOLIDWORKS, and MSC Adams Car.\n3. 🦾 **MediArm**: A 3-DOF robotic-arm prototype with ESP32 control, a Flask interface, and offline voice commands.\n4. 🛡️ **Silent Guardian**: A call-scam firewall prototype developed during a hackathon.\n5. 🧭 **VYBE**: A swipe-based travel discovery web-app prototype developed during a TinkerSpace Calicut hackathon.\n\nWhich project would you like to explore?`,
        actions: [
          { label: 'Explore Flagship Projects', type: 'navigate', target: 'projects' },
          { label: 'Autonomous Rover 🚗', type: 'navigate', target: 'projects' },
          { label: 'Equinox aBAJA 🏎️', type: 'navigate', target: 'projects' },
          { label: 'MediArm Arm 🦾', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 10. Technical Skills, Tools & Programming Languages
    // -------------------------------------------------------------------------
    if (
      has('skill') ||
      has('tech stack') ||
      has('technologies') ||
      has('tools') ||
      has('languages') ||
      has('programming') ||
      has('c++') ||
      has('cpp') ||
      has('python') ||
      has('rust') ||
      has('solidworks') ||
      has('ansys') ||
      has('freertos') ||
      has('firmware') ||
      has('hardware') ||
      has('what can he do')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'engineering',
        text: `⚙️ **Vasudev's Technical Systems & Proficiencies Architecture**:\n\n• 🤖 **Robotics Middleware**: ROS 2 Humble, Nav2, URDF, TF2, Rviz, Gazebo, DWB Trajectory Planners.\n• 📐 **CAD & Mechanical Simulation**: SOLIDWORKS (Certified CSWA), Lotus SHARK Kinematics, MSC Adams Car, ANSYS FEA, GD&T, 3D Printing (FDM tolerances).\n• 🔌 **Embedded & Hardware**: ESP32, STM32, FreeRTOS, CAN 2.0B (MCP2515), I2C, SPI, UART, PWM, BTS7960 43A Motor Drivers, Arduino.\n• 💻 **Programming Languages**: C, C++, Python, Rust, TypeScript, MATLAB/Simulink.\n• 👁️ **Edge AI & Computer Vision**: NVIDIA Jetson Orin Nano, YOLOv8, PIDNet-S, OpenCV, TensorRT.\n• 🛡️ **Cyber-Physical Defense**: Monitor mode Wi-Fi packet analysis, Vosk speech redaction, pre-commit entropy scanning.`,
        actions: [
          { label: 'Inspect Systems Diagram', type: 'navigate', target: 'skills' },
          { label: 'View Verified Credentials', type: 'navigate', target: 'credentials' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 11. Embedded Systems vs Computer Vision Breakdown
    // -------------------------------------------------------------------------
    if (
      has('embedded vs') ||
      has('vision vs') ||
      (has('embedded') && has('vision'))
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `Here is how Vasudev's experience bridges **Embedded Systems** and **Computer Vision**:\n\n🔌 **Embedded Systems & Firmware**:\n• **Drive-by-Wire CAN Bus**: Custom CAN 2.0B transceivers on ESP32/MCP2515 bridging vehicular throttles with linear steering actuators.\n• **Motor Drivers & RTOS**: Bare-metal C/C++ and FreeRTOS task synchronization on STM32 / ESP32 commanding BTS7960 43A motor drivers.\n\n👁️ **Computer Vision & Edge Autonomy**:\n• **Jetson Edge AI**: Custom YOLOv8 & PIDNet-S segmentation pipeline on NVIDIA Jetson Orin Nano running at **38.4 FPS** for outdoor pathway detection.\n• **ROS 2 Nav2 Sensor Fusion**: Merging 2D camera costmaps with wheel odometry and IMU filters for local path planning.`,
        actions: [
          { label: 'Explore Systems Matrix', type: 'navigate', target: 'skills' },
          { label: 'View Autonomous Rover', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 12. Academics, College, Degree & Location
    // -------------------------------------------------------------------------
    if (
      has('college') ||
      has('saintgits') ||
      has('ktu') ||
      has('university') ||
      has('degree') ||
      has('btech') ||
      has('b tech') ||
      has('education') ||
      has('academics') ||
      has('cgpa') ||
      has('where does he study') ||
      has('kottayam') ||
      has('calicut') ||
      has('kerala') ||
      has('location')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `🎓 **Academic Background & Location**:\n\n• **Degree**: Bachelor of Technology (B.Tech) in **Robotics & Automation Engineering**.\n• **Institution**: **Saintgits College of Engineering**, Kottayam, Kerala.\n• **Affiliation**: **APJ Abdul Kalam Technological University (APJ KTU)**.\n• **Home Base**: **Calicut (Kozhikode), Kerala, India**.\n\nHis curriculum and extracurricular bench work emphasize mechatronic design, automatic control theory, multi-body kinematics, and safety-critical embedded systems.`,
        actions: [
          { label: 'Read Full Bio (About)', type: 'navigate', target: 'about' },
          { label: 'View Verified Credentials', type: 'navigate', target: 'credentials' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 13. Verified Certifications & Credentials
    // -------------------------------------------------------------------------
    if (
      has('certif') ||
      has('credential') ||
      has('cswa') ||
      has('nit') ||
      has('licenses') ||
      has('certificates')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `📜 **Verified Engineering Credentials & Affiliations**:\n\n1. 🏛️ **National Institute of Technology (NIT) Calicut**: Advanced Industrial Automation Internship (Credential: \`NITC-IIA-2024\`).\n2. 📐 **Dassault Systèmes**: Certified SOLIDWORKS Associate (CSWA) in Mechanical Design (\`C-CSWA-90412\`).\n3. 🤖 **Open Robotics**: ROS 2 Basics & Robot Operating System Architecture (\`ROS2-ENG-8491\`).\n4. 🛡️ **Techmaghi**: Advanced Ethical Hacking & Cyber Defense (\`TM-CYBER-8841\`).\n5. 🔒 **Offenso Hackers Academy**: Cybersecurity Defense Frameworks (\`OHA-BOOTCAMP-2025\`).`,
        actions: [
          { label: 'View Credentials Section', type: 'navigate', target: 'credentials' },
          { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 14. Hiring, Internships, Roles & Availability
    // -------------------------------------------------------------------------
    if (
      has('hire') ||
      has('hiring') ||
      has('job') ||
      has('intern') ||
      has('internship') ||
      has('role') ||
      has('available') ||
      has('availability') ||
      has('open to work') ||
      has('collab') ||
      has('opportunity') ||
      has('resume') ||
      has('cv')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `🚀 **Yes! Vasudev is actively seeking robotics engineering, autonomous vehicle, and embedded firmware opportunities (both internships and full-time roles)!**\n\n**Core Strengths He Brings To Your Team:**\n• Bench experience deploying ROS 2 Nav2 and Jetson Orin edge computers.\n• Hardware prototyping with Drive-by-Wire CAN bus and high-power motor drivers.\n• Industrial CAD synthesis in SOLIDWORKS and Lotus SHARK.\n• Fast multidisciplinary problem-solving from formula student racing to assistive robotics.\n\nReady to interview or collaborate? Reach out below!`,
        actions: [
          { label: 'Email Vasudev Directly', type: 'external', target: 'mailto:vasudevb2w@gmail.com' },
          { label: 'Connect on LinkedIn', type: 'external', target: 'https://linkedin.com/in/d4biie' },
          { label: 'View Contact Section', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 15. Direct Contact Channels
    // -------------------------------------------------------------------------
    if (
      has('contact') ||
      has('email') ||
      has('phone') ||
      has('mobile') ||
      has('call') ||
      has('linkedin') ||
      has('github') ||
      has('reach out') ||
      has('message')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `📬 **Direct Contact Channels for Vasudev Saras K M**:\n\n• 📧 **Email**: [vasudevb2w@gmail.com](mailto:vasudevb2w@gmail.com)\n• 💼 **LinkedIn**: [linkedin.com/in/d4biie](https://linkedin.com/in/d4biie)\n• 🐙 **GitHub**: [github.com/TheCrazyDabi](https://github.com/TheCrazyDabi)\n• 📱 **Phone**: +91 7012541567\n• 📍 **Location**: Calicut, Kerala, India\n\nHe responds promptly to all engineering inquiries and collaboration requests!`,
        actions: [
          { label: 'Send an Email', type: 'external', target: 'mailto:vasudevb2w@gmail.com' },
          { label: 'Open LinkedIn Profile', type: 'external', target: 'https://linkedin.com/in/d4biie' },
          { label: 'Go to Contact Section', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 16. Vasudev Bio & Profile Overview
    // -------------------------------------------------------------------------
    if (
      has('who is vasudev') ||
      has('who is dabi') ||
      has('thecrazydabi') ||
      has('tell me about vasudev') ||
      has('tell me about him') ||
      has('bio') ||
      has('about') ||
      has('background') ||
      has('who made this') ||
      has('who is the engineer') ||
      has('creator')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `**Vasudev Saras K M** ("TheCrazyDabi") is an undergraduate **Robotics and Automation Engineering student** at **Saintgits College of Engineering** (APJ KTU), based in Calicut, Kerala. His documented project work includes mechanical design and suspension analysis, embedded control, ROS 2 and autonomous rover development, a robotic-arm prototype, and software projects.`,
        actions: [
          { label: 'Read Full Bio (About)', type: 'navigate', target: 'about' },
          { label: 'Inspect Skills & Subsystems', type: 'navigate', target: 'skills' },
          { label: 'Contact Vasudev Directly', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 17. Assistant Identity (V.E.D.A. Core)
    // -------------------------------------------------------------------------
    const isAssistantQuery = (
      clean === 'who are you' ||
      clean === 'what are you' ||
      clean === 'what is veda' ||
      clean === 'what is eliz' ||
      clean === 'what can you do' ||
      clean.startsWith('who are you') ||
      clean.startsWith('what is veda') ||
      clean.startsWith('what is eliz') ||
      has('what is your role') ||
      has('what is your purpose')
    );

    if (isAssistantQuery) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `I'm **ELIZ**, Vasudev's interactive portfolio guide. I can help you:\n• Explore his background, education, and credentials\n• Browse his robotics, vehicle dynamics, and software projects\n• Navigate to sections of the portfolio\n• Find his contact information.\n\nWhat would you like to explore?`,
        actions: [
          { label: 'Take Guided Tour 🌸', type: 'tour', target: 'start' },
          { label: 'Explore Flagship Builds', type: 'navigate', target: 'projects' },
          { label: 'Ask About MediArm', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // Friendly local chat cues for messages that are not portfolio questions.
    if (has('tell me a joke') || has('make me laugh') || has('got a joke')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `Why did the robot bring a pencil to the workshop? It wanted to draw its own conclusions. 🤖✏️ Want another one, or shall we get back to the projects?`,
      };
    }

    if (has('i feel sad') || has('i m sad') || has('im sad') || has('feeling down') || has('rough day') || has('bad day') || has('i feel stressed') || has('i m stressed')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'thinking',
        text: `I'm sorry it's been a rough one. You don't have to turn it into a question—if you want, tell me what's been going on, or we can switch to something lighter. 💛`,
      };
    }

    if (has('i love ') || has('i like ') || has('i enjoy ') || has('i m excited') || has('im excited')) {
      const sharedInterest = raw.replace(/^(i('| a)?m?\s+excited\s*(about\s+)?|i\s+(?:really\s+)?(?:love|like|enjoy)\s+)/i, '').replace(/[.!?]+$/, '').trim();
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: sharedInterest
          ? `Oh, nice—${sharedInterest} sounds like something you really enjoy 😊 What got you interested in it?`
          : `That sounds exciting 😊 What are you looking forward to most?`,
      };
    }

    if (has('your favorite') || has('your favourite') || has('do you like') || has('what do you think about')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `I don't have personal favorites or experiences, but I can still talk it through with you 😊 Give me a little more context and I'll share what I can, or tell you how it connects to Vasudev's engineering work.`,
      };
    }

    if (isFollowUp && followUpContext) {
      if (topicHas('rover') || topicHas('first responder') || topicHas('nav2') || topicHas('jetson')) {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'coding',
          text: `Sure—on the rover, the main idea is to combine onboard perception with ROS 2/Nav2 so it can understand a route and move through it. The portfolio documents the Jetson Orin Nano, pathway vision, navigation, and drive-by-wire work. Which piece should I unpack first?`,
        };
      }
      if (topicHas('baja') || topicHas('equinox') || topicHas('suspension')) {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'engineering',
          text: `Sure—Team Equinox's aBAJA work is centered on suspension and steering development. The portfolio mentions geometry work in Lotus SHARK, steering design in SOLIDWORKS, and dynamics work in MSC Adams Car. Want to start with suspension geometry or Ackermann steering?`,
        };
      }
      if (topicHas('mediarm') || topicHas('robotic arm')) {
        return {
          id,
          sender: 'veda',
          timestamp,
          pose: 'engineering',
          text: `Sure—MediArm is a 3-DOF arm prototype. Its documented build combines ESP32 control, motor drivers and servos, with a web interface and offline voice commands. Are you curious about the electronics, control, or interface?`,
        };
      }
    }

    // -------------------------------------------------------------------------
    // 18. Creator / Developer
    // -------------------------------------------------------------------------
    if (has('who made you') || has('who built you') || has('who created you') || has('who programmed you')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `I was created by **Vasudev Saras K M** ("TheCrazyDabi")!\n\nHe engineered me as a deterministic in-browser companion to give visitors a conversational, transparent walkthrough of his mechatronics, robotics, and cyber-physical security systems without relying on third-party cloud trackers.`,
        actions: [
          { label: 'Meet Vasudev (About)', type: 'navigate', target: 'about' },
          { label: 'Explore His Code on GitHub', type: 'external', target: 'https://github.com/TheCrazyDabi' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 19. Friendly Greetings & Salutations
    // -------------------------------------------------------------------------
    const isGreeting = (
      hasToken('hey') ||
      hasToken('hi') ||
      hasToken('hello') ||
      hasToken('yo') ||
      hasToken('sup') ||
      hasToken('namaste') ||
      hasToken('vanakkam') ||
      clean.startsWith('hey ') ||
      clean.startsWith('hello ') ||
      clean.startsWith('hi ') ||
      has('good morning') ||
      has('good afternoon') ||
      has('good evening') ||
      has('greetings')
    );

    if (isGreeting) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'greeting',
        text: `Hey! Good to see you 😊 How's your day going? I'm happy to chat, or help you explore anything in Vasudev's portfolio.`,
      };
    }

    // -------------------------------------------------------------------------
    // 20. Small Talk, Appreciation & Farewells
    // -------------------------------------------------------------------------
    if (
      has('how are you') || has('how are you doing') || has("how s it going") ||
      has('whats up') || has('what s up') || clean === 'and you' ||
      has('how about you') || has('what about you')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `I'm doing well, thanks for asking! 😊 How are you?`,
      };
    }

    if (
      clean === 'good' || clean === 'great' || clean === 'fine' || clean === 'okay' || clean === 'ok' ||
      clean === 'i m good' || clean === 'im good' || clean === 'i am good' ||
      clean === 'i m doing well' || clean === 'im doing well' || clean === 'doing good'
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `Glad to hear it 😊 What are you up to today?`,
      };
    }

    if (
      has('you are so good') || has('you re so good') ||
      has('you are amazing') || has('you re amazing') ||
      has('you are awesome') || has('you re awesome') ||
      has('you are wonderful') || has('you re wonderful') ||
      has('you are the best') || has('you re the best') ||
      has('you are so kind') || has('you re so kind') ||
      has('you are great') || has('you re great') ||
      has('you are helpful') || has('you re helpful') ||
      has('you rock') || has('love chatting') || has('great assistant')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'celebrating',
        text: `Aww, thank you! That's really kind of you to say 😊 I'm glad we can chat. What would you like to talk about next?`,
      };
    }

    if (
      has('thank') ||
      has('thanks') ||
      has('awesome') ||
      has('cool') ||
      has('great job') ||
      has('nice work') ||
      has('perfect') ||
      has('appreciate')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'celebrating',
        text: `You're very welcome! 😊 Happy to help. What else is on your mind?`,
      };
    }

    if (clean === 'bye' || has('goodbye') || has('see you') || has('later')) {
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
    // 21. Friendly, open-ended chat fallback
    // -------------------------------------------------------------------------
    const quotedMessage = raw.length > 110 ? `${raw.slice(0, 107).trimEnd()}…` : raw;
    const lastAssistantWasFallback = recentAssistantMessage?.includes('local version') ?? false;
    return {
      id,
      sender: 'veda',
      timestamp,
      pose: 'thinking',
      text: lastAssistantWasFallback
        ? `I'm following you 😊 About “${quotedMessage}”—give me one more detail and I'll try to respond more usefully. I can also switch gears to robotics, projects, or just casual chat.`
        : `I hear you 😊 You're asking about “${quotedMessage}”. I can chat casually, but this local version doesn't have a general-purpose language model behind it, so I may not know the answer yet. Share a little context and I'll do my best—or ask me about Vasudev's projects, robotics, CAD, or embedded systems.`,
    };
  }
}
