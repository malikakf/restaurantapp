import { Link, useLocation } from 'react-router-dom';
import { ChefHat, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  const location = useLocation();
  const showBack = location.pathname !== '/';

  return (
    <nav className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10">
      <div className="px-4 py-3 flex items-center gap-3">
        {showBack && (
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
        )}
        <ChefHat size={22} className="text-[#D4AF37]" />
        <div>
          <h1 className="text-white font-bold leading-tight">{title}</h1>
          {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
        </div>
      </div>
    </nav>
  );
}
