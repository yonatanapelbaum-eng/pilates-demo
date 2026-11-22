import { credits, footer, nav, studio, waLink } from "@/data/studio";
import { Carriages, InstagramIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  return (
    <footer data-hide-float className="bg-sand px-4 pb-24 pt-14 md:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-page">
        {/* The name returns at full width, built from the same capsule as everything else. */}
        <div aria-hidden="true" className="flex items-end justify-between gap-6">
          {/* A graphic, not text: the real name is set again below in full ink. */}
          <svg viewBox="0 0 540 250" className="h-auto w-[78%] sm:w-[62%] lg:w-[50%]">
            <text x="270" y="232" textAnchor="middle" fontSize="300" letterSpacing="-10" className="fill-blush font-display" style={{ fontWeight: 500 }}>
              ליה
            </text>
          </svg>
          <Carriages className="mb-[2vw] hidden flex-col sm:flex [&>span]:h-[1.6vw] [&>span]:w-[9vw] [&>span]:max-w-[150px] [&>span]:min-h-[10px]" />
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-display text-lead font-medium">{studio.name}</p>
            <p className="font-semibold">{studio.tagline}</p>
            <p className="mt-4">{studio.address}</p>
            <a href={studio.phoneHref} className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4 tabular">
              {studio.phoneDisplay}
            </a>
          </div>

          <nav aria-label="ניווט בתחתית העמוד" className="lg:col-span-3">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-[44px] items-center font-semibold hover:underline hover:underline-offset-4">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-start gap-3 lg:col-span-5 lg:justify-end">
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="אינסטגרם"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blush"
            >
              <InstagramIcon />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="וואטסאפ"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blush"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 text-small lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <ul className="flex flex-col">
            {credits.map((cr) => (
              <li key={cr.href}>
                <a href={cr.href} target="_blank" rel="noopener noreferrer" className="inline-block py-3 hover:underline hover:underline-offset-4 lg:py-1">
                  {cr.label}: <bdi dir="ltr">{cr.work}</bdi>
                </a>
              </li>
            ))}
          </ul>
          <p className="font-semibold">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
