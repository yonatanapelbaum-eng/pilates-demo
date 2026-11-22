import Classes from "@/components/Classes";
import Contact from "@/components/Contact";
import DemoCta from "@/components/DemoCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Reveal from "@/components/Reveal";
import Schedule from "@/components/Schedule";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Classes />
        <Schedule />
        <Pricing />
        <Team />
        <Testimonials />
        <Faq />
        <Contact />
        <DemoCta />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Reveal />
    </>
  );
}
