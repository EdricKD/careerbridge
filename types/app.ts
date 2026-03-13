export type UserRole =
  | "student"
  | "university_admin"
  | "employer"
  | "super_admin";

export type SubscriptionStatus =
  | "inactive"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled";

export type CareerPersonalityType =
  | "Analytical"
  | "Creative"
  | "Leader"
  | "Builder"
  | "Connector"
  | "Investigator";

export type CareerLevel =
  | "Freshman"
  | "Explorer"
  | "Pathfinder"
  | "Navigator"
  | "Trailblazer"
  | "Pioneer";

export type OpportunityDuration = "1-day" | "1-week" | "virtual";

export type OpportunityStatus = "draft" | "open" | "closed" | "paused";

export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

export type NotificationType =
  | "application_update"
  | "matching_opportunity"
  | "ai_checkin"
  | "badge_earned"
  | "micro_task_due"
  | "broadcast"
  | "mentor_match";

export type MentorMatchStatus =
  | "requested"
  | "matched"
  | "scheduled"
  | "completed";

export type MicroTaskType =
  | "profile"
  | "application"
  | "skills"
  | "reflection"
  | "mentorship";

export type NavItem = {
  title: string;
  href: string;
  icon: string;
};

export type Stat = {
  label: string;
  value: string;
  change?: string;
};

export type NotificationItem = {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
};

export type MicroTask = {
  id: string;
  title: string;
  description: string;
  type: MicroTaskType;
  completed: boolean;
  dueDate: string;
};

export type CareerPath = {
  name: string;
  compatibilityScore: number;
  description: string;
  whyItFits: string;
  skillGaps: Array<{
    skill: string;
    current: number;
    target: number;
  }>;
  recommendedActions: string[];
};

export type CareerAnalysisRecord = {
  id: string;
  generatedAt: string;
  summary: string;
  careerPaths: CareerPath[];
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type StudentProfile = {
  id: string;
  email: string;
  name: string;
  universityName: string;
  degree: string;
  major: string;
  yearOfStudy: string;
  bio: string;
  careerInterests: string[];
  skills: string[];
  personalityType: CareerPersonalityType;
  careerLevel: CareerLevel;
  xpPoints: number;
  progressToTarget: number;
  badges: string[];
  resumeUrl?: string | null;
  resumeText?: string | null;
  subscriptionStatus: SubscriptionStatus;
  targetRole: string;
};

export type Opportunity = {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  description: string;
  industry: string;
  location: string;
  durationType: OpportunityDuration;
  skillsFocus: string[];
  availableDates: string[];
  spotsTotal: number;
  spotsRemaining: number;
  status: OpportunityStatus;
  learningOutcomes: string[];
};

export type Application = {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  companyName: string;
  appliedAt: string;
  status: ApplicationStatus;
  employerNotes?: string;
  timeline: Array<{
    label: string;
    date: string;
    complete: boolean;
  }>;
};

export type BadgeRecord = {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earned: boolean;
  earnedAt?: string;
};

export type Mentor = {
  id: string;
  name: string;
  industry: string;
  company: string;
  expertise: string[];
  availability: string;
  bio: string;
  matched?: boolean;
  contact?: string;
  calendlyUrl?: string;
};

export type ChartDatum = {
  name: string;
  value: number;
  secondary?: number;
};

export type UniversityStudentRecord = {
  id: string;
  name: string;
  email: string;
  degree: string;
  interest: string;
  status: string;
  lastActive: string;
};

export type EmployerListing = {
  id: string;
  title: string;
  views: number;
  applications: number;
  status: OpportunityStatus;
  spotsRemaining: number;
};

export type PartnerCompany = {
  id: string;
  name: string;
  industry: string;
  status: "approved" | "pending" | "requested";
  location: string;
};

export type BroadcastSegment = {
  id: string;
  title: string;
  audience: string;
  scheduledFor: string;
  status: "draft" | "sent";
};

export type SuperAdminSummary = {
  totalUsers: number;
  totalUniversities: number;
  totalEmployers: number;
  monthlyRecurringRevenue: number;
  activeSubscriptions: number;
  apiUsage: number;
  storageUsageGb: number;
};
