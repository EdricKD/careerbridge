import {
  BriefcaseBusiness,
  Building2,
  ChartColumnBig,
  Compass,
  LayoutDashboard,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";
import type { CareerPersonalityType, NavItem, UserRole } from "@/types/app";

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/dashboard", icon: "layout-dashboard" },
  {
    title: "Career Analysis",
    href: "/career-analysis",
    icon: "sparkles",
  },
  { title: "Shadowing", href: "/shadowing", icon: "briefcase-business" },
  { title: "Companion Chat", href: "/chat", icon: "message-square-text" },
  { title: "Progress", href: "/progress", icon: "trophy" },
  { title: "Mentorship", href: "/mentorship", icon: "handshake" },
  { title: "Settings", href: "/settings", icon: "settings" },
];

export const UNIVERSITY_NAV_ITEMS: NavItem[] = [
  { title: "Overview", href: "/university/admin", icon: "layout-dashboard" },
  { title: "Students", href: "/university/students", icon: "users" },
  { title: "Analytics", href: "/university/analytics", icon: "chart-column-big" },
  {
    title: "Partnerships",
    href: "/university/partnerships",
    icon: "building-2",
  },
  { title: "Billing", href: "/university/billing", icon: "credit-card" },
];

export const EMPLOYER_NAV_ITEMS: NavItem[] = [
  { title: "Overview", href: "/employer/dashboard", icon: "layout-dashboard" },
  {
    title: "Opportunities",
    href: "/employer/opportunities",
    icon: "briefcase-business",
  },
  { title: "Applicants", href: "/employer/applicants", icon: "users" },
  { title: "Company Profile", href: "/employer/profile", icon: "building-2" },
];

export const SUPER_ADMIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Overview",
    href: "/super-admin/overview",
    icon: "layout-dashboard",
  },
  {
    title: "Universities",
    href: "/super-admin/universities",
    icon: "graduation-cap",
  },
  {
    title: "Employers",
    href: "/super-admin/employers",
    icon: "building-2",
  },
  { title: "System", href: "/super-admin/system", icon: "shield-check" },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Student",
  university_admin: "University Admin",
  employer: "Employer",
  super_admin: "Super Admin",
};

export const ROLE_HOME: Record<UserRole, string> = {
  student: "/dashboard",
  university_admin: "/university/admin",
  employer: "/employer/dashboard",
  super_admin: "/super-admin/overview",
};

export const CAREER_INTERESTS = [
  { name: "Product Management", icon: Compass },
  { name: "Data & Analytics", icon: ChartColumnBig },
  { name: "Software Engineering", icon: BriefcaseBusiness },
  { name: "Business Development", icon: Building2 },
  { name: "Design & Brand", icon: Sparkles },
  { name: "Policy & Public Service", icon: ScrollText },
  { name: "Operations", icon: LayoutDashboard },
  { name: "People & HR", icon: Users },
];

export const SKILL_CATALOG = [
  "Excel",
  "Power BI",
  "SQL",
  "Public speaking",
  "Research",
  "Customer support",
  "Project management",
  "Canva",
  "React",
  "Python",
  "Data storytelling",
  "Figma",
  "Accounting",
  "Financial modelling",
  "CRM",
  "Report writing",
];

