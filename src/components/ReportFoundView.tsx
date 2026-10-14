import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlusCircle, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  EyeOff
} from 'lucide-react';

export const ReportFoundView: React.FC = () => {
  const { addNewReport, setActiveTab } = useApp();

  const [itemName, setItemName] = useState('Black Leather Wallet');
  const [category, setCategory] = useState<'Accessories' | 'Electronics' | 'Cards & IDs' | 'Keys' | 'Bottles & Containers' | 'Books & Stationery' | 'Other'>('Accessories');
  const [dateFound, setDateFound] = useState('16 September 2026');
  const [location, setLocation] = useState('Library');
  const [description, setDescription] = useState('Black leather wallet found near the library entrance.');
  const [submitted, setSubmitted] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewReport({
      type: 'found',
      title: itemName,
      category,
      date: dateFound,
      location,
      description
    });
    setSubmitted(true);
  };

  const handleFillDemoData = () => {
    setItemName('Black Leather Wallet');
    setCategory('Accessories');
    setDateFound('16 September 2026');
    setLocation('Library');
    setDescription('Black leather wallet found near the library entrance.');
    setHasPhoto(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Report a Found Item
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Turn in or log items found around campus so rightful owners can discover and claim them.
        </p>
      </div>

      {submitted ? (
        /* Success Screen */
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-md text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Found report submitted successfully.
            </h2>
            <p className="text-sm font-medium text-slate-600">
              The item has been logged in the campus registry. You may drop it at the nearest Campus Custody Desk.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('smart-match')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-200 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check for Owner Matches (87%)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Back to Campus Reports
            </button>
          </div>
        </div>
      ) : (
        /* The Report Form */
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Item Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Item <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Black Leather Wallet"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-900"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-900 cursor-pointer"
              >
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
                <option value="Cards & IDs">Cards &amp; IDs</option>
                <option value="Keys">Keys</option>
                <option value="Bottles & Containers">Bottles &amp; Containers</option>
                <option value="Books & Stationery">Books &amp; Stationery</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date Found */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Date Found <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={dateFound}
                onChange={(e) => setDateFound(e.target.value)}
                placeholder="16 September 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-900"
              />
            </div>

            {/* Location Found */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Location Found <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Library, Near Turnstile Gate, Canteen..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-900"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Black leather wallet found near the library entrance."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-slate-900 resize-none"
              />
            </div>

            {/* Photo Upload Area */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Upload Photo
              </label>
              <div 
                onClick={() => setHasPhoto(!hasPhoto)}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-300 rounded-2xl p-5 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all cursor-pointer"
              >
                {hasPhoto ? (
                  <div className="flex items-center justify-center gap-3 text-left">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ATTACHED
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">found_item_photo.jpg (Attached)</p>
                      <p className="text-[11px] text-emerald-600 font-medium">✓ Uploaded &amp; ready for comparison</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud className="w-8 h-8 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">Click to upload found item photo</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, or WEBP up to 5MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy Guidance Reminder */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                <EyeOff className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Private Information Protection
                </span>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  Keep important identifying information hidden (such as cash amounts, specific stickers inside, or ID numbers). The true owner must specify these during verification.
                </p>
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md shadow-emerald-200 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Found Report</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
