import React from 'react';
import Logo from '../assets/logo2.svg';

/**
 * Footer component.  It mirrors the structure of the provided
 * screenshots and includes navigation shortcuts, contact info and
 * copyright notice.  The component takes advantage of Tailwind’s
 * responsive utilities to arrange the content on small and large
 * screens.
 */
const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-secondary text-xs text-gray-400 py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start gap-4">
        <div className="flex items-start gap-3">
          <img src={Logo} alt="Logo" className="w-[392px]" />
        </div>
        <div className="flex gap-8">
          <div>
            <div className="space-y-1 items-end">
              <div className="cursor-pointer hover:text-accent">Films</div>
              <div className="cursor-pointer hover:text-accent">Stemmen</div>
              <div className="cursor-pointer hover:text-accent">Schema</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-gray-500">
        © 2026 Democratische bioscoop / email: contact@democratische-bioscoop.nl{' '}
        <span className="mx-2">|</span> Privacy policy <span className="mx-2">|</span> Terms & conditions
      </div>
    </footer>
  );
};

export default Footer;