import { cn } from "../../utils/cn";

const textareaVariants = {
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

const textareaSizes = {
  sm: "text-sm px-2 py-1.5",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
} as const;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: keyof typeof textareaVariants;
  textareaSize?: keyof typeof textareaSizes;
  resize?: "none" | "y" | "x" | "both";
};

const resizeClasses: Record<NonNullable<TextareaProps["resize"]>, string> = {
  none: "resize-none",
  y: "resize-y",
  x: "resize-x",
  both: "resize",
};

export function Textarea({
  textareaSize = "md",
  variant = "default",
  resize = "none",
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        `
        w-full rounded-md
        focus:outline-none focus:ring-2
        text-gray-900 dark:text-white
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
        `,
        resizeClasses[resize],
        textareaVariants[variant],
        textareaSizes[textareaSize],
        className
      )}
      {...props}
    />
  );
}
