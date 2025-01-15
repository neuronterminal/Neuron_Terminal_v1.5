import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Neural Evolution' },
    { to: '/chat', label: 'Chat' },
    { to: '/about', label: 'About' },
    { to: '/learn', label: 'Learn to Code' },
    { to: '/workspace', label: 'Workspace' },
    { to: '/tokenomics', label: 'Tokenomics' },
    { to: '/roadmap', label: 'Roadmap' }
  ];

  return (
    <nav className="w-full max-w-6xl mx-auto mb-6 p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`matrix-button px-6 py-2 rounded-lg text-center min-w-[120px] ${
              location.pathname === to ? 'bg-[#00ff41]/20' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}