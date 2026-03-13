import { BADGE_CATALOG, STUDENT_SUGGESTED_PROMPTS } from "@/lib/constants";
import type {
  Application,
  BadgeRecord,
  BroadcastSegment,
  CareerAnalysisRecord,
  ChartDatum,
  EmployerListing,
  Mentor,
  NotificationItem,
  Opportunity,
  PartnerCompany,
  StudentProfile,
  SuperAdminSummary,
  UniversityStudentRecord,
} from "@/types/app";

export const demoStudentProfile: StudentProfile = {
  id: "student-demo",
  email: "adwoa.owusu@ug.edu.gh",
  name: "Adwoa Owusu",
  universityName: "University of Ghana",
  degree: "BSc Information Technology",
  major: "Human-Centered Systems",
  yearOfStudy: "Level 300",
  bio: "I enjoy solving community problems with digital tools and I want a career that blends product thinking, research, and execution.",
  careerInterests: ["Product Management", "Data & Analytics", "Software Engineering"],
  skills: ["Excel", "React", "Research", "Public speaking", "Figma", "SQL"],
  personalityType: "Connector",
  careerLevel: "Pathfinder",
  xpPoints: 860,
  progressToTarget: 72,
  badges: ["profile-complete", "ai-explorer", "skill-builder"],
  resumeUrl: null,
  resumeText:
    "Level 300 Information Technology student with project leadership experience, research skills, and a growing interest in digital product strategy.",
  subscriptionStatus: "active",
  targetRole: "Associate Product Manager",
};

export const demoNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "application_update",
    message: "Your application to Zeepay's Product Ops shadowing has been shortlisted.",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "notif-2",
    type: "badge_earned",
    message: "You earned the AI Explorer badge after your fifth companion chat.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "notif-3",
    type: "micro_task_due",
    message: "Your reflection task for this week is due tomorrow evening.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

export const demoMicroTasks = [
  {
    id: "task-1",
    title: "Tighten your fintech story",
    description:
      "Update your profile bio to explain why financial inclusion work matters to you.",
    type: "profile",
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "task-2",
    title: "Apply to one analytics shadowing role",
    description:
      "Choose a one-day placement to test your data storytelling skill in a live team.",
    type: "application",
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "task-3",
    title: "Practice a 45-second introduction",
    description:
      "Record a quick voice note introducing your strengths to an employer or mentor.",
    type: "skills",
    completed: false,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 96).toISOString(),
  },
];

export const demoAnalyses: CareerAnalysisRecord[] = [
  {
    id: "analysis-1",
    generatedAt: new Date().toISOString(),
    summary:
      "Your strongest fit sits at the intersection of product, research, and coordination. You thrive in roles where curiosity, communication, and structured follow-through all matter.",
    careerPaths: [
      {
        name: "Associate Product Manager",
        compatibilityScore: 91,
        description:
          "Guide products from idea to delivery with a strong user and execution lens.",
        whyItFits:
          "You combine systems thinking, communication, and empathy for user problems in a way that aligns strongly with product roles in Ghana's fintech and service sectors.",
        skillGaps: [
          { skill: "Product analytics", current: 55, target: 80 },
          { skill: "Roadmap planning", current: 62, target: 78 },
          { skill: "Stakeholder communication", current: 78, target: 85 },
        ],
        recommendedActions: [
          "Shadow a product or operations team at a Ghanaian fintech company.",
          "Take a short course in product analytics and experimentation.",
          "Document 2 project case studies that show user problem solving.",
        ],
      },
      {
        name: "Business Analyst",
        compatibilityScore: 84,
        description:
          "Turn business needs into structured insights, requirements, and recommendations.",
        whyItFits:
          "Your research orientation and clarity in communication make you well positioned for analysis roles that connect data, operations, and decision making.",
        skillGaps: [
          { skill: "SQL depth", current: 58, target: 82 },
          { skill: "Dashboarding", current: 63, target: 80 },
          { skill: "Requirements gathering", current: 72, target: 84 },
        ],
        recommendedActions: [
          "Build a simple dashboard from a campus dataset.",
          "Practice translating stakeholder interviews into problem statements.",
          "Apply to analytics-heavy shadowing placements.",
        ],
      },
      {
        name: "Program Coordinator",
        compatibilityScore: 79,
        description:
          "Run initiatives that require organization, relationship management, and accountability.",
        whyItFits:
          "Your connector personality and leadership behaviors map well to coordination work across NGOs, universities, and fast-moving teams.",
        skillGaps: [
          { skill: "Budget tracking", current: 40, target: 68 },
          { skill: "Project planning", current: 69, target: 84 },
          { skill: "Facilitation", current: 77, target: 86 },
        ],
        recommendedActions: [
          "Volunteer to coordinate a student-led initiative this semester.",
          "Learn simple project tracking tools like Notion or Trello.",
          "Ask a mentor to review your meeting facilitation style.",
        ],
      },
    ],
  },
  {
    id: "analysis-2",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    summary:
      "Your profile shows growing traction in problem framing, collaboration, and digital product thinking.",
    careerPaths: [],
  },
];

