import Image from "next/image";
import { classTypes, classesSection, images } from "@/data/studio";

export default function Classes() {
  return (
    <section id="classes" aria-labelledby="classes-title" className="bg-sand py-14 lg:py-24">
      <div className="mx-auto max-w-page px-4 md:px-8">
        <h2 id="classes-title" data-reveal className="text-title">
          {classesSection.title}
        </h2>
      </div>

      {/* Phone: one card at ~85% width with the next one peeking; tablet 2 columns; desktop 4. */}
      <ul
        data-reveal
        aria-label="סוגי השיעורים"
        className="mx-auto mt-8 flex max-w-page snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:overflow-visible md:px-8 lg:mt-12 lg:grid-cols-4 lg:gap-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {classesSection.order.map((key) => {
          const c = classTypes[key];
          const img = images[c.image];
          return (
            <li key={key} className="w-[85%] shrink-0 snap-start md:w-auto">
              <article>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-cream">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 46vw, 85vw"
                    className="object-cover"
                    style={{ objectPosition: "position" in img ? img.position : undefined }}
                  />
                </div>
                <h3 className="mt-5 flex items-center gap-3 text-lead">
                  <span className={`block h-3 w-7 shrink-0 rounded-full ${c.dot}`} aria-hidden="true" />
                  {c.name}
                </h3>
                <p className="mt-2">{c.text}</p>
                <p className="mt-3 inline-flex rounded-full bg-cream px-4 py-1.5 text-small font-semibold">
                  {classesSection.fitLabel}: {c.fit}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
