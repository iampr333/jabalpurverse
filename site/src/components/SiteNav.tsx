import { useEffect, useState } from "preact/hooks";

export type Lang = "en" | "hi";
export type NavCurrent = "home" | "narmada" | "support";

const copy = {
  en: {
    brand: "Jabalpurverse",
    home: "Home",
    narmada: "Narmada",
    support: "Support",
    lang: "हिंदी",
    greetingOff: "Hide greeting",
    greetingOn: "Show greeting",
  },
  hi: {
    brand: "जबलपुरवर्स",
    home: "होम",
    narmada: "नर्मदा",
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

function applyChrome(lang: Lang, greetingOn: boolean) {
  document.documentElement.lang = lang === "hi" ? "hi" : "en";
  document.documentElement.dataset.jvLang = lang;
  // Prefer/root flag — keep distinct from content markers `[data-jv-greeting]`.
  document.documentElement.dataset.jvGreetingPref = greetingOn ? "on" : "off";
  document.dispatchEvent(
    new CustomEvent("jv:chrome", { detail: { lang, greetingOn } }),
  );
}

type Props = {
  /** Transparent hero chrome vs marble page chrome. */
  variant?: "hero" | "page";
  current?: NavCurrent;
};

/** Shared bilingual chrome: brand, Home · Narmada · Support, lang + greeting. */
export function SiteNav({ variant = "page", current }: Props) {
  const [lang, setLang] = useState<Lang>("en");
  const [greetingOn, setGreetingOn] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("jv-lang") as Lang | null;
    const storedGreet = localStorage.getItem("jv-greeting");
    const nextLang = storedLang === "hi" || storedLang === "en" ? storedLang : detectLang();
    const nextGreet = storedGreet !== "off";
    setLang(nextLang);
    setGreetingOn(nextGreet);
    applyChrome(nextLang, nextGreet);
    setReady(true);
  }, []);

  const t = copy[lang];
  const root = variant === "hero" ? "hero-bleed" : "site-chrome";

  function toggleLang() {
    const next = lang === "en" ? "hi" : "en";
    setLang(next);
    localStorage.setItem("jv-lang", next);
    applyChrome(next, greetingOn);
  }

  function toggleGreeting() {
    const next = !greetingOn;
    setGreetingOn(next);
    localStorage.setItem("jv-greeting", next ? "on" : "off");
    applyChrome(lang, next);
  }

  return (
    <header class={`${root}__top`} data-ready={ready ? "true" : "false"}>
      <a class={`${root}__brand`} href="/">
        <span class={`${root}__mark`} aria-hidden="true">
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
      <nav class={`${root}__nav`} aria-label="Site">
        <a
          class={`${root}__link`}
          href="/"
          aria-current={current === "home" ? "page" : undefined}
        >
          {t.home}
        </a>
        <a
          class={`${root}__link`}
          href="/narmada"
          aria-current={current === "narmada" ? "page" : undefined}
        >
          {t.narmada}
        </a>
        <a
          class={`${root}__support`}
          href="/support"
          aria-current={current === "support" ? "page" : undefined}
        >
          {t.support}
        </a>
        <button type="button" class={`${root}__link`} onClick={toggleGreeting}>
          {greetingOn ? t.greetingOff : t.greetingOn}
        </button>
        <button type="button" class={`${root}__link`} onClick={toggleLang}>
          {t.lang}
        </button>
      </nav>
    </header>
  );
}

export function useChromeLang(): Lang {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const stored = localStorage.getItem("jv-lang") as Lang | null;
    setLang(stored === "hi" || stored === "en" ? stored : detectLang());
    const onChrome = (e: Event) => {
      const detail = (e as CustomEvent).detail as { lang: Lang };
      if (detail?.lang) setLang(detail.lang);
    };
    document.addEventListener("jv:chrome", onChrome);
    return () => document.removeEventListener("jv:chrome", onChrome);
  }, []);
  return lang;
}
