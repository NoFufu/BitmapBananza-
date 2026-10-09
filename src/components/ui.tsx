import { motion } from 'motion/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');
export { cx };

type Variant = 'ink' | 'quiet' | 'line' | 'mini';

const variants: Record<Variant, string> = {
  ink: 'h-9 px-3.5 rounded-md border border-ink bg-ink text-paper font-semibold hover:enabled:bg-neutral-800 disabled:opacity-35',
  quiet: 'h-9 px-3.5 rounded-md border border-hair bg-paper font-semibold hover:enabled:border-ink disabled:opacity-40',
  line: 'h-9 px-3 w-full rounded-md border border-ink bg-paper font-semibold hover:enabled:bg-ink hover:enabled:text-paper disabled:opacity-35',
  mini: 'h-8 px-2.5 w-full rounded-md border border-hair bg-paper text-[12.5px] font-semibold hover:enabled:border-ink disabled:opacity-40'
};

export function Button({ variant = 'quiet', className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button type="button" className={cx('inline-flex items-center justify-center gap-2 whitespace-nowrap', variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function IconButton({ label, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={rest.title ?? label}
      className={cx('inline-grid place-items-center size-9 border border-hair bg-paper hover:enabled:bg-panel disabled:text-line', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Segmented control whose active pill slides between options (Aceternity "Animated Tabs"). */
export function Segmented<T extends string>({ id, value, options, onChange, disabled, size = 'md' }: {
  id: string;
  value: T;
  options: { value: T; label: ReactNode; title?: string }[];
  onChange: (v: T) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}) {
  return (
    <div role="radiogroup" className="relative flex items-center gap-0.5">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            title={o.title}
            disabled={disabled}
            onClick={() => onChange(o.value)}
            className={cx(
              'relative rounded-md font-semibold whitespace-nowrap transition-colors disabled:opacity-35',
              size === 'md' ? 'h-8 px-2.5 text-[12.5px]' : 'h-7 px-2 text-[12px]',
              active && !disabled ? 'text-paper' : 'hover:enabled:bg-panel'
            )}
          >
            {active && !disabled && (
              <motion.span layoutId={`seg-${id}`} className="absolute inset-0 rounded-md bg-ink" transition={{ type: 'spring', stiffness: 520, damping: 38 }} />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Pill({ tone, children }: { tone: 'good' | 'warn'; children: ReactNode }) {
  return (
    <span className={cx(
      'justify-self-end rounded-full px-2 py-0.5 text-[11px] font-semibold tabular',
      tone === 'good' ? 'bg-ink text-paper' : 'border border-dashed border-ink bg-paper'
    )}>
      {children}
    </span>
  );
}

export function Hint({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('mt-2.5 max-w-[60ch] text-[11.5px] leading-snug text-muted', className)}>{children}</p>;
}
