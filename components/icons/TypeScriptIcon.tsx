import React from 'react';

export const TypeScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M7 16h4" />
    <path d="M9 7v9" />
    <path d="M13 16a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2Z" />
  </svg>
);
