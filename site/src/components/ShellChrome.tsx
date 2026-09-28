import { useEffect, useState } from "preact/hooks";

type Lang = "en" | "hi";

const copy = {
  en: {
    brand: "Jabalpurverse",
    greeting: "Narmade Har",
    greetingHi: "नर्मदे हर",
    tagline: "Explore Jabalpur. Discover its stories. Experience it differently.",
    placeHi: "नर्मदा",
    placeEn: "Narmada",
    support: "Support",
    lang: "हिंदी",
    greetingOff: "Hide greeting",
    greetingOn: "Show greeting",
  },
  hi: {
    brand: "जबलपुरवर्स",
    greeting: "Narmade Har",
    greetingHi: "नर्मदे हर",
    tagline: "जबलपुर खोजें। इसकी कहानियाँ जानें। अलग अंदाज़ में जिएँ।",
    placeHi: "नर्मदा",
    placeEn: "Narmada",
    support: "सहयोग",
    lang: "English",
    greetingOff: "अभिवादन छिपाएँ",
    greetingOn: "अभिवादन दिखाएँ",
  },
} as const;

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  return navigator.language.toLowerCase().startsWith("hi") ? "hi" : "en";
}

/** Full-bleed Narmada hero + transparent text nav. */
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
    <section class="hero-bleed">
      <div class="hero-bleed__media" aria-hidden="true">
        <img
          class="hero-bleed__photo"
          src="/images/atmosphere/gwarighat-sunrise.jpg"
          alt=""
          width="1600"
          height="1067"
          decoding="async"
          fetchpriority="high"
        />
        <div class="hero-bleed__veil" />
        <svg
          class="hero-bleed__current"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            class="hero-bleed__flow hero-bleed__flow--a"
            fill="none"
            stroke="#ffffff"
            stroke-opacity="0.22"
            stroke-width="1.2"
            stroke-linecap="round"
          >
            <path d="M-200 620 C 80 580, 280 660, 560 620 S 1040 560, 1320 610 S 1680 660, 1800 620" />
            <path d="M-200 660 C 120 620, 320 700, 600 660 S 1080 600, 1360 650 S 1720 700, 1800 660" />
          </g>
          <g
            class="hero-bleed__flow hero-bleed__flow--b"
            fill="none"
            stroke="#d5ecec"
            stroke-opacity="0.14"
            stroke-width="1.6"
            stroke-linecap="round"
          >
            <path d="M-240 700 C 40 660, 300 740, 580 700 S 1060 640, 1340 690 S 1700 740, 1840 700" />
          </g>
        </svg>
        <div class="hero-bleed__dawn" />
      </div>

      <div class="hero-bleed__frame">
        <header class="hero-bleed__top">
          <a class="hero-bleed__brand" href="/">
            <span class="hero-bleed__mark" aria-hidden="true">
              <svg viewBox="0 0 64 24" width="56" height="21">
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
          <nav class="hero-bleed__nav" aria-label="Site">
            <button type="button" class="hero-bleed__link" onClick={toggleGreeting}>
              {greetingOn ? t.greetingOff : t.greetingOn}
            </button>
            <button type="button" class="hero-bleed__link" onClick={toggleLang}>
              {t.lang}
            </button>
            <a class="hero-bleed__support" href="/support">
              {t.support}
            </a>
          </nav>
        </header>

        <main class="hero-bleed__copy">
          {greetingOn && (
            <p class="hero-bleed__greeting">
              <span lang="hi">{t.greetingHi}</span>
              <span aria-hidden="true"> · </span>
              <span>{t.greeting}</span>
            </p>
          )}
          <h1 class="hero-bleed__title">{t.brand}</h1>
          <p class="hero-bleed__tagline">{t.tagline}</p>
          <p class="hero-bleed__place">
            <span lang="hi">{t.placeHi}</span>
            <span aria-hidden="true"> · </span>
            <span>{t.placeEn}</span>
          </p>
        </main>
      </div>
    </section>
  );
}
