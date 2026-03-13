"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CAREER_INTERESTS, PERSONALITY_QUIZ, SKILL_CATALOG } from "@/lib/constants";
import { ROLE_HOME } from "@/lib/constants";
import type { CareerAnalysisRecord, CareerPersonalityType, UserRole } from "@/types/app";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type StudentState = {
  name: string;
  universityName: string;
  degree: string;
  major: string;
  yearOfStudy: string;
  bio: string;
  skills: string[];
  careerInterests: string[];
  personalityAnswers: Record<string, CareerPersonalityType>;
  resumeFile: File | null;
};

const initialStudentState: StudentState = {
  name: "",
  universityName: "",
  degree: "",
  major: "",
  yearOfStudy: "",
  bio: "",
  skills: [],
  careerInterests: [],
  personalityAnswers: {},
  resumeFile: null,
};

function getPersonalityType(answers: Record<string, CareerPersonalityType>) {
  const tally = Object.values(answers).reduce<Record<string, number>>((acc, answer) => {
    acc[answer] = (acc[answer] ?? 0) + 1;
    return acc;
  }, {});

  return (Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "Connector") as CareerPersonalityType;
}

export function OnboardingFlow() {
  const router = useRouter();

  const [role, setRole] = useState<UserRole>("student");
  const [studentState, setStudentState] = useState<StudentState>(initialStudentState);
  const [manualSkill, setManualSkill] = useState("");
  const [step, setStep] = useState(0);
  const [analysis, setAnalysis] = useState<CareerAnalysisRecord | null>(null);
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    industry: "",
    location: "",
    description: "",
    website: "",
  });
  const [universityForm, setUniversityForm] = useState({
    name: "",
    location: "",
    contactEmail: "",
    licenseType: "Starter",
    maxStudents: "500",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const studentProgress = useMemo(() => ((step + 1) / 6) * 100, [step]);
  const currentPersonality = getPersonalityType(studentState.personalityAnswers);

  function toggleSkill(skill: string) {
    setStudentState((current) => ({
      ...current,
      skills: current.skills.includes(skill)
        ? current.skills.filter((item) => item !== skill)
        : [...current.skills, skill],
    }));
  }

  function toggleInterest(interest: string) {
    setStudentState((current) => ({
      ...current,
      careerInterests: current.careerInterests.includes(interest)
        ? current.careerInterests.filter((item) => item !== interest)
        : [...current.careerInterests, interest],
    }));
  }

  function addManualSkill() {
    if (!manualSkill.trim()) return;
    toggleSkill(manualSkill.trim());
    setManualSkill("");
  }

  async function submitStudentOnboarding() {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("role", "student");
      formData.append("name", studentState.name);
      formData.append("universityName", studentState.universityName);
      formData.append("degree", studentState.degree);
      formData.append("major", studentState.major);
      formData.append("yearOfStudy", studentState.yearOfStudy);
      formData.append("bio", studentState.bio);
      formData.append("skills", JSON.stringify(studentState.skills));
      formData.append(
        "careerInterests",
        JSON.stringify(studentState.careerInterests),
      );
      formData.append("personalityType", currentPersonality);

      if (studentState.resumeFile) {
        formData.append("resume", studentState.resumeFile);
      }

      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to finish onboarding");
      }

      setAnalysis(payload.analysis);
      setStep(5);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function submitOrgOnboarding() {
    setLoading(true);
    setError(null);

    try {
      const payload =
        role === "employer"
          ? { role, ...companyForm }
          : {
              role,
              ...universityForm,
              maxStudents: Number(universityForm.maxStudents),
            };

      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Unable to finish onboarding");
      }

      router.push(ROLE_HOME[role]);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="p-6">
        <p className="eyebrow">Role setup</p>
        <h2 className="mt-4 text-2xl">Who are we configuring today?</h2>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          The app changes shape depending on whether you are a student,
          university admin, employer, or platform operator.
        </p>

        <div className="mt-6 space-y-2">
          {[
            { value: "student", label: "Student" },
            { value: "university_admin", label: "University Admin" },
            { value: "employer", label: "Employer" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setRole(item.value as UserRole)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                role === item.value
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-slate-700"
              }`}
            >
              <p className="font-semibold">{item.label}</p>
              <p className={`mt-1 text-sm ${role === item.value ? "text-white/75" : "text-slate-500"}`}>
                {item.value === "student"
                  ? "Conversational AI-guided onboarding with career fit analysis."
                  : item.value === "university_admin"
                    ? "Quick institutional setup for licensing, analytics, and messaging."
                    : "Company onboarding for shadowing opportunities and applicants."}
              </p>
            </button>
          ))}
        </div>
      </Card>

      {role === "student" ? (
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border bg-slate-50/80 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Student onboarding</p>
                <h1 className="mt-4 text-3xl">Let&apos;s build your career operating system</h1>
              </div>
              <div className="w-full max-w-xs">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                  <span>Progress</span>
                  <span>{Math.round(studentProgress)}%</span>
                </div>
                <Progress value={studentProgress} />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {step === 0 ? (
                  <>
                    <div>
                      <h2 className="text-2xl">Tell me about you first</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        We&apos;ll keep this warm and lightweight. Just enough to
                        understand your current academic context.
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        placeholder="Your full name"
                        value={studentState.name}
                        onChange={(event) =>
                          setStudentState((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="University"
                        value={studentState.universityName}
                        onChange={(event) =>
                          setStudentState((current) => ({
                            ...current,
                            universityName: event.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Degree"
                        value={studentState.degree}
                        onChange={(event) =>
                          setStudentState((current) => ({
                            ...current,
                            degree: event.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Major"
                        value={studentState.major}
                        onChange={(event) =>
                          setStudentState((current) => ({
                            ...current,
                            major: event.target.value,
                          }))
                        }
                      />
                      <Select
                        value={studentState.yearOfStudy}
                        onChange={(event) =>
                          setStudentState((current) => ({
                            ...current,
                            yearOfStudy: event.target.value,
                          }))
                        }
                      >
                        <option value="">Year of study</option>
                        <option value="Level 100">Level 100</option>
                        <option value="Level 200">Level 200</option>
                        <option value="Level 300">Level 300</option>
                        <option value="Level 400">Level 400</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </Select>
                      <Input
                        placeholder="Short bio"
                        value={studentState.bio}
                        onChange={(event) =>
                          setStudentState((current) => ({
                            ...current,
                            bio: event.target.value,
                          }))
                        }
                      />
                    </div>
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <div>
                      <h2 className="text-2xl">What can you already do?</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        Tap skills that feel true right now. You can always add
                        more later as you grow.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {SKILL_CATALOG.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                            studentState.skills.includes(skill)
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-white text-slate-600"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Input
                        value={manualSkill}
                        onChange={(event) => setManualSkill(event.target.value)}
                        placeholder="Add another skill manually"
                      />
                      <Button type="button" variant="outline" onClick={addManualSkill}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <div>
                      <h2 className="text-2xl">Where are you drawn?</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        Pick the career zones that feel energizing right now.
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {CAREER_INTERESTS.map((interest) => {
                        const selected = studentState.careerInterests.includes(
                          interest.name,
                        );

                        return (
                          <button
                            key={interest.name}
                            type="button"
                            onClick={() => toggleInterest(interest.name)}
                            className={`rounded-2xl border p-5 text-left transition-all ${
                              selected
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-white text-slate-700"
                            }`}
                          >
                            <interest.icon className="h-5 w-5" />
                            <p className="mt-4 font-semibold">{interest.name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <div>
                      <h2 className="text-2xl">Let&apos;s read your working style</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        This is not a test you can fail. It helps the AI choose
                        the tone and direction that will fit you best.
                      </p>
                    </div>
                    <div className="space-y-4">
                      {PERSONALITY_QUIZ.map((question) => (
                        <div key={question.id} className="rounded-2xl border border-border p-5">
                          <p className="font-semibold text-slate-900">{question.question}</p>
                          <div className="mt-4 grid gap-3">
                            {question.options.map((option) => (
                              <button
                                key={option.label}
                                type="button"
                                onClick={() =>
                                  setStudentState((current) => ({
                                    ...current,
                                    personalityAnswers: {
                                      ...current.personalityAnswers,
                                      [question.id]: option.type,
                                    },
                                  }))
                                }
                                className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                                  studentState.personalityAnswers[question.id] === option.type
                                    ? "border-primary bg-primary text-white"
                                    : "border-border bg-white text-slate-600"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-700">
                        Current signal
                      </p>
                      <p className="mt-1 text-xl text-primary">{currentPersonality}</p>
                    </div>
                  </>
                ) : null}

                {step === 4 ? (
                  <>
                    <div>
                      <h2 className="text-2xl">Bring in your CV if you have one</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        PDF and DOCX are supported. We&apos;ll extract the text to
                        strengthen your analysis, but this step is optional.
                      </p>
                    </div>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-primary/25 bg-primary/5 px-8 py-16 text-center">
                      <UploadCloud className="h-10 w-10 text-primary" />
                      <p className="mt-4 font-semibold text-slate-900">
                        {studentState.resumeFile
                          ? studentState.resumeFile.name
                          : "Upload resume"}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Optional, but helpful for sharper recommendations
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(event) =>
                          setStudentState((current) => ({
                            ...current,
                            resumeFile: event.target.files?.[0] ?? null,
                          }))
                        }
                      />
                    </label>
                    <Textarea
                      placeholder="Anything else the AI should know about your goals or background?"
                      value={studentState.bio}
                      onChange={(event) =>
                        setStudentState((current) => ({
                          ...current,
                          bio: event.target.value,
                        }))
                      }
                    />
                  </>
                ) : null}

                {step === 5 ? (
                  <>
                    <div>
                      <h2 className="text-2xl">Your first AI fit summary is ready</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        This is your starting point, not your ceiling. The
                        system will keep refining this as you grow.
                      </p>
                    </div>
                    <Card className="border-primary/15 bg-primary/5 p-6">
                      <p className="text-base leading-8 text-slate-700">
                        {analysis?.summary}
                      </p>
                    </Card>
                    <div className="grid gap-4 xl:grid-cols-3">
                      {analysis?.careerPaths.map((path) => (
                        <Card key={path.name} className="p-5">
                          <p className="font-mono text-sm uppercase tracking-[0.18em] text-slate-400">
                            Compatibility {path.compatibilityScore}%
                          </p>
                          <h3 className="mt-3 text-xl">{path.name}</h3>
                          <p className="mt-3 text-sm leading-7">{path.whyItFits}</p>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {error ? <p className="text-sm text-error">{error}</p> : null}

            <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-6">
              <Button
                type="button"
                variant="ghost"
                disabled={step === 0 || loading}
                onClick={() => setStep((current) => Math.max(0, current - 1))}
              >
                Back
              </Button>

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep((current) => Math.min(4, current + 1))}
                >
                  Continue
                </Button>
              ) : null}

              {step === 4 ? (
                <Button type="button" onClick={submitStudentOnboarding} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Generate career fit
                </Button>
              ) : null}

              {step === 5 ? (
                <Button type="button" onClick={() => router.push("/dashboard")}>
                  Enter dashboard
                </Button>
              ) : null}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-8">
          <div>
            <p className="eyebrow">
              {role === "employer" ? "Employer onboarding" : "University onboarding"}
            </p>
            <h1 className="mt-4 text-3xl">
              {role === "employer"
                ? "Set up your company workspace"
                : "Set up your institutional workspace"}
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              {role === "employer"
                ? "Create your company presence so you can publish shadowing opportunities, review applicants, and leave feedback."
                : "Configure the university profile, license footprint, and contact details that power the admin dashboard."}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {role === "employer" ? (
              <>
                <Input
                  placeholder="Company name"
                  value={companyForm.companyName}
                  onChange={(event) =>
                    setCompanyForm((current) => ({
                      ...current,
                      companyName: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Industry"
                  value={companyForm.industry}
                  onChange={(event) =>
                    setCompanyForm((current) => ({
                      ...current,
                      industry: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Location"
                  value={companyForm.location}
                  onChange={(event) =>
                    setCompanyForm((current) => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Website"
                  value={companyForm.website}
                  onChange={(event) =>
                    setCompanyForm((current) => ({
                      ...current,
                      website: event.target.value,
                    }))
                  }
                />
                <Textarea
                  className="md:col-span-2"
                  placeholder="What should students understand about your company and why shadowing with you matters?"
                  value={companyForm.description}
                  onChange={(event) =>
                    setCompanyForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                />
              </>
            ) : (
              <>
                <Input
                  placeholder="University name"
                  value={universityForm.name}
                  onChange={(event) =>
                    setUniversityForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Location"
                  value={universityForm.location}
                  onChange={(event) =>
                    setUniversityForm((current) => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                />
                <Input
                  type="email"
                  placeholder="Contact email"
                  value={universityForm.contactEmail}
                  onChange={(event) =>
                    setUniversityForm((current) => ({
                      ...current,
                      contactEmail: event.target.value,
                    }))
                  }
                />
                <Select
                  value={universityForm.licenseType}
                  onChange={(event) =>
                    setUniversityForm((current) => ({
                      ...current,
                      licenseType: event.target.value,
                    }))
                  }
                >
                  <option value="Starter">Starter</option>
                  <option value="Growth">Growth</option>
                  <option value="Enterprise">Enterprise</option>
                </Select>
                <Input
                  className="md:col-span-2"
                  type="number"
                  placeholder="Max students"
                  value={universityForm.maxStudents}
                  onChange={(event) =>
                    setUniversityForm((current) => ({
                      ...current,
                      maxStudents: event.target.value,
                    }))
                  }
                />
              </>
            )}
          </div>

          {error ? <p className="mt-4 text-sm text-error">{error}</p> : null}

          <div className="mt-8 flex justify-end">
            <Button onClick={submitOrgOnboarding} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Finish setup
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
