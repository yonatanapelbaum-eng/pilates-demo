import Image from "next/image";
import { hero, images } from "@/data/studio";
import { Carriages } from "./Icons";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative pb-16 lg:pb-24">
      <div className="flex flex-col lg:min-h-[calc(100svh-72px)] lg:flex-row lg:items-center">
        {/* Text: first in the DOM, the start (right) side on desktop, below the picture on a phone. */}
        <div className="order-2 px-4 pt-8 md:px-8 lg:order-1 lg:w-[46%] lg:pt-0 lg:pl-12">
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

          <dl data-reveal className="mt-10 grid grid-cols-3 gap-4 lg:mt-14 lg:max-w-[560px]">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-small font-semibold">{s.label}</dt>
                <dd className="order-1 font-display text-lead font-medium tabular">{s.value}</dd>
                {s.capacity && <Carriages className="order-3 mt-3" />}
              </div>
            ))}
          </dl>
        </div>

        {/* The picture: a reformer carriage, entering from the left edge with its rounded end facing the words. */}
        <div className="order-1 pl-0 pr-4 md:pr-8 lg:order-2 lg:w-[54%] lg:pr-0">
          <div className="shutter cap-right relative h-[42svh] min-h-[280px] max-h-[460px] overflow-hidden bg-sand lg:h-[min(80svh,760px)] lg:max-h-none">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[60%_50%]"
            />
            <p className="absolute left-4 top-4 rounded-full bg-sage px-4 py-2 text-small font-semibold text-ink lg:bottom-8 lg:left-8 lg:top-auto">
              {hero.tag}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
