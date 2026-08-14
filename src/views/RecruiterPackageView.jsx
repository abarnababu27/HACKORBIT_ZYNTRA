import React from 'react';
import { Building2, DollarSign, Award, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function RecruiterPackageView({ data }) {
  const { recruiterStats, packageDistribution, kpis } = data;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <span>Recruiter Insights & Salary Package Analytics</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Evaluating hiring partner placement volumes, salary package distributions, peak LPA offers, and recruiter skill demands.
        </p>
      </div>

      {/* Recruiter Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl glass-card border border-blue-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Hiring Companies</span>
            <h4 className="text-2xl font-bold text-white font-mono mt-0.5">{recruiterStats.length}</h4>
            <p className="text-xs text-blue-400 mt-0.5">Verified Campus Recruiters</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl glass-card border border-emerald-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Average Salary Offer</span>
            <h4 className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">{kpis.avgPackage} LPA</h4>
            <p className="text-xs text-gray-400 mt-0.5">Mean placed candidate LPA</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl glass-card border border-purple-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Highest Salary Package</span>
            <h4 className="text-2xl font-bold text-purple-400 font-mono mt-0.5">{kpis.highestPackage} LPA</h4>
            <p className="text-xs text-gray-400 mt-0.5">Maximum campus offer</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruiter Placement Volume Bar Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Hiring Volume by Recruiter</h3>
              <p className="text-xs text-gray-400">Number of students placed per company</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recruiterStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="recruiter" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(val, name) => [`${val} Candidates`, 'Placed Count']}
                />
                <Bar dataKey="count" name="Placed Students" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package Distribution Pie Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Salary Package LPA Distribution</h3>
              <p className="text-xs text-gray-400">Categorization of offers across LPA salary ranges</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packageDistribution}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={3}
                  label={({ range, percentage }) => `${range}: ${percentage}%`}
                >
                  {packageDistribution.map((entry, index) => (
                    <Cell key={`cell-${entry.range}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comprehensive Recruiter Matrix Table */}
      <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Recruiter Comparison Matrix</h3>
            <p className="text-xs text-gray-400">Detailed breakdown of hiring stats and demanded primary skills</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-800/90 text-gray-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Recruiter Company</th>
                <th className="py-3 px-4">Total Hires</th>
                <th className="py-3 px-4">Average Package</th>
                <th className="py-3 px-4">Max Offer</th>
                <th className="py-3 px-4">Min Offer</th>
                <th className="py-3 px-4">Top Demanded Primary Skills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 bg-gray-900/60">
              {recruiterStats.map((r) => (
                <tr key={r.recruiter} className="hover:bg-gray-800/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span>{r.recruiter}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">{r.count}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-blue-300">{r.avgPackage} LPA</td>
                  <td className="py-3 px-4 font-mono text-purple-400 font-semibold">{r.maxPackage} LPA</td>
                  <td className="py-3 px-4 font-mono text-gray-400">{r.minPackage} LPA</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {r.topSkills.map((sk) => (
                        <span key={sk} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
