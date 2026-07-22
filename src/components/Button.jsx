import { Link } from "react-router-dom";

/**
 * <Button variant="primary|secondary|ghost" as="button|a|link" to|href onClick
 *         size="md|lg" className>children</Button>
 *  - primary:   bg-sh-pink text-white              hover:bg-sh-pink-hover
 *  - secondary: border border-sh-gold text-sh-gold hover:bg-sh-gold hover:text-sh-ink
 *  - ghost:     border border-sh-cream text-sh-cream hover:bg-sh-cream hover:text-sh-ink
 *  `as="link"` renders react-router <Link to>; `as="a"` renders <a href>.
 */
const VARIANTS = {
  primary:
    "bg-sh-pink text-white border border-transparent hover:bg-sh-pink-hover",
  secondary:
    "border border-sh-gold text-sh-gold hover:bg-sh-gold hover:text-sh-ink",
  // solid gold pill, black label (Figma SecondaryButton). Hover: text + outline fade to red (fill stays gold).
  gold:
    "bg-sh-gold text-sh-ink border border-sh-gold rounded-[4px] hover:text-sh-pink hover:border-sh-pink",
  // outline button. Rounded 4px; hover: text + outline fade to red (no fill). Matches BTN_OUTLINE.
  ghost:
    "border border-sh-cream text-sh-cream rounded-[4px] hover:text-sh-pink hover:border-sh-pink",
};

const SIZES = {
  md: "px-8 py-3",
  lg: "px-12 py-4",
};

export default function Button({
  variant = "primary",
  as = "button",
  size = "md",
  to,
  href,
  onClick,
  className = "",
  children,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center font-body text-button uppercase " +
    "transition-colors duration-300 cursor-pointer select-none " +
    "active:text-sh-pink active:border-sh-pink " +
    "focus-visible:outline-2 focus-visible:outline-sh-pink focus-visible:outline-offset-2";
  const classes = `${base} ${SIZES[size] ?? SIZES.md} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`;

  if (as === "link" && to) {
    return (
      <Link to={to} onClick={onClick} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (as === "a") {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
