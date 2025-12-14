import { cn } from "../../utils/cn";

const inputVariants = {
  default: `
    border border-gray-300
    dark:border-neutral-700
    bg-white dark:bg-neutral-800
    focus:ring-blue-500
  `,

  filled: `
    bg-gray-100 dark:bg-neutral-700
    border border-transparent
    focus:ring-blue-500
  `,

  outline: `
    border-2 border-gray-400 dark:border-neutral-600
    bg-white dark:bg-neutral-800
    focus:ring-blue-500
  `,

  error: `
    border border-red-500 dark:border-red-400
    bg-white dark:bg-neutral-800
    focus:ring-red-500
  `,

  success: `
    border border-green-500 dark:border-green-400
    bg-white dark:bg-neutral-800
    focus:ring-green-500
  `,

  ghost: `
    border border-transparent
    bg-transparent
    focus:ring-blue-500
  `,
} as const;

const inputSizes = {
  sm: "text-sm px-2 py-1.5",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
} as const;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: keyof typeof inputVariants;
  inputSize?: keyof typeof inputSizes;
};

export function Input({
  inputSize = "md",
  variant = "default",
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        `
        w-full rounded-md
        focus:outline-none focus:ring-2
        text-gray-900 dark:text-white
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
        `,

        inputVariants[variant],
        inputSizes[inputSize],
        className
      )}
      {...props}
    />
  );
}
