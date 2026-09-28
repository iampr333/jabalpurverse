import { useEffect, useState } from "preact/hooks";

type Lang = "en" | "hi";

const copy = {
  en: {
    brand: "Jabalpurverse",
    greeting: "Narmade Har",
    greetingHi: "नर्मदे हर",
    tagline: "Explore Jabalpur. Discover its stories. Experience it differently.",
    support: "Support",
    lang: "हिंदी",
    greetingOff: "Hide greeting",
    greetingOn: "Show greeting",
    phase: "Foundation (P0) — shell only. Explore and Utsav come next.",
  },
  hi: {
    brand: "जबलपुरवर्स",
    greeting: "Narmade Har",
    greetingHi: "नर्मदे हर",
    tagline: "जबलपुर खोजें। इसकी कहानियाँ जानें। अलग अंदाज़ में जिएँ।",
    support: "सहयोग",
    lang: "English",
    greetingOff: "अभिवादन छिपाएँ",
    greetingOn: "अभिवादन दिखाएँ",
    phase: "आधार (P0) — केवल शेल। एक्सप्लोर और उत्सव आगे आएँगे।",
  },
} as const;

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  return navigator.language.toLowerCase().startsWith("hi") ? "hi" : "en";
}

export function ShellChrome() {
  const [lang, setLang] = useState<Lang>("en");
  const [greetingOn, setGreetingOn] = useState(true);

  useEffect(() => {
    const storedLang = localStorage.getItem("jv-lang") as Lang | null;
    const storedGreet = localStorage.getItem("jv-greeting");
    setLang(storedLang === "hi" || storedLang === "en" ? storedLang : detectLang());
    setGreetingOn(storedGreet !== "off");
  }, []);

  const t = copy[lang];

  function toggleLang() {
    const next = lang === "en" ? "hi" : "en";
    setLang(next);
    localStorage.setItem("jv-lang", next);
    document.documentElement.lang = next === "hi" ? "hi" : "en";
  }

  function toggleGreeting() {
    const next = !greetingOn;
    setGreetingOn(next);
    localStorage.setItem("jv-greeting", next ? "on" : "off");
  }

  return (
    <div class="shell">
      <header class="top">
        <a class="brand" href="/">
          <span class="mark" aria-hidden="true">
            <svg viewBox="0 0 64 24" width="64" height="24">
              <path
                d="M2 14 C18 2, 46 2, 62 14"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              />
            </svg>
          </span>
          {t.brand}
        </a>
        <div class="actions">
          <button type="button" class="ghost" onClick={toggleGreeting}>
            {greetingOn ? t.greetingOff : t.greetingOn}
          </button>
          <button type="button" class="ghost" onClick={toggleLang}>
            {t.lang}
          </button>
          <a class="support" href="/support">
            {t.support}
          </a>
        </div>
      </header>

      <main class="hero">
        {greetingOn && (
          <p class="greeting">
            <span lang="hi">{t.greetingHi}</span>
            <span class="sep"> · </span>
            <span>{t.greeting}</span>
          </p>
        )}
        <h1>{t.brand}</h1>
        <p class="tagline">{t.tagline}</p>
        <p class="phase">{t.phase}</p>
      </main>

      <footer class="foot">
        <p>
          {greetingOn ? (
            <>
              <span lang="hi">नर्मदे हर</span> · Jabalpur · Madhya Pradesh
            </>
          ) : (
            <>Jabalpur · Madhya Pradesh</>
          )}
        </p>
      </footer>

      <style>{`
        .shell {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          max-width: var(--max);
          margin: 0 auto;
          padding: var(--space-3) var(--space-4) var(--space-5);
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--text);
          text-decoration: none;
          font-size: 1.35rem;
        }
        .mark { color: var(--river); display: inline-flex; }
        .actions {
          display: flex;
          gap: var(--space-2);
          align-items: center;
          flex-wrap: wrap;
        }
        .ghost, .support {
          font: inherit;
          border: 1px solid color-mix(in srgb, var(--river) 35%, transparent);
          background: transparent;
          color: var(--text);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius);
          cursor: pointer;
          text-decoration: none;
        }
        .support {
          background: var(--diya);
          border-color: var(--diya);
          color: #fff;
        }
        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--space-5) 0;
          max-width: 36rem;
        }
        .greeting {
          color: var(--river);
          font-family: var(--font-display);
          font-size: 1.15rem;
          margin: 0 0 var(--space-2);
        }
        h1 {
          font-size: clamp(2.4rem, 6vw, 3.6rem);
          line-height: 1.05;
          margin: 0 0 var(--space-3);
          color: var(--river-deep);
        }
        @media (prefers-color-scheme: dark) {
          h1 { color: var(--river-soft); filter: brightness(1.8); }
        }
        .tagline {
          font-size: 1.15rem;
          margin: 0 0 var(--space-3);
          color: var(--muted);
        }
        .phase {
          margin: 0;
          font-size: 0.95rem;
          color: var(--muted);
          border-left: 3px solid var(--diya);
          padding-left: var(--space-3);
        }
        .foot {
          border-top: 1px solid color-mix(in srgb, var(--muted) 25%, transparent);
          padding-top: var(--space-3);
          color: var(--muted);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
