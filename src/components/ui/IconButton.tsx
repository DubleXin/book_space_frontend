import { cn } from "../../utils/cn";

const buttonVariants = {
  primary: `
    bg-sky-600 text-white
    hover:bg-sky-700
    focus:ring-sky-500
    dark:bg-sky-700
    dark:hover:bg-sky-600
    dark:focus:ring-sky-500
  `,
  secondary: `
    bg-gray-200 text-gray-900
    hover:bg-gray-300
    dark:bg-neutral-700 dark:text-white
    dark:hover:bg-neutral-600
    focus:ring-gray-400
  `,
  outline: `
    border border-gray-300 text-gray-900
    hover:bg-gray-100
    dark:border-neutral-700 dark:text-white
    dark:hover:bg-neutral-800
    focus:ring-gray-400
  `,
  ghost: `
    text-gray-700 hover:bg-gray-100
    dark:text-gray-300 dark:hover:bg-neutral-800
  `,
  danger: `
    bg-red-600 text-white
    hover:bg-red-700
    focus:ring-red-500
  `,
};

const iconButtonSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

type IconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { className?: string }
>;

type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof iconButtonSizes;

  label: string;

  icon?: React.ReactNode;
  Icon?: IconComponent;

  iconClassName?: string;
};

export function IconButton({
  variant = "ghost",
  size = "md",
  className,
  label,
  icon,
  Icon,
  iconClassName,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        `
        inline-flex items-center justify-center
        rounded-md font-medium
        transition focus:outline-none focus:ring-2
        disabled:opacity-50 disabled:cursor-not-allowed
        shrink-0
        `,
        buttonVariants[variant],
        iconButtonSizes[size],
        className
      )}
      {...props}
    >
      {Icon ? (
        <Icon className={cn("h-5 w-5", iconClassName)} aria-hidden="true" />
      ) : (
        <span className={cn("inline-flex", iconClassName)} aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}
