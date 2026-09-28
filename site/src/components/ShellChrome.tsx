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
    sookoon: "The Narmada flows through this city — and through this page.",
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
    sookoon: "नर्मदा इस शहर में बहती है — और इस पृष्ठ में भी।",
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
    <div class="shell relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-10 pt-4 sm:px-6">
      <header class="top flex flex-wrap items-center justify-between gap-3">
        <a
          class="brand inline-flex items-center gap-2 font-display text-xl text-ink no-underline"
          href="/"
        >
          <span class="mark inline-flex text-river" aria-hidden="true">
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
        <div class="actions flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="ghost min-h-11 rounded-brand border border-river/35 bg-marble/55 px-3 py-2 text-ink backdrop-blur-sm"
            onClick={toggleGreeting}
          >
            {greetingOn ? t.greetingOff : t.greetingOn}
          </button>
          <button
            type="button"
            class="ghost min-h-11 rounded-brand border border-river/35 bg-marble/55 px-3 py-2 text-ink backdrop-blur-sm"
            onClick={toggleLang}
          >
            {t.lang}
          </button>
          <a
            class="support min-h-11 rounded-brand border border-diya bg-diya px-3 py-2 text-white no-underline"
            href="/support"
          >
            {t.support}
          </a>
        </div>
      </header>

      <main class="hero flex flex-1 flex-col justify-center py-12 sm:py-16">
        {greetingOn && (
          <p class="greeting mb-2 font-display text-lg text-river">
            <span lang="hi">{t.greetingHi}</span>
            <span class="sep"> · </span>
            <span>{t.greeting}</span>
          </p>
        )}
        <h1 class="mb-4 font-display text-[clamp(2.5rem,7vw,3.75rem)] leading-[1.05] text-river-deep">
          {t.brand}
        </h1>
        <p class="tagline mb-3 max-w-xl text-lg text-muted">{t.tagline}</p>
        <p class="sookoon max-w-md border-l-[3px] border-diya pl-3 text-[0.95rem] text-muted">
          {t.sookoon}
        </p>
      </main>

      <footer class="foot mt-auto border-t border-muted/25 pt-3 text-sm text-muted">
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
    </div>
  );
}
