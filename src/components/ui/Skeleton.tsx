interface SkeletonProps {
  variant?: 'text' | 'image' | 'card' | 'productCard';
  className?: string;
}

function SkeletonBase({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-border/50 ${className}`} />
  );
}

export function Skeleton({ variant = 'text', className = '' }: SkeletonProps) {
  switch (variant) {
    case 'text':
      return <SkeletonBase className={`h-4 w-full ${className}`} />;

    case 'image':
      return <SkeletonBase className={`aspect-square w-full ${className}`} />;

    case 'card':
      return (
        <div className={`rounded-xl bg-white p-4 ${className}`}>
          <SkeletonBase className="mb-4 aspect-video w-full" />
          <SkeletonBase className="mb-2 h-4 w-3/4" />
          <SkeletonBase className="h-4 w-1/2" />
        </div>
      );

    case 'productCard':
      return (
        <div className={`rounded-xl bg-white overflow-hidden ${className}`}>
          <SkeletonBase className="aspect-square w-full rounded-none" />
          <div className="p-4">
            <SkeletonBase className="mb-2 h-3 w-1/3" />
            <SkeletonBase className="mb-3 h-5 w-3/4" />
            <SkeletonBase className="mb-2 h-3 w-1/2" />
            <SkeletonBase className="h-5 w-1/4" />
          </div>
        </div>
      );

    default:
      return <SkeletonBase className={className} />;
  }
}
