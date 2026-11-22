import Image from "next/image";
import { classTypes, classesSection, images } from "@/data/studio";

export default function Classes() {
  return (
    <section id="classes" aria-labelledby="classes-title" className="bg-sand px-4 py-24 md:px-8 lg:py-40">
      <div className="mx-auto max-w-page">
        <h2 id="classes-title" data-reveal className="text-title">
          {classesSection.title}
        </h2>

        <ul className="mt-12 grid gap-16 md:grid-cols-2 md:gap-x-10 lg:mt-20 lg:gap-x-20 lg:gap-y-24">
          {classesSection.order.map((key, i) => {
            const c = classTypes[key];
            const img = images[c.image];
            return (
              <li key={key} className={i % 2 === 1 ? "lg:translate-y-24" : ""}>
                <article>
                  <div data-reveal className="relative h-44 overflow-hidden rounded-full bg-cream md:h-56 lg:h-64">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className={`object-cover ${key === "barre" ? "object-[50%_30%]" : ""}`} />
                  </div>
                  <div data-reveal className="mt-6 lg:mt-8 lg:px-6">
                    <h3 className="flex items-center gap-3 text-lead">
                      <span className={`block h-3 w-7 shrink-0 rounded-full ${c.dot}`} aria-hidden="true" />
                      {c.name}
                    </h3>
                    <p className="mt-3 max-w-[44ch]">{c.text}</p>
                    <p className="mt-4 inline-flex rounded-full bg-cream px-4 py-1.5 text-small font-semibold">
                      {classesSection.fitLabel}: {c.fit}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
