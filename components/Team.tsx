import Image from "next/image";
import { teamSection } from "@/data/studio";

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="px-2.5 md:px-5">
      <div className="rounded-panel bg-ink py-14 text-cream lg:py-24">
        <div className="mx-auto max-w-page px-6 md:px-10 lg:px-16">
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
            <h2 id="team-title" data-reveal className="text-title">
              {teamSection.title}
            </h2>
            <p data-reveal className="mt-3 max-w-[34ch] lg:mt-0 lg:text-lead">
              {teamSection.intro}
            </p>
          </div>
        </div>

        {/* Phone: swipe through the instructors; desktop: three across. */}
        <ul
          data-reveal
          aria-label="המדריכות"
          className="mx-auto mt-8 flex max-w-page snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:px-10 lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible lg:px-16 [&::-webkit-scrollbar]:hidden"
        >
          {teamSection.members.map((m) => (
            <li key={m.name} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-sand">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 85vw"
                  className="object-cover object-[50%_25%]"
                />
              </div>
              <h3 className="mt-5 text-lead">{m.name}</h3>
              <p className="mt-1 text-small font-bold text-sage">{m.role}</p>
              <p className="mt-2 max-w-[36ch]">{m.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
