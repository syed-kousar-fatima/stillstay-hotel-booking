export default function BuildingMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M5 34.5h30M9 34V15l11-8 11 8v19" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" />
      <path d="M15 17h3v3h-3zm7 0h3v3h-3zm-7 7h3v3h-3zm7 0h3v3h-3z" fill="currentColor" />
      <path d="M18 34v-5h4v5M6 15h28" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" />
    </svg>
  );
}
