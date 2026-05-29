import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyMe from '@/components/WhyMe';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyMe />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
