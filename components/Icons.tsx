type P = { className?: string };

export function WhatsAppIcon({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.6l-4.5.9z" />
      <path d="M9 8.6c.2-.6.6-.7 1-.7h.4c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1.1 1.5 2 2.7 2.6.2.1.4.1.6-.1l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v.4c0 .5-.3 1-.8 1.2-.6.3-1.4.4-2.3.1-2.4-.8-4.4-2.8-5.2-5.2-.3-.9-.3-1.7-.3-2.1z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-6 w-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Five-star rating as one strip. */
export function Stars({ className = "h-5 w-[112px] text-blush-dark" }: P) {
  const star = "M12 3.2l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.5l-5.4 2.9 1.2-5.9-4.4-4.1 6-.7z";
  return (
    <svg viewBox="0 0 120 24" fill="currentColor" className={className} role="img" aria-label="5 מתוך 5 כוכבים">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={star} transform={`translate(${i * 24} 0)`} />
      ))}
    </svg>
  );
}

export function ChevronIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

/** The capsule motif: eight carriages = eight reformers = eight women per class. */
export function Carriages({ count = 8, className = "" }: { count?: number; className?: string }) {
  return (
    <span className={`flex gap-1.5 ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="carriage block h-2.5 w-6 rounded-full bg-blush" style={{ animationDelay: `${600 + i * 90}ms` }} />
      ))}
    </span>
  );
}