export const demoChatMessages = [
  {
    id: "chat-1",
    role: "assistant" as const,
    content:
      "You have real momentum. Your profile suggests product and analytics opportunities are especially promising if you keep building evidence through shadowing and case studies.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "chat-2",
    role: "user" as const,
    content: "What kind of shadowing would make me more credible for product roles?",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "chat-3",
    role: "assistant" as const,
    content:
      "Look for roles that expose you to user research, operational workflows, or feature planning. A fintech operations or product support placement in Accra would be especially useful.",
    createdAt: new Date(Date.now() - 1000 * 60 * 19).toISOString(),
  },
];

export const demoOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Fintech Product Operations Shadowing",
    companyName: "Zeepay",
    companyLogo:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=160&q=80",
    description:
      "Spend a week with the product operations team learning how customer insight, support data, and release coordination work together.",
    industry: "Fintech",
    location: "Accra",
    durationType: "1-week",
    skillsFocus: ["Product thinking", "Research", "Data storytelling"],
    availableDates: ["2026-04-15", "2026-05-20"],
    spotsTotal: 12,
    spotsRemaining: 4,
    status: "open",
    learningOutcomes: [
      "Observe prioritization meetings and support workflows",
      "Review support insights and customer feedback loops",
      "Draft one improvement recommendation with a mentor",
    ],
  },
  {
    id: "opp-2",
    title: "AgriTech Customer Success Day",
    companyName: "Farmerline",
    companyLogo:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=160&q=80",
    description:
      "A one-day immersion into customer onboarding, support, and service design for digital agriculture products.",
    industry: "Agriculture",
    location: "Kumasi",
    durationType: "1-day",
    skillsFocus: ["Communication", "Operations", "CRM"],
    availableDates: ["2026-03-28", "2026-04-11"],
    spotsTotal: 30,
    spotsRemaining: 11,
    status: "open",
    learningOutcomes: [
      "Join customer onboarding conversations",
      "Map common user pain points",
      "Practice service recovery and escalation flow design",
    ],
  },
  {
    id: "opp-3",
    title: "Health Analytics Virtual Shadowing Sprint",
    companyName: "mPharma",
    companyLogo:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=160&q=80",
    description:
      "A virtual sprint exploring reporting, pharmacy performance dashboards, and decision support routines.",
    industry: "Healthcare",
    location: "Virtual",
    durationType: "virtual",
    skillsFocus: ["SQL", "Excel", "Dashboarding"],
    availableDates: ["2026-04-03", "2026-04-24"],
    spotsTotal: 40,
    spotsRemaining: 18,
    status: "open",
    learningOutcomes: [
      "Shadow dashboard review rituals",
      "Analyze example pharmacy operations data",
      "Present a concise insight summary to the team",
    ],
  },
];

