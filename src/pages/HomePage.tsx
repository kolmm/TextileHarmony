import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { useCartStore } from '@/store/cartStore';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CookieBanner from '@/components/layout/CookieBanner';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BestSellers } from '@/components/home/BestSellers';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { NewArrivals } from '@/components/home/NewArrivals';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  const cartItemCount = useCartStore((state) => state.getItemCount());

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header cartItemCount={cartItemCount} />
      <main>
        <HeroSection />
        <CategoryGrid />
        <BestSellers />
        <WhyChooseUs />
        <NewArrivals />
        <Newsletter />
      </main>
      <Footer />
      <CookieBanner />
    </motion.div>
  );
}
