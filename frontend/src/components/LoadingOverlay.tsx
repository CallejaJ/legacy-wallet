import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({
  message = "Procesando...",
}: LoadingOverlayProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-modal">
        <div className="loading-logo-wrapper">
          <img
            src="/favicon.png"
            alt="Legacy Wallet"
            className="loading-logo"
          />
          <div className="loading-ring" />
        </div>
        <p className="loading-message">
          {message}
          <span className="loading-dots">{dots}</span>
        </p>
        <p className="loading-hint">
          No cierres esta ventana mientras se confirma la transacción
        </p>
      </div>
    </div>
  );
}
