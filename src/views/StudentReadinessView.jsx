import React from 'react';
import { GraduationCap, Award, CheckCircle2, XCircle, Brain, BookOpen, MessageSquare, Zap } from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

export default function StudentReadinessView({ data }) {
  const { studentReadiness } = data;
  const { placedProfile, unplacedProfile, internshipImpact, readinessTiers } = studentReadiness;

  // Radar chart comparison data
  const radarData = [
    { subject: 'Aptitude Score', Placed: placedProfile.apt, Unplaced: unplacedProfile.apt, fullMark: 100 },
    { subject: 'Technical Score', Placed: placedProfile.tech, Unplaced: unplacedProfile.tech, fullMark: 100 },
    { subject: 'Communication Score', Placed: placedProfile.comm, Unplaced: unplacedProfile.comm, fullMark: 100 },
    { subject: 'Internship Rate (%)', Placed: placedProfile.internshipPct, Unplaced: unplacedProfile.internshipPct, fullMark: 100 },
    { subject: 'Avg Certifications (x15)', Placed: (placedProfile.certs * 15), Unplaced: (unplacedProfile.certs * 15), fullMark: 100 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <span>Student Placement Readiness & Profile Comparisons</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Comparing candidate competencies across test scores, internship experiences, and certification counts for placed vs unplaced cohorts.
        </p>
      </div>

      {/* Profile Metrics Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placed Profile Card */}
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Placed Candidate Profile Averages</h3>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400">
              Benchmark Standard
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <Brain className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Avg Aptitude</span>
              <p className="text-lg font-bold text-white font-mono mt-0.5">{placedProfile.apt}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <BookOpen className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Avg Technical</span>
              <p className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{placedProfile.tech}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <MessageSquare className="w-4 h-4 text-teal-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Avg Comm</span>
              <p className="text-lg font-bold text-white font-mono mt-0.5">{placedProfile.comm}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Internship %</span>
              <p className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{placedProfile.internshipPct}%</p>
            </div>
          </div>
        </div>

        {/* Unplaced Profile Card */}
        <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400">
              <XCircle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Unplaced Candidate Profile Averages</h3>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-500/20 text-rose-400">
              Target Intervention Area
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <Brain className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Avg Aptitude</span>
              <p className="text-lg font-bold text-white font-mono mt-0.5">{unplacedProfile.apt}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <BookOpen className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Avg Technical</span>
              <p className="text-lg font-bold text-rose-400 font-mono mt-0.5">{unplacedProfile.tech}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <MessageSquare className="w-4 h-4 text-teal-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Avg Comm</span>
              <p className="text-lg font-bold text-white font-mono mt-0.5">{unplacedProfile.comm}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
              <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-gray-400 uppercase">Internship %</span>
              <p className="text-lg font-bold text-rose-400 font-mono mt-0.5">{unplacedProfile.internshipPct}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Comparison Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Multidimensional Profile Radar</h3>
              <p className="text-xs text-gray-400">Comparing Placed vs Unplaced candidate skill vectors</p>
            </div>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4b5563" />
                <Radar name="Placed Profile" dataKey="Placed" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Radar name="Unplaced Profile" dataKey="Unplaced" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Internship Impact Bar Chart */}
        <div className="p-5 rounded-2xl glass-card border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Internship Completion Impact</h3>
              <p className="text-xs text-gray-400">Placement conversion % for students with vs without internship</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              +{(internshipImpact.withInternship.rate - internshipImpact.withoutInternship.rate).toFixed(1)}% Conversion Boost
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { category: 'Completed Internship', rate: internshipImpact.withInternship.rate, total: internshipImpact.withInternship.total, placed: internshipImpact.withInternship.placed },
                  { category: 'No Internship', rate: internshipImpact.withoutInternship.rate, total: internshipImpact.withoutInternship.total, placed: internshipImpact.withoutInternship.placed }
                ]}
                margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="category" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Placement Rate']}
                />
                <Bar dataKey="rate" name="Placement Rate (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
