import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
}

export const Typography = ({ variant = 'body1', className, ...props }: TypographyProps) => {
  const baseStyles = 'text-gray-900'; // Default styles
  const variantStyles: Record<string, string> = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-semibold',
    h6: 'text-base font-semibold',
    body1: 'text-base',
    body2: 'text-sm',
  };

  return (
    <p className={cn(baseStyles, variantStyles[variant], className)} {...props} />
  );
};
