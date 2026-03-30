import type { Metadata } from "next";

import {
  LegalPageLayout,
  LegalSection,
} from "@/components/landing/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms that govern your use of Rezme, including subscriptions, acceptable use, user content, and AI-generated output.",
  alternates: { canonical: "https://rezme.ai/terms" },
};

const CONTACT_EMAIL = "resumr.office@gmail.com";

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These Terms of Service govern your use of Rezme and explain the rules, responsibilities, and limitations that apply when you use our resume and job application tools."
      lastUpdated="March 27, 2026"
      contactEmail={CONTACT_EMAIL}
    >
      <LegalSection title="Acceptance Of Terms">
        <p>
          By accessing or using Rezme, you agree to these Terms of Service. If you do
          not agree, do not use the service.
        </p>
      </LegalSection>

      <LegalSection title="The Service">
        <p>
          Rezme provides tools to help users tailor resumes, generate cover letters,
          upload supporting documents, import job postings from user-submitted URLs, and
          manage job application activity.
        </p>
        <p>
          We may update, improve, suspend, or discontinue parts of the service at any
          time, with or without notice.
        </p>
      </LegalSection>

      <LegalSection title="Accounts And Access">
        <ul>
          <li>You are responsible for maintaining access to the email address or connected social login used for your account.</li>
          <li>You are responsible for activity that occurs under your account.</li>
          <li>You must provide accurate information when using the service and keep your profile details reasonably up to date.</li>
          <li>We may restrict or suspend access if we believe your account is being used in violation of these terms or in a way that harms the service.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Acceptable Use">
        <p>You agree not to use Rezme to:</p>
        <ul>
          <li>Upload, submit, or generate unlawful, infringing, fraudulent, abusive, or misleading content.</li>
          <li>Attempt to interfere with, disrupt, probe, or gain unauthorized access to the service or related infrastructure.</li>
          <li>Use imported job URLs, document uploads, or generated outputs in violation of third-party rights or applicable law.</li>
          <li>Abuse automation or submit content that you do not have the right to process through the service.</li>
          <li>Use the service in a way that could damage the availability, integrity, or security of Rezme.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Your Content">
        <p>
          You retain ownership of the information and materials you submit to Rezme,
          including profile information, uploaded documents, notes, job data you provide,
          and content you generate using the service.
        </p>
        <p>
          You grant Rezme a limited license to host, store, transmit, reproduce, and
          process that content as needed to operate the service, including document
          processing, resume generation, cover letter generation, job import, security,
          and support.
        </p>
        <p>
          You represent that you have the right to submit and process any content you
          provide through Rezme.
        </p>
      </LegalSection>

      <LegalSection title="AI-Generated Output">
        <p>
          Rezme includes AI-assisted features that generate or transform content based on
          your inputs, uploaded materials, and job descriptions. AI outputs may contain
          inaccuracies, omissions, formatting issues, or content that is not suitable for
          your intended use without review.
        </p>
        <p>
          You are solely responsible for reviewing, editing, and deciding whether to use
          any generated output before sending it to employers or third parties.
        </p>
      </LegalSection>

      <LegalSection title="Billing, Plans, And Subscriptions">
        <ul>
          <li>Rezme may offer both free and paid subscription tiers, with feature and usage differences between plans.</li>
          <li>Paid subscriptions are processed through Stripe, including checkout, billing, and subscription management.</li>
          <li>Promotional codes or discounted pricing may be offered from time to time under separate eligibility conditions.</li>
          <li>If you purchase a paid plan, you authorize applicable recurring charges until you cancel.</li>
          <li>You are responsible for reviewing current pricing and billing details presented at checkout.</li>
          <li>You can cancel your subscription through the billing management tools made available by Rezme or Stripe.</li>
        </ul>
        <p>
          Except where required by law, fees are non-refundable once charged, and access
          to paid features may change at the end of the current billing period after
          cancellation.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>
          Rezme relies on third-party providers for authentication, billing, AI-assisted
          parsing, and workflow processing. Your use of connected features may also involve
          third-party websites, such as job boards or sign-in providers.
        </p>
        <p>
          We are not responsible for third-party products, websites, or policies. You are
          responsible for complying with any terms that apply to those services.
        </p>
      </LegalSection>

      <LegalSection title="Termination">
        <p>
          You may stop using Rezme at any time. We may suspend or terminate your access
          if we reasonably believe you violated these terms, created risk for other users,
          or exposed Rezme to legal or security issues.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>
          Rezme is provided on an &quot;as is&quot; and &quot;as available&quot; basis, to the
          fullest extent permitted by law. We do not guarantee that the service will be
          uninterrupted, error-free, secure, or suitable for every hiring scenario.
        </p>
        <p>
          We do not guarantee job interviews, offers, employment outcomes, or the accuracy
          of imported or generated content.
        </p>
      </LegalSection>

      <LegalSection title="Limitation Of Liability">
        <p>
          To the fullest extent permitted by law, Rezme and its operators will not be
          liable for indirect, incidental, special, consequential, exemplary, or punitive
          damages, or for loss of profits, revenue, data, business opportunity, or
          goodwill arising from or related to your use of the service.
        </p>
      </LegalSection>

      <LegalSection title="Changes To These Terms">
        <p>
          We may revise these Terms of Service from time to time. When we do, we will post
          the updated version here and revise the effective date on this page. Continued
          use of the service after updated terms become effective means you accept the
          revised terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For questions about these terms, contact{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
