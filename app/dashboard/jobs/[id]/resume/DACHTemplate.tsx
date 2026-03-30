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
import { LinkIcon, Phone, Mail, MapPin } from "lucide-react";

const PURPLE = "#7c3aed";

/**
 * DACHTemplate - DACH-style resume (Germany, Austria, Switzerland)
 *
 * Layout:
 * - Header: headshot (purple geometric frame), current role, name, contact with icons
 * - Left column (~65%): Berufserfahrung, Ausbildung, Projekte (timeline style)
 * - Right column (~35%): Kenntnisse, Sprachen, Hobbys & Interessen
 * - Purple accents, white background, clean sans-serif typography
 */
export function DACHTemplate() {
  const personal = useResumeStore((state) => state.resumeData.personal);
  const education = useResumeStore((state) => state.resumeData.education);
  const workExperience = useResumeStore((state) => state.resumeData.workExperience);
  const projects = useResumeStore((state) => state.resumeData.projects);
  const skills = useResumeStore((state) => state.resumeData.skills);

  const updatePersonal = useResumeStore((state) => state.updatePersonal);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const updateEducationHighlight = useResumeStore((state) => state.updateEducationHighlight);
  const updateWorkExperience = useResumeStore((state) => state.updateWorkExperience);
  const updateWorkExperienceAchievement = useResumeStore(
    (state) => state.updateWorkExperienceAchievement
  );
  const updateProject = useResumeStore((state) => state.updateProject);
  const updateProjectDescription = useResumeStore((state) => state.updateProjectDescription);
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
  const addWorkExperience = useResumeStore((state) => state.addWorkExperience);
  const removeWorkExperience = useResumeStore((state) => state.removeWorkExperience);
  const addEducation = useResumeStore((state) => state.addEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const addProject = useResumeStore((state) => state.addProject);
  const removeProject = useResumeStore((state) => state.removeProject);
  const updateSkillCategory = useResumeStore((state) => state.updateSkillCategory);
  const addSkillCategory = useResumeStore((state) => state.addSkillCategory);
  const removeSkillCategory = useResumeStore((state) => state.removeSkillCategory);

  const [headshotError, setHeadshotError] = useState(false);

  // Current role from most recent work experience
  const currentRole = workExperience?.[0]?.title;

  return (
    <div className="h-full pt-0">
      {/* HEADER - Larger headshot left, centered candidate info right */}
      <header className="relative mb-4 flex items-center gap-6">
        {/* Headshot with purple geometric frame - enlarged */}
        <div className="relative flex-shrink-0">
          <div
            className="absolute -left-1 -top-1 h-28 w-28 rounded-sm"
            style={{ backgroundColor: PURPLE, clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 0)" }}
            aria-hidden
          />
          <div className="relative ml-3 mt-3 h-24 w-24 overflow-hidden rounded-sm border-2 border-white bg-slate-200 shadow-md print:border-slate-200">
            {!headshotError ? (
              <img
                src="/api/profile/headshot"
                alt=""
                className="h-full w-full object-cover"
                onError={() => setHeadshotError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                <span className="text-[10px]">Foto</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex min-h-28 min-w-0 flex-1 flex-col items-start justify-center">
          <div className="w-full text-left">
            {/* Current role (small, above name) */}
            {currentRole && (
            <div className="mb-0.5">
              <EditableField
                value={currentRole}
                onChange={(v) => workExperience?.[0] && updateWorkExperience(0, "title", v)}
                placeholder="Current Role"
                className="text-xs font-medium text-slate-600"
              />
            </div>
          )}
          {/* Name */}
          <div className="mb-2">
            <EditableField
              value={personal?.name}
              onChange={(v) => updatePersonal("name", v)}
              placeholder="YOUR NAME"
              className="text-2xl font-bold text-gray-900"
            />
          </div>
          {/* Contact with icons */}
          <div className="flex flex-col gap-0.5 text-xs text-gray-700">
            {personal?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" style={{ color: PURPLE }} />
                <EditableField
                  value={personal.phone}
                  onChange={(v) => updatePersonal("phone", v)}
                  placeholder="Phone"
                  className="text-xs"
                />
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" style={{ color: PURPLE }} />
                <EditableField
                  value={personal.email}
                  onChange={(v) => updatePersonal("email", v)}
                  placeholder="Email"
                  className="text-xs"
                />
              </div>
            )}
            {personal?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: PURPLE }} />
                <EditableField
                  value={personal.location}
                  onChange={(v) => updatePersonal("location", v)}
                  placeholder="Location"
                  className="text-xs"
                />
              </div>
            )}
            {(!personal?.phone || !personal?.email || !personal?.location) && (
              <div className="flex flex-col gap-0.5">
                {!personal?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" style={{ color: PURPLE }} />
                    <EditableField
                      value={personal?.phone}
                      onChange={(v) => updatePersonal("phone", v)}
                      placeholder="Phone"
                      className="text-xs text-gray-500"
                    />
                  </div>
                )}
                {!personal?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" style={{ color: PURPLE }} />
                    <EditableField
                      value={personal?.email}
                      onChange={(v) => updatePersonal("email", v)}
                      placeholder="Email"
                      className="text-xs text-gray-500"
                    />
                  </div>
                )}
                {!personal?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" style={{ color: PURPLE }} />
                    <EditableField
                      value={personal?.location}
                      onChange={(v) => updatePersonal("location", v)}
                      placeholder="Location"
                      className="text-xs text-gray-500"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          </div>
        </div>
      </header>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-5">
        {/* LEFT COLUMN - Berufserfahrung, Ausbildung, Projekte */}
        <main className="space-y-4">
          {/* Berufserfahrung (Professional Experience) - Timeline style */}
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-3 text-gray-900 border-b-2"
              style={{ borderColor: PURPLE }}
            >
              Berufserfahrung
            </h2>
            <div className="space-y-4">
              {(workExperience || []).map((exp, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeWorkExperience(idx)}>
                  <div className="flex gap-3">
                    <div className="w-20 flex-shrink-0 text-xs text-gray-600">
                      <EditableField
                        value={exp.startDate}
                        onChange={(v) => updateWorkExperience(idx, "startDate", v)}
                        placeholder="Start"
                        className="text-[10px]"
                      />
                      <span className="text-[10px]">–</span>
                      <EditableField
                        value={exp.endDate}
                        onChange={(v) => updateWorkExperience(idx, "endDate", v)}
                        placeholder="Present"
                        className="text-[10px]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <EditableField
                        value={exp.title}
                        onChange={(v) => updateWorkExperience(idx, "title", v)}
                        placeholder="Job Title"
                        className="font-bold text-xs text-gray-900"
                      />
                      <EditableField
                        value={exp.company}
                        onChange={(v) => updateWorkExperience(idx, "company", v)}
                        placeholder="Company"
                        className="text-xs text-gray-600"
                      />
                      <ul className="mt-1.5 space-y-1">
                        {(exp.achievements || []).map((achievement, aIdx) => (
                          <EditableListItem
                            key={aIdx}
                            content={achievement}
                            onChange={(html) =>
                              updateWorkExperienceAchievement(idx, aIdx, html)
                            }
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

          {/* Ausbildung (Education) - Timeline style */}
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-3 text-gray-900 border-b-2"
              style={{ borderColor: PURPLE }}
            >
              Ausbildung
            </h2>
            <div className="space-y-4">
              {(education || []).map((edu, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeEducation(idx)}>
                  <div className="flex gap-3">
                    <div className="w-20 flex-shrink-0 text-[10px] text-gray-600">
                      <EditableField
                        value={edu.startDate}
                        onChange={(v) => updateEducation(idx, "startDate", v)}
                        placeholder="Start"
                        className="text-[10px]"
                      />
                      <span>–</span>
                      <EditableField
                        value={edu.endDate}
                        onChange={(v) => updateEducation(idx, "endDate", v)}
                        placeholder="End"
                        className="text-[10px]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <EditableField
                        value={edu.institution}
                        onChange={(v) => updateEducation(idx, "institution", v)}
                        placeholder="Institution"
                        className="font-bold text-xs text-gray-900"
                      />
                      <EditableField
                        value={edu.degree}
                        onChange={(v) => updateEducation(idx, "degree", v)}
                        placeholder="Degree"
                        className="text-xs italic text-gray-700"
                        multiline
                      />
                      <ul className="mt-1.5 space-y-1">
                        {(edu.highlights || []).map((highlight, hIdx) => (
                          <EditableListItem
                            key={hIdx}
                            content={highlight}
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
                </EditableSectionItem>
              ))}
              <AddSectionButton onClick={() => addEducation()} label="education" />
            </div>
          </section>

          {/* Projekte */}
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-3 text-gray-900 border-b-2"
              style={{ borderColor: PURPLE }}
            >
              Projekte
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
                      className="text-xs italic text-gray-600"
                    />
                    <div className="mt-0.5 flex items-center gap-1">
                      <LinkIcon className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <EditableField
                        value={project.url}
                        onChange={(v) => updateProject(idx, "url", v)}
                        placeholder="URL"
                        className="text-[10px] text-blue-600"
                      />
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {(project.description || []).map((desc, dIdx) => (
                        <EditableListItem
                          key={dIdx}
                          content={desc}
                          onChange={(html) =>
                            updateProjectDescription(idx, dIdx, html)
                          }
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
        </main>

        {/* RIGHT COLUMN - Kenntnisse */}
        <aside className="space-y-4">
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 text-gray-900 border-b-2"
              style={{ borderColor: PURPLE }}
            >
              Kenntnisse
            </h2>
            <div className="space-y-2 text-xs">
              {(skills || []).map((skill, idx) => (
                <EditableSectionItem key={idx} onRemove={() => removeSkillCategory(idx)}>
                  <div>
                    <EditableField
                      value={skill.category}
                      onChange={(value) => updateSkillCategory(idx, 'category', value)}
                      placeholder="Category"
                      className="font-semibold text-gray-900 text-xs"
                    />
                    <EditableField
                      value={skill.items}
                      onChange={(value) => updateSkillCategory(idx, 'items', value)}
                      placeholder="e.g. Python, TypeScript, Go"
                      className="text-gray-700 text-xs"
                    />
                  </div>
                </EditableSectionItem>
              ))}
              <AddSectionButton onClick={() => addSkillCategory('', '')} label="skill category" />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
