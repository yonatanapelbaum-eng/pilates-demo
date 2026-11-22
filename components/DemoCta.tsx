import { demo, waLink } from "@/data/studio";
import { WhatsAppIcon } from "./Icons";

/** "This is a sample site": the pitch to studio owners, just before the footer. */
export default function DemoCta() {
  return (
    <section id="demo" data-hide-float aria-labelledby="demo-title" className="bg-ink px-4 py-14 text-cream md:px-8 lg:py-24">
      <div className="mx-auto max-w-page lg:flex lg:items-end lg:justify-between lg:gap-16">
        <div>
          <h2 id="demo-title" data-reveal className="text-title">
            {demo.title}
          </h2>
          <p data-reveal className="mt-4 max-w-[46ch] text-body lg:text-lead">
            {demo.text}
          </p>
        </div>
        <a
          data-reveal
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-8 min-h-[60px] w-full shrink-0 px-6 py-3 text-center leading-snug lg:mt-0 lg:w-auto lg:px-8"
        >
          <WhatsAppIcon className="h-7 w-7" />
          {demo.button}
        </a>
      </div>
    </section>
  );
}
