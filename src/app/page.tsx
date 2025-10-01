import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { ServiceOverview } from '@/components/home/ServiceOverview';
import { Testimonials } from '@/components/home/Testimonials';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <ServiceOverview />
      <Testimonials />
    </>
  );
}
