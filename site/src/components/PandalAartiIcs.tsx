import { useChromeLang } from "./SiteNav";

type Props = {
  placeNameEn: string;
  placeNameHi: string;
  slug: string;
  /** Wall-clock times like "08:30", "20:00" (IST editorial). */
  aartiTimes: string[];
};

function nextOccurrence(hour: number, minute: number, from = new Date()): Date {
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

function stamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function buildIcs(opts: {
  title: string;
  description: string;
  hour: number;
  minute: number;
  slug: string;
}): string {
  const start = nextOccurrence(opts.hour, opts.minute);
  const end = new Date(start.getTime() + 30 * 60_000);
  const uid = `utsav-aarti-${opts.slug}-${stamp(start)}@jabalpurverse`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jabalpurverse//Utsav Aarti//EN",
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

/** ICS download for pandal aarti times (draft times labelled check locally). */
export function PandalAartiIcs({ placeNameEn, placeNameHi, slug, aartiTimes }: Props) {
  const lang = useChromeLang();
  const name = lang === "hi" ? placeNameHi : placeNameEn;

  function download(time: string) {
    const m = time.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return;
    const hour = Number(m[1]);
    const minute = Number(m[2]);
    const ics = buildIcs({
      title: `Aarti — ${placeNameEn}`,
      description: `Jabalpurverse Utsav · confirm locally · ${placeNameEn}`,
      hour,
      minute,
      slug: `${slug}-${hour}${minute}`,
    });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `utsav-aarti-${slug}-${hour}${minute}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!aartiTimes.length) return null;

  return (
    <div class="utsav-ics">
      <p class="utsav-ics__label">
        {lang === "hi" ? `${name} — कैलेंडर में जोड़ें` : `Add ${name} aarti to calendar`}
      </p>
      <div class="utsav-ics__actions">
        {aartiTimes.map((t) => (
          <button type="button" class="utsav-ics__btn" onClick={() => download(t)}>
            {t} ICS
          </button>
        ))}
      </div>
      <p class="utsav-ics__note">
        {lang === "hi"
          ? "ड्राफ़्ट समय — समिति से स्थानीय रूप से पुष्टि करें।"
          : "Draft times — confirm with the samiti locally."}
      </p>
    </div>
  );
}
