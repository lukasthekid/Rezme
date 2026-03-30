"use client";

import {
  AddListItemButton,
  AddSectionButton,
  EditableField,
  EditableListItem,
  EditableSectionItem,
} from '@/components/resume';
import { useResumeStore } from '@/store';

/**
 * LondonTemplate (Single Column) — clean single-column résumé layout.
 *
 * Layout:
 * - Centered header with name and contact
 * - Education, Experience, Projects, Extracurricular Activities, Technical Skills
 */
export function LondonTemplate() {
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
  const addWorkExperienceAchievement = useResumeStore((state) => state.addWorkExperienceAchievement);
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

  const formatUrl = (url: string): string => {
    if (!url) return '';
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
  };

  return (
    <div className="h-full pt-2">
      {/* HEADER */}
      <header className="mb-6 text-center">
        <div className="mb-2">
          <EditableField
            value={personal?.name}
            onChange={(value) => updatePersonal('name', value)}
            placeholder="YOUR NAME"
            className="text-3xl font-bold text-gray-900"
          />
        </div>
        <div className="text-xs text-gray-700">
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
            {personal?.phone && (
              <div className="flex items-center gap-x-2">
                <EditableField
                  value={personal.phone}
                  onChange={(value) => updatePersonal('phone', value)}
                  placeholder="Phone"
                  className="text-xs"
                />
                <span className="text-gray-400">•</span>
              </div>
            )}
            {personal?.email && (
              <div className="flex items-center gap-x-2">
                <EditableField
                  value={personal.email}
                  onChange={(value) => updatePersonal('email', value)}
                  placeholder="Email"
                  className="text-xs"
                />
                {(personal?.linkedin || personal?.github) && (
                  <span className="text-gray-400">•</span>
                )}
              </div>
            )}
            {personal?.linkedin && (
              <div className="flex items-center gap-x-2">
                <EditableField
                  value={formatUrl(personal.linkedin)}
                  onChange={(value) =>
                    updatePersonal('linkedin', value.startsWith('http') ? value : `https://${value}`)
                  }
                  placeholder="linkedin.com/in/profile"
                  className="text-xs"
                />
                {personal?.github && <span className="text-gray-400">•</span>}
              </div>
            )}
            {personal?.github && (
              <div className="flex items-center gap-x-2">
                <EditableField
                  value={formatUrl(personal.github)}
                  onChange={(value) =>
                    updatePersonal('github', value.startsWith('http') ? value : `https://${value}`)
                  }
                  placeholder="github.com/username"
                  className="text-xs"
                />
              </div>
            )}
            {!personal?.phone && !personal?.email && !personal?.linkedin && !personal?.github && (
              <div className="flex items-center gap-x-2 text-gray-400">
                <EditableField
                  value={personal?.phone}
                  onChange={(value) => updatePersonal('phone', value)}
                  placeholder="Phone"
                  className="text-xs"
                />
                <span>•</span>
                <EditableField
                  value={personal?.email}
                  onChange={(value) => updatePersonal('email', value)}
                  placeholder="Email"
                  className="text-xs"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-5">
        {/* EDUCATION */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-800 pb-1 mb-3 text-gray-900">
            Education
          </h2>
          <div className="space-y-4">
            {(education || []).map((edu, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeEducation(idx)}>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex-1">
                      <EditableField
                        value={edu.institution}
                        onChange={(value) => updateEducation(idx, 'institution', value)}
                        placeholder="Institution Name"
                        className="font-bold text-sm text-gray-900"
                      />
                      <div className="text-xs text-gray-600 mt-0.5">
                        <EditableField
                          value={edu.location}
                          onChange={(value) => updateEducation(idx, 'location', value)}
                          placeholder="Location"
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-4 w-32">
                      <div className="flex items-center gap-1 justify-end">
                        <EditableField
                          value={edu.startDate}
                          onChange={(value) => updateEducation(idx, 'startDate', value)}
                          placeholder="Start"
                          className="text-xs text-right"
                        />
                        <span>–</span>
                        <EditableField
                          value={edu.endDate}
                          onChange={(value) => updateEducation(idx, 'endDate', value)}
                          placeholder="End"
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 mb-1">
                    <EditableField
                      value={edu.degree}
                      onChange={(value) => updateEducation(idx, 'degree', value)}
                      placeholder="Degree"
                      className="text-xs italic"
                      multiline
                    />
                  </div>
                  <ul className="mt-1 space-y-1 ml-4">
                    {(edu.highlights || []).map((highlight, hIdx) => (
                      <EditableListItem
                        key={hIdx}
                        content={highlight}
                        onChange={(html) => updateEducationHighlight(idx, hIdx, html)}
                        onRemove={() => removeEducationHighlight(idx, hIdx)}
                        placeholder="Highlight..."
                      />
                    ))}
                    <AddListItemButton onClick={() => addEducationHighlight(idx, '')} label="highlight" />
                  </ul>
                </div>
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addEducation()} label="education" />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-800 pb-1 mb-3 text-gray-900">
            Experience
          </h2>
          <div className="space-y-4">
            {(workExperience || []).map((exp, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeWorkExperience(idx)}>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex-1">
                      <EditableField
                        value={exp.title}
                        onChange={(value) => updateWorkExperience(idx, 'title', value)}
                        placeholder="Job Title"
                        className="font-bold text-sm text-gray-900"
                      />
                      <div className="flex items-center gap-2 mt-0.5">
                        <EditableField
                          value={exp.company}
                          onChange={(value) => updateWorkExperience(idx, 'company', value)}
                          placeholder="Company Name"
                          className="font-semibold text-xs text-gray-700"
                        />
                        <span className="text-gray-400">•</span>
                        <EditableField
                          value={exp.location}
                          onChange={(value) => updateWorkExperience(idx, 'location', value)}
                          placeholder="Location"
                          className="text-xs text-gray-600"
                        />
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-4 w-32">
                      <div className="flex items-center gap-1 justify-end">
                        <EditableField
                          value={exp.startDate}
                          onChange={(value) => updateWorkExperience(idx, 'startDate', value)}
                          placeholder="Start"
                          className="text-xs text-right"
                        />
                        <span>–</span>
                        <EditableField
                          value={exp.endDate}
                          onChange={(value) => updateWorkExperience(idx, 'endDate', value)}
                          placeholder="Present"
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 ml-4">
                    {(exp.achievements || []).map((achievement, aIdx) => (
                      <EditableListItem
                        key={aIdx}
                        content={achievement}
                        onChange={(html) => updateWorkExperienceAchievement(idx, aIdx, html)}
                        onRemove={() => removeWorkExperienceAchievement(idx, aIdx)}
                        placeholder="Describe your achievement with impact and metrics..."
                      />
                    ))}
                    <AddListItemButton onClick={() => addWorkExperienceAchievement(idx, '')} label="achievement" />
                  </ul>
                </div>
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addWorkExperience()} label="work experience" />
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-800 pb-1 mb-3 text-gray-900">
            Projects
          </h2>
          <div className="space-y-4">
            {(projects || []).map((project, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeProject(idx)}>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex-1">
                      <EditableField
                        value={project.name}
                        onChange={(value) => updateProject(idx, 'name', value)}
                        placeholder="Project Name"
                        className="font-semibold text-sm text-gray-900"
                      />
                      <div className="text-xs text-blue-600 mt-0.5">
                        <EditableField
                          value={project.url}
                          onChange={(value) => updateProject(idx, 'url', value)}
                          placeholder="project-url.com"
                          className="text-xs"
                        />
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-4">
                      <div className="flex items-center gap-1 justify-end">
                        <EditableField
                          value={project.startDate}
                          onChange={(value) => updateProject(idx, 'startDate', value)}
                          placeholder="Start"
                          className="text-xs text-right"
                        />
                        <span>–</span>
                        <EditableField
                          value={project.endDate}
                          onChange={(value) => updateProject(idx, 'endDate', value)}
                          placeholder="End"
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 ml-4">
                    {(project.description || []).map((desc, dIdx) => (
                      <EditableListItem
                        key={dIdx}
                        content={desc}
                        onChange={(html) => updateProjectDescription(idx, dIdx, html)}
                        onRemove={() => removeProjectDescription(idx, dIdx)}
                        placeholder="Describe the project and your contributions..."
                      />
                    ))}
                    <AddListItemButton onClick={() => addProjectDescription(idx, '')} label="description" />
                  </ul>
                </div>
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addProject()} label="project" />
          </div>
        </section>

        {/* EXTRACURRICULAR ACTIVITIES */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-800 pb-1 mb-3 text-gray-900">
            Extracurricular Activities
          </h2>
          <div className="space-y-4">
            {(extracurriculars || []).map((extra, idx) => (
              <EditableSectionItem key={idx} onRemove={() => removeExtracurricular(idx)}>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex-1">
                      <EditableField
                        value={extra.activity}
                        onChange={(v) => updateExtracurricular(idx, 'activity', v)}
                        placeholder="Activity Name"
                        className="font-semibold text-sm text-gray-900"
                      />
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-4 w-32">
                      <div className="flex items-center gap-1 justify-end">
                        <EditableField
                          value={extra.startDate}
                          onChange={(v) => updateExtracurricular(idx, 'startDate', v)}
                          placeholder="Start"
                          className="text-xs text-right"
                        />
                        <span>–</span>
                        <EditableField
                          value={extra.endDate}
                          onChange={(v) => updateExtracurricular(idx, 'endDate', v)}
                          placeholder="End"
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 ml-4">
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
                      onClick={() => addExtracurricularDescription(idx, '')}
                      label="description"
                    />
                  </ul>
                </div>
              </EditableSectionItem>
            ))}
            <AddSectionButton onClick={() => addExtracurricular()} label="activity" />
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-800 pb-1 mb-3 text-gray-900">
            Technical Skills
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
      </div>
    </div>
  );
}
