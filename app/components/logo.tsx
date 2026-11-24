export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Paper Cuts Lawn Care"
    >
      <rect width="48" height="48" rx="12" fill="#84c02a" />
      <path d="M24 10.5 38 22.4V36a1.6 1.6 0 0 1-1.6 1.6H11.6A1.6 1.6 0 0 1 10 36V22.4L24 10.5Z" fill="#0d120e" />
      <path d="M19.6 37.6v-8.4a2 2 0 0 1 2-2h4.8a2 2 0 0 1 2 2v8.4" fill="#84c02a" />
      <path d="M33.4 33.8c1.5-3.4 3.3-5.2 6.2-6.3-1.3 3.4-3.1 5.4-6.2 6.3Z" fill="#0d120e" opacity=".55" />
      <path d="M9.8 33.8c-1.5-3.4-3.3-5.2-6.2-6.3 1.3 3.4 3.1 5.4 6.2 6.3Z" fill="#0d120e" opacity=".55" />
      <path d="M14.6 34.2c-.5-2.6-.1-4.6.8-6.6.9 2.3 1.1 4.4.2 6.9" fill="#f2c518" />
      <path d="M33.4 34.2c.5-2.6.1-4.6-.8-6.6-.9 2.3-1.1 4.4-.2 6.9" fill="#f2c518" />
    </svg>
  );
}
