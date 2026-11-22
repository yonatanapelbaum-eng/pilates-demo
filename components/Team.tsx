import Image from "next/image";
import { teamSection } from "@/data/studio";

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="px-2.5 md:px-5">
      <div className="rounded-panel bg-ink px-6 py-20 text-cream md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-page">
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
            <h2 id="team-title" data-reveal className="text-title">
              {teamSection.title}
            </h2>
            <p data-reveal className="mt-4 max-w-[34ch] text-lead lg:mt-0">
              {teamSection.intro}
            </p>
          </div>

          <ul className="mt-14 grid gap-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-12">
            {teamSection.members.map((m, i) => (
              <li key={m.name} className={i === 1 ? "lg:mt-20" : i === 2 ? "lg:mt-10" : ""}>
                <div data-reveal className="relative mx-auto aspect-[3/4] w-[78%] overflow-hidden rounded-full bg-sand sm:w-full lg:w-[88%]">
                  <Image src={m.image} alt={m.alt} fill sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 78vw" className="object-cover" />
                </div>
                <div data-reveal className="mt-7 text-center lg:mt-8">
                  <h3 className="text-lead">{m.name}</h3>
                  <p className="mt-1 text-small font-bold text-sage">{m.role}</p>
                  <p className="mx-auto mt-3 max-w-[32ch]">{m.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
