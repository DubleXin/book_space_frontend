import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { X } from "lucide-react";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onClose,
  onConfirm,
  isBusy,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  isBusy?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-neutral-950">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            {description ? (
              <p className="mt-1 text-sm text-slate-600 dark:text-white/60">
                {description}
              </p>
            ) : null}
          </div>

          <IconButton
            label="Close"
            Icon={X}
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            className="w-auto"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="w-auto"
            onClick={onConfirm}
            disabled={isBusy}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