export const demoApplications: Application[] = [
  {
    id: "app-1",
    opportunityId: "opp-1",
    opportunityTitle: "Fintech Product Operations Shadowing",
    companyName: "Zeepay",
    appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    status: "pending",
    employerNotes: "We like the product-oriented angle in your profile.",
    timeline: [
      { label: "Application submitted", date: "2026-03-08", complete: true },
      { label: "Employer review", date: "2026-03-10", complete: true },
      { label: "Shortlist update", date: "2026-03-14", complete: false },
    ],
  },
  {
    id: "app-2",
    opportunityId: "opp-2",
    opportunityTitle: "AgriTech Customer Success Day",
    companyName: "Farmerline",
    appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    status: "approved",
    timeline: [
      { label: "Application submitted", date: "2026-02-22", complete: true },
      { label: "Employer review", date: "2026-02-25", complete: true },
      { label: "Approval received", date: "2026-02-27", complete: true },
    ],
  },
];

export const demoBadges: BadgeRecord[] = BADGE_CATALOG.map((badge) => ({
  ...badge,
  earned: ["profile-complete", "ai-explorer", "skill-builder"].includes(badge.id),
  earnedAt: ["profile-complete", "ai-explorer", "skill-builder"].includes(badge.id)
    ? new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString()
    : undefined,
}));

export const demoMentors: Mentor[] = [
  {
    id: "mentor-1",
    name: "Nana Ama Bediako",
    industry: "Fintech",
    company: "Flutterwave",
    expertise: ["Product strategy", "User research", "Career storytelling"],
    availability: "Two slots per month",
    bio: "Product leader helping students translate academic projects into market-facing career evidence.",
    matched: true,
    contact: "nana.ama@careerbridgeghana.com",
    calendlyUrl: "https://calendly.com/careerbridge/nana-ama",
  },
  {
    id: "mentor-2",
    name: "Kwaku Mensah",
    industry: "Data & Analytics",
    company: "MTN Ghana",
    expertise: ["SQL", "Dashboards", "Business analysis"],
    availability: "Weekly Friday office hours",
    bio: "Analytics manager who enjoys coaching students into their first credible data portfolio projects.",
  },
  {
    id: "mentor-3",
    name: "Efua Sarpong",
    industry: "Public Service",
    company: "Ministry of Communications",
    expertise: ["Policy", "Research", "Stakeholder management"],
    availability: "Monthly group sessions",
    bio: "Policy specialist supporting students who want to work at the intersection of evidence, institutions, and impact.",
  },
];

export const demoUniversityStats = [
  { label: "Students onboarded", value: "2,184", change: "+12% vs last month" },
  { label: "Active this week", value: "1,432", change: "+6.5%" },
  { label: "Shadowing completion", value: "68%", change: "+8 points" },
  { label: "Application rate", value: "41%", change: "+5 points" },
];

export const demoUniversityInterestChart: ChartDatum[] = [
  { name: "Tech", value: 540 },
  { name: "Business", value: 420 },
  { name: "Data", value: 310 },
  { name: "Public Service", value: 250 },
  { name: "Healthcare", value: 180 },
];

export const demoUniversityEngagementChart: ChartDatum[] = [
  { name: "Week 1", value: 340, secondary: 200 },
  { name: "Week 2", value: 470, secondary: 280 },
  { name: "Week 3", value: 510, secondary: 315 },
  { name: "Week 4", value: 620, secondary: 372 },
];

export const demoApplicationOutcomeChart: ChartDatum[] = [
  { name: "Pending", value: 46 },
  { name: "Approved", value: 31 },
  { name: "Rejected", value: 15 },
  { name: "Completed", value: 8 },
];

