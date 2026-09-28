import { SiteNav } from "./SiteNav";

const copy = {
  en: {
    brand: "Jabalpurverse",
    greeting: "Narmade Har",
    greetingHi: "नर्मदे हर",
    tagline: "Explore Jabalpur. Discover its stories. Experience it differently.",
    placeHi: "नर्मदा",
    placeEn: "Narmada",
  },
  hi: {
    brand: "जबलपुरवर्स",
    greeting: "Narmade Har",
    greetingHi: "नर्मदे हर",
    tagline: "जबलपुर खोजें। इसकी कहानियाँ जानें। अलग अंदाज़ में जिएँ।",
    placeHi: "नर्मदा",
    placeEn: "Narmada",
  },
} as const;

/** Full-bleed Narmada hero + shared site nav. */
export function ShellChrome() {
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
        <SiteNav variant="hero" current="home" />

        <main class="hero-bleed__copy">
          <p class="hero-bleed__greeting" data-jv-greeting>
            <span lang="hi">{copy.hi.greetingHi}</span>
            <span aria-hidden="true"> · </span>
            <span>{copy.en.greeting}</span>
          </p>
          <h1 class="hero-bleed__title">
            <span data-en>{copy.en.brand}</span>
            <span data-hi>{copy.hi.brand}</span>
          </h1>
          <p class="hero-bleed__tagline">
            <span data-en>{copy.en.tagline}</span>
            <span data-hi>{copy.hi.tagline}</span>
          </p>
          <p class="hero-bleed__place">
            <span lang="hi">{copy.hi.placeHi}</span>
            <span aria-hidden="true"> · </span>
            <span>{copy.en.placeEn}</span>
          </p>
        </main>
      </div>
    </section>
  );
}
