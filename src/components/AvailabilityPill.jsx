import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function AvailabilityPill() {
  return (
    <Link
      to="/contact"
      className="availability-pill"
      data-cursor-kicker="Available"
      data-cursor-message="Let's talk"
      aria-label="Contact Dagm for full-time and part-time jobs"
    >
      <span className="availability-pill-dot" />
      <span>Open for full-time and part-time jobs</span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
