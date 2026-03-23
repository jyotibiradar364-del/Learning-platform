'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <footer className="bg-background pt-24 pb-12 mt-auto">
      <div className="editorial-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-4 max-w-sm">
            <h3 className="font-medium text-lg text-on-surface tracking-tight">The Editorial Scholar</h3>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              A boutique educational platform committed to the preservation of craftsmanship and the advancement of digital literacy. Curated by experts, designed for the thoughtful learner.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface">Platform</h4>
            <ul className="space-y-4 text-[13px] text-on-surface-variant font-medium">
              <li><button onClick={() => alert('Course Catalog coming soon!')} className="hover:text-primary transition cursor-pointer">Course Catalog</button></li>
              <li><button onClick={() => alert('Mentorship Program coming soon!')} className="hover:text-primary transition cursor-pointer">Mentorship Program</button></li>
              <li><button onClick={() => alert('Scholarly Journal coming soon!')} className="hover:text-primary transition cursor-pointer">Scholarly Journal</button></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface">Support</h4>
            <ul className="space-y-4 text-[13px] text-on-surface-variant font-medium">
              <li><button onClick={() => alert('Help Center coming soon!')} className="hover:text-primary transition cursor-pointer">Help Center</button></li>
              <li><button onClick={() => alert('Privacy Policy coming soon!')} className="hover:text-primary transition cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => alert('Institutional Access coming soon!')} className="hover:text-primary transition cursor-pointer">Institutional Access</button></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 pt-8 border-t border-on-surface/10">
          <p>© 2024 THE EDITORIAL SCHOLAR</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => alert('Twitter link coming soon!')} className="hover:text-primary transition cursor-pointer">TWITTER</button>
            <button onClick={() => alert('Instagram link coming soon!')} className="hover:text-primary transition cursor-pointer">INSTAGRAM</button>
            <button onClick={() => alert('LinkedIn link coming soon!')} className="hover:text-primary transition cursor-pointer">LINKEDIN</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