export const demoUniversityStudents: UniversityStudentRecord[] = [
  {
    id: "student-1",
    name: "Yaw Addo",
    email: "yaw.addo@ug.edu.gh",
    degree: "BSc Computer Science",
    interest: "Software Engineering",
    status: "Active",
    lastActive: "2026-03-11",
  },
  {
    id: "student-2",
    name: "Abena Ofori",
    email: "abena.ofori@ug.edu.gh",
    degree: "BA Economics",
    interest: "Business Analysis",
    status: "Invited",
    lastActive: "2026-03-08",
  },
  {
    id: "student-3",
    name: "Elikem Tetteh",
    email: "elikem.tetteh@ug.edu.gh",
    degree: "BSc Statistics",
    interest: "Data & Analytics",
    status: "Active",
    lastActive: "2026-03-10",
  },
];

export const demoPartnerCompanies: PartnerCompany[] = [
  {
    id: "partner-1",
    name: "Hubtel",
    industry: "Technology",
    status: "approved",
    location: "Accra",
  },
  {
    id: "partner-2",
    name: "Ecobank Ghana",
    industry: "Banking",
    status: "pending",
    location: "Accra",
  },
  {
    id: "partner-3",
    name: "Komfo Anokye Teaching Hospital",
    industry: "Healthcare",
    status: "requested",
    location: "Kumasi",
  },
];

export const demoBroadcasts: BroadcastSegment[] = [
  {
    id: "broadcast-1",
    title: "Shadowing sprint opens next Monday",
    audience: "Level 300 students",
    scheduledFor: "2026-03-15 09:00",
    status: "draft",
  },
  {
    id: "broadcast-2",
    title: "Resume clinic replay available",
    audience: "All active students",
    scheduledFor: "2026-03-10 14:00",
    status: "sent",
  },
];

export const demoEmployerStats = [
  { label: "Active listings", value: "6", change: "2 refreshed this week" },
  { label: "Applications", value: "142", change: "+19% month over month" },
  { label: "Approval rate", value: "37%", change: "Healthy pipeline" },
  { label: "Avg. conversion", value: "12.4%", change: "View to apply" },
];

export const demoEmployerListings: EmployerListing[] = [
  {
    id: "listing-1",
    title: "Product Ops Shadowing",
    views: 580,
    applications: 49,
    status: "open",
    spotsRemaining: 4,
  },
  {
    id: "listing-2",
    title: "Data Insights Virtual Sprint",
    views: 390,
    applications: 28,
    status: "open",
    spotsRemaining: 12,
  },
  {
    id: "listing-3",
    title: "Customer Success Day",
    views: 221,
    applications: 17,
    status: "paused",
    spotsRemaining: 7,
  },
];

export const demoApplicants = [
  {
    id: "applicant-1",
    name: "Adwoa Owusu",
    university: "University of Ghana",
    degree: "BSc IT",
    fit: "High",
    status: "shortlisted",
  },
  {
    id: "applicant-2",
    name: "Prince Boateng",
    university: "KNUST",
    degree: "BSc Business Administration",
    fit: "Medium",
    status: "reviewing",
  },
  {
    id: "applicant-3",
    name: "Mildred Nartey",
    university: "Ashesi University",
    degree: "BSc MIS",
    fit: "High",
    status: "approved",
  },
];

export const demoSuperAdminSummary: SuperAdminSummary = {
  totalUsers: 18426,
  totalUniversities: 23,
  totalEmployers: 184,
  monthlyRecurringRevenue: 86240,
  activeSubscriptions: 31,
  apiUsage: 129843,
  storageUsageGb: 312,
};

export const demoSuperAdminCharts = {
  growth: [
    { name: "Oct", value: 4200, secondary: 9 },
    { name: "Nov", value: 6800, secondary: 12 },
    { name: "Dec", value: 9200, secondary: 16 },
    { name: "Jan", value: 12300, secondary: 22 },
    { name: "Feb", value: 15200, secondary: 27 },
    { name: "Mar", value: 18426, secondary: 31 },
  ],
  topUniversities: [
    { name: "UG", value: 3120 },
    { name: "KNUST", value: 2980 },
    { name: "UCC", value: 2210 },
    { name: "Ashesi", value: 1180 },
  ],
};

export const demoSuggestedPrompts = STUDENT_SUGGESTED_PROMPTS;
