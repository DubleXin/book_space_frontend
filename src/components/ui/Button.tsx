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

const buttonSizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        `
        inline-flex items-center justify-center
        rounded-md font-medium
        transition focus:outline-none focus:ring-2
        disabled:opacity-50 disabled:cursor-not-allowed
        w-full
        `,

        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}
