import React from 'react';

export default function Footer() {
  return (
    <footer className="ml-[260px] bg-surface-container-low border-t border-outline-variant flex justify-between items-center px-lg py-sm">
      <div className="flex items-center gap-md">
        <span className="font-label-sm text-label-sm text-secondary">
          © 2024 Airports Authority of India (SkyHub Operations). All rights reserved.
        </span>
      </div>
      <div className="flex items-center gap-lg">
        <a href="#" className="font-caption text-caption text-secondary hover:text-primary transition-colors">
          Legal
        </a>
        <a href="#" className="font-caption text-caption text-secondary hover:text-primary transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="font-caption text-caption text-secondary hover:text-primary transition-colors">
          Support
        </a>
        <a href="#" className="font-caption text-caption text-secondary hover:text-primary transition-colors">
          Documentation
        </a>
      </div>
    </footer>
  );
}
