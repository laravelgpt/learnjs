import React from 'react';

export const CssIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M10 3L6 21" />
    <path d="M18 3l-4 18" />
    <path d="M4 9h18" />
    <path d="M2 15h18" />
  </svg>
);
