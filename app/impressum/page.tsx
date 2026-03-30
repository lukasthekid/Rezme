import type { Metadata } from "next";

import {
  LegalPageLayout,
  LegalSection,
} from "@/components/landing/LegalPageLayout";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Legal disclosure (Impressum) for Rezme in accordance with DDG §5.",
  alternates: { canonical: "https://rezme.ai/impressum" },
  robots: { index: false },
};

const CONTACT_EMAIL = "resumr.office@gmail.com";

export default function ImpressumPage() {
  return (
    <LegalPageLayout
      title="Impressum"
      description="Legal disclosure in accordance with §5 DDG (Digitale-Dienste-Gesetz)."
      lastUpdated="March 30, 2026"
      contactEmail={CONTACT_EMAIL}
    >
      <LegalSection title="Information According to §5 DDG">
        <p>
          {/* TODO: Replace with your real name */}
          <strong>Lukas Burtscher</strong>
          <br />
          {/* TODO: Replace with your real address */}
          Guardhausstraße 89
          <br />
          81375 München
          <br />
          Germany
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        {/* TODO: Optionally add a phone number — legally recommended but not
             strictly required for all cases. If you add one, use this format:
             <p>Phone: +49 123 456789</p>
        */}
      </LegalSection>

      <LegalSection title="Responsible for Content According to §18 Abs. 2 MStV">
        <p>
          {/* TODO: Replace with your real name */}
          <strong>Lukas Burtscher</strong>
          <br />
          Address as stated above
        </p>
      </LegalSection>

      <LegalSection title="EU Dispute Resolution">
        <p>
          The European Commission provides a platform for online dispute
          resolution (ODR):{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          We are not obligated and generally not willing to participate in
          dispute resolution proceedings before a consumer arbitration board.
        </p>
      </LegalSection>

      <LegalSection title="Liability for Content">
        <p>
          As a service provider, we are responsible for our own content on these
          pages in accordance with general legislation pursuant to §7 Abs. 1 DDG.
          According to §§8 to 10 DDG, however, we are not obligated as a service
          provider to monitor transmitted or stored third-party information or to
          investigate circumstances that indicate illegal activity.
        </p>
        <p>
          Obligations to remove or block the use of information under general
          legislation remain unaffected. However, liability in this regard is
          only possible from the time of knowledge of a specific infringement.
          Upon becoming aware of such violations, we will remove the content
          immediately.
        </p>
      </LegalSection>

      <LegalSection title="Liability for Links">
        <p>
          Our website may contain links to external third-party websites over
          whose content we have no influence. We therefore cannot assume any
          liability for this external content. The respective provider or
          operator of the linked pages is always responsible for the content of
          those pages. The linked pages were checked for possible legal
          violations at the time of linking. Illegal content was not identified
          at the time of linking.
        </p>
        <p>
          Permanent monitoring of the content of linked pages is not reasonable
          without concrete evidence of a violation of law. Upon becoming aware of
          legal violations, we will remove such links immediately.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
