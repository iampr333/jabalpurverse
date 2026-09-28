import { useEffect, useMemo, useState } from "preact/hooks";
import { useChromeLang } from "./SiteNav";

type Props = {
  placeNameEn: string;
  placeNameHi: string;
  placeSlug: string;
  timeText: string;
  checkedAt: string;
  needsLocalCheck: boolean;
  hour?: number | null;
  minute?: number | null;
  /** Optional trailing link (e.g. ghat page) rendered in the actions row. */
  ghatHref?: string;
  /** Light text over full-bleed photo chapters. */
  tone?: "default" | "on-photo";
};

function nextAartiDate(hour: number, minute: number, from = new Date()): Date {
  const istOffsetMin = 5 * 60 + 30;
  const utc = from.getTime() + from.getTimezoneOffset() * 60_000;
  const istNow = new Date(utc + istOffsetMin * 60_000);
  const target = new Date(istNow);
  target.setHours(hour, minute, 0, 0);
  if (target.getTime() <= istNow.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  const asUtc = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
    target.getHours() - 5,
    target.getMinutes() - 30,
    0,
    0,
  );
  return new Date(asUtc);
}

function remainParts(ms: number): { h: number; m: number; s: number } | null {
  if (ms <= 0) return null;
  const totalSec = Math.floor(ms / 1000);
  return {
    h: Math.floor(totalSec / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

function buildIcs(opts: {
  title: string;
  description: string;
  hour: number;
  minute: number;
  slug: string;
}): string {
  const start = nextAartiDate(opts.hour, opts.minute);
  const end = new Date(start.getTime() + 30 * 60_000);
  const stamp = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");
  const uid = `aarti-${opts.slug}-${stamp(start)}@jabalpurverse`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jabalpurverse//Narmada Aarti//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${opts.description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Countdown + ICS for Aaj ki Aarti. Soft times stay labelled “check locally”. */
export function AartiCard({
  placeNameEn,
  placeNameHi,
  placeSlug,
  timeText,
  checkedAt,
  needsLocalCheck,
  hour = null,
  minute = null,
  ghatHref,
  tone = "default",
}: Props) {
  const lang = useChromeLang();
  const canCountdown = hour != null && minute != null;
  const [parts, setParts] = useState<{ h: number; m: number; s: number } | null>(null);
  const [now, setNow] = useState(false);

  useEffect(() => {
    if (!canCountdown) return;
    const tick = () => {
      const target = nextAartiDate(hour!, minute!);
      const rem = target.getTime() - Date.now();
      const next = remainParts(rem);
      setParts(next);
      setNow(rem <= 0);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [canCountdown, hour, minute]);

  const labels = useMemo(
    () =>
      lang === "hi"
        ? {
            title: "आज की आरती",
            time: "समय",
            check: "स्थानीय रूप से पुष्टि करें — आधिकारिक स्रोत लंबित",
            countdown: "शेष समय (अनुमान)",
            now: "आरती का समय",
            calendar: "कैलेंडर में जोड़ें",
            draft: "ड्राफ़्ट",
            checked: "जाँचा",
            ghat: "घाट पृष्ठ",
            h: "घं",
            m: "मि",
            s: "से",
          }
        : {
            title: "Aaj ki Aarti",
            time: "Time",
            check: "Check locally — official source pending",
            countdown: "Until aarti (estimate)",
            now: "Aarti time",
            calendar: "Add to calendar",
            draft: "Draft",
            checked: "Checked",
            ghat: "Ghat page",
            h: "h",
            m: "m",
            s: "s",
          },
    [lang],
  );

  const placeLabel = lang === "hi" ? placeNameHi : placeNameEn;

  function downloadIcs() {
    if (!canCountdown) return;
    const ics = buildIcs({
      title: `Narmada Maha Aarti · ${placeNameEn}`,
      description: `${timeText}. Confirm locally before travelling. Checked ${checkedAt}.`,
      hour: hour!,
      minute: minute!,
      slug: placeSlug,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `narmada-aarti-${placeSlug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <article class={`aarti${tone === "on-photo" ? " aarti--on-photo" : ""}`}>
      <header class="aarti__head">
        <div class="aarti__titles">
          <h2 class="aarti__title">{labels.title}</h2>
          <p class="aarti__place">{placeLabel}</p>
        </div>
        {needsLocalCheck && <p class="aarti__badge">{labels.draft}</p>}
      </header>

      {canCountdown && (
        <div class="aarti__countdown" aria-live="polite">
          <p class="aarti__countdown-label">{now ? labels.now : labels.countdown}</p>
          {!now && parts && (
            <p class="aarti__clock">
              <span class="aarti__unit">
                <strong>{parts.h}</strong>
                <span>{labels.h}</span>
              </span>
              <span class="aarti__unit">
                <strong>{parts.m}</strong>
                <span>{labels.m}</span>
              </span>
              <span class="aarti__unit">
                <strong>{String(parts.s).padStart(2, "0")}</strong>
                <span>{labels.s}</span>
              </span>
            </p>
          )}
        </div>
      )}

      <p class="aarti__time">
        <span class="aarti__time-label">{labels.time}</span>
        <span class="aarti__time-text">{timeText}</span>
      </p>

      {needsLocalCheck && <p class="aarti__check">{labels.check}</p>}

      <div class="aarti__actions">
        {canCountdown && (
          <button type="button" class="aarti__ics" onClick={downloadIcs}>
            {labels.calendar}
          </button>
        )}
        {ghatHref && (
          <a class="aarti__ghat" href={ghatHref}>
            {labels.ghat}
            <span aria-hidden="true"> →</span>
          </a>
        )}
      </div>

      <p class="aarti__meta">
        {labels.checked} {checkedAt}
      </p>
    </article>
  );
}
