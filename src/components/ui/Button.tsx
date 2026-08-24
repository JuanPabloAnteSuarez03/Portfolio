import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-mono text-sm transition-colors duration-200";

const variants: Record<Variant, string> = {
  // Negro sobre lima: 13.93:1
  primary: "bg-accent text-black hover:bg-accent-strong hover:text-white font-medium",
  secondary:
    "border border-border-strong text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg-muted hover:text-fg",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & (
  | { href: string; external?: boolean; onClick?: never; type?: never }
  | { href?: never; external?: never; onClick?: () => void; type?: "button" | "submit" }
);

export function Button({
  variant = "primary",
  className,
  children,
  href,
  external,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ComponentProps<"button">)}>
      {children}
    </button>
  );
}
