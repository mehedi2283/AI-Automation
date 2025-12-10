
export interface ServiceFeature {
  title: string;
  description: string;
  icon: any;
}

export interface PlaygroundConfig {
  model: string;
  temperature: number;
  systemInstruction: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  RUNNER = 'RUNNER',
  EDITOR = 'EDITOR',
  LOGS = 'LOGS',
  CMS = 'CMS',
  BOOKINGS = 'BOOKINGS', // New view for Appointments
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  model: string;
  systemInstruction: string;
  temperature: number;
  status: 'active' | 'draft' | 'archived';
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  timestamp: string;
  input: string;
  output: string;
  durationMs: number;
  status: 'success' | 'error';
}

export interface ClientFeedback {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  stats: { label: string; value: string }[];
  tags: string[];
  mainImage: string;
  clientMeetingImage: string;
  extraImage?: string;    // New: Extra detail image
  videoPoster: string;
  videoLink?: string;     // YouTube/Vimeo link
  publishDate?: string;   // New: Dynamic publish date (ISO string or YYYY-MM-DD)
  isFeatured?: boolean;   // Toggle state
  clientFeedback?: ClientFeedback;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface ClientImage {
  id: string;
  imageUrl: string;
  name: string;
}

export interface TechTool {
  id: string;
  name: string;
  category: string; // "CRM & Marketing", "Integrations", "AI Voice", etc.
  iconName: string; // Lucide icon name string
  colorClass: string; // Tailwind color class e.g. "text-blue-600"
}

export interface AboutInfo {
  id: string;
  bio: string;
  totalProjects: string;
  hoursLogged: string;
  achievements: {
    title: string;
    description: string;
  }[];
  agencyName?: string;
  adminPassword?: string;
}

export interface Booking {
  bookingId: string;
  clientName: string;
  clientEmail?: string;
  appointmentDate?: string;
  status: string;
  source: string;
  createdAt: string;
}