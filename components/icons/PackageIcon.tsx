import React from 'react';

export const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
    <path d="m7.5 4.21 9 5.15" />
    <path d="M12 22V12" />
    <path d="M3.27 6.96 12 12.01l8.73-5.05" />
    <path d="M16.5 9.4 7.55 4.24" />
    <path d="M17 15.5h6" />
    <path d="M20 12.5v6" />
  </svg>
);
