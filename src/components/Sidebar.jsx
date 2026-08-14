import React from 'react';
import { 
  LayoutDashboard, 
  GitBranch, 
  BrainCircuit, 
  Building2, 
  GraduationCap, 
  Lightbulb, 
  Table, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, kpis }) {
  const navItems = [
    { id: 'overview', label: '1. Overview', icon: LayoutDashboard, badge: `${kpis.placementRate}% Placed` },
    { id: 'branch', label: '2. Branch Performance', icon: GitBranch },
    { id: 'skillgap', label: '3. Skill Gap Intelligence', icon: BrainCircuit },
    { id: 'recruiter', label: '4. Recruiter & Package', icon: Building2, badge: `${kpis.highestPackage} LPA Max` },
    { id: 'readiness', label: '5. Student Readiness', icon: GraduationCap },
    { id: 'insights', label: '6. Insights & Actions', icon: Lightbulb, highlight: true },
    { id: 'rawdata', label: '7. Student Data Table', icon: Table, badge: `${kpis.totalStudents} Records` },
  ];

  return (
    <aside className="w-full lg:w-64 bg-gray-900/95 border-r border-gray-800 shrink-0 flex flex-col justify-between py-5 px-3">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div className="px-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Analytics Modules
          </p>
        </div>

        {/* Nav list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                    : item.highlight
                    ? 'text-amber-400 hover:bg-amber-500/10 hover:text-amber-300'
                    : 'text-gray-400 hover:bg-gray-800/80 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Summary Card at Sidebar Bottom */}
      <div className="mt-6 px-2">
        <div className="p-3.5 rounded-xl bg-gray-800/60 border border-gray-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Avg Placement Offer</span>
          </div>
          <div className="text-lg font-bold text-white font-mono">
            {kpis.avgPackage} <span className="text-xs font-normal text-gray-400">LPA</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Across {kpis.placedStudents} placed students
          </div>
        </div>
      </div>
    </aside>
  );
}
