import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const CV_DOWNLOAD_EVENT = "dagm:cv-download";

export function showCvDownloadToast() {
  window.dispatchEvent(new Event(CV_DOWNLOAD_EVENT));
}

export default function CvDownloadToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleDownload = () => {
      setIsVisible(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsVisible(false), 2600);
    };

    window.addEventListener(CV_DOWNLOAD_EVENT, handleDownload);

    return () => {
      window.removeEventListener(CV_DOWNLOAD_EVENT, handleDownload);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`cv-toast ${isVisible ? "cv-toast-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 className="h-5 w-5" />
      <span>CV downloaded. Let&apos;s talk.</span>
    </div>
  );
}
