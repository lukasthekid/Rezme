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
import { Phone, Mail, MapPin, LinkIcon } from "lucide-react";

const SIDEBAR_BG = "#2d3748";

/**
 * ViennaTemplate — professional two-column résumé with a dark slate sidebar.
 *
 * Layout:
 * - Left sidebar (~38%, dark slate): headshot, name, contact, education, skills
 * - Right column (~62%, white): experience, projects, extracurricular activities
 *
 * The sidebar uses negative margins to escape A4Page padding and extend to page edges.
 */
export function ViennaTemplate() {
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

  return (
    // Negative margin escapes A4Page padding so the sidebar fills to the page edge
    <div
      className="flex"
      style={{
        margin: "-8mm -10mm -10mm -10mm",
        minHeight: "297mm",
      }}
    >
      {/* ─── LEFT SIDEBAR (dark slate) ─────────────────────────────────────────── */}
      <aside
        className="flex flex-col gap-5 flex-shrink-0"
        style={{
          width: "38%",
          backgroundColor: SIDEBAR_BG,
          padding: "9mm 6mm 10mm 10mm",
        }}
      >
        {/* HEADSHOT + NAME + CONTACT */}
        <div className="flex flex-col items-center gap-3">
          {/* Headshot */}
          <div
            className="h-24 w-24 overflow-hidden rounded-full flex-shrink-0"
            style={{ border: "2px solid #4a5568", backgroundColor: "#4a5568" }}
          >
            {!headshotError ? (
              <img
                src="/api/profile/headshot"
                alt=""
                className="h-full w-full object-cover"
                onError={() => setHeadshotError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-[10px] text-slate-400">Photo</span>
              </div>
            )}
          </div>

          {/* Name */}
          <EditableField
            value={personal?.name}
            onChange={(v) => updatePersonal("name", v)}
            placeholder="YOUR NAME"
            className="text-base font-bold text-white text-center leading-tight"
          />

          {/* Contact */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 flex-shrink-0 text-slate-400" />
              <EditableField
                value={personal?.phone}
                onChange={(v) => updatePersonal("phone", v)}
                placeholder="Phone"
                className="text-[10px] text-slate-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3 flex-shrink-0 text-slate-400" />
              <EditableField
                value={personal?.email}
                onChange={(v) => updatePersonal("email", v)}
                placeholder="Email"
                className="text-[10px] text-slate-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 flex-shrink-0 text-slate-400" />
              <EditableField
                value={personal?.location}
                onChange={(v) => updatePersonal("location", v)}
                placeholder="Location"
                className="text-[10px] text-slate-300"
              />
            </div>
            {personal?.linkedin && (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-3 w-3 flex-shrink-0 text-slate-400" />
                <EditableField
                  value={personal.linkedin}
                  onChange={(v) => updatePersonal("linkedin", v)}
                  placeholder="LinkedIn"
                  className="text-[10px] text-slate-300"
                />
              </div>
            )}
            {personal?.github && (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-3 w-3 flex-shrink-0 text-slate-400" />
                <EditableField
                  value={personal.github}
                  onChange={(v) => updatePersonal("github", v)}
                  placeholder="GitHub"
                  className="text-[10px] text-slate-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* EDUCATION */}
        <section>
          <h2
            className="text-[8px] font-bold uppercase tracking-widest pb-1 mb-2 text-slate-400"
            style={{ borderBottom: "1px solid #4a5568" }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {(education || []).map((edu, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeEducation(idx)}>
                <div>
                  <EditableField
                    value={edu.institution}
                    onChange={(v) => updateEducation(idx, "institution", v)}
                    placeholder="Institution"
                    className="font-bold text-[10px] text-white leading-tight"
                  />
                  <EditableField
                    value={edu.degree}
                    onChange={(v) => updateEducation(idx, "degree", v)}
                    placeholder="Degree"
                    className="text-[10px] italic text-slate-300 leading-tight"
                    multiline
                  />
                  <div className="flex items-center gap-1 mt-0.5">
                    <EditableField
                      value={edu.startDate}
                      onChange={(v) => updateEducation(idx, "startDate", v)}
                      placeholder="Start"
                      className="text-[9px] text-slate-400"
                    />
                    <span className="text-[9px] text-slate-400">–</span>
                    <EditableField
                      value={edu.endDate}
                      onChange={(v) => updateEducation(idx, "endDate", v)}
                      placeholder="End"
                      className="text-[9px] text-slate-400"
                    />
                  </div>
                  {(edu.highlights || []).length > 0 && (
                    <ul className="mt-1 space-y-0.5 pl-2">
                      {edu.highlights!.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1">
                          <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-500" />
                          <EditableField
                            value={h}
                            onChange={(v) => updateEducationHighlight(idx, hIdx, v)}
                            placeholder="Highlight"
                            className="text-[9px] text-slate-300 flex-1"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-1">
                    <AddListItemButton
                      onClick={() => addEducationHighlight(idx, "")}
                      label="highlight"
                    />
                  </div>
                </div>
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addEducation()} label="education" />
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <h2
            className="text-[8px] font-bold uppercase tracking-widest pb-1 mb-2 text-slate-400"
            style={{ borderBottom: "1px solid #4a5568" }}
          >
            Skills
          </h2>
          <div className="space-y-2">
            {(skills || []).map((skill, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeSkillCategory(idx)}>
                <div>
                  <EditableField
                    value={skill.category}
                    onChange={(value) => updateSkillCategory(idx, "category", value)}
                    placeholder="Category"
                    className="font-semibold text-[10px] text-slate-200"
                  />
                  <EditableField
                    value={skill.items}
                    onChange={(value) => updateSkillCategory(idx, "items", value)}
                    placeholder="e.g. Python, TypeScript, Go"
                    className="text-[10px] text-slate-400"
                  />
                </div>
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addSkillCategory("", "")} label="skill category" />
          </div>
        </section>
      </aside>

      {/* ─── RIGHT COLUMN (white) ──────────────────────────────────────────────── */}
      <main
        className="flex-1 min-w-0 flex flex-col gap-5 bg-white"
        style={{ padding: "9mm 10mm 10mm 8mm" }}
      >
        {/* EXPERIENCE */}
        <section>
          <h2
            className="text-[8px] font-bold uppercase tracking-widest pb-1 mb-3 text-gray-900"
            style={{ borderBottom: "2px solid #4a5568" }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {(workExperience || []).map((exp, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeWorkExperience(idx)}>
                <div className="flex gap-3">
                  <div className="w-16 flex-shrink-0 text-[9px] text-gray-500">
                    <EditableField
                      value={exp.startDate}
                      onChange={(v) => updateWorkExperience(idx, "startDate", v)}
                      placeholder="Start"
                      className="text-[9px]"
                    />
                    <span className="text-[9px]">–</span>
                    <EditableField
                      value={exp.endDate}
                      onChange={(v) => updateWorkExperience(idx, "endDate", v)}
                      placeholder="Present"
                      className="text-[9px]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <EditableField
                      value={exp.title}
                      onChange={(v) => updateWorkExperience(idx, "title", v)}
                      placeholder="Job Title"
                      className="font-bold text-xs text-gray-900"
                    />
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <EditableField
                        value={exp.company}
                        onChange={(v) => updateWorkExperience(idx, "company", v)}
                        placeholder="Company"
                        className="text-[10px] font-medium text-gray-600"
                      />
                      {exp.location && (
                        <>
                          <span className="text-[9px] text-gray-400">·</span>
                          <EditableField
                            value={exp.location}
                            onChange={(v) => updateWorkExperience(idx, "location", v)}
                            placeholder="Location"
                            className="text-[9px] text-gray-500"
                          />
                        </>
                      )}
                    </div>
                    <ul className="mt-1.5 space-y-0.5">
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
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addWorkExperience()} label="work experience" />
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <h2
            className="text-[8px] font-bold uppercase tracking-widest pb-1 mb-3 text-gray-900"
            style={{ borderBottom: "2px solid #4a5568" }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {(projects || []).map((project, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeProject(idx)}>
                <div>
                  <EditableField
                    value={project.name}
                    onChange={(v) => updateProject(idx, "name", v)}
                    placeholder="Project Name"
                    className="font-semibold text-xs text-gray-900"
                  />
                  <EditableField
                    value={project.role}
                    onChange={(v) => updateProject(idx, "role", v)}
                    placeholder="Role"
                    className="text-[10px] italic text-gray-600"
                  />
                  <div className="flex items-center gap-1 mt-0.5">
                    <LinkIcon className="h-2.5 w-2.5 text-gray-400 flex-shrink-0" />
                    <EditableField
                      value={project.url}
                      onChange={(v) => updateProject(idx, "url", v)}
                      placeholder="URL"
                      className="text-[9px] text-blue-600"
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
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addProject()} label="project" />
          </div>
        </section>

        {/* EXTRACURRICULAR ACTIVITIES */}
        <section>
          <h2
            className="text-[8px] font-bold uppercase tracking-widest pb-1 mb-3 text-gray-900"
            style={{ borderBottom: "2px solid #4a5568" }}
          >
            Extracurricular Activities
          </h2>
          <div className="space-y-3">
            {(extracurriculars || []).map((extra, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeExtracurricular(idx)}>
                <div className="flex gap-3">
                  <div className="w-16 flex-shrink-0 text-[9px] text-gray-500">
                    <EditableField
                      value={extra.startDate}
                      onChange={(v) => updateExtracurricular(idx, "startDate", v)}
                      placeholder="Start"
                      className="text-[9px]"
                    />
                    <span className="text-[9px]">–</span>
                    <EditableField
                      value={extra.endDate}
                      onChange={(v) => updateExtracurricular(idx, "endDate", v)}
                      placeholder="End"
                      className="text-[9px]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <EditableField
                      value={extra.activity}
                      onChange={(v) => updateExtracurricular(idx, "activity", v)}
                      placeholder="Activity Name"
                      className="font-semibold text-xs text-gray-900"
                    />
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
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addExtracurricular()} label="activity" />
          </div>
        </section>
      </main>
    </div>
  );
}
