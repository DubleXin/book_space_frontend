const Field = ({
  label,
  htmlFor,
  action,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  action?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-slate-800 dark:text-white/80"
        >
          {label}
        </label>
        {action}
      </div>
      {children}
      {hint ? (
        <p className="text-xs text-slate-500 dark:text-white/40">{hint}</p>
      ) : null}
    </div>
  );
};

export default Field;
