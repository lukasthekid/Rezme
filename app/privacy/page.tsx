import type { Metadata } from "next";

import {
  LegalPageLayout,
  LegalSection,
} from "@/components/landing/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Rezme",
  description:
    "Learn how Rezme collects, uses, stores, and shares your information when you use our resume tailoring, cover letter, and job application tools.",
};

const CONTACT_EMAIL = "resumr.office@gmail.com";

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="This Privacy Policy explains what information Rezme collects, how we use it to provide the service, and the choices you have when using our resume, cover letter, and job tracking tools."
      lastUpdated="March 27, 2026"
      contactEmail={CONTACT_EMAIL}
    >
      <LegalSection title="Overview">
        <p>
          Rezme helps users tailor resumes and cover letters to job postings, upload
          supporting documents, import job listings, and manage application activity.
          To provide that service, we process account information, profile details,
          uploaded content, generated outputs, and limited technical data.
        </p>
        <p>
          By using Rezme, you agree that we may process your information as described
          in this policy. If you have questions about how your data is handled, contact{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>Depending on how you use the product, we may collect the following categories of information:</p>
        <ul>
          <li>
            Account and identity data, including your name, email address, and login
            information provided through supported sign-in providers such as Google,
            GitHub, or LinkedIn.
          </li>
          <li>
            Profile information you add to your account, such as phone number, street
            address, city, postcode, country, LinkedIn profile URL, and optional
            headshot image.
          </li>
          <li>
            Resume and document data, including uploaded PDF or DOCX content,
            extracted document text, custom instructions, and generated resume or cover
            letter output.
          </li>
          <li>
            Job-search data, including job URLs you submit, imported job descriptions,
            company names, application stages, and notes you save inside the app.
          </li>
          <li>
            Billing data, such as Stripe customer identifiers, subscription identifiers,
            plan status, and usage counters used to apply free-plan or paid-plan limits.
          </li>
          <li>
            Technical and session data, including cookie-based session identifiers, IP
            address, user agent, and similar device or browser metadata used for
            authentication and security.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use Information">
        <ul>
          <li>Provide, operate, and secure your Rezme account and session.</li>
          <li>Generate tailored resumes and cover letters based on your profile and selected job posting.</li>
          <li>Process uploaded documents and make them available for document-based features.</li>
          <li>Import and parse job postings from URLs that you submit to the service.</li>
          <li>Track plan limits, subscription status, billing history, and access to paid features.</li>
          <li>Respond to support requests, troubleshoot issues, and protect the service from abuse.</li>
          <li>Maintain records required for internal operations, security, and legal compliance.</li>
        </ul>
      </LegalSection>

      <LegalSection title="AI Features And External Processing">
        <p>
          Some Rezme features rely on external service providers to process information
          on our behalf. When you use generation or import features, relevant content may
          be sent to those providers to complete the requested action.
        </p>
        <ul>
          <li>
            Resume generation and cover letter generation may send profile information,
            job listing data, instructions, and related content to our workflow provider
            for processing.
          </li>
          <li>
            Document uploads may send extracted document text and related metadata to our
            workflow provider to support retrieval and generation features.
          </li>
          <li>
            Job import may fetch and analyze the job page content from the URL you provide,
            including use of automated retrieval and AI-based extraction tools.
          </li>
        </ul>
        <p>
          These workflows are used to operate product features that you directly request.
          AI-generated outputs can be incomplete or inaccurate, so you should review all
          generated material before using it in an application.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>We use third-party services to operate parts of Rezme, including:</p>
        <ul>
          <li>Authentication providers such as Google, GitHub, and LinkedIn for social sign-in.</li>
          <li>Stripe for subscription billing, payment processing, promotion codes, and customer portal access.</li>
          <li>Groq for AI-assisted parsing of submitted job listing content.</li>
          <li>n8n-based workflow infrastructure for resume generation, cover letter generation, and document processing.</li>
        </ul>
        <p>
          These providers may process data according to their own privacy terms. We
          encourage you to review their policies when deciding whether to use connected
          features.
        </p>
      </LegalSection>

      <LegalSection title="Cookies And Session Storage">
        <p>
          Rezme uses essential cookies and related session mechanisms to keep users
          signed in, secure authenticated routes, and maintain account access. These
          cookies are required for core product functionality and are not optional if you
          want to use logged-in areas of the service.
        </p>
      </LegalSection>

      <LegalSection title="How Long We Keep Data">
        <p>
          We retain information for as long as it is reasonably necessary to provide the
          service, maintain your account, enforce plan limits, resolve disputes, comply
          with legal obligations, and protect Rezme from abuse or fraud.
        </p>
        <p>
          Retention periods may vary depending on the type of data involved and whether
          you continue to use the service. If you want to request deletion or correction
          of your information, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use reasonable administrative, technical, and organizational measures to help
          protect personal information. No method of transmission or storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices">
        <ul>
          <li>You can choose what profile details, uploaded files, and instructions you provide.</li>
          <li>You can manage your subscription status through the billing tools made available in the app.</li>
          <li>You can contact us to request access, correction, or deletion of information we hold about you.</li>
          <li>You can stop using the service at any time, though some retained records may remain as described above.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Changes To This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes to the
          product, our providers, or legal requirements. When we do, we will update the
          effective date shown on this page.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For privacy questions, data requests, or general concerns about this policy,
          email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
