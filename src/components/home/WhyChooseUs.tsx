import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw, Lock } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const FEATURES = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on orders over 75',
  },
  {
    icon: Shield,
    title: 'Quality Materials',
    description: 'Premium, sustainable fabrics',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '14-day hassle-free returns',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
] as const;

export function WhyChooseUs() {
  return (
    <section className="bg-surface">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-16 lg:grid-cols-4 lg:px-8 lg:py-20"
      >
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <Icon size={24} className="text-accent" />
              </div>
              <h3 className="mb-1.5 font-serif text-base font-semibold text-text">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
