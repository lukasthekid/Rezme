"use client";

import {
  AddListItemButton,
  AddSectionButton,
  EditableField,
  EditableListItem,
  EditableSectionItem,
} from "@/components/resume";
import { useResumeStore } from "@/store";
import { LinkIcon } from "lucide-react";

/**
 * TokyoTemplate — editorial label-column serif layout.
 *
 * Layout:
 * - Centered header: large Instrument Serif name, contact line
 * - Each section: narrow left label column (20%) + full-width content column (80%)
 * - Thin horizontal rules between sections
 */
export function TokyoTemplate() {
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

  const contactParts = [
    personal?.location,
    personal?.phone,
    personal?.email,
    personal?.linkedin,
    personal?.github,
  ].filter(Boolean);

  const LABEL_STYLE = "text-[8px] font-normal uppercase tracking-[0.2em] text-slate-500 leading-loose pt-0.5 select-none";
  const RULE_STYLE = "border-0 border-t border-slate-200 my-0";
  const SECTION_HEADING_STYLE = "text-[8px] font-normal uppercase tracking-[0.2em] text-slate-500 leading-loose pt-0.5";

  return (
    <div
      className="h-full pt-2 pb-2"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* HEADER */}
      <header className="text-center mb-1 pb-3">
        <EditableField
          value={personal?.name}
          onChange={(v) => updatePersonal("name", v)}
          placeholder="YOUR NAME"
          className="text-[28px] font-bold tracking-tight text-slate-900 leading-none"
        />
        {workExperience?.[0]?.title && (
          <div className="mt-1.5">
            <EditableField
              value={workExperience[0].title}
              onChange={(v) => updateWorkExperience(0, "title", v)}
              placeholder="Current Role"
              className="text-xs text-slate-500 italic"
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 mt-2">
          {contactParts.map((part, i) => (
            <span key={i} className="text-[10px] text-slate-600">
              {i > 0 && <span className="mr-2 text-slate-300">·</span>}
              <EditableField
                value={part}
                onChange={(v) => {
                  if (part === personal?.email) updatePersonal("email", v);
                  else if (part === personal?.phone) updatePersonal("phone", v);
                  else if (part === personal?.location) updatePersonal("location", v);
                  else if (part === personal?.linkedin) updatePersonal("linkedin", v);
                  else if (part === personal?.github) updatePersonal("github", v);
                }}
                placeholder=""
                className="text-[10px] text-slate-600 inline"
              />
            </span>
          ))}
        </div>
      </header>

      <hr className={RULE_STYLE} style={{ borderColor: "#cbd5e1" }} />

      {/* SECTION HELPER */}
      {/* Each section row: 20% label | 80% content */}

      {/* EMPLOYMENT HISTORY */}
      <div className="grid grid-cols-[20%_80%] mt-0">
        <div className="pt-3 pr-4">
          <span className={SECTION_HEADING_STYLE}>Employment<br />History</span>
        </div>
        <div className="pt-3 pb-2 space-y-4">
          {(workExperience || []).map((exp, idx) => (
            <EditableSectionItem key={idx} onRemove={() => removeWorkExperience(idx)}>
              <div>
                <div className="flex justify-between items-baseline">
                  <div className="flex-1 min-w-0">
                    <EditableField
                      value={exp.title}
                      onChange={(v) => updateWorkExperience(idx, "title", v)}
                      placeholder="Job Title"
                      className="font-bold text-[11px] text-slate-900"
                    />
                    <EditableField
                      value={exp.company}
                      onChange={(v) => updateWorkExperience(idx, "company", v)}
                      placeholder="Company"
                      className="text-[10px] text-slate-600 italic"
                    />
                  </div>
                  <div className="ml-4 text-right flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end text-[9px] text-slate-500">
                      <EditableField
                        value={exp.startDate}
                        onChange={(v) => updateWorkExperience(idx, "startDate", v)}
                        placeholder="Start"
                        className="text-[9px]"
                      />
                      <span>–</span>
                      <EditableField
                        value={exp.endDate}
                        onChange={(v) => updateWorkExperience(idx, "endDate", v)}
                        placeholder="Present"
                        className="text-[9px]"
                      />
                    </div>
                    <EditableField
                      value={exp.location}
                      onChange={(v) => updateWorkExperience(idx, "location", v)}
                      placeholder="Location"
                      className="text-[9px] text-slate-500 text-right"
                    />
                  </div>
                </div>
                <ul className="mt-1.5 space-y-1 ml-2">
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
            </EditableSectionItem>
          ))}
          <AddSectionButton onClick={() => addWorkExperience()} label="work experience" />
        </div>
      </div>

      <hr className={RULE_STYLE} />

      {/* EDUCATION */}
      <div className="grid grid-cols-[20%_80%]">
        <div className="pt-3 pr-4">
          <span className={SECTION_HEADING_STYLE}>Education</span>
        </div>
        <div className="pt-3 pb-2 space-y-3">
          {(education || []).map((edu, idx) => (
            <EditableSectionItem key={idx} onRemove={() => removeEducation(idx)}>
              <div>
                <div className="flex justify-between items-baseline">
                  <div className="flex-1 min-w-0">
                    <EditableField
                      value={edu.institution}
                      onChange={(v) => updateEducation(idx, "institution", v)}
                      placeholder="Institution"
                      className="font-bold text-[11px] text-slate-900"
                    />
                    <EditableField
                      value={edu.degree}
                      onChange={(v) => updateEducation(idx, "degree", v)}
                      placeholder="Degree"
                      className="text-[10px] italic text-slate-600"
                      multiline
                    />
                  </div>
                  <div className="ml-4 flex-shrink-0 text-right">
                    <div className="flex items-center gap-1 justify-end text-[9px] text-slate-500">
                      <EditableField
                        value={edu.startDate}
                        onChange={(v) => updateEducation(idx, "startDate", v)}
                        placeholder="Start"
                        className="text-[9px]"
                      />
                      <span>–</span>
                      <EditableField
                        value={edu.endDate}
                        onChange={(v) => updateEducation(idx, "endDate", v)}
                        placeholder="End"
                        className="text-[9px]"
                      />
                    </div>
                    <EditableField
                      value={edu.location}
                      onChange={(v) => updateEducation(idx, "location", v)}
                      placeholder="Location"
                      className="text-[9px] text-slate-500 text-right"
                    />
                  </div>
                </div>
                <ul className="mt-1 space-y-1 ml-2">
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
            </EditableSectionItem>
          ))}
          <AddSectionButton onClick={() => addEducation()} label="education" />
        </div>
      </div>

      <hr className={RULE_STYLE} />

      {/* PROJECTS */}
      <div className="grid grid-cols-[20%_80%]">
        <div className="pt-3 pr-4">
          <span className={SECTION_HEADING_STYLE}>Projects</span>
        </div>
        <div className="pt-3 pb-2 space-y-3">
          {(projects || []).map((project, idx) => (
            <EditableSectionItem key={idx} onRemove={() => removeProject(idx)}>
              <div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="flex-1 min-w-0">
                    <EditableField
                      value={project.name}
                      onChange={(v) => updateProject(idx, "name", v)}
                      placeholder="Project Name"
                      className="font-bold text-[11px] text-slate-900"
                    />
                    <EditableField
                      value={project.role}
                      onChange={(v) => updateProject(idx, "role", v)}
                      placeholder="Role"
                      className="text-[10px] italic text-slate-600"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-0.5 ml-2">
                  <LinkIcon className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" />
                  <EditableField
                    value={project.url}
                    onChange={(v) => updateProject(idx, "url", v)}
                    placeholder="URL"
                    className="text-[9px] text-slate-500"
                  />
                </div>
                <ul className="mt-1 space-y-1 ml-2">
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
      </div>

      <hr className={RULE_STYLE} />

      {/* SKILLS */}
      <div className="grid grid-cols-[20%_80%]">
        <div className="pt-3 pr-4">
          <span className={SECTION_HEADING_STYLE}>Skills</span>
        </div>
        <div className="pt-3 pb-2 space-y-2">
          {(skills || []).map((skill, idx) => (
            <EditableSectionItem key={idx} onRemove={() => removeSkillCategory(idx)}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <EditableField
                  value={skill.category}
                  onChange={(v) => updateSkillCategory(idx, "category", v)}
                  placeholder="Category"
                  className="font-bold text-[10px] text-slate-800"
                />
                <span className="text-[9px] text-slate-400">—</span>
                <EditableField
                  value={skill.items}
                  onChange={(v) => updateSkillCategory(idx, "items", v)}
                  placeholder="e.g. Python, TypeScript, Go"
                  className="text-[10px] text-slate-600"
                />
              </div>
            </EditableSectionItem>
          ))}
          <AddSectionButton onClick={() => addSkillCategory("", "")} label="skill category" />
        </div>
      </div>

      {/* EXTRACURRICULAR ACTIVITIES (shown only when there are entries or "add" button) */}
      <hr className={RULE_STYLE} />

      <div className="grid grid-cols-[20%_80%]">
        <div className="pt-3 pr-4">
          <span className={SECTION_HEADING_STYLE}>Extra&shy;curricular<br />Activities</span>
        </div>
        <div className="pt-3 pb-2 space-y-3">
          {(extracurriculars || []).map((extra, idx) => (
            <EditableSectionItem key={idx} onRemove={() => removeExtracurricular(idx)}>
              <div>
                <div className="flex justify-between items-baseline">
                  <div className="flex-1 min-w-0">
                    <EditableField
                      value={extra.activity}
                      onChange={(v) => updateExtracurricular(idx, "activity", v)}
                      placeholder="Activity Name"
                      className="font-bold text-[11px] text-slate-900"
                    />
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="flex items-center gap-1 justify-end text-[9px] text-slate-500">
                      <EditableField
                        value={extra.startDate}
                        onChange={(v) => updateExtracurricular(idx, "startDate", v)}
                        placeholder="Start"
                        className="text-[9px]"
                      />
                      <span>–</span>
                      <EditableField
                        value={extra.endDate}
                        onChange={(v) => updateExtracurricular(idx, "endDate", v)}
                        placeholder="End"
                        className="text-[9px]"
                      />
                    </div>
                  </div>
                </div>
                <ul className="mt-1 space-y-1 ml-2">
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
            </EditableSectionItem>
          ))}
          <AddSectionButton onClick={() => addExtracurricular()} label="activity" />
        </div>
      </div>
    </div>
  );
}
