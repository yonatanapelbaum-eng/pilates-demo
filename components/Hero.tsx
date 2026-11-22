import Image from "next/image";
import { hero, images } from "@/data/studio";

export default function Hero() {
  return (
    <section id="top" data-hide-float aria-labelledby="hero-title" className="relative pb-10 pt-2 lg:pb-16 lg:pt-6">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-4 md:px-8 lg:flex-row lg:items-center lg:gap-14">
        {/* Text: the start (right) side on desktop, below the picture on a phone. */}
        <div className="order-2 lg:order-1 lg:w-[46%]">
          <h1 id="hero-title" data-reveal className="text-display md:text-[clamp(40px,7.4vw,80px)] lg:text-display">
            {hero.title}
          </h1>
          <p data-reveal className="mt-5 max-w-[34ch] text-body lg:mt-7 lg:text-lead">
            {hero.subtitle}
          </p>
          <div data-reveal className="mt-7 flex flex-wrap gap-3 lg:mt-9">
            <a href={hero.primary.href} className="btn btn-primary">
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className="btn btn-outline">
              {hero.secondary.label}
            </a>
          </div>

          <dl data-reveal className="mt-9 grid grid-cols-3 gap-4 lg:mt-12 lg:max-w-[520px]">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-small font-semibold">{s.label}</dt>
                <dd className="order-1 font-display text-lead font-medium tabular">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The picture */}
        <div className="order-1 lg:order-2 lg:flex-1">
          <div className="shutter relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-[60%_50%]"
            />
            <p className="absolute left-3 top-3 rounded-full bg-sage px-4 py-2 text-small font-semibold text-ink lg:bottom-6 lg:left-6 lg:top-auto">
              {hero.tag}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
