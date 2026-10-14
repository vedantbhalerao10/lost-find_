import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Lock, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldAlert,
  Info
} from 'lucide-react';

export const ReportLostView: React.FC = () => {
  const { addNewReport, setActiveTab } = useApp();

  const [itemName, setItemName] = useState('Black Leather Wallet');
  const [category, setCategory] = useState<'Accessories' | 'Electronics' | 'Cards & IDs' | 'Keys' | 'Bottles & Containers' | 'Books & Stationery' | 'Other'>('Accessories');
  const [dateLost, setDateLost] = useState('16 September 2026');
  const [location, setLocation] = useState('Library Gate');
  const [description, setDescription] = useState('Black leather wallet with multiple card slots.');
  const [privateDetail, setPrivateDetail] = useState('Blue Ganesh sticker inside the transparent card pocket');
  const [submitted, setSubmitted] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewReport({
      type: 'lost',
      title: itemName,
      category,
      date: dateLost,
      location,
      description,
      privateDetail
    });
    setSubmitted(true);
  };

  const handleFillDemoData = () => {
    setItemName('Black Leather Wallet');
    setCategory('Accessories');
    setDateLost('16 September 2026');
    setLocation('Library Gate');
    setDescription('Black leather wallet with multiple card slots.');
    setPrivateDetail('Blue Ganesh sticker inside the transparent card pocket');
    setHasPhoto(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Report a Lost Item
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Register your lost belongings into the campus matching engine with encrypted private proof.
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
              Lost report submitted successfully.
            </h2>
            <p className="text-sm font-medium text-slate-600">
              FindBack will monitor new found reports for potential matches.
            </p>
            <p className="text-xs text-slate-500 pt-1">
              Your private detail has been locked in the confidential verification vault and will only be prompted during claimant handover.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('smart-match')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-md shadow-indigo-200 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Potential Matches (87%)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('my-reports')}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Go to My Reports
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
                Item Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Black Leather Wallet"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm text-slate-900"
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm text-slate-900 cursor-pointer"
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

            {/* Date Lost */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Date Lost <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={dateLost}
                onChange={(e) => setDateLost(e.target.value)}
                placeholder="16 September 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm text-slate-900"
              />
            </div>

            {/* Last Seen Location */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Last Seen Location <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Library Gate, Science Block, Canteen..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm text-slate-900"
              />
            </div>

            {/* Public Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Public Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe visible exterior features (color, brand, visible marks)..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm text-slate-900 resize-none"
              />
              <p className="text-[11px] text-slate-400">
                Visible to other students searching for items. Do not put secret ownership secrets here.
              </p>
            </div>

            {/* Photo Upload Area */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Upload Item Photo
              </label>
              <div 
                onClick={() => setHasPhoto(!hasPhoto)}
                className="border-2 border-dashed border-slate-200 hover:border-indigo-300 rounded-2xl p-5 text-center bg-slate-50/50 hover:bg-indigo-50/20 transition-all cursor-pointer"
              >
                {hasPhoto ? (
                  <div className="flex items-center justify-center gap-3 text-left">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs">
                      PHOTO
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">wallet_reference_photo.jpg (Attached)</p>
                      <p className="text-[11px] text-emerald-600 font-medium">✓ Uploaded &amp; indexed for visual confirmation</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud className="w-8 h-8 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">Click to upload reference photo</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, or WEBP up to 5MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* CRUCIAL REQUIREMENT: Private Identifying Detail */}
            <div className="sm:col-span-2 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <label className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Private Identifying Detail</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-xs text-indigo-900/80 mt-0.5 font-medium leading-relaxed">
                    Do not reveal this detail publicly. It will be used to verify ownership.
                  </p>
                </div>
              </div>

              <input
                type="text"
                required
                value={privateDetail}
                onChange={(e) => setPrivateDetail(e.target.value)}
                placeholder="e.g. Unique sticker inside the wallet, serial number, engraved initials..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm text-slate-900 font-medium placeholder:text-slate-400"
              />

              <div className="flex items-center gap-1.5 text-[11px] text-indigo-700/80">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Example: <em>"Unique sticker inside the wallet"</em> · Stored confidentially for verification challenge.</span>
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-200 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Lost Report</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
