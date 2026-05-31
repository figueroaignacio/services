import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import WhyMe from '@/components/why-me';
import Services from '@/components/services';
import Projects from '@/components/projects';
import Testimonials from '@/components/testimonials';
import Pricing from '@/components/pricing';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { allProjects } from 'content-collections';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const projects = allProjects.filter((p) => p.locale === locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyMe />
        <Services />
        <Projects projects={projects} />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
