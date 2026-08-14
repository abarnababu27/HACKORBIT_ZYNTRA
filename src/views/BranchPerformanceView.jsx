import React, { useState } from 'react';
import { GitBranch, Award, Trophy, ArrowUpDown, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  ComposedChart, 
  Line 
} from 'recharts';

export default function BranchPerformanceView({ data, selectedBranch, onSelectBranch }) {
  const { branchRanking, branchPerformance } = data;
  const [sortField, setSortField] = useState('rate');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedRanking = [...branchRanking].sort((a, b) => {
    const mult = sortOrder === 'desc' ? -1 : 1;
    if (a[sortField] < b[sortField]) return -1 * mult;
    if (a[sortField] > b[sortField]) return 1 * mult;
    return 0;
  });

  const activeBranchData = branchPerformance.find(b => b.branch === selectedBranch) || branchRanking[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-400" />
            <span>Branch Performance Matrix & Ranking</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Comparative analysis of placement conversion rates, LPA packages, and student counts across engineering branches.
          </p>
        </div>

        {/* Selected Branch Indicator Pill */}
        {selectedBranch && (
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-gray-400">Selected Branch:</span>
            <span className="font-bold text-blue-400 font-mono">{selectedBranch}</span>
            <button 
              onClick={() => onSelectBranch(null)} 
              className="text-gray-400 hover:text-white ml-1 text-xs font-semibold"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Top 3 Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {branchRanking.slice(0, 3).map((branch, idx) => {
          const medals = ['🥇 1st Rank', '🥈 2nd Rank', '🥉 3rd Rank'];
          const borders = [
            'border-amber-500/40 bg-amber-500/5',
            'border-gray-400/40 bg-gray-400/5',
            'border-amber-700/40 bg-amber-700/5'
          ];
          return (
            <div 
              key={branch.branch}
              onClick={() => onSelectBranch(branch.branch)}
              className={`p-4 rounded-2xl border ${borders[idx]} glass-card cursor-pointer hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  {medals[idx]}
                </span>
                <Trophy className={`w-4 h-4 ${idx === 0 ? 'text-amber-400' : 'text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-bold text-white font-mono mt-2">{branch.branch}</h3>
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-800 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">Placement Rate</span>
                  <span className="text-emerald-400 font-bold text-sm font-mono">{branch.rate}%</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Avg Package</span>
                  <span className="text-blue-400 font-bold text-sm font-mono">{branch.avgPackage} LPA</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Rate & Avg LPA Dual Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Placement Rate vs Avg Package</h3>
              <p className="text-xs text-gray-400">Comparing conversion % and salary offers by branch</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={branchRanking} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="branch" stroke="#9ca3af" fontSize={11} />
                <YAxis yAxisId="left" stroke="#9ca3af" fontSize={11} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar yAxisId="left" dataKey="rate" name="Placement Rate (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="avgPackage" name="Avg Package (LPA)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Placed vs Unplaced Stacked Bar */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Placed vs Unplaced Student Headcount</h3>
              <p className="text-xs text-gray-400">Exact candidate distribution by branch</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchRanking} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="branch" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="placed" name="Placed Students" stackId="a" fill="#10b981" />
                <Bar dataKey="unplaced" name="Unplaced Students" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interactive Branch Ranking Table */}
      <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Comprehensive Branch Ranking Table</h3>
            <p className="text-xs text-gray-400">Click headers to sort or click any row to highlight branch analytics</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-800/90 text-gray-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('branch')}>
                  <div className="flex items-center gap-1">Branch <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('total')}>
                  <div className="flex items-center gap-1">Total <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('placed')}>
                  <div className="flex items-center gap-1">Placed <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('unplaced')}>
                  <div className="flex items-center gap-1">Unplaced <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('rate')}>
                  <div className="flex items-center gap-1">Placement Rate <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('avgPackage')}>
                  <div className="flex items-center gap-1">Avg Package <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => handleSort('highestPackage')}>
                  <div className="flex items-center gap-1">Highest Package <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 bg-gray-900/60">
              {sortedRanking.map((b, idx) => {
                const isSelected = selectedBranch === b.branch;
                return (
                  <tr 
                    key={b.branch}
                    onClick={() => onSelectBranch(b.branch)}
                    className={`hover:bg-gray-800/60 transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-500/10 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-gray-400">#{idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-white">{b.branch}</td>
                    <td className="py-3 px-4 font-mono">{b.total}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">{b.placed}</td>
                    <td className="py-3 px-4 font-mono text-rose-400">{b.unplaced}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-400">
                      <div className="flex items-center gap-2">
                        <span>{b.rate}%</span>
                        <div className="w-16 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${b.rate}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-300">{b.avgPackage} LPA</td>
                    <td className="py-3 px-4 font-mono text-purple-400 font-semibold">{b.highestPackage} LPA</td>
                    <td className="py-3 px-4">
                      <button 
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-0.5 font-semibold"
                      >
                        Filter <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
