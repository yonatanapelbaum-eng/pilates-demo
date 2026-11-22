import { testimonialsSection } from "@/data/studio";
import { Stars } from "./Icons";

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-14 lg:py-24">
      <div className="mx-auto max-w-page px-4 md:px-8">
        <h2 id="testimonials-title" data-reveal className="text-title">
          {testimonialsSection.title}
        </h2>
      </div>

      {/* Phone: a thumb-scrolled row that snaps; desktop: three quotations stepping down the page. */}
      <ul
        data-reveal
        className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:px-8 lg:mx-auto lg:mt-12 lg:grid lg:max-w-page lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        aria-label="המלצות של מתאמנות"
      >
        {testimonialsSection.items.map((t, i) => (
          <li
            key={t.name}
            className={`w-[84%] shrink-0 snap-center rounded-panel bg-sand p-7 sm:w-[60%] lg:w-auto lg:p-10 ${
              i === 1 ? "lg:mt-16" : i === 2 ? "lg:mt-32" : ""
            }`}
          >
            <figure className="flex h-full flex-col">
              <blockquote className="flex-1 text-lead">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <span className="font-bold">
                  {t.name}, {t.city}
                </span>
                <Stars />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
