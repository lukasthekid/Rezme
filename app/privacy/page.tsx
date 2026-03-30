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
      description="This Privacy Policy explains what information Rezme collects, how we use it to provide the service, and the choices you have. It also describes your rights under the EU General Data Protection Regulation (GDPR)."
      lastUpdated="March 30, 2026"
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

      <LegalSection title="Data Controller">
        <p>
          The controller responsible for the processing of your personal data on this
          website within the meaning of the General Data Protection Regulation (GDPR) is:
        </p>
        <p>
          {/* TODO: Replace with your real name and address */}
          <strong>Your Full Name</strong>
          <br />
          Street Address 123
          <br />
          12345 City
          <br />
          Germany
          <br />
          Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          See our <a href="/impressum">Impressum</a> for full legal disclosure.
        </p>
      </LegalSection>

      <LegalSection title="Data Hosting in the EU">
        <p>
          Your data is stored on servers located in <strong>Germany</strong> within
          the European Union. We have chosen a German hosting provider to ensure
          that your personal data remains subject to European data protection
          standards and does not leave the EU for primary storage purposes.
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

      <LegalSection title="Legal Basis for Processing (GDPR Art. 6)">
        <p>
          We process your personal data on the following legal grounds under the
          General Data Protection Regulation:
        </p>
        <ul>
          <li>
            <strong>Contract performance (Art. 6(1)(b) GDPR):</strong> Processing
            of account data, profile information, resume and document data, job-search
            data, and AI-generated outputs is necessary to provide you with the
            services you signed up for.
          </li>
          <li>
            <strong>Legitimate interest (Art. 6(1)(f) GDPR):</strong> Essential
            cookies and session data are processed based on our legitimate interest
            in maintaining a secure, functional service. This includes authentication
            session tokens required to keep you signed in.
          </li>
          <li>
            <strong>Contract performance and legal obligation (Art. 6(1)(b) and
            Art. 6(1)(c) GDPR):</strong> Billing data processed through Stripe is
            necessary both to fulfill your subscription contract and to comply with
            tax and accounting obligations.
          </li>
          <li>
            <strong>Consent (Art. 6(1)(a) GDPR):</strong> Where we use optional
            cookies (such as analytics), we will only do so after obtaining your
            explicit consent via the cookie consent banner. You may withdraw consent
            at any time through the cookie preferences.
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

      <LegalSection title="AI Features and External Processing">
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

      <LegalSection title="International Data Transfers">
        <p>
          Your primary data is stored on servers in Germany within the European Union.
          However, some of the third-party services we use to operate Rezme are based
          outside the EU/EEA:
        </p>
        <ul>
          <li>
            <strong>Google, GitHub, and LinkedIn</strong> (authentication providers)
            may process data in the United States.
          </li>
          <li>
            <strong>Stripe</strong> (payment processing) processes billing data in the
            United States and other countries.
          </li>
          <li>
            <strong>Groq</strong> (AI processing) may process data in the United States.
          </li>
        </ul>
        <p>
          Where personal data is transferred outside the EU/EEA, we rely on appropriate
          safeguards such as the EU Standard Contractual Clauses (SCCs), adequacy
          decisions by the European Commission (including the EU-U.S. Data Privacy
          Framework where applicable), or the provider&apos;s binding corporate rules to
          ensure an adequate level of data protection.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and Session Storage">
        <p>
          Rezme uses essential cookies and related session mechanisms to keep users
          signed in, secure authenticated routes, and maintain account access. These
          cookies are required for core product functionality and are not optional if you
          want to use logged-in areas of the service.
        </p>
        <p>
          If we introduce optional cookies in the future (such as analytics cookies),
          they will only be set after you give explicit consent through our cookie
          consent banner. You can manage your cookie preferences at any time by clicking
          the &quot;Manage preferences&quot; option in the cookie banner.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights Under GDPR (Art. 15–22)">
        <p>
          As a data subject under the General Data Protection Regulation, you have the
          following rights regarding your personal data:
        </p>
        <ul>
          <li>
            <strong>Right of access (Art. 15):</strong> You have the right to request
            confirmation of whether we process your personal data and to obtain a copy
            of that data.
          </li>
          <li>
            <strong>Right to rectification (Art. 16):</strong> You have the right to
            request correction of inaccurate personal data or completion of incomplete
            data.
          </li>
          <li>
            <strong>Right to erasure (Art. 17):</strong> You have the right to request
            deletion of your personal data, subject to legal retention obligations.
          </li>
          <li>
            <strong>Right to restriction (Art. 18):</strong> You have the right to
            request restriction of processing under certain circumstances.
          </li>
          <li>
            <strong>Right to data portability (Art. 20):</strong> You have the right to
            receive your personal data in a structured, commonly used, machine-readable
            format and to transmit it to another controller.
          </li>
          <li>
            <strong>Right to object (Art. 21):</strong> You have the right to object to
            processing based on legitimate interest at any time. We will then stop
            processing unless we can demonstrate compelling legitimate grounds.
          </li>
          <li>
            <strong>Right to withdraw consent (Art. 7(3)):</strong> Where processing is
            based on consent (e.g., optional cookies), you may withdraw your consent at
            any time. Withdrawal does not affect the lawfulness of processing carried
            out before the withdrawal.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond
          to your request within one month as required by GDPR.
        </p>
      </LegalSection>

      <LegalSection title="Right to Complain to a Supervisory Authority">
        <p>
          If you believe that the processing of your personal data infringes the GDPR,
          you have the right to lodge a complaint with a data protection supervisory
          authority, in particular in the EU member state of your habitual residence,
          your place of work, or the place of the alleged infringement.
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

      <LegalSection title="Changes to This Policy">
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
