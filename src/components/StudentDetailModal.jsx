import React from 'react';
import { X, User, Briefcase, Award, CheckCircle2, XCircle, Brain, BookOpen, MessageSquare } from 'lucide-react';

export default function StudentDetailModal({ student, onClose }) {
  if (!student) return null;

  const isPlaced = student.Placement_Status === 'Placed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-mono">{student.Student_ID}</h3>
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  isPlaced ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {student.Placement_Status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {student.Branch} Branch • {student.Gender} • AY {student.Academic_Year}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-5">
          {/* Placement Offer Details */}
          <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recruiter Company</p>
              <p className="text-base font-bold text-white mt-0.5">{student.Recruiter || 'None'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Package Offered</p>
              <p className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                {isPlaced ? `${student.Package_LPA} LPA` : 'N/A'}
              </p>
            </div>
          </div>

          {/* Academic & Assessment Scores */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Assessment Test Scores
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-center">
                <Brain className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <p className="text-[10px] text-gray-400 uppercase">Aptitude</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">{student.Aptitude_Score}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-center">
                <BookOpen className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <p className="text-[10px] text-gray-400 uppercase">Technical</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">{student.Technical_Score}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 text-center">
                <MessageSquare className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                <p className="text-[10px] text-gray-400 uppercase">Communication</p>
                <p className="text-lg font-bold text-white font-mono mt-0.5">{student.Communication_Score}</p>
              </div>
            </div>
          </div>

          {/* Skill & Profile Attributes */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Primary Skill</span>
              <span className="text-white font-semibold text-sm mt-0.5 block">{student.Primary_Skill}</span>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Skill Gap Level</span>
              <span className={`font-semibold text-sm mt-0.5 block ${
                student.Skill_Gap_Level === 'Strong' ? 'text-emerald-400' :
                student.Skill_Gap_Level === 'Low Gap' ? 'text-blue-400' :
                student.Skill_Gap_Level === 'Moderate Gap' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {student.Skill_Gap_Level}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
              <span className="text-gray-400 text-[10px] uppercase font-semibold">Internship Completed</span>
              <span className="font-semibold text-white flex items-center gap-1">
                {student.Internship_Completed === 'Yes' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                {student.Internship_Completed}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between">
              <span className="text-gray-400 text-[10px] uppercase font-semibold">Certifications</span>
              <span className="font-bold text-white font-mono text-sm">{student.Certifications}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-950 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
