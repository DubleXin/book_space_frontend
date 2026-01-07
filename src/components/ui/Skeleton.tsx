import { cn } from "../../utils/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: "md" | "lg" | "xl" | "2xl" | "full";
};

const R = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "xl", ...props }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse bg-slate-900/10 dark:bg-white/10",
        R[rounded],
        className
      )}
      {...props}
    />
  );
}
