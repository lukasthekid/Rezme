import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import type { ResumeData } from "@/types/resume";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type RequestBody = {
  resumeData: ResumeData;
  layout?: "newyork" | "london" | "vienna" | "paris" | "tokyo" | "berlin";
};

async function getHeadshotBase64FromSession(): Promise<string | null> {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId || typeof userId !== "string") return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { headshot: true },
  });
  if (!user?.headshot || user.headshot.length === 0) return null;
  return Buffer.from(user.headshot).toString("base64");
}

function generateNewYorkResumeHTML(resumeData: ResumeData): string {
  const { personal, education, workExperience, projects, skills, extracurriculars } = resumeData;

  // Helper to format URLs for display (strip protocol, www, trailing slashes)
  const formatUrl = (url: string): string => {
    if (!url) return '';
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
  };

  // Build contact items (email, phone, ONE link with priority: LinkedIn > GitHub > Website)
  const contactItems = [
    personal?.email,
    personal?.phone,
  ];

  // Add ONE link based on priority
  if (personal?.linkedin) {
    contactItems.push(personal.linkedin);
  } else if (personal?.github) {
    contactItems.push(personal.github);
  } else if (personal?.website) {
    contactItems.push(personal.website);
  }

  const contactLine = contactItems.filter(Boolean).join(' • ');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 8mm 10mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
            color: #111827;
            background: white;
          }
          
          /* HEADER - Full Width, Centered */
          .header {
            margin-bottom: 1em;
            padding-bottom: 0.75em;
            border-bottom: 2px solid #1f2937;
            text-align: center;
          }
          
          .header h1 {
            font-size: 24pt;
            font-weight: 700;
            margin: 0 0 0.3em 0;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #111827;
          }
          
          .contact {
            font-size: 8pt;
            color: #374151;
            line-height: 1.4;
          }
          
          /* TWO COLUMN LAYOUT */
          .container {
            display: grid;
            grid-template-columns: 30% 70%;
            gap: 1.5em;
          }
          
          .left-column {
            padding-right: 0.5em;
          }
          
          .right-column {
            padding-left: 0.5em;
          }
          
          /* SECTION HEADERS */
          h2 {
            font-size: 8pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 2px solid #1f2937;
            padding-bottom: 0.2em;
            margin-bottom: 0.7em;
            color: #111827;
          }
          
          section {
            margin-bottom: 1.2em;
          }
          
          /* EDUCATION SECTION */
          .edu-entry {
            margin-bottom: 0.9em;
            font-size: 8pt;
          }
          
          .edu-institution {
            font-weight: 700;
            color: #111827;
            line-height: 1.2;
          }
          
          .edu-dates {
            font-size: 7pt;
            color: #6b7280;
            margin-top: 0.15em;
          }
          
          .edu-degree {
            font-style: italic;
            color: #374151;
            margin-top: 0.15em;
            line-height: 1.2;
          }
          
          .edu-highlights {
            margin-top: 0.4em;
            padding-left: 1em;
            list-style-type: disc;
          }
          
          .edu-highlights li {
            margin-bottom: 0.15em;
            color: #374151;
          }
          
          /* SKILLS SECTION */
          .skills-entry {
            font-size: 8pt;
            margin-bottom: 0.4em;
            line-height: 1.5;
          }
          
          .skills-entry strong {
            font-weight: 600;
            color: #111827;
          }
          
          .skills-entry span {
            color: #374151;
          }
          
          /* WORK EXPERIENCE SECTION */
          .exp-entry {
            margin-bottom: 1em;
          }
          
          .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.15em;
          }
          
          .exp-left {
            flex: 1;
          }
          
          .exp-title {
            font-weight: 700;
            font-size: 9.5pt;
            color: #111827;
          }
          
          .exp-company {
            font-weight: 500;
            font-size: 8pt;
            color: #374151;
          }
          
          .exp-right {
            text-align: right;
            font-size: 8pt;
            color: #4b5563;
            margin-left: 1em;
            min-width: 5em;
          }
          
          .exp-location {
            font-size: 8pt;
          }
          
          .exp-dates {
            margin-top: 0.1em;
          }
          
          .exp-achievements {
            margin-top: 0.4em;
            padding-left: 1em;
            list-style-type: disc;
          }
          
          .exp-achievements li {
            margin-bottom: 0.3em;
            font-size: 8pt;
            color: #374151;
            line-height: 1.4;
          }
          
          /* PROJECTS SECTION */
          .project-entry {
            margin-bottom: 0.9em;
          }
          
          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.15em;
          }
          
          .project-name {
            font-weight: 600;
            font-size: 9.5pt;
            color: #111827;
          }
          
          .project-role {
            font-style: italic;
            font-size: 8pt;
            color: #4b5563;
            margin-left: 1em;
          }
          
          .project-url {
            font-size: 8pt;
            color: #2563eb;
            text-decoration: underline;
            text-decoration-color: #bfdbfe;
            margin-top: 0.2em;
            display: block;
          }
          
          .project-descriptions {
            margin-top: 0.4em;
            padding-left: 1em;
            list-style-type: disc;
          }
          
          .project-descriptions li {
            margin-bottom: 0.3em;
            font-size: 8pt;
            color: #374151;
            line-height: 1.4;
          }
          
          /* Support for rich text formatting */
          strong, b {
            font-weight: 600;
          }
          
          em, i {
            font-style: italic;
          }
          
          u {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <!-- HEADER -->
        <div class="header">
          <h1>${personal?.name || "YOUR NAME"}</h1>
          <div class="contact">${contactLine}</div>
        </div>

        <!-- TWO COLUMN LAYOUT -->
        <div class="container">
          <!-- LEFT COLUMN -->
          <div class="left-column">
            <!-- EDUCATION -->
            ${education && education.length > 0 ? `
              <section>
                <h2>EDUCATION</h2>
                ${education.map(edu => `
                  <div class="edu-entry">
                    <div class="edu-institution">${edu.institution || ""}</div>
                    ${edu.startDate || edu.endDate ? `
                      <div class="edu-dates">${edu.startDate || ""} – ${edu.endDate || ""}</div>
                    ` : ""}
                    ${edu.degree ? `<div class="edu-degree">${edu.degree}</div>` : ""}
                    ${edu.highlights && edu.highlights.length > 0 ? `
                      <ul class="edu-highlights">
                        ${edu.highlights.map(h => `<li>${h}</li>`).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            <!-- SKILLS -->
            ${skills && skills.length > 0 ? `
              <section>
                <h2>SKILLS</h2>
                ${skills.map(({ category, items }) => {
                  if (!category && !items) return "";
                  return `
                    <div class="skills-entry">
                      <strong>${category}:</strong>
                      <span> ${items}</span>
                    </div>
                  `;
                }).join("")}
              </section>
            ` : ""}
          </div>

          <!-- RIGHT COLUMN -->
          <div class="right-column">
            <!-- WORK EXPERIENCE -->
            ${workExperience && workExperience.length > 0 ? `
              <section>
                <h2>PROFESSIONAL EXPERIENCE</h2>
                ${workExperience.map(exp => `
                  <div class="exp-entry">
                    <div class="exp-header">
                      <div class="exp-left">
                        <div class="exp-title">${exp.title || ""}</div>
                        ${exp.company ? `<div class="exp-company">${exp.company}</div>` : ""}
                      </div>
                      <div class="exp-right">
                        ${exp.location ? `<div class="exp-location">${exp.location}</div>` : ""}
                        ${exp.startDate || exp.endDate ? `
                          <div class="exp-dates">${exp.startDate || ""} – ${exp.endDate || "Present"}</div>
                        ` : ""}
                      </div>
                    </div>
                    ${exp.achievements && exp.achievements.length > 0 ? `
                      <ul class="exp-achievements">
                        ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            <!-- PROJECTS -->
            ${projects && projects.length > 0 ? `
              <section>
                <h2>PROJECTS</h2>
                ${projects.map(project => `
                  <div class="project-entry">
                    <div class="project-header">
                      <span class="project-name">${project.name || ""}</span>
                      ${project.role ? `<span class="project-role">${project.role}</span>` : ""}
                    </div>
                    ${project.url ? `<div class="project-url">🔗 ${formatUrl(project.url)}</div>` : ""}
                    ${project.description && project.description.length > 0 ? `
                      <ul class="project-descriptions">
                        ${project.description.map(d => `<li>${d}</li>`).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            <!-- EXTRACURRICULAR ACTIVITIES -->
            ${extracurriculars && extracurriculars.length > 0 ? `
              <section>
                <h2>EXTRACURRICULAR ACTIVITIES</h2>
                ${extracurriculars.map(extra => `
                  <div class="exp-entry">
                    <div class="exp-header">
                      <div class="exp-left">
                        <div class="exp-title">${extra.activity || ""}</div>
                      </div>
                      ${(extra.startDate || extra.endDate) ? `
                        <div class="exp-right">
                          ${extra.startDate || ""} – ${extra.endDate || ""}
                        </div>
                      ` : ""}
                    </div>
                    ${extra.description && extra.description.length > 0 ? `
                      <ul class="exp-achievements">
                        ${extra.description.map(d => `<li>${d}</li>`).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateLondonResumeHTML(resumeData: ResumeData): string {
  const { personal, education, workExperience, projects, skills, extracurriculars } = resumeData;

  // Helper to format URLs for display
  const formatUrl = (url: string): string => {
    if (!url) return '';
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
  };

  // Build contact info
  const contactItems = [];
  if (personal?.phone) contactItems.push(personal.phone);
  if (personal?.email) contactItems.push(personal.email);
  if (personal?.linkedin) contactItems.push(formatUrl(personal.linkedin));
  if (personal?.github) contactItems.push(formatUrl(personal.github));
  const contactLine = contactItems.join(' • ');


  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 8mm 10mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
            color: #111827;
            background: white;
          }
          
          /* HEADER - Centered */
          .header {
            margin-bottom: 1.5em;
            text-align: center;
          }
          .header h1 {
            font-size: 20pt;
            font-weight: 700;
            margin: 0 0 0.5em 0;
            color: #111827;
          }
          
          .contact {
            font-size: 8pt;
            color: #374151;
            line-height: 1.4;
          }
          
          /* SINGLE COLUMN LAYOUT */
          .content {
            max-width: 100%;
          }
          
          /* SECTION HEADERS */
          h2 {
            font-size: 8pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 1px solid #1f2937;
            padding-bottom: 0.15em;
            margin-bottom: 0.75em;
            color: #111827;
          }
          
          section {
            margin-bottom: 1.2em;
          }
          
          /* EDUCATION SECTION */
          .edu-entry {
            margin-bottom: 1em;
          }
          
          .edu-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.2em;
          }
          
          .edu-left {
            flex: 1;
          }
          
          .edu-institution {
            font-weight: 700;
            font-size: 10pt;
            color: #111827;
          }
          
          .edu-location {
            font-size: 8pt;
            color: #6b7280;
            margin-top: 0.15em;
          }
          
          .edu-right {
            text-align: right;
            font-size: 8pt;
            color: #6b7280;
            margin-left: 1em;
            width: 80px;
          }
          
          .edu-degree {
            font-style: italic;
            color: #374151;
            margin-top: 0.15em;
            font-size: 8pt;
          }
          
          .edu-highlights {
            margin-top: 0.3em;
            padding-left: 1.2em;
            list-style-type: disc;
          }
          
          .edu-highlights li {
            margin-bottom: 0.2em;
            color: #374151;
            font-size: 8pt;
          }
          
          /* WORK EXPERIENCE SECTION */
          .exp-entry {
            margin-bottom: 1em;
          }
          
          .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.2em;
          }
          
          .exp-left {
            flex: 1;
          }
          
          .exp-title {
            font-weight: 700;
            font-size: 10pt;
            color: #111827;
          }
          
          .exp-company-location {
            display: flex;
            align-items: center;
            gap: 0.5em;
            margin-top: 0.15em;
            font-size: 8pt;
          }
          
          .exp-company {
            font-weight: 600;
            color: #374151;
          }
          
          .exp-location {
            color: #6b7280;
          }
          
          .exp-right {
            text-align: right;
            font-size: 8pt;
            color: #6b7280;
            margin-left: 1em;
            width: 80px;
          }
          
          .exp-dates {
            margin-top: 0.1em;
          }
          
          .exp-achievements {
            margin-top: 0.4em;
            padding-left: 1.2em;
            list-style-type: disc;
          }
          
          .exp-achievements li {
            margin-bottom: 0.25em;
            font-size: 8pt;
            color: #374151;
            line-height: 1.4;
          }
          
          /* PROJECTS SECTION */
          .project-entry {
            margin-bottom: 1em;
          }
          
          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 0.2em;
          }
          
          .project-left {
            flex: 1;
          }
          
          .project-name {
            font-weight: 600;
            font-size: 10pt;
            color: #111827;
          }
          
          .project-url {
            font-size: 8pt;
            color: #2563eb;
            margin-top: 0.15em;
          }
          
          .project-right {
            text-align: right;
            font-size: 8pt;
            color: #6b7280;
            margin-left: 1em;
            width: 80px;
          }
          
          .project-descriptions {
            margin-top: 0.4em;
            padding-left: 1.2em;
            list-style-type: disc;
          }
          
          .project-descriptions li {
            margin-bottom: 0.25em;
            font-size: 8pt;
            color: #374151;
            line-height: 1.4;
          }
          
          /* TECHNICAL SKILLS SECTION */
          .skills-entry {
            font-size: 8pt;
            margin-bottom: 0.4em;
            line-height: 1.5;
          }
          
          .skills-entry strong {
            font-weight: 600;
            color: #111827;
          }
          
          .skills-entry span {
            color: #374151;
          }
          
          /* Support for rich text formatting */
          strong, b {
            font-weight: 600;
          }
          
          em, i {
            font-style: italic;
          }
          
          u {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <!-- HEADER -->
        <div class="header">
          <h1>${personal?.name || "YOUR NAME"}</h1>
          <div class="contact">${contactLine}</div>
        </div>

        <!-- SINGLE COLUMN CONTENT -->
        <div class="content">
          <!-- EDUCATION -->
          ${education && education.length > 0 ? `
            <section>
              <h2>EDUCATION</h2>
              ${education.map(edu => `
                <div class="edu-entry">
                  <div class="edu-header">
                    <div class="edu-left">
                      <div class="edu-institution">${edu.institution || ""}</div>
                      ${edu.location ? `<div class="edu-location">${edu.location}</div>` : ""}
                    </div>
                    ${(edu.startDate || edu.endDate) ? `
                      <div class="edu-right">
                        ${edu.startDate || ""} – ${edu.endDate || "Present"}
                      </div>
                    ` : ""}
                  </div>
                  ${edu.degree ? `<div class="edu-degree">${edu.degree}</div>` : ""}
                  ${edu.highlights && edu.highlights.length > 0 ? `
                    <ul class="edu-highlights">
                      ${edu.highlights.map(h => `<li>${h}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </section>
          ` : ""}

          <!-- EXPERIENCE -->
          ${workExperience && workExperience.length > 0 ? `
            <section>
              <h2>EXPERIENCE</h2>
              ${workExperience.map(exp => `
                <div class="exp-entry">
                  <div class="exp-header">
                    <div class="exp-left">
                      <div class="exp-title">${exp.title || ""}</div>
                      <div class="exp-company-location">
                        ${exp.company ? `<span class="exp-company">${exp.company}</span>` : ""}
                        ${exp.location ? `<span class="exp-location">• ${exp.location}</span>` : ""}
                      </div>
                    </div>
                    ${(exp.startDate || exp.endDate) ? `
                      <div class="exp-right">
                        ${exp.startDate || ""} – ${exp.endDate || "Present"}
                      </div>
                    ` : ""}
                  </div>
                  ${exp.achievements && exp.achievements.length > 0 ? `
                    <ul class="exp-achievements">
                      ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </section>
          ` : ""}

          <!-- PROJECTS -->
          ${projects && projects.length > 0 ? `
            <section>
              <h2>PROJECTS</h2>
              ${projects.map(project => `
                <div class="project-entry">
                  <div class="project-header">
                    <div class="project-left">
                      <div class="project-name">${project.name || ""}</div>
                      ${project.url ? `<div class="project-url">${formatUrl(project.url)}</div>` : ""}
                    </div>
                    ${(project.startDate || project.endDate) ? `
                      <div class="project-right">
                        ${project.startDate || ""} – ${project.endDate || "Present"}
                      </div>
                    ` : ""}
                  </div>
                  ${project.description && project.description.length > 0 ? `
                    <ul class="project-descriptions">
                      ${project.description.map(d => `<li>${d}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </section>
          ` : ""}

          <!-- EXTRACURRICULAR ACTIVITIES -->
          ${extracurriculars && extracurriculars.length > 0 ? `
            <section>
              <h2>EXTRACURRICULAR ACTIVITIES</h2>
              ${extracurriculars.map(extra => `
                <div class="exp-entry">
                  <div class="exp-header">
                    <div class="exp-left">
                      <div class="exp-title">${extra.activity || ""}</div>
                    </div>
                    ${(extra.startDate || extra.endDate) ? `
                      <div class="exp-right">
                        ${extra.startDate || ""} – ${extra.endDate || ""}
                      </div>
                    ` : ""}
                  </div>
                  ${extra.description && extra.description.length > 0 ? `
                    <ul class="exp-achievements">
                      ${extra.description.map(d => `<li>${d}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </section>
          ` : ""}

          <!-- TECHNICAL SKILLS -->
          ${skills && skills.length > 0 ? `
            <section>
              <h2>TECHNICAL SKILLS</h2>
              ${skills.map(({ category, items }) => {
                if (!category && !items) return "";
                return `
                  <div class="skills-entry">
                    <strong>${category}:</strong>
                    <span> ${items}</span>
                  </div>
                `;
              }).join("")}
            </section>
          ` : ""}
        </div>
      </body>
    </html>
  `;
}

function generateViennaResumeHTML(
  resumeData: ResumeData,
  headshotBase64?: string | null
): string {
  const { personal, education, workExperience, projects, skills, extracurriculars } = resumeData;

  const formatUrl = (url: string): string => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  };

  const SIDEBAR_BG = "#2d3748";

  const headshotImg = headshotBase64
    ? `<img src="data:image/jpeg;base64,${headshotBase64}" alt="" style="width:100%;height:100%;object-fit:cover;" />`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:6pt;color:#94a3b8;">Photo</div>`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: A4; margin: 0; }
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
            color: #111827;
            background: white;
          }
          .vn-layout { display: flex; min-height: 297mm; }
          .vn-sidebar {
            width: 38%;
            flex-shrink: 0;
            background: ${SIDEBAR_BG};
            padding: 9mm 6mm 10mm 10mm;
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }
          .vn-main {
            flex: 1;
            padding: 9mm 10mm 10mm 8mm;
            display: flex;
            flex-direction: column;
            gap: 5mm;
          }
          .vn-headshot-wrap { display: flex; flex-direction: column; align-items: center; gap: 3mm; }
          .vn-headshot {
            width: 22mm; height: 22mm;
            border-radius: 50%;
            overflow: hidden;
            border: 1.5px solid #4a5568;
            background: #4a5568;
            flex-shrink: 0;
          }
          .vn-name { font-size: 11pt; font-weight: 700; color: white; text-align: center; }
          .vn-contact { display: flex; flex-direction: column; gap: 1.5mm; width: 100%; }
          .vn-contact-row { display: flex; align-items: center; gap: 1.5mm; font-size: 7pt; color: #cbd5e0; }
          .vn-contact-icon { width: 8px; height: 8px; flex-shrink: 0; }
          .vn-contact-icon svg { width: 100%; height: 100%; stroke: #94a3b8; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; fill: none; }
          .vn-sh2 {
            font-size: 6pt; font-weight: 700; text-transform: uppercase;
            letter-spacing: 1.5px; color: #94a3b8;
            border-bottom: 1px solid #4a5568;
            padding-bottom: 0.8mm; margin-bottom: 2mm;
          }
          .vn-edu-item { margin-bottom: 2.5mm; }
          .vn-edu-inst { font-weight: 700; font-size: 8pt; color: white; line-height: 1.3; }
          .vn-edu-degree { font-size: 7.5pt; font-style: italic; color: #cbd5e0; line-height: 1.3; }
          .vn-edu-dates { font-size: 7pt; color: #94a3b8; }
          .vn-edu-ul { padding-left: 2.5mm; list-style: disc; margin-top: 1mm; }
          .vn-edu-ul li { font-size: 7pt; color: #cbd5e0; line-height: 1.3; margin-bottom: 0.3mm; }
          .vn-skill-item { margin-bottom: 1.5mm; }
          .vn-skill-cat { font-weight: 600; font-size: 7.5pt; color: #e2e8f0; }
          .vn-skill-items { font-size: 7pt; color: #94a3b8; }
          .vn-mh2 {
            font-size: 6pt; font-weight: 700; text-transform: uppercase;
            letter-spacing: 1.5px; color: #111827;
            border-bottom: 2px solid #4a5568;
            padding-bottom: 0.8mm; margin-bottom: 2.5mm;
          }
          .vn-exp-row { display: flex; gap: 3mm; margin-bottom: 3mm; }
          .vn-exp-dates { width: 14mm; flex-shrink: 0; font-size: 6.5pt; color: #6b7280; }
          .vn-exp-content { flex: 1; min-width: 0; }
          .vn-exp-title { font-weight: 700; font-size: 8.5pt; color: #111827; }
          .vn-exp-co { font-size: 7.5pt; color: #6b7280; margin-top: 0.3mm; }
          .vn-exp-ul { padding-left: 3mm; list-style: disc; margin-top: 1mm; }
          .vn-exp-ul li { font-size: 7.5pt; color: #374151; line-height: 1.35; margin-bottom: 0.3mm; }
          .vn-proj-item { margin-bottom: 2.5mm; }
          .vn-proj-name { font-weight: 600; font-size: 8.5pt; color: #111827; }
          .vn-proj-role { font-size: 7.5pt; font-style: italic; color: #6b7280; }
          .vn-proj-url { font-size: 7pt; color: #2563eb; margin-top: 0.5mm; }
          .vn-proj-ul { padding-left: 3mm; list-style: disc; margin-top: 1mm; }
          .vn-proj-ul li { font-size: 7.5pt; color: #374151; line-height: 1.35; margin-bottom: 0.3mm; }
          section { }
          strong, b { font-weight: 600; }
          em, i { font-style: italic; }
          u { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="vn-layout">
          <!-- LEFT SIDEBAR -->
          <aside class="vn-sidebar">
            <div class="vn-headshot-wrap">
              <div class="vn-headshot">${headshotImg}</div>
              <div class="vn-name">${personal?.name || "YOUR NAME"}</div>
              <div class="vn-contact">
                ${personal?.phone ? `<div class="vn-contact-row"><span class="vn-contact-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span> ${personal.phone}</div>` : ""}
                ${personal?.email ? `<div class="vn-contact-row"><span class="vn-contact-icon"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg></span> ${personal.email}</div>` : ""}
                ${personal?.location ? `<div class="vn-contact-row"><span class="vn-contact-icon"><svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span> ${personal.location}</div>` : ""}
                ${personal?.linkedin ? `<div class="vn-contact-row"><span class="vn-contact-icon"><svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span> ${formatUrl(personal.linkedin)}</div>` : ""}
              </div>
            </div>

            ${education && education.length > 0 ? `
              <section>
                <div class="vn-sh2">Education</div>
                ${education.map(edu => `
                  <div class="vn-edu-item">
                    <div class="vn-edu-inst">${edu.institution || ""}</div>
                    ${edu.degree ? `<div class="vn-edu-degree">${edu.degree}</div>` : ""}
                    <div class="vn-edu-dates">${edu.startDate || ""} – ${edu.endDate || ""}</div>
                    ${edu.highlights && edu.highlights.length > 0 ? `
                      <ul class="vn-edu-ul">
                        ${edu.highlights.map(h => `<li>${h}</li>`).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${skills && skills.length > 0 ? `
              <section>
                <div class="vn-sh2">Skills</div>
                ${skills.map(({ category, items }) => `
                  <div class="vn-skill-item">
                    <div class="vn-skill-cat">${category}:</div>
                    <div class="vn-skill-items">${items}</div>
                  </div>
                `).join("")}
              </section>
            ` : ""}
          </aside>

          <!-- RIGHT COLUMN -->
          <main class="vn-main">
            ${workExperience && workExperience.length > 0 ? `
              <section>
                <div class="vn-mh2">Experience</div>
                ${workExperience.map(exp => `
                  <div class="vn-exp-row">
                    <div class="vn-exp-dates">${exp.startDate || ""} – ${exp.endDate || "Present"}</div>
                    <div class="vn-exp-content">
                      <div class="vn-exp-title">${exp.title || ""}</div>
                      <div class="vn-exp-co">${exp.company || ""}${exp.company && exp.location ? " · " : ""}${exp.location || ""}</div>
                      ${exp.achievements && exp.achievements.length > 0 ? `
                        <ul class="vn-exp-ul">
                          ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
                        </ul>
                      ` : ""}
                    </div>
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${projects && projects.length > 0 ? `
              <section>
                <div class="vn-mh2">Projects</div>
                ${projects.map(p => `
                  <div class="vn-proj-item">
                    <div class="vn-proj-name">${p.name || ""}</div>
                    ${p.role ? `<div class="vn-proj-role">${p.role}</div>` : ""}
                    ${p.url ? `<div class="vn-proj-url">${formatUrl(p.url)}</div>` : ""}
                    ${p.description && p.description.length > 0 ? `
                      <ul class="vn-proj-ul">
                        ${p.description.map(d => `<li>${d}</li>`).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${extracurriculars && extracurriculars.length > 0 ? `
              <section>
                <div class="vn-mh2">Extracurricular Activities</div>
                ${extracurriculars.map(extra => `
                  <div class="vn-exp-row">
                    <div class="vn-exp-dates">${extra.startDate || ""} – ${extra.endDate || ""}</div>
                    <div class="vn-exp-content">
                      <div class="vn-exp-title">${extra.activity || ""}</div>
                      ${extra.description && extra.description.length > 0 ? `
                        <ul class="vn-exp-ul">
                          ${extra.description.map(d => `<li>${d}</li>`).join("")}
                        </ul>
                      ` : ""}
                    </div>
                  </div>
                `).join("")}
              </section>
            ` : ""}
          </main>
        </div>
      </body>
    </html>
  `;
}

const EU_ACCENT = "#1e293b";

function generateParisResumeHTML(
  resumeData: ResumeData,
  headshotBase64?: string | null
): string {
  const { personal, education, workExperience, projects, skills, extracurriculars } = resumeData;

  const formatUrl = (url: string): string => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  };

  const currentRole = workExperience?.[0]?.title || "";

  const headshotImg = headshotBase64
    ? `<img src="data:image/jpeg;base64,${headshotBase64}" alt="" class="eu-headshot-img" />`
    : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: A4; margin: 0; }
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 8mm 10mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            line-height: 1.3;
            color: #111827;
            background: white;
          }
          .eu-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1em;
            margin-bottom: 1em;
            padding-bottom: 0.75em;
            border-bottom: 1px solid ${EU_ACCENT};
          }
          .eu-header-text { flex: 1; min-width: 0; }
          .eu-role { font-size: 7pt; color: #64748b; margin-bottom: 0.2em; }
          .eu-name { font-size: 16pt; font-weight: 700; color: #0f172a; margin-bottom: 0.4em; }
          .eu-contact { font-size: 7pt; color: #374151; display: flex; flex-direction: column; gap: 0.2em; }
          .eu-contact span { display: flex; align-items: center; gap: 0.4em; }
          .eu-contact .eu-icon { width: 10px; height: 10px; flex-shrink: 0; display: inline-block; vertical-align: middle; }
          .eu-contact .eu-icon svg { width: 100%; height: 100%; stroke: ${EU_ACCENT}; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; fill: none; }
          .eu-headshot-wrap { flex-shrink: 0; }
          .eu-headshot-box {
            width: 96px;
            height: 96px;
            overflow: hidden;
            border: 1px solid #cbd5e1;
            border-radius: 2px;
            background: #e2e8f0;
          }
          .eu-headshot-img { width: 100%; height: 100%; object-fit: cover; }
          .eu-grid { display: grid; grid-template-columns: 32% 68%; gap: 1em; }
          .eu-sidebar { padding-right: 0.5em; }
          .eu-main { padding-left: 0.5em; }
          .eu-h2 {
            font-size: 7pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            border-bottom: 2px solid ${EU_ACCENT};
            padding-bottom: 0.15em;
            margin-bottom: 0.6em;
            color: #0f172a;
          }
          .eu-exp-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.75em;
            margin-bottom: 0.7em;
          }
          .eu-exp-content { flex: 1; min-width: 0; }
          .eu-exp-title { font-weight: 700; font-size: 9pt; color: #111827; }
          .eu-exp-company { font-size: 8pt; color: #64748b; }
          .eu-exp-dates { flex-shrink: 0; width: 5em; text-align: right; font-size: 7pt; color: #64748b; }
          .eu-exp-ul { margin-top: 0.3em; padding-left: 1em; list-style-type: disc; }
          .eu-exp-ul li { margin-bottom: 0.15em; font-size: 8pt; color: #374151; line-height: 1.35; }
          .eu-edu-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.75em;
            margin-bottom: 0.7em;
          }
          .eu-edu-content { flex: 1; min-width: 0; }
          .eu-edu-inst { font-weight: 700; font-size: 9pt; color: #111827; }
          .eu-edu-degree { font-size: 8pt; font-style: italic; color: #374151; }
          .eu-edu-dates { flex-shrink: 0; width: 5em; text-align: right; font-size: 7pt; color: #64748b; }
          .eu-edu-ul { margin-top: 0.3em; padding-left: 1em; list-style-type: disc; }
          .eu-edu-ul li { margin-bottom: 0.15em; font-size: 8pt; color: #374151; }
          .eu-project { margin-bottom: 0.6em; }
          .eu-project-name { font-weight: 600; font-size: 9pt; color: #111827; }
          .eu-project-role { font-size: 8pt; font-style: italic; color: #64748b; }
          .eu-project-url { font-size: 7pt; color: #2563eb; margin-top: 0.15em; }
          .eu-project-ul { margin-top: 0.25em; padding-left: 1em; list-style-type: disc; }
          .eu-project-ul li { margin-bottom: 0.1em; font-size: 8pt; color: #374151; }
          .eu-skill-ul { list-style: none; padding: 0; margin: 0; }
          .eu-skill-ul li {
            display: flex;
            align-items: flex-start;
            gap: 0.4em;
            margin-bottom: 0.25em;
            font-size: 8pt;
            color: #374151;
          }
          .eu-skill-ul li::before {
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: ${EU_ACCENT};
            flex-shrink: 0;
            margin-top: 0.35em;
          }
          section { margin-bottom: 1em; }
          strong, b { font-weight: 600; }
          em, i { font-style: italic; }
          u { text-decoration: underline; }
        </style>
      </head>
      <body>
        <header class="eu-header">
          <div class="eu-header-text">
            ${currentRole ? `<div class="eu-role">${currentRole}</div>` : ""}
            <h1 class="eu-name">${personal?.name || "YOUR NAME"}</h1>
            <div class="eu-contact">
              ${personal?.phone ? `<span><span class="eu-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span> ${personal.phone}</span>` : ""}
              ${personal?.email ? `<span><span class="eu-icon"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg></span> ${personal.email}</span>` : ""}
              ${personal?.location ? `<span><span class="eu-icon"><svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span> ${personal.location}</span>` : ""}
              ${personal?.linkedin ? `<span><span class="eu-icon"><svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span> ${formatUrl(personal.linkedin)}</span>` : ""}
            </div>
          </div>
          <div class="eu-headshot-wrap">
            <div class="eu-headshot-box">
              ${headshotImg || '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:7pt;color:#94a3b8;">Photo</div>'}
            </div>
          </div>
        </header>

        <div class="eu-grid">
          <aside class="eu-sidebar">
            ${skills && skills.length > 0 ? `
              <section>
                <h2 class="eu-h2">Skills</h2>
                <div class="eu-skill-list">
                  ${skills.map(({ category, items }) => `
                    <div class="eu-skill-entry">
                      <strong>${category}:</strong> ${items}
                    </div>
                  `).join("")}
                </div>
              </section>
            ` : ""}

            ${education && education.length > 0 ? `
              <section>
                <h2 class="eu-h2">Education</h2>
                ${education.map((edu) => `
                  <div class="eu-edu-row">
                    <div class="eu-edu-content">
                      <div class="eu-edu-inst">${edu.institution || ""}</div>
                      ${edu.degree ? `<div class="eu-edu-degree">${edu.degree}</div>` : ""}
                      ${edu.highlights && edu.highlights.length > 0 ? `
                        <ul class="eu-edu-ul">
                          ${edu.highlights.map((h) => `<li>${h}</li>`).join("")}
                        </ul>
                      ` : ""}
                    </div>
                    <div class="eu-edu-dates">${edu.startDate || ""} – ${edu.endDate || ""}</div>
                  </div>
                `).join("")}
              </section>
            ` : ""}
          </aside>

          <main class="eu-main">
            ${workExperience && workExperience.length > 0 ? `
              <section>
                <h2 class="eu-h2">Work Experience</h2>
                ${workExperience.map((exp) => `
                  <div class="eu-exp-row">
                    <div class="eu-exp-content">
                      <div class="eu-exp-title">${exp.title || ""}</div>
                      <div class="eu-exp-company">${exp.company || ""}</div>
                      ${exp.achievements && exp.achievements.length > 0 ? `
                        <ul class="eu-exp-ul">
                          ${exp.achievements.map((a) => `<li>${a}</li>`).join("")}
                        </ul>
                      ` : ""}
                    </div>
                    <div class="eu-exp-dates">${exp.startDate || ""} – ${exp.endDate || "Present"}</div>
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${projects && projects.length > 0 ? `
              <section>
                <h2 class="eu-h2">Projects</h2>
                ${projects.map((p) => `
                  <div class="eu-project">
                    <div class="eu-project-name">${p.name || ""}</div>
                    ${p.role ? `<div class="eu-project-role">${p.role}</div>` : ""}
                    ${p.url ? `<div class="eu-project-url">${formatUrl(p.url)}</div>` : ""}
                    ${p.description && p.description.length > 0 ? `
                      <ul class="eu-project-ul">
                        ${p.description.map((d) => `<li>${d}</li>`).join("")}
                      </ul>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}

            ${extracurriculars && extracurriculars.length > 0 ? `
              <section>
                <h2 class="eu-h2">Extracurricular Activities</h2>
                ${extracurriculars.map((extra) => `
                  <div class="eu-exp-row">
                    <div class="eu-exp-content">
                      <div class="eu-exp-title">${extra.activity || ""}</div>
                      ${extra.description && extra.description.length > 0 ? `
                        <ul class="eu-exp-ul">
                          ${extra.description.map((d) => `<li>${d}</li>`).join("")}
                        </ul>
                      ` : ""}
                    </div>
                    ${(extra.startDate || extra.endDate) ? `
                      <div class="eu-exp-dates">${extra.startDate || ""} – ${extra.endDate || ""}</div>
                    ` : ""}
                  </div>
                `).join("")}
              </section>
            ` : ""}
          </main>
        </div>
      </body>
    </html>
  `;
}

function generateTokyoResumeHTML(resumeData: ResumeData): string {
  const { personal, education, workExperience, projects, skills, extracurriculars } = resumeData;

  const formatUrl = (url: string): string => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  };

  const contactParts = [
    personal?.location,
    personal?.phone,
    personal?.email,
    personal?.linkedin ? formatUrl(personal.linkedin) : null,
    personal?.github ? formatUrl(personal.github) : null,
  ].filter(Boolean) as string[];

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: A4; margin: 0; }
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 8mm 10mm;
            font-family: 'Times New Roman', Times, serif;
            font-size: 9pt;
            line-height: 1.35;
            color: #1e293b;
            background: white;
          }
          .tk-header { text-align: center; padding-bottom: 4mm; }
          .tk-name { font-size: 22pt; font-weight: 700; color: #0f172a; letter-spacing: -0.5px; }
          .tk-role { font-size: 9pt; font-style: italic; color: #64748b; margin-top: 1mm; }
          .tk-contact { font-size: 7.5pt; color: #475569; margin-top: 1.5mm; }
          .tk-hr { border: 0; border-top: 1px solid #cbd5e1; margin: 0; }
          .tk-section { display: grid; grid-template-columns: 20% 80%; }
          .tk-label {
            font-size: 7pt;
            font-weight: normal;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: #64748b;
            padding-top: 3.5mm;
            padding-right: 3mm;
            line-height: 1.6;
          }
          .tk-content { padding: 3.5mm 0 3mm 0; }
          .tk-exp { margin-bottom: 3mm; }
          .tk-exp-header { display: flex; justify-content: space-between; align-items: baseline; }
          .tk-exp-left { flex: 1; }
          .tk-exp-title { font-weight: 700; font-size: 9.5pt; color: #0f172a; }
          .tk-exp-company { font-size: 8.5pt; font-style: italic; color: #475569; }
          .tk-exp-right { text-align: right; flex-shrink: 0; margin-left: 4mm; }
          .tk-exp-dates { font-size: 7.5pt; color: #64748b; }
          .tk-exp-loc { font-size: 7pt; color: #94a3b8; }
          .tk-exp-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .tk-exp-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          .tk-edu { margin-bottom: 3mm; }
          .tk-edu-header { display: flex; justify-content: space-between; align-items: baseline; }
          .tk-edu-inst { font-weight: 700; font-size: 9.5pt; color: #0f172a; }
          .tk-edu-degree { font-size: 8.5pt; font-style: italic; color: #475569; }
          .tk-edu-right { text-align: right; flex-shrink: 0; margin-left: 4mm; }
          .tk-edu-dates { font-size: 7.5pt; color: #64748b; }
          .tk-edu-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .tk-edu-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          .tk-proj { margin-bottom: 2.5mm; }
          .tk-proj-name { font-weight: 700; font-size: 9.5pt; color: #0f172a; }
          .tk-proj-role { font-size: 8.5pt; font-style: italic; color: #475569; }
          .tk-proj-url { font-size: 7.5pt; color: #2563eb; }
          .tk-proj-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .tk-proj-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          .tk-skill { margin-bottom: 1.5mm; font-size: 8.5pt; }
          .tk-skill strong { font-weight: 700; color: #0f172a; }
          .tk-skill span { color: #475569; }
          .tk-extra { margin-bottom: 2.5mm; }
          .tk-extra-header { display: flex; justify-content: space-between; align-items: baseline; }
          .tk-extra-name { font-weight: 700; font-size: 9.5pt; color: #0f172a; }
          .tk-extra-dates { font-size: 7.5pt; color: #64748b; text-align: right; flex-shrink: 0; margin-left: 4mm; }
          .tk-extra-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .tk-extra-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          strong, b { font-weight: 700; }
          em, i { font-style: italic; }
          u { text-decoration: underline; }
        </style>
      </head>
      <body>
        <!-- HEADER -->
        <div class="tk-header">
          <div class="tk-name">${personal?.name || "YOUR NAME"}</div>
          ${workExperience?.[0]?.title ? `<div class="tk-role">${workExperience[0].title}</div>` : ""}
          <div class="tk-contact">${contactParts.join(" · ")}</div>
        </div>
        <hr class="tk-hr">

        <!-- EMPLOYMENT HISTORY -->
        ${workExperience && workExperience.length > 0 ? `
          <div class="tk-section">
            <div class="tk-label">Employment<br>History</div>
            <div class="tk-content">
              ${workExperience.map(exp => `
                <div class="tk-exp">
                  <div class="tk-exp-header">
                    <div class="tk-exp-left">
                      <div class="tk-exp-title">${exp.title || ""}</div>
                      <div class="tk-exp-company">${exp.company || ""}</div>
                    </div>
                    <div class="tk-exp-right">
                      <div class="tk-exp-dates">${exp.startDate || ""} – ${exp.endDate || "Present"}</div>
                      ${exp.location ? `<div class="tk-exp-loc">${exp.location}</div>` : ""}
                    </div>
                  </div>
                  ${exp.achievements && exp.achievements.length > 0 ? `
                    <ul class="tk-exp-ul">
                      ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </div>
          </div>
          <hr class="tk-hr">
        ` : ""}

        <!-- EDUCATION -->
        ${education && education.length > 0 ? `
          <div class="tk-section">
            <div class="tk-label">Education</div>
            <div class="tk-content">
              ${education.map(edu => `
                <div class="tk-edu">
                  <div class="tk-edu-header">
                    <div>
                      <div class="tk-edu-inst">${edu.institution || ""}</div>
                      ${edu.degree ? `<div class="tk-edu-degree">${edu.degree}</div>` : ""}
                    </div>
                    <div class="tk-edu-right">
                      <div class="tk-edu-dates">${edu.startDate || ""} – ${edu.endDate || ""}</div>
                    </div>
                  </div>
                  ${edu.highlights && edu.highlights.length > 0 ? `
                    <ul class="tk-edu-ul">
                      ${edu.highlights.map(h => `<li>${h}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </div>
          </div>
          <hr class="tk-hr">
        ` : ""}

        <!-- PROJECTS -->
        ${projects && projects.length > 0 ? `
          <div class="tk-section">
            <div class="tk-label">Projects</div>
            <div class="tk-content">
              ${projects.map(p => `
                <div class="tk-proj">
                  <div class="tk-proj-name">${p.name || ""}</div>
                  ${p.role ? `<div class="tk-proj-role">${p.role}</div>` : ""}
                  ${p.url ? `<div class="tk-proj-url">${formatUrl(p.url)}</div>` : ""}
                  ${p.description && p.description.length > 0 ? `
                    <ul class="tk-proj-ul">
                      ${p.description.map(d => `<li>${d}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </div>
          </div>
          <hr class="tk-hr">
        ` : ""}

        <!-- SKILLS -->
        ${skills && skills.length > 0 ? `
          <div class="tk-section">
            <div class="tk-label">Skills</div>
            <div class="tk-content">
              ${skills.map(({ category, items }) => {
                if (!category && !items) return "";
                return `<div class="tk-skill"><strong>${category}</strong><span> — ${items}</span></div>`;
              }).join("")}
            </div>
          </div>
          <hr class="tk-hr">
        ` : ""}

        <!-- EXTRACURRICULAR ACTIVITIES -->
        ${extracurriculars && extracurriculars.length > 0 ? `
          <div class="tk-section">
            <div class="tk-label">Extra&shy;curricular Activities</div>
            <div class="tk-content">
              ${extracurriculars.map(extra => `
                <div class="tk-extra">
                  <div class="tk-extra-header">
                    <div class="tk-extra-name">${extra.activity || ""}</div>
                    ${(extra.startDate || extra.endDate) ? `
                      <div class="tk-extra-dates">${extra.startDate || ""} – ${extra.endDate || ""}</div>
                    ` : ""}
                  </div>
                  ${extra.description && extra.description.length > 0 ? `
                    <ul class="tk-extra-ul">
                      ${extra.description.map(d => `<li>${d}</li>`).join("")}
                    </ul>
                  ` : ""}
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}
      </body>
    </html>
  `;
}

function generateBerlinResumeHTML(
  resumeData: ResumeData,
  headshotBase64?: string | null
): string {
  const { personal, education, workExperience, projects, skills, extracurriculars } = resumeData;

  const formatUrl = (url: string): string => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  };

  const ACCENT = "#0f172a";

  const headshotImg = headshotBase64
    ? `<img src="data:image/jpeg;base64,${headshotBase64}" alt="" style="width:100%;height:100%;object-fit:cover;" />`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:700;color:#475569;">${
        personal?.name ? personal.name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase() : "?"
      }</div>`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: A4; margin: 0; }
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            padding: 8mm 10mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            line-height: 1.35;
            color: #1e293b;
            background: white;
          }
          .bl-header { text-align: center; padding-bottom: 4mm; border-bottom: 1px solid #e2e8f0; }
          .bl-headshot {
            width: 18mm; height: 18mm;
            border-radius: 50%;
            overflow: hidden;
            border: 1.5px solid ${ACCENT};
            background: #e2e8f0;
            margin: 0 auto 2.5mm auto;
          }
          .bl-name { font-size: 16pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: ${ACCENT}; }
          .bl-contact { font-size: 7.5pt; color: #475569; margin-top: 1mm; }
          .bl-grid { display: grid; grid-template-columns: 28% 72%; gap: 5mm; margin-top: 4mm; }
          .bl-sidebar { border-right: 1px solid #e2e8f0; padding-right: 4mm; }
          .bl-main { padding-left: 1mm; }
          .bl-sh {
            font-size: 6.5pt; font-weight: 700; text-transform: uppercase;
            letter-spacing: 0.14em; color: ${ACCENT};
            border-bottom: 1px solid ${ACCENT};
            padding-bottom: 1px; margin-bottom: 2mm;
          }
          .bl-section { margin-bottom: 4mm; }
          .bl-detail-group { margin-bottom: 1.5mm; }
          .bl-detail-label { font-size: 6pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; }
          .bl-detail-val { font-size: 8pt; color: #334155; }
          .bl-skill-item { font-size: 8pt; color: #334155; padding-bottom: 1mm; border-bottom: 1px solid #e2e8f0; margin-bottom: 1.5mm; }
          .bl-skill-cat { font-weight: 700; color: ${ACCENT}; }
          .bl-exp { margin-bottom: 2.5mm; }
          .bl-exp-diamond { font-size: 9pt; color: #94a3b8; margin-right: 1.5mm; }
          .bl-exp-row { display: flex; align-items: flex-start; }
          .bl-exp-body { flex: 1; }
          .bl-exp-title { font-weight: 700; font-size: 9pt; color: ${ACCENT}; }
          .bl-exp-company { font-size: 8pt; color: #475569; }
          .bl-exp-meta { font-size: 7pt; color: #94a3b8; margin-top: 0.5mm; }
          .bl-exp-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .bl-exp-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          .bl-edu { margin-bottom: 2.5mm; }
          .bl-edu-title { font-weight: 700; font-size: 9pt; color: ${ACCENT}; }
          .bl-edu-degree { font-size: 8pt; font-style: italic; color: #475569; }
          .bl-edu-meta { font-size: 7pt; color: #94a3b8; margin-top: 0.5mm; }
          .bl-edu-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .bl-edu-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          .bl-proj { margin-bottom: 2.5mm; }
          .bl-proj-title { font-weight: 700; font-size: 9pt; color: ${ACCENT}; }
          .bl-proj-role { font-size: 8pt; font-style: italic; color: #475569; }
          .bl-proj-url { font-size: 7.5pt; color: #2563eb; }
          .bl-proj-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .bl-proj-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          .bl-extra { margin-bottom: 2.5mm; }
          .bl-extra-row { display: flex; align-items: flex-start; }
          .bl-extra-title { font-weight: 700; font-size: 9pt; color: ${ACCENT}; }
          .bl-extra-meta { font-size: 7pt; color: #94a3b8; margin-top: 0.5mm; }
          .bl-extra-ul { margin-top: 1mm; padding-left: 3.5mm; list-style-type: disc; }
          .bl-extra-ul li { font-size: 8pt; color: #334155; line-height: 1.4; margin-bottom: 0.5mm; }
          strong, b { font-weight: 700; }
          em, i { font-style: italic; }
          u { text-decoration: underline; }
        </style>
      </head>
      <body>
        <!-- HEADER -->
        <div class="bl-header">
          <div class="bl-headshot">${headshotImg}</div>
          <div class="bl-name">${personal?.name || "FULL NAME"}</div>
          <div class="bl-contact">
            ${[
              workExperience?.[0]?.title ? `<em>${workExperience[0].title}</em>` : null,
              personal?.location,
              personal?.phone,
              personal?.email,
            ].filter(Boolean).join(" · ")}
          </div>
        </div>

        <!-- TWO-COLUMN BODY -->
        <div class="bl-grid">
          <!-- LEFT SIDEBAR -->
          <div class="bl-sidebar">
            <!-- DETAILS -->
            <div class="bl-section">
              <div class="bl-sh">Details</div>
              ${personal?.location ? `<div class="bl-detail-group"><div class="bl-detail-label">Location</div><div class="bl-detail-val">${personal.location}</div></div>` : ""}
              ${personal?.phone ? `<div class="bl-detail-group"><div class="bl-detail-label">Phone</div><div class="bl-detail-val">${personal.phone}</div></div>` : ""}
              ${personal?.email ? `<div class="bl-detail-group"><div class="bl-detail-label">Email</div><div class="bl-detail-val">${personal.email}</div></div>` : ""}
              ${personal?.linkedin ? `<div class="bl-detail-group"><div class="bl-detail-label">LinkedIn</div><div class="bl-detail-val">${formatUrl(personal.linkedin)}</div></div>` : ""}
              ${personal?.github ? `<div class="bl-detail-group"><div class="bl-detail-label">GitHub</div><div class="bl-detail-val">${formatUrl(personal.github)}</div></div>` : ""}
            </div>

            <!-- SKILLS -->
            ${skills && skills.length > 0 ? `
              <div class="bl-section">
                <div class="bl-sh">Skills</div>
                ${skills.map(({ category, items }) => `
                  <div class="bl-skill-item">
                    <div class="bl-skill-cat">${category}</div>
                    <div>${items}</div>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>

          <!-- RIGHT MAIN -->
          <div class="bl-main">
            <!-- EMPLOYMENT HISTORY -->
            ${workExperience && workExperience.length > 0 ? `
              <div class="bl-section">
                <div class="bl-sh">Employment History</div>
                ${workExperience.map(exp => `
                  <div class="bl-exp">
                    <div class="bl-exp-row">
                      <span class="bl-exp-diamond">◇</span>
                      <div class="bl-exp-body">
                        <div class="bl-exp-title">${exp.title || ""}</div>
                        <div class="bl-exp-company">${exp.company || ""}</div>
                        <div class="bl-exp-meta">${exp.startDate || ""} – ${exp.endDate || "Present"}${exp.location ? ` · ${exp.location}` : ""}</div>
                        ${exp.achievements && exp.achievements.length > 0 ? `
                          <ul class="bl-exp-ul">
                            ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
                          </ul>
                        ` : ""}
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : ""}

            <!-- EDUCATION -->
            ${education && education.length > 0 ? `
              <div class="bl-section">
                <div class="bl-sh">Education</div>
                ${education.map(edu => `
                  <div class="bl-edu">
                    <div class="bl-exp-row">
                      <span class="bl-exp-diamond">◇</span>
                      <div class="bl-exp-body">
                        <div class="bl-edu-title">${edu.institution || ""}</div>
                        ${edu.degree ? `<div class="bl-edu-degree">${edu.degree}</div>` : ""}
                        <div class="bl-edu-meta">${edu.startDate || ""} – ${edu.endDate || ""}</div>
                        ${edu.highlights && edu.highlights.length > 0 ? `
                          <ul class="bl-edu-ul">
                            ${edu.highlights.map(h => `<li>${h}</li>`).join("")}
                          </ul>
                        ` : ""}
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : ""}

            <!-- PROJECTS -->
            ${projects && projects.length > 0 ? `
              <div class="bl-section">
                <div class="bl-sh">Projects</div>
                ${projects.map(p => `
                  <div class="bl-proj">
                    <div class="bl-exp-row">
                      <span class="bl-exp-diamond">◇</span>
                      <div class="bl-exp-body">
                        <div class="bl-proj-title">${p.name || ""}</div>
                        ${p.role ? `<div class="bl-proj-role">${p.role}</div>` : ""}
                        ${p.url ? `<div class="bl-proj-url">${formatUrl(p.url)}</div>` : ""}
                        ${p.description && p.description.length > 0 ? `
                          <ul class="bl-proj-ul">
                            ${p.description.map(d => `<li>${d}</li>`).join("")}
                          </ul>
                        ` : ""}
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : ""}

            <!-- EXTRACURRICULAR ACTIVITIES -->
            ${extracurriculars && extracurriculars.length > 0 ? `
              <div class="bl-section">
                <div class="bl-sh">Extracurricular Activities</div>
                ${extracurriculars.map(extra => `
                  <div class="bl-extra">
                    <div class="bl-extra-row">
                      <span class="bl-exp-diamond">◇</span>
                      <div class="bl-exp-body">
                        <div class="bl-extra-title">${extra.activity || ""}</div>
                        ${(extra.startDate || extra.endDate) ? `<div class="bl-extra-meta">${extra.startDate || ""} – ${extra.endDate || ""}</div>` : ""}
                        ${extra.description && extra.description.length > 0 ? `
                          <ul class="bl-extra-ul">
                            ${extra.description.map(d => `<li>${d}</li>`).join("")}
                          </ul>
                        ` : ""}
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { resumeData, layout = "newyork" } = body;

    if (!resumeData) {
      return NextResponse.json(
        { error: "Missing resume data" },
        { status: 400 }
      );
    }

    let html: string;
    if (layout === "vienna") {
      const headshotBase64 = await getHeadshotBase64FromSession();
      html = generateViennaResumeHTML(resumeData, headshotBase64);
    } else if (layout === "paris") {
      const headshotBase64 = await getHeadshotBase64FromSession();
      html = generateParisResumeHTML(resumeData, headshotBase64);
    } else if (layout === "berlin") {
      const headshotBase64 = await getHeadshotBase64FromSession();
      html = generateBerlinResumeHTML(resumeData, headshotBase64);
    } else if (layout === "tokyo") {
      html = generateTokyoResumeHTML(resumeData);
    } else if (layout === "london") {
      html = generateLondonResumeHTML(resumeData);
    } else {
      html = generateNewYorkResumeHTML(resumeData);
    }

    // Launch Puppeteer with appropriate settings
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Set content and wait for it to render
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // Generate PDF with ATS-friendly settings
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      // Ensure text is selectable and searchable (ATS-friendly)
      tagged: true,
      outline: false,
    });

    await browser.close();

    // Generate filename based on name
    const name = resumeData.personal?.name || "Resume";
    const filename = `${name.replace(/[^a-z0-9]/gi, '_')}_Resume.pdf`;

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
