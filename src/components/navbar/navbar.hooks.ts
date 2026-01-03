import { useEffect, type RefObject } from "react";

export const useRegisterMouseEvents = (
  open: boolean,
  panelRef: RefObject<HTMLDivElement | null>,
  inputRef: RefObject<HTMLInputElement | null>,
  closeOverlay: () => void
) =>
  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (panelRef.current?.contains(target)) return;
      if (inputRef.current?.contains(target)) return;

      closeOverlay();
    };

    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [closeOverlay, inputRef, open, panelRef]);
