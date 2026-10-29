export type PublicationStatus = 'published' | 'draft' | 'archived';

export interface ProjectSpecification {
  [key: string]: string;
}

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface GalleryMedia {
  url: string;
  caption: string;
  isVideo?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Robotics' | 'Autonomous Systems' | 'Embedded & IoT' | 'CAD & Mechanical' | 'Software & AI' | 'Cybersecurity';
  shortDescription: string;
  status: PublicationStatus;
  projectState: 'Completed' | 'In Development' | 'Prototype Validated' | 'Research / Concept';
  coverImage: string;
  galleryImages: GalleryMedia[];
  technologies: string[];
  problemStatement: string;
  designProcess: string;
  hardwareSoftwareArchitecture: string;
  personalContribution: string;
  challengesAndSolutions: ChallengeSolution[];
  results: string;
  lessonsLearned: string;
  sourceCodeUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  specifications?: ProjectSpecification;
  isFeatured: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  verificationUrl?: string;
  credentialId?: string;
  certificateFileUrl?: string;
  status: PublicationStatus;
}

export interface Experiment {
  id: string;
  title: string;
  category: 'CAD Simulation' | 'Sensor Fusion' | 'Firmware Test' | 'Computer Vision' | 'Mechanism Test';
  date: string;
  summary: string;
  technicalDetails: string;
  mediaUrl?: string;
  tags: string[];
  status: PublicationStatus;
}

export type SkillCategory = 
  | 'Robotics & Automation'
  | 'Embedded Systems'
  | 'AI & Computer Vision'
  | 'CAD & Mechanical'
  | 'Cybersecurity'
  | 'Core Engineering & Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: 'Fundamental' | 'Proficient' | 'Advanced' | 'Expert';
  tools: string[];
  description?: string;
  orderIndex: number;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  category: 'Education' | 'Competition' | 'Leadership' | 'Project Milestone';
  orderIndex: number;
}

export interface ElizChatSample {
  id: string;
  session_id: string;
  turn_index: number;
  visitor_message: string;
  eliz_reply: string;
  consent_version: string;
  consented_at: string;
  created_at: string;
}

export interface Profile {
  name: string;
  title: string;
  college: string;
  degree: string;
  headline: string;
  introduction: string;
  aboutBio: string;
  publicEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  profileImageUrl: string;
  location: string;
  statusIndicator: string;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  showCertifications: boolean;
  showExperiments: boolean;
  showMilestones: boolean;
  showSystemArchitecture: boolean;
  enableHeroAnimations: boolean;
  githubRepoUrl: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: 'image' | 'pdf' | 'video' | 'cad';
  fileSize: number; // bytes
  altText: string;
  category: 'projects' | 'certifications' | 'experiments' | 'profile' | 'documents';
  uploadedAt: string;
}
