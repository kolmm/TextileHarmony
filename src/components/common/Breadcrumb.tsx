import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={14} className="text-border" />}
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="text-secondary transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-text">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
