import React from 'react';
import { BrainCircuit, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

export default function SkillGapView({ data }) {
  const { skillGapDistribution, skillPerformance, prioritySkills } = data;

  const COLORS = {
    'High Gap': '#f43f5e',
    'Moderate Gap': '#f59e0b',
    'Low Gap': '#3b82f6',
    'Strong': '#10b981'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-400" />
          <span>Skill Gap Intelligence & Proficiency Diagnostics</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Evaluating primary technical skills, skill gap severity levels, and assessment score correlations with placement outcomes.
        </p>
      </div>

      {/* Top Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {skillGapDistribution.map(item => (
          <div 
            key={item.level} 
            className="p-4 rounded-xl glass-card border border-gray-800 flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{item.level}</span>
              <h4 className="text-xl font-bold text-white font-mono mt-0.5">{item.count} <span className="text-xs font-normal text-gray-400">students</span></h4>
              <p className="text-xs text-gray-400 mt-0.5">{item.percentage}% of total candidate pool</p>
            </div>
            <div 
              className="w-3 h-10 rounded-full" 
              style={{ backgroundColor: COLORS[item.level] || '#3b82f6' }}
            />
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Gap Level Distribution Pie Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Overall Skill Gap Level Distribution</h3>
              <p className="text-xs text-gray-400">Proportion of candidates across severity classifications</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillGapDistribution}
                  dataKey="count"
                  nameKey="level"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={3}
                  label={({ level, percentage }) => `${level}: ${percentage}%`}
                >
                  {skillGapDistribution.map((entry) => (
                    <Cell key={`cell-${entry.level}`} fill={COLORS[entry.level] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(val, name) => [`${val} Candidates`, 'Count']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill-wise Placement Rate & Package Bar Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Placement Rate by Primary Skill</h3>
              <p className="text-xs text-gray-400">Comparing conversion % across primary technical proficiencies</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="skill" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(val, name) => [name === 'rate' ? `${val}%` : `${val} LPA`, name === 'rate' ? 'Placement Rate' : 'Avg Package']}
                />
                <Bar dataKey="rate" name="Placement Rate (%)" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Priority Skill Gaps Table */}
      <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>High-Priority Skills Needing Training Intervention</span>
            </h3>
            <p className="text-xs text-gray-400">Ranked by High Gap % and lowest placement conversion rate</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Action Priority Matrix
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-800/90 text-gray-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Primary Skill</th>
                <th className="py-3 px-4">Total Students</th>
                <th className="py-3 px-4">Placed Count</th>
                <th className="py-3 px-4">Placement Rate</th>
                <th className="py-3 px-4">Avg Package</th>
                <th className="py-3 px-4">Avg Tech Score</th>
                <th className="py-3 px-4">Avg Comm Score</th>
                <th className="py-3 px-4">High Gap %</th>
                <th className="py-3 px-4">Intervention Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/80 bg-gray-900/60">
              {prioritySkills.map((s, idx) => {
                const isHighRisk = s.highGapPct >= 30 || s.rate < 60;
                return (
                  <tr key={s.skill} className="hover:bg-gray-800/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                      <span>{s.skill}</span>
                    </td>
                    <td className="py-3 px-4 font-mono">{s.total}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">{s.placed}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-400">{s.rate}%</td>
                    <td className="py-3 px-4 font-mono text-emerald-300">{s.avgPackage} LPA</td>
                    <td className="py-3 px-4 font-mono">{s.avgTech} / 100</td>
                    <td className="py-3 px-4 font-mono">{s.avgComm} / 100</td>
                    <td className="py-3 px-4 font-mono font-bold text-rose-400">{s.highGapPct}%</td>
                    <td className="py-3 px-4">
                      {isHighRisk ? (
                        <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          CRITICAL ACTION
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          MODERATE
                        </span>
                      )}
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
