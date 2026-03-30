"use client";

import { useState } from "react";
import {
  AddListItemButton,
  AddSectionButton,
  EditableField,
  EditableListItem,
  EditableSectionItem,
} from "@/components/resume";
import { useResumeStore } from "@/store";
import { LinkIcon } from "lucide-react";

const ACCENT = "#0f172a";

/**
 * BerlinTemplate — modern two-column layout with centered headshot.
 *
 * Layout:
 * - Centered headshot circle at very top
 * - Large uppercase name + contact bar
 * - Left sidebar (~28%): Details (contact), Skills
 * - Right main (~72%): Employment History, Education, Projects, Extracurriculars
 */
export function BerlinTemplate() {
  const personal = useResumeStore((state) => state.resumeData.personal);
  const education = useResumeStore((state) => state.resumeData.education);
  const workExperience = useResumeStore((state) => state.resumeData.workExperience);
  const projects = useResumeStore((state) => state.resumeData.projects);
  const skills = useResumeStore((state) => state.resumeData.skills);
  const extracurriculars = useResumeStore((state) => state.resumeData.extracurriculars);

  const updatePersonal = useResumeStore((state) => state.updatePersonal);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const updateEducationHighlight = useResumeStore((state) => state.updateEducationHighlight);
  const updateWorkExperience = useResumeStore((state) => state.updateWorkExperience);
  const updateWorkExperienceAchievement = useResumeStore(
    (state) => state.updateWorkExperienceAchievement
  );
  const updateProject = useResumeStore((state) => state.updateProject);
  const updateProjectDescription = useResumeStore((state) => state.updateProjectDescription);
  const updateExtracurricular = useResumeStore((state) => state.updateExtracurricular);
  const updateExtracurricularDescription = useResumeStore(
    (state) => state.updateExtracurricularDescription
  );
  const addWorkExperienceAchievement = useResumeStore(
    (state) => state.addWorkExperienceAchievement
  );
  const removeWorkExperienceAchievement = useResumeStore(
    (state) => state.removeWorkExperienceAchievement
  );
  const addEducationHighlight = useResumeStore((state) => state.addEducationHighlight);
  const removeEducationHighlight = useResumeStore((state) => state.removeEducationHighlight);
  const addProjectDescription = useResumeStore((state) => state.addProjectDescription);
  const removeProjectDescription = useResumeStore((state) => state.removeProjectDescription);
  const addExtracurricularDescription = useResumeStore(
    (state) => state.addExtracurricularDescription
  );
  const removeExtracurricularDescription = useResumeStore(
    (state) => state.removeExtracurricularDescription
  );
  const addWorkExperience = useResumeStore((state) => state.addWorkExperience);
  const removeWorkExperience = useResumeStore((state) => state.removeWorkExperience);
  const addEducation = useResumeStore((state) => state.addEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const addProject = useResumeStore((state) => state.addProject);
  const removeProject = useResumeStore((state) => state.removeProject);
  const addExtracurricular = useResumeStore((state) => state.addExtracurricular);
  const removeExtracurricular = useResumeStore((state) => state.removeExtracurricular);
  const updateSkillCategory = useResumeStore((state) => state.updateSkillCategory);
  const addSkillCategory = useResumeStore((state) => state.addSkillCategory);
  const removeSkillCategory = useResumeStore((state) => state.removeSkillCategory);

  const [headshotError, setHeadshotError] = useState(false);

  const SH2 = (
    <div
      style={{
        fontSize: "7pt",
        fontWeight: 700,
        textTransform: "uppercase" as const,
        letterSpacing: "0.14em",
        color: ACCENT,
        borderBottom: `1px solid ${ACCENT}`,
        paddingBottom: "2px",
        marginBottom: "6px",
      }}
    />
  );

  const sectionHeading = (label: string) => (
    <div
      className="text-[7px] font-bold uppercase tracking-[0.14em] pb-0.5 mb-1.5"
      style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}
    >
      {label}
    </div>
  );

  const initials = personal?.name
    ? personal.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="h-full pt-0">
      {/* HEADER */}
      <header className="text-center pb-3 mb-3" style={{ borderBottom: `1px solid #e2e8f0` }}>
        {/* Headshot */}
        <div className="flex justify-center mb-2">
          <div
            className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-slate-200"
            style={{ border: `2px solid ${ACCENT}` }}
          >
            {!headshotError ? (
              <img
                src="/api/profile/headshot"
                alt=""
                className="w-full h-full object-cover"
                onError={() => setHeadshotError(true)}
              />
            ) : (
              <span className="text-sm font-bold text-slate-600">{initials}</span>
            )}
          </div>
        </div>

        {/* Name */}
        <EditableField
          value={personal?.name}
          onChange={(v) => updatePersonal("name", v)}
          placeholder="FULL NAME"
          className="text-[18px] font-bold uppercase tracking-[0.12em] text-slate-900 leading-tight"
        />

        {/* Role + contact */}
        <div className="mt-1 flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 text-[9px] text-slate-600">
          {workExperience?.[0]?.title && (
            <span className="flex items-center gap-x-2">
              <EditableField
                value={workExperience[0].title}
                onChange={(v) => updateWorkExperience(0, "title", v)}
                placeholder="Current Role"
                className="text-[9px] text-slate-500 italic"
                style={{ width: "auto" }}
              />
              <span className="text-slate-300">·</span>
            </span>
          )}
          {personal?.location && (
            <span className="flex items-center gap-x-2">
              <EditableField
                value={personal.location}
                onChange={(v) => updatePersonal("location", v)}
                placeholder="Location"
                className="text-[9px] text-slate-600"
                style={{ width: "auto" }}
              />
              <span className="text-slate-300">·</span>
            </span>
          )}
          {personal?.phone && (
            <span className="flex items-center gap-x-2">
              <EditableField
                value={personal.phone}
                onChange={(v) => updatePersonal("phone", v)}
                placeholder="Phone"
                className="text-[9px] text-slate-600"
                style={{ width: "auto" }}
              />
              <span className="text-slate-300">·</span>
            </span>
          )}
          {personal?.email && (
            <EditableField
              value={personal.email}
              onChange={(v) => updatePersonal("email", v)}
              placeholder="Email"
              className="text-[9px] text-slate-600"
              style={{ width: "auto" }}
            />
          )}
        </div>
      </header>

      {/* TWO-COLUMN BODY */}
      <div className="grid grid-cols-[28%_72%] gap-4">
        {/* LEFT SIDEBAR */}
        <aside className="space-y-4 border-r border-slate-200 pr-4">
          {/* DETAILS */}
          <section>
            {sectionHeading("Details")}
            <div className="space-y-1">
              {personal?.location && (
                <div>
                  <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                    Location
                  </div>
                  <EditableField
                    value={personal.location}
                    onChange={(v) => updatePersonal("location", v)}
                    placeholder="City, Country"
                    className="text-[9px] text-slate-700"
                  />
                </div>
              )}
              {personal?.phone && (
                <div>
                  <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                  </div>
                  <EditableField
                    value={personal.phone}
                    onChange={(v) => updatePersonal("phone", v)}
                    placeholder="+1 234 567 890"
                    className="text-[9px] text-slate-700"
                  />
                </div>
              )}
              {personal?.email && (
                <div>
                  <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </div>
                  <EditableField
                    value={personal.email}
                    onChange={(v) => updatePersonal("email", v)}
                    placeholder="email@example.com"
                    className="text-[9px] text-slate-700"
                  />
                </div>
              )}
              {personal?.linkedin && (
                <div>
                  <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                    LinkedIn
                  </div>
                  <EditableField
                    value={personal.linkedin}
                    onChange={(v) => updatePersonal("linkedin", v)}
                    placeholder="linkedin.com/in/profile"
                    className="text-[9px] text-slate-700"
                  />
                </div>
              )}
              {personal?.github && (
                <div>
                  <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                    GitHub
                  </div>
                  <EditableField
                    value={personal.github}
                    onChange={(v) => updatePersonal("github", v)}
                    placeholder="github.com/username"
                    className="text-[9px] text-slate-700"
                  />
                </div>
              )}
              {(!personal?.location && !personal?.phone && !personal?.email) && (
                <div className="space-y-1">
                  <div>
                    <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">Phone</div>
                    <EditableField value={personal?.phone} onChange={(v) => updatePersonal("phone", v)} placeholder="+1 234 567 890" className="text-[9px] text-slate-700" />
                  </div>
                  <div>
                    <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">Email</div>
                    <EditableField value={personal?.email} onChange={(v) => updatePersonal("email", v)} placeholder="email@example.com" className="text-[9px] text-slate-700" />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SKILLS */}
          <section>
            {sectionHeading("Skills")}
            <div className="space-y-1">
              {(skills || []).map((skill, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeSkillCategory(idx)}>
                  <div>
                    <EditableField
                      value={skill.category}
                      onChange={(v) => updateSkillCategory(idx, "category", v)}
                      placeholder="Category"
                      className="text-[8px] font-semibold text-slate-800"
                    />
                    <EditableField
                      value={skill.items}
                      onChange={(v) => updateSkillCategory(idx, "items", v)}
                      placeholder="e.g. Python, Go"
                      className="text-[8px] text-slate-600"
                    />
                    <div className="mt-1" style={{ borderBottom: "1px solid #e2e8f0" }} />
                  </div>
                </EditableSectionItem>
              ))}
              <AddSectionButton onClick={() => addSkillCategory("", "")} label="skill category" />
            </div>
          </section>
        </aside>

        {/* RIGHT MAIN */}
        <main className="space-y-4 pl-1">
          {/* EMPLOYMENT HISTORY */}
          <section>
            {sectionHeading("Employment History")}
            <div className="space-y-3">
              {(workExperience || []).map((exp, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeWorkExperience(idx)}>
                  <div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[10px] text-slate-400 mt-0.5 flex-shrink-0">◇</span>
                      <div className="flex-1 min-w-0">
                        <EditableField
                          value={exp.title}
                          onChange={(v) => updateWorkExperience(idx, "title", v)}
                          placeholder="Job Title"
                          className="font-bold text-[10px] text-slate-900"
                        />
                        <EditableField
                          value={exp.company}
                          onChange={(v) => updateWorkExperience(idx, "company", v)}
                          placeholder="Company"
                          className="text-[9px] text-slate-600"
                        />
                        <div className="flex items-center gap-1.5 text-[8px] text-slate-400 mt-0.5">
                          <EditableField
                            value={exp.startDate}
                            onChange={(v) => updateWorkExperience(idx, "startDate", v)}
                            placeholder="Start"
                            className="text-[8px]"
                          />
                          <span>–</span>
                          <EditableField
                            value={exp.endDate}
                            onChange={(v) => updateWorkExperience(idx, "endDate", v)}
                            placeholder="Present"
                            className="text-[8px]"
                          />
                          {exp.location && (
                            <>
                              <span>·</span>
                              <EditableField
                                value={exp.location}
                                onChange={(v) => updateWorkExperience(idx, "location", v)}
                                placeholder="Location"
                                className="text-[8px]"
                              />
                            </>
                          )}
                        </div>
                        <ul className="mt-1 space-y-0.5">
                          {(exp.achievements || []).map((achievement, aIdx) => (
                            <EditableListItem
                              key={aIdx}
                              content={achievement}
                              onChange={(html) => updateWorkExperienceAchievement(idx, aIdx, html)}
                              onRemove={() => removeWorkExperienceAchievement(idx, aIdx)}
                              placeholder="Achievement..."
                            />
                          ))}
                          <AddListItemButton
                            onClick={() => addWorkExperienceAchievement(idx, "")}
                            label="achievement"
                          />
                        </ul>
                      </div>
                    </div>
                  </div>
                </EditableSectionItem>
              ))}
              <AddSectionButton onClick={() => addWorkExperience()} label="work experience" />
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            {sectionHeading("Education")}
            <div className="space-y-2">
              {(education || []).map((edu, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeEducation(idx)}>
                  <div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[10px] text-slate-400 mt-0.5 flex-shrink-0">◇</span>
                      <div className="flex-1 min-w-0">
                        <EditableField
                          value={edu.institution}
                          onChange={(v) => updateEducation(idx, "institution", v)}
                          placeholder="Institution"
                          className="font-bold text-[10px] text-slate-900"
                        />
                        <EditableField
                          value={edu.degree}
                          onChange={(v) => updateEducation(idx, "degree", v)}
                          placeholder="Degree"
                          className="text-[9px] italic text-slate-600"
                          multiline
                        />
                        <div className="flex items-center gap-1 text-[8px] text-slate-400 mt-0.5">
                          <EditableField
                            value={edu.startDate}
                            onChange={(v) => updateEducation(idx, "startDate", v)}
                            placeholder="Start"
                            className="text-[8px]"
                          />
                          <span>–</span>
                          <EditableField
                            value={edu.endDate}
                            onChange={(v) => updateEducation(idx, "endDate", v)}
                            placeholder="End"
                            className="text-[8px]"
                          />
                        </div>
                        <ul className="mt-1 space-y-0.5">
                          {(edu.highlights || []).map((h, hIdx) => (
                            <EditableListItem
                              key={hIdx}
                              content={h}
                              onChange={(html) => updateEducationHighlight(idx, hIdx, html)}
                              onRemove={() => removeEducationHighlight(idx, hIdx)}
                              placeholder="Highlight..."
                            />
                          ))}
                          <AddListItemButton
                            onClick={() => addEducationHighlight(idx, "")}
                            label="highlight"
                          />
                        </ul>
                      </div>
                    </div>
                  </div>
                </EditableSectionItem>
              ))}
              <AddSectionButton onClick={() => addEducation()} label="education" />
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            {sectionHeading("Projects")}
            <div className="space-y-2">
              {(projects || []).map((project, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeProject(idx)}>
                  <div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[10px] text-slate-400 mt-0.5 flex-shrink-0">◇</span>
                      <div className="flex-1 min-w-0">
                        <EditableField
                          value={project.name}
                          onChange={(v) => updateProject(idx, "name", v)}
                          placeholder="Project Name"
                          className="font-bold text-[10px] text-slate-900"
                        />
                        <EditableField
                          value={project.role}
                          onChange={(v) => updateProject(idx, "role", v)}
                          placeholder="Role"
                          className="text-[9px] italic text-slate-600"
                        />
                        <div className="flex items-center gap-1 mt-0.5">
                          <LinkIcon className="w-2 h-2 text-slate-400 flex-shrink-0" />
                          <EditableField
                            value={project.url}
                            onChange={(v) => updateProject(idx, "url", v)}
                            placeholder="URL"
                            className="text-[8px] text-slate-500"
                          />
                        </div>
                        <ul className="mt-1 space-y-0.5">
                          {(project.description || []).map((desc, dIdx) => (
                            <EditableListItem
                              key={dIdx}
                              content={desc}
                              onChange={(html) => updateProjectDescription(idx, dIdx, html)}
                              onRemove={() => removeProjectDescription(idx, dIdx)}
                              placeholder="Description..."
                            />
                          ))}
                          <AddListItemButton
                            onClick={() => addProjectDescription(idx, "")}
                            label="description"
                          />
                        </ul>
                      </div>
                    </div>
                  </div>
                </EditableSectionItem>
              ))}
              <AddSectionButton onClick={() => addProject()} label="project" />
            </div>
          </section>

          {/* EXTRACURRICULAR ACTIVITIES */}
          <section>
            {sectionHeading("Extracurricular Activities")}
            <div className="space-y-2">
              {(extracurriculars || []).map((extra, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeExtracurricular(idx)}>
                  <div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-[10px] text-slate-400 mt-0.5 flex-shrink-0">◇</span>
                      <div className="flex-1 min-w-0">
                        <EditableField
                          value={extra.activity}
                          onChange={(v) => updateExtracurricular(idx, "activity", v)}
                          placeholder="Activity Name"
                          className="font-bold text-[10px] text-slate-900"
                        />
                        <div className="flex items-center gap-1 text-[8px] text-slate-400 mt-0.5">
                          <EditableField
                            value={extra.startDate}
                            onChange={(v) => updateExtracurricular(idx, "startDate", v)}
                            placeholder="Start"
                            className="text-[8px]"
                          />
                          <span>–</span>
                          <EditableField
                            value={extra.endDate}
                            onChange={(v) => updateExtracurricular(idx, "endDate", v)}
                            placeholder="End"
                            className="text-[8px]"
                          />
                        </div>
                        <ul className="mt-1 space-y-0.5">
                          {(extra.description || []).map((desc, dIdx) => (
                            <EditableListItem
                              key={dIdx}
                              content={desc}
                              onChange={(html) => updateExtracurricularDescription(idx, dIdx, html)}
                              onRemove={() => removeExtracurricularDescription(idx, dIdx)}
                              placeholder="Describe the activity..."
                            />
                          ))}
                          <AddListItemButton
                            onClick={() => addExtracurricularDescription(idx, "")}
                            label="description"
                          />
                        </ul>
                      </div>
                    </div>
                  </div>
                </EditableSectionItem>
              ))}
              <AddSectionButton onClick={() => addExtracurricular()} label="activity" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
