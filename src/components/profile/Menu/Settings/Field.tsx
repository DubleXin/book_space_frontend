const Field = ({
  label,
  hint,
  htmlFor,
  action,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2 min-w-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 sm:flex sm:flex-col sm:justify-start">
          <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-slate-900 dark:text-white justify-self-center"
          >
            {label}
          </label>
          {hint ? (
            <p className="mt-1 text-xs text-slate-500 dark:text-white/40 justify-self-center">
              {hint}*
            </p>
          ) : null}
        </div>

        {action ? (
          <div className="shrink-0 w-full sm:w-auto flex sm:block justify-end">
            {action}
          </div>
        ) : null}
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
};

export default Field;
