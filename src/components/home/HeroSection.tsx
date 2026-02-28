import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { heroTextReveal, staggerContainer, buttonHover, buttonTap } from '@/lib/animations';
import { ROUTES } from '@/constants';

const HERO_IMAGE_URL = 'https://placehold.co/1920x800/E3DAC9/8B6F4E?text=TextileHarmony';

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden lg:h-screen">
      {/* Background image */}
      <img
        src={HERO_IMAGE_URL}
        alt="TextileHarmony hero banner"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative flex h-full min-h-[60vh] items-end pb-16 lg:items-center lg:pb-0"
      >
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <motion.p
              variants={heroTextReveal}
              className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80 md:text-base"
            >
              Premium Home Textiles
            </motion.p>

            <motion.h1
              variants={heroTextReveal}
              className="mb-5 font-serif text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              Transform Your Space with Natural Comfort
            </motion.h1>

            <motion.p
              variants={heroTextReveal}
              className="mb-8 text-base leading-relaxed text-white/80 md:text-lg"
            >
              Discover our curated collection of sustainable, beautifully crafted
              textiles for every room in your home.
            </motion.p>

            <motion.div variants={heroTextReveal}>
              <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                <Link
                  to={ROUTES.CATALOG}
                  className="inline-flex items-center rounded-lg bg-accent px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Shop Collection
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
