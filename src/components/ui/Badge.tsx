const variants = {
  sale: 'bg-error text-white',
  new: 'bg-accent-2 text-white',
  bestseller: 'bg-accent text-white',
  default: 'bg-surface text-text',
} as const;

interface BadgeProps {
  variant?: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
