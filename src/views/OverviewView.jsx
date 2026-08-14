import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Percent, 
  TrendingUp, 
  Award, 
  Building2, 
  GitBranch, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import KpiCard from '../components/KpiCard';

export default function OverviewView({ data, onSelectBranch, onNavigateTab }) {
  const { kpis, branchRanking, placementTrend, recruiterStats } = data;

  const topBranch = branchRanking.length > 0 ? branchRanking[0] : null;
  const topRecruiter = recruiterStats.length > 0 ? recruiterStats[0] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Executive Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-purple-950/80 border border-blue-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> HACKORBIT 2K26 Executive Brief
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-2">
              Placement & Skill-Gap Intelligence Hub
            </h2>
            <p className="text-xs text-gray-300 max-w-2xl mt-1 leading-relaxed">
              Real-time analytics modeling student placement conversions, branch bottlenecks, core skill gaps, and salary distributions calculated dynamically from actual dataset records.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('insights')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all shrink-0"
          >
            <span>View Actionable Insights</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Students"
          value={kpis.totalStudents}
          subtext="Evaluated Candidates"
          icon={Users}
          color="blue"
          badgeText="100% Dataset Coverage"
        />

        <KpiCard
          title="Placed Students"
          value={kpis.placedStudents}
          subtext={`${kpis.unplacedStudents} Unplaced`}
          icon={CheckCircle2}
          color="emerald"
          badgeText="Verified Offers"
        />

        <KpiCard
          title="Placement Rate"
          value={`${kpis.placementRate}%`}
          subtext="Overall Conversion"
          icon={Percent}
          color="purple"
          badgeText={topBranch ? `Top Branch: ${topBranch.branch} (${topBranch.rate}%)` : ''}
        />

        <KpiCard
          title="Average Package"
          value={`${kpis.avgPackage} LPA`}
          subtext="Placed Candidates"
          icon={TrendingUp}
          color="amber"
          badgeText="Mean Salary Offer"
        />

        <KpiCard
          title="Highest Package"
          value={`${kpis.highestPackage} LPA`}
          subtext="Peak Salary Offer"
          icon={Award}
          color="rose"
          badgeText={topRecruiter ? `Top Hirer: ${topRecruiter.recruiter}` : ''}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Trend Over Academic Years */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Placement Conversion Trend</h3>
              <p className="text-xs text-gray-400">Year-over-Year Placement Rate & Salary Packages</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Academic Years
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={placementTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="rate" name="Placement Rate (%)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRate)" strokeWidth={2} />
                <Area type="monotone" dataKey="avgPackage" name="Avg Package (LPA)" stroke="#10b981" fillOpacity={1} fill="url(#colorAvg)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Placement Comparison Bar Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Branch-Wise Placement Comparison</h3>
              <p className="text-xs text-gray-400">Click a branch bar to drill-down into detailed stats</p>
            </div>
            <button 
              onClick={() => onNavigateTab('branch')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              Full Branch Analysis →
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchRanking} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="branch" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(val, name) => [name === 'rate' ? `${val}%` : `${val} LPA`, name === 'rate' ? 'Placement Rate' : 'Avg Package']}
                />
                <Bar 
                  dataKey="rate" 
                  name="Placement Rate (%)" 
                  radius={[6, 6, 0, 0]}
                  onClick={(entry) => onSelectBranch && onSelectBranch(entry.branch)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {branchRanking.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#10b981' : index === branchRanking.length - 1 ? '#f43f5e' : '#3b82f6'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Executive Key Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top Performing Branch */}
        {topBranch && (
          <div className="p-4 rounded-xl bg-gray-900/80 border border-emerald-500/30 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Top Performing Branch</span>
              <h4 className="text-lg font-bold text-white font-mono mt-0.5">{topBranch.branch}</h4>
              <p className="text-xs text-gray-300 mt-1">
                Achieved <strong className="text-emerald-400">{topBranch.rate}%</strong> placement conversion ({topBranch.placed}/{topBranch.total} placed) with an average salary of <strong>{topBranch.avgPackage} LPA</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Highest Salary Hiring Partner */}
        {topRecruiter && (
          <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/30 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Leading Hiring Partner</span>
              <h4 className="text-lg font-bold text-white font-mono mt-0.5">{topRecruiter.recruiter}</h4>
              <p className="text-xs text-gray-300 mt-1">
                Hired <strong className="text-purple-400">{topRecruiter.count} candidates</strong> offering an average package of <strong>{topRecruiter.avgPackage} LPA</strong> (Max: {topRecruiter.maxPackage} LPA).
              </p>
            </div>
          </div>
        )}

        {/* Strategic Skill Opportunity */}
        <div className="p-4 rounded-xl bg-gray-900/80 border border-amber-500/30 flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Strategic T&P Target</span>
            <h4 className="text-lg font-bold text-white font-mono mt-0.5">Skill & Internship Boost</h4>
            <p className="text-xs text-gray-300 mt-1">
              Data proves that internship completion directly yields higher placement conversion. Access the Insights module for targeted action plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
