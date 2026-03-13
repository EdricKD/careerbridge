import { z } from "zod";

export const roleSchema = z.enum([
  "student",
  "university_admin",
  "employer",
  "super_admin",
]);

export const onboardingStudentSchema = z.object({
  role: z.literal("student"),
  name: z.string().min(2),
  universityId: z.string().optional(),
  universityName: z.string().min(2),
  degree: z.string().min(2),
  major: z.string().min(2),
  yearOfStudy: z.string().min(1),
  bio: z.string().max(500).optional().default(""),
  skills: z.array(z.string()).min(1),
  careerInterests: z.array(z.string()).min(1),
  personalityType: z.enum([
    "Analytical",
    "Creative",
    "Leader",
    "Builder",
    "Connector",
    "Investigator",
  ]),
});

export const onboardingEmployerSchema = z.object({
  role: z.literal("employer"),
  companyName: z.string().min(2),
  industry: z.string().min(2),
  location: z.string().min(2),
  description: z.string().min(20),
  website: z.string().url().optional().or(z.literal("")),
});

export const onboardingUniversitySchema = z.object({
  role: z.literal("university_admin"),
  name: z.string().min(2),
  location: z.string().min(2),
  contactEmail: z.string().email(),
  licenseType: z.string().min(2),
  maxStudents: z.coerce.number().int().positive(),
});

export const onboardingPayloadSchema = z.discriminatedUnion("role", [
  onboardingStudentSchema,
  onboardingEmployerSchema,
  onboardingUniversitySchema,
]);

export const opportunitySchema = z.object({
  title: z.string().min(4),
  description: z.string().min(20),
  industry: z.string().min(2),
  location: z.string().min(2),
  durationType: z.enum(["1-day", "1-week", "virtual"]),
  skillsFocus: z.array(z.string()).min(1),
  availableDates: z.array(z.string()).min(1),
  spotsTotal: z.coerce.number().int().positive(),
});

export const applicationSchema = z.object({
  opportunityId: z.string().min(1),
  note: z.string().max(500).optional(),
});

export const aiChatSchema = z.object({
  message: z.string().min(1).max(2000),
  studentId: z.string().optional(),
});

export const paymentCheckoutSchema = z.object({
  planType: z.enum(["individual", "university"]),
  quantity: z.coerce.number().int().positive().optional(),
  universityId: z.string().optional(),
  successPath: z.string().default("/dashboard"),
  cancelPath: z.string().default("/settings"),
});

export const mentorRequestSchema = z.object({
  mentorId: z.string().min(1),
  note: z.string().max(500).optional(),
});
