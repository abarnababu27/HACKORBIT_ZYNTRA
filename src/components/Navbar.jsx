import React from 'react';
import { Database, Sparkles, RefreshCw, FileText } from 'lucide-react';

export default function Navbar({ 
  totalRecords, 
  filteredCount, 
  onResetFilters, 
  activeFilterCount 
}) {
  return (
    <header className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 px-4 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title & Track Badge */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 text-white">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">HACKORBIT 2K26</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Track A: DataDrishti
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Placement Skill-Gap Hub — Model Placement Stats Across Branches
          </p>
        </div>
      </div>

      {/* Dataset & Action Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Dataset Status Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-800/80 border border-gray-700 text-xs">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span className="text-gray-300">Runtime Dataset:</span>
          <span className="font-semibold text-emerald-400 font-mono">studentsData.json</span>
          <span className="px-2 py-0.5 bg-gray-700 text-gray-200 rounded font-mono text-[11px]">
            {filteredCount} / {totalRecords} records
          </span>
        </div>

        {/* Reset Filters */}
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset ({activeFilterCount})</span>
          </button>
        )}
      </div>
    </header>
  );
}
