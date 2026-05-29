import { type ComponentPropsWithoutRef } from 'react';
import { type HTMLMotionProps, motion } from 'framer-motion';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover',
  secondary:
    'bg-secondary text-text hover:bg-secondary-hover',
  outline:
    'border border-accent text-accent hover:bg-accent hover:text-white',
  ghost:
    'text-accent hover:bg-surface',
} as const;

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
} as const;

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'children'>;
type NativeButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

interface ButtonProps extends Omit<NativeButtonProps & MotionButtonProps, 'children'> {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
