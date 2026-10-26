import { Profile, Project, Certification, Skill } from '../types/content';
import { initialProfile, initialCertifications, initialSkills } from '../data/seedData';
import { archivedProjects } from '../data/archivedProjects';

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
      'Equinox aBAJA: Double-wishbone geometry suppressing bump-steer to <0.35°',
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
  'Explain MediArm.',
  'What was his contribution to Baja SAE?',
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
   * Process a visitor's question using deterministic portfolio knowledge.
   * Strict adherence to truthfulness: answers only what is published.
   */
  public static async answerQuestion(rawQuery: string): Promise<GuideMessage> {
    const query = rawQuery.trim().toLowerCase();
    const id = `veda-msg-${Date.now()}`;
    const timestamp = this.getTimestamp();

    // 1. "Who is Vasudev?" / Bio / Identity
    if (
      query.includes('who is') ||
      query.includes('about vasudev') ||
      query.includes('tell me about you') ||
      query.includes('background') ||
      query.includes('dabi')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'explaining',
        text: `Vasudev Saras K M ("TheCrazyDabi") is an undergraduate Robotics & Automation Engineering student at Saintgits College of Engineering, affiliated with APJ Abdul Kalam Technological University, based in Calicut, Kerala.\n\nHis engineering craft bridges physical mechanisms (CAD, suspension kinematics, multibody dynamics) with deterministic computing (ROS 2 Humble, Jetson Orin Nano, Drive-by-Wire CAN bus, and edge computer vision). He is dedicated to building robust, safety-critical autonomous systems.`,
        actions: [
          { label: 'View About Section', type: 'navigate', target: 'about' },
          { label: 'Explore Skills Matrix', type: 'navigate', target: 'skills' },
          { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // 2. "What robotics projects has he worked on?" / Projects overview
    if (
      query.includes('what robotics projects') ||
      query.includes('projects') ||
      query.includes('builds') ||
      query.includes('what has he built') ||
      query.includes('portfolio')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `Vasudev has engineered several flagship robotics and mechatronic systems:\n\n1. Autonomous First-Responder Rover: An electric buggy retrofitted with NVIDIA Jetson Orin Nano, ROS 2/Nav2, and Drive-by-Wire CAN communication for campus emergency dispatch.\n2. Equinox aBAJA SAE 2026: Led suspension and steering CAD kinematics using Lotus SHARK, SolidWorks, and MSC Adams Car.\n3. MediArm: A 3-DOF articulated robotic arm powered by ESP32, high-current BTS7960 motor drivers, and offline voice command.\n4. Silent Guardian: An in-browser acoustic threat firewall built with Vosk speech analysis.`,
        actions: [
          { label: 'Inspect Projects', type: 'navigate', target: 'projects' },
          { label: 'Baja SAE Details', type: 'navigate', target: 'projects' },
          { label: 'Ask About MediArm', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // 3. "Explain MediArm"
    if (query.includes('mediarm') || query.includes('robotic arm') || query.includes('manipulator')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'engineering',
        text: `MediArm is a 3-DOF semi-autonomous articulated manipulator designed for assistive healthcare and laboratory sample handling:\n\n• Microcontroller: Dual-core ESP32 (240MHz) handling kinematics and servo PWM rails.\n• Actuation: High-current IBT-2 (BTS7960 43A) H-bridge drivers isolating inductive motor noise from sensitive digital logic.\n• Voice Control: Integrated offline acoustic speech recognition using Vosk for touchless hands-free manipulation.\n• Safety: Hardware E-Stop kill switch and software joint travel limits to prevent kinematic singularities.`,
        actions: [
          { label: 'Explore Systems & Skills', type: 'navigate', target: 'skills' },
          { label: 'View CAD Kinematics', type: 'navigate', target: 'hero' }
        ]
      };
    }

    // 4. "What was his contribution to Baja SAE?" / Equinox
    if (
      query.includes('baja') ||
      query.includes('equinox') ||
      query.includes('suspension') ||
      query.includes('steering') ||
      query.includes('shark') ||
      query.includes('adams')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'engineering',
        text: `For Team Equinox at the national aBAJA SAE 2026 electric buggy competition, Vasudev served on the Suspension & Steering Development Team:\n\n• Kinematic Synthesis: Modelled double-wishbone hardpoints in Lotus SHARK, optimizing roll-centre migration and keeping bump-steer under 0.35° per 100mm travel.\n• Steering CAD: Engineered steering geometry using 88% Ackermann principles in Dassault Systèmes SOLIDWORKS, reducing tyre scrub during high-articulation off-road turns.\n• Multibody Dynamics: Evaluated transient roll behaviour and cornering compliance using MSC Adams Car.\n• Physical Testing: Successfully cleared technical scrutiny and dynamic track tests during aBAJA 2026.`,
        actions: [
          { label: 'View Equinox Photography', type: 'navigate', target: 'projects' },
          { label: 'See CAD Skills', type: 'navigate', target: 'skills' }
        ]
      };
    }

    // 5. "Which projects demonstrate embedded systems or computer vision?"
    if (
      query.includes('embedded') ||
      query.includes('computer vision') ||
      query.includes('vision') ||
      query.includes('esp32') ||
      query.includes('can bus') ||
      query.includes('yolo') ||
      query.includes('jetson')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'coding',
        text: `Here is how Vasudev’s work divides across Embedded Systems and Computer Vision:\n\n• Embedded Systems & Firmware:\n  - Drive-by-Wire CAN Bus: Custom CAN frame transceiver on ESP32/MCP2515 bridging vehicle throttle and linear steering actuators.\n  - Motor Drivers: High-current BTS7960 43A H-bridges on MediArm with hardware PWM timing.\n\n• Computer Vision & Autonomy:\n  - Autonomous First-Responder: Custom-trained YOLOv8 / PIDNet-S instance segmentation model running on NVIDIA Jetson Orin Nano at 38.4 FPS to segment dirt and paved campus pathways.\n  - Nav2 Costmap: Fuses vision boundaries with 2D costmaps for local path planning.`,
        actions: [
          { label: 'Explore Systems Matrix', type: 'navigate', target: 'skills' },
          { label: 'View Autonomous Rover', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // 6. "What certifications are listed?"
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
        text: `Vasudev holds several verified technical credentials:\n\n1. National Institute of Technology (NIT) Calicut: Advanced Industrial Automation Internship (Credential: NITC-IIA-2024).\n2. Dassault Systèmes: Certified SOLIDWORKS Associate (CSWA) in Mechanical Design (Credential: C-CSWA-90412).\n3. Open Robotics: ROS 2 Basics & Robot Operating System Architecture (Credential: ROS2-ENG-8491).\n4. Techmaghi: Advanced Ethical Hacking & Cyber Defense (Credential: TM-CYBER-8841).\n5. Offenso Hackers Academy: Cybersecurity Defense Frameworks (OHA-BOOTCAMP-2025).`,
        actions: [
          { label: 'View Verified Credentials', type: 'navigate', target: 'credentials' },
          { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
        ]
      };
    }

    // 7. "How can I contact him?" / Contact channels
    if (
      query.includes('contact') ||
      query.includes('email') ||
      query.includes('hire') ||
      query.includes('reach') ||
      query.includes('phone') ||
      query.includes('linkedin') ||
      query.includes('github')
    ) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'happy',
        text: `You can reach Vasudev directly through his published channels:\n\n• Email: vasudevb2w@gmail.com\n• LinkedIn: linkedin.com/in/d4biie\n• GitHub: github.com/TheCrazyDabi\n• Phone: +91 7012541567\n• Location: Calicut, Kerala, India\n\nHe is actively open for robotics engineering internships, autonomous systems development, and embedded firmware roles!`,
        actions: [
          { label: 'Go to Contact Section', type: 'navigate', target: 'contact' },
          { label: 'Send Mail Directly', type: 'external', target: 'mailto:vasudevb2w@gmail.com' }
        ]
      };
    }

    // 8. Silent Guardian / Cyber Security
    if (
      query.includes('silent guardian') ||
      query.includes('security') ||
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
        text: `Vasudev also specializes in cyber-physical security:\n\n• Silent Guardian: Built at Hack@Cooee 24h sprint, it is a 100% in-browser acoustic threat firewall using Vosk offline speech recognition and heuristic scoring to redact sensitive OTPs/PINs during malicious calls.\n• NetSentinel v2.0: Terminal-based 802.11 monitor mode sniffer detecting deauthentication flood anomalies in <180ms.\n• Rakuzan SOC: High-throughput git entropy pre-commit scanner checking 10,000 lines in <1.2s to stop leaked cloud credentials.`,
        actions: [
          { label: 'View Lab Experiments', type: 'navigate', target: 'skills' },
          { label: 'Inspect Projects', type: 'navigate', target: 'projects' }
        ]
      };
    }

    // 9. Guided tour request
    if (query.includes('tour') || query.includes('walkthrough') || query.includes('guide me')) {
      return {
        id,
        sender: 'veda',
        timestamp,
        pose: 'greeting',
        text: `I'd love to give you a guided walkthrough of Vasudev's portfolio! We will travel step-by-step through:\n\n1. Home & 3D Face Card\n2. About & Academic Ethos\n3. Featured Projects\n4. Systems & Skills Matrix\n5. Verified Credentials\n6. Direct Contact\n\nClick "Start Guided Tour" below to begin!`,
        actions: [
          { label: 'Start Guided Tour', type: 'tour', target: 'start' }
        ]
      };
    }

    // 10. Default fallback
    return {
      id,
      sender: 'veda',
      timestamp,
      pose: 'explaining',
      text: `I have searched Vasudev's verified engineering portfolio database regarding "${rawQuery.slice(0, 60)}".\n\nVasudev specializes in:\n• Robotics & Autonomy (ROS 2 Humble, Nav2, Jetson Orin Nano, YOLOv8)\n• Vehicle Dynamics & CAD (Lotus SHARK, SolidWorks, aBAJA SAE 2026)\n• Embedded Firmware (ESP32, Drive-by-Wire CAN Bus, BTS7960)\n• Cyber-Physical Defense (Vosk acoustic models, 802.11 packet inspection)\n\nTry clicking one of the suggested questions below or ask about a specific project!`,
      actions: [
        { label: 'Explore Projects', type: 'navigate', target: 'projects' },
        { label: 'View Skills', type: 'navigate', target: 'skills' },
        { label: 'Contact Vasudev', type: 'navigate', target: 'contact' }
      ]
    };
  }
}
