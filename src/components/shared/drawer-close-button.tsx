import { XMarkIcon } from "@heroicons/react/24/outline";

interface DrawerCloseButtonProps {
  onClose: () => void;
  className?: string;
}

export function DrawerCloseButton({
  onClose,
  className = "",
}: DrawerCloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className={`group relative p-2 hover:bg-gray-700/80 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      title="Close panel"
      aria-label="Close panel"
    >
      <XMarkIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
    </button>
  );
}