export const PERSONALITY_QUIZ = [
  {
    id: "q1",
    question: "When a complex challenge lands on your desk, where do you start?",
    options: [
      { label: "Break it into patterns and data points", type: "Analytical" },
      { label: "Imagine a bold new angle first", type: "Creative" },
      { label: "Pull people together and assign a plan", type: "Leader" },
    ],
  },
  {
    id: "q2",
    question: "What kind of work leaves you most energized after a long day?",
    options: [
      { label: "Building something practical that people will use", type: "Builder" },
      { label: "Helping people align and connect", type: "Connector" },
      { label: "Digging into the root cause until it clicks", type: "Investigator" },
    ],
  },
  {
    id: "q3",
    question: "In group projects, your natural role is usually:",
    options: [
      { label: "The strategist", type: "Analytical" },
      { label: "The storyteller", type: "Creative" },
      { label: "The organizer", type: "Leader" },
    ],
  },
  {
    id: "q4",
    question: "Which kind of feedback motivates you most?",
    options: [
      { label: "Your reasoning was sharp and clear", type: "Analytical" },
      { label: "Your idea felt fresh and memorable", type: "Creative" },
      { label: "You moved the whole team forward", type: "Leader" },
    ],
  },
  {
    id: "q5",
    question: "Which sentence sounds most like you?",
    options: [
      { label: "I learn best by making and testing", type: "Builder" },
      { label: "I notice what people need before they say it", type: "Connector" },
      { label: "I keep pulling threads until the answer makes sense", type: "Investigator" },
    ],
  },
  {
    id: "q6",
    question: "If you had one free afternoon, you would rather:",
    options: [
      { label: "Map a smart system for a messy problem", type: "Analytical" },
      { label: "Sketch, write, or create a concept", type: "Creative" },
      { label: "Coordinate a project or event", type: "Leader" },
    ],
  },
  {
    id: "q7",
    question: "What kind of impact matters most to you?",
    options: [
      { label: "Useful outputs people can rely on", type: "Builder" },
      { label: "Stronger relationships and trust", type: "Connector" },
      { label: "Truth, evidence, and deeper understanding", type: "Investigator" },
    ],
  },
  {
    id: "q8",
    question: "When you picture your future career, you want it to feel:",
    options: [
      { label: "Strategic and intellectually stimulating", type: "Analytical" },
      { label: "Expressive and original", type: "Creative" },
      { label: "Influential and people-facing", type: "Leader" },
    ],
  },
] as const satisfies Array<{
  id: string;
  question: string;
  options: Array<{ label: string; type: CareerPersonalityType }>;
}>;

export const BADGE_CATALOG = [
  {
    id: "first-application",
    name: "First Application",
    description: "Submitted your first shadowing application.",
    icon: "Rocket",
    criteria: "Submit one shadowing application",
  },
  {
    id: "profile-complete",
    name: "Profile Complete",
    description: "Completed every core section of your student profile.",
    icon: "BadgeCheck",
    criteria: "Complete onboarding and upload a profile summary",
  },
  {
    id: "ai-explorer",
    name: "AI Explorer",
    description: "Held five AI career companion conversations.",
    icon: "Sparkles",
    criteria: "Complete 5 AI chats",
  },
  {
    id: "shadowing-pioneer",
    name: "Shadowing Pioneer",
    description: "Finished your first job shadowing experience.",
    icon: "Mountain",
    criteria: "Complete one shadowing placement",
  },
  {
    id: "consistency-king",
    name: "Consistency King",
    description: "Logged in for seven days in a row.",
    icon: "Flame",
    criteria: "Maintain a 7-day login streak",
  },
  {
    id: "skill-builder",
    name: "Skill Builder",
    description: "Added and tracked 10 or more career skills.",
    icon: "Hammer",
    criteria: "Add 10 skills to your profile",
  },
];

export const STUDENT_SUGGESTED_PROMPTS = [
  "Review my CV for Ghanaian internships",
  "What shadowing opportunities fit my interests?",
  "How do I prepare for an interview at a fintech company?",
];

export const SUBSCRIPTION_PRICING = {
  university: [
    {
      tier: "Starter",
      description: "Up to 500 students",
      pricePerSeat: 8,
    },
    {
      tier: "Growth",
      description: "500 to 2,000 students",
      pricePerSeat: 6,
    },
    {
      tier: "Enterprise",
      description: "2,000+ students",
      pricePerSeat: 4,
    },
  ],
  individual: {
    standalone: 10,
    licensedTopUp: 5,
  },
};
