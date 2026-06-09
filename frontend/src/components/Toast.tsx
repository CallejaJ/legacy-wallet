import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "success",
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="toast-icon text-green" />;
      case "error":
        return <XCircle className="toast-icon text-red" />;
      case "warning":
        return <AlertTriangle className="toast-icon text-warning" />;
      default:
        return <Info className="toast-icon text-info" />;
    }
  };

  return (
    <div className={`toast-container toast-${type}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{message}</span>
      </div>
      <button onClick={onClose} className="toast-close-btn" aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
