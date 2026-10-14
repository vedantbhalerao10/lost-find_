import React from 'react';

interface ItemVisualProps {
  type: 'wallet' | 'bottle' | 'calculator' | 'id_card' | 'keys' | 'headphones' | 'generic';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ItemVisual: React.FC<ItemVisualProps> = ({ type, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-full h-44'
  }[size];

  if (type === 'wallet') {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 via-zinc-900 to-black text-slate-100 shadow-inner overflow-hidden ${sizeClasses} ${className}`}>
        {/* Wallet Leather Texture & Stitching Visual */}
        <div className="absolute inset-2 rounded-lg border border-dashed border-zinc-600/40 opacity-70 pointer-events-none" />
        <div className="relative flex flex-col items-center justify-center p-3 text-center">
          <svg className="w-8 h-8 text-amber-500/90 mb-1 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
          </svg>
          {size === 'lg' && (
            <div className="mt-1">
              <span className="text-xs font-semibold tracking-wide text-zinc-300">GENUINE LEATHER BIFOLD</span>
              <p className="text-[11px] text-zinc-400 mt-0.5">Black · Multiple Card Slots · Verified ID Pocket</p>
            </div>
          )}
        </div>
        {/* Subtle glossy highlight */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />
      </div>
    );
  }

  if (type === 'bottle') {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <div className="relative flex flex-col items-center justify-center p-3 text-center">
          <svg className="w-8 h-8 text-cyan-300 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M7 2h10v3H7z" />
            <path d="M6 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
            <path d="M6 12h12" />
          </svg>
          {size === 'lg' && (
            <div className="mt-1">
              <span className="text-xs font-semibold tracking-wide text-blue-100">STAINLESS STEEL 750ML</span>
              <p className="text-[11px] text-blue-200 mt-0.5">Matte Blue Finish · Double Wall Insulated</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'calculator') {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 via-slate-800 to-zinc-900 text-white overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <div className="relative flex flex-col items-center justify-center p-3 text-center">
          <svg className="w-8 h-8 text-emerald-400 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <line x1="8" x2="16" y1="6" y2="6" />
            <line x1="16" x2="16" y1="14" y2="18" />
            <path d="M16 10h.01" />
            <path d="M12 10h.01" />
            <path d="M8 10h.01" />
            <path d="M12 14h.01" />
            <path d="M8 14h.01" />
            <path d="M12 18h.01" />
            <path d="M8 18h.01" />
          </svg>
          {size === 'lg' && (
            <div className="mt-1">
              <span className="text-xs font-semibold tracking-wide text-slate-200">CASIO CLASSWIZ FX-991EX</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Dark Grey Slide Case · Solar Powered</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'id_card') {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 text-white overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <div className="relative flex flex-col items-center justify-center p-3 text-center">
          <svg className="w-8 h-8 text-purple-200 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
            <circle cx="7" cy="15" r="1.5" />
            <line x1="12" x2="18" y1="15" y2="15" />
          </svg>
          {size === 'lg' && (
            <div className="mt-1">
              <span className="text-xs font-semibold tracking-wide text-indigo-100">STUDENT SMART CARD</span>
              <p className="text-[11px] text-indigo-200 mt-0.5">Campus RFID Chip · Hologram Verified</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'keys') {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-700 via-amber-800 to-orange-950 text-white overflow-hidden shadow-inner ${sizeClasses} ${className}`}>
        <div className="relative flex flex-col items-center justify-center p-3 text-center">
          <svg className="w-8 h-8 text-amber-300 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3" />
          </svg>
          {size === 'lg' && (
            <div className="mt-1">
              <span className="text-xs font-semibold tracking-wide text-amber-100">DORM ACCESS KEY RING</span>
              <p className="text-[11px] text-amber-200 mt-0.5">Yale Brass Keys · Braided Cord</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses} ${className}`}>
      <svg className="w-8 h-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m21 16-4 4-4-4" />
        <path d="M17 20V4" />
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </svg>
    </div>
  );
};
