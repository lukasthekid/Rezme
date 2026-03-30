"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      mode: "opt-in",
      revision: 0,

      cookie: {
        name: "cc_cookie",
        expiresAfterDays: 182,
      },

      guiOptions: {
        consentModal: {
          layout: "cloud inline",
          position: "bottom center",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
            ],
          },
        },
      },

      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We value your privacy",
              description:
                "We use essential cookies to keep you signed in and ensure the app works correctly. With your permission, we may also use analytics cookies to improve the experience. You can manage your preferences at any time.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
              footer: `<a href="/impressum">Impressum</a><a href="/privacy">Privacy Policy</a>`,
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Your privacy choices",
                  description:
                    "You can choose which cookies you allow. Essential cookies cannot be disabled as they are required for the app to function. You can change your preferences at any time.",
                },
                {
                  title: "Essential cookies",
                  description:
                    "These cookies are required for authentication, session management, and core app functionality. They cannot be disabled.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      domain: "Domain",
                      desc: "Description",
                    },
                    body: [
                      {
                        name: "better-auth.session_token",
                        domain: location.hostname,
                        desc: "Keeps you signed in to your account.",
                      },
                      {
                        name: "cc_cookie",
                        domain: location.hostname,
                        desc: "Stores your cookie consent preferences.",
                      },
                    ],
                  },
                },
                {
                  title: "Analytics cookies",
                  description:
                    "These cookies help us understand how visitors interact with the app so we can improve the experience. All data is anonymized.",
                  linkedCategory: "analytics",
                },
                {
                  title: "More information",
                  description:
                    'For questions about our cookie policy, please <a href="mailto:resumr.office@gmail.com">contact us</a> or read our <a href="/privacy">Privacy Policy</a>.',
                },
              ],
            },
          },
          de: {
            consentModal: {
              title: "Wir respektieren Ihre Privatsph\u00e4re",
              description:
                "Wir verwenden essenzielle Cookies, um Sie angemeldet zu halten und die App funktionsf\u00e4hig zu machen. Mit Ihrer Zustimmung setzen wir ggf. auch Analyse-Cookies ein, um das Nutzungserlebnis zu verbessern. Sie k\u00f6nnen Ihre Einstellungen jederzeit anpassen.",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              showPreferencesBtn: "Einstellungen verwalten",
              footer: `<a href="/impressum">Impressum</a><a href="/privacy">Datenschutz</a>`,
            },
            preferencesModal: {
              title: "Cookie-Einstellungen",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              savePreferencesBtn: "Einstellungen speichern",
              closeIconLabel: "Schlie\u00dfen",
              sections: [
                {
                  title: "Ihre Datenschutzoptionen",
                  description:
                    "Sie k\u00f6nnen w\u00e4hlen, welche Cookies Sie zulassen. Essenzielle Cookies k\u00f6nnen nicht deaktiviert werden, da sie f\u00fcr den Betrieb der App erforderlich sind.",
                },
                {
                  title: "Essenzielle Cookies",
                  description:
                    "Diese Cookies sind f\u00fcr Authentifizierung, Sitzungsverwaltung und die Kernfunktionalit\u00e4t der App erforderlich. Sie k\u00f6nnen nicht deaktiviert werden.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      domain: "Domain",
                      desc: "Beschreibung",
                    },
                    body: [
                      {
                        name: "better-auth.session_token",
                        domain: location.hostname,
                        desc: "H\u00e4lt Sie in Ihrem Konto angemeldet.",
                      },
                      {
                        name: "cc_cookie",
                        domain: location.hostname,
                        desc: "Speichert Ihre Cookie-Einstellungen.",
                      },
                    ],
                  },
                },
                {
                  title: "Analyse-Cookies",
                  description:
                    "Diese Cookies helfen uns zu verstehen, wie Besucher die App nutzen, damit wir das Erlebnis verbessern k\u00f6nnen. Alle Daten sind anonymisiert.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Weitere Informationen",
                  description:
                    'Bei Fragen zu unserer Cookie-Richtlinie <a href="mailto:resumr.office@gmail.com">kontaktieren Sie uns</a> oder lesen Sie unsere <a href="/privacy">Datenschutzerkl\u00e4rung</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}
