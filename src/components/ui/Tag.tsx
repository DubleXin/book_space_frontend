import React from "react";
import { cn } from "../../utils/cn";

const tagVariants = {
  primary: `
    bg-blue-600 text-white
    hover:bg-blue-700
    focus:ring-blue-500
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
    focus:ring-gray-400
  `,

  danger: `
    bg-red-600 text-white
    hover:bg-red-700
    focus:ring-red-500
  `,
};

const tagSizes = {
  sm: "text-xs px-2.5 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-3.5 py-2",
};

type TagProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof tagVariants;
  size?: keyof typeof tagSizes;
  selected?: boolean;
};

export function Tag({
  variant = "secondary",
  size = "md",
  selected = false,
  className,
  type = "button",
  ...props
}: TagProps) {
  return (
    <button
      type={type}
      className={cn(
        `
        inline-flex items-center justify-center
        rounded-full font-medium
        transition focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        whitespace-nowrap
        `,
        tagVariants[variant],
        tagSizes[size],
        selected && "ring-2 ring-offset-2",
        className
      )}
      {...props}
    />
  );
}
