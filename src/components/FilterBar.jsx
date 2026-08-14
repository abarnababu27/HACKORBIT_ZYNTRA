import React from 'react';
import { Filter, RotateCcw, Search, X } from 'lucide-react';

export default function FilterBar({ filters, setFilters, filterOptions, onReset, activeCount, searchTerm, setSearchTerm }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-gray-900/80 border-b border-gray-800 p-4 space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Filter Title & Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Global Data Filters</span>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 text-[11px] rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                {activeCount} Active
              </span>
            )}
          </div>
          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Student ID, Recruiter..."
              className="w-full bg-gray-800/90 border border-gray-700 rounded-lg pl-8 pr-8 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Reset Button */}
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Filter Select Controls Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {/* Academic Year */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Academic Year</label>
          <select
            value={filters.academicYear}
            onChange={(e) => handleChange('academicYear', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Years</option>
            {filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Branch</label>
          <select
            value={filters.branch}
            onChange={(e) => handleChange('branch', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Branches</option>
            {filterOptions.branches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Genders</option>
            {filterOptions.genders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Placement Status */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Status</label>
          <select
            value={filters.placementStatus}
            onChange={(e) => handleChange('placementStatus', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            {filterOptions.statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Recruiter */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Recruiter</label>
          <select
            value={filters.recruiter}
            onChange={(e) => handleChange('recruiter', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Companies</option>
            {filterOptions.recruiters.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Primary Skill */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Primary Skill</label>
          <select
            value={filters.primarySkill}
            onChange={(e) => handleChange('primarySkill', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Skills</option>
            {filterOptions.skills.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Skill Gap Level */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Skill Gap Level</label>
          <select
            value={filters.skillGapLevel}
            onChange={(e) => handleChange('skillGapLevel', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Gap Levels</option>
            {filterOptions.skillGaps.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Internship Completed */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Internship</label>
          <select
            value={filters.internshipCompleted}
            onChange={(e) => handleChange('internshipCompleted', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All (Yes/No)</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
  );
}
