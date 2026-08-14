import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FilterBar from './components/FilterBar';
import StudentDetailModal from './components/StudentDetailModal';

// Static 500 Student Records JSON Dataset
import studentsData from './data/studentsData.json';

// Analytics computation engine
import { calculateAnalytics } from './utils/analytics';

// Views
import OverviewView from './views/OverviewView';
import BranchPerformanceView from './views/BranchPerformanceView';
import SkillGapView from './views/SkillGapView';
import RecruiterPackageView from './views/RecruiterPackageView';
import StudentReadinessView from './views/StudentReadinessView';
import InsightsActionsView from './views/InsightsActionsView';
import RawDataTable from './views/RawDataTable';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Global Filter State
  const [filters, setFilters] = useState({
    academicYear: 'All',
    branch: 'All',
    gender: 'All',
    placementStatus: 'All',
    recruiter: 'All',
    primarySkill: 'All',
    skillGapLevel: 'All',
    internshipCompleted: 'All'
  });

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      academicYear: 'All',
      branch: 'All',
      gender: 'All',
      placementStatus: 'All',
      recruiter: 'All',
      primarySkill: 'All',
      skillGapLevel: 'All',
      internshipCompleted: 'All'
    });
    setSearchTerm('');
  };

  // Filter Options derived from the 500 JSON dataset
  const filterOptions = useMemo(() => {
    const years = Array.from(new Set(studentsData.map(s => s.Academic_Year).filter(Boolean))).sort();
    const branches = Array.from(new Set(studentsData.map(s => s.Branch).filter(Boolean))).sort();
    const genders = Array.from(new Set(studentsData.map(s => s.Gender).filter(Boolean))).sort();
    const statuses = Array.from(new Set(studentsData.map(s => s.Placement_Status).filter(Boolean))).sort();
    const recruiters = Array.from(new Set(studentsData.map(s => s.Recruiter).filter(r => r && r !== 'None'))).sort();
    const skills = Array.from(new Set(studentsData.map(s => s.Primary_Skill).filter(Boolean))).sort();
    const skillGaps = ['High Gap', 'Moderate Gap', 'Low Gap', 'Strong'];

    return { years, branches, genders, statuses, recruiters, skills, skillGaps };
  }, []);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    Object.values(filters).forEach(val => {
      if (val !== 'All') count++;
    });
    if (searchTerm) count++;
    return count;
  }, [filters, searchTerm]);

  // Filtered Student Dataset (computed dynamically from studentsData.json)
  const filteredStudents = useMemo(() => {
    return studentsData.filter(s => {
      if (filters.academicYear !== 'All' && s.Academic_Year !== filters.academicYear) return false;
      if (filters.branch !== 'All' && s.Branch !== filters.branch) return false;
      if (filters.gender !== 'All' && s.Gender !== filters.gender) return false;
      if (filters.placementStatus !== 'All' && s.Placement_Status !== filters.placementStatus) return false;
      if (filters.recruiter !== 'All' && s.Recruiter !== filters.recruiter) return false;
      if (filters.primarySkill !== 'All' && s.Primary_Skill !== filters.primarySkill) return false;
      if (filters.skillGapLevel !== 'All' && s.Skill_Gap_Level !== filters.skillGapLevel) return false;
      if (filters.internshipCompleted !== 'All' && s.Internship_Completed !== filters.internshipCompleted) return false;

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchesID = s.Student_ID && s.Student_ID.toLowerCase().includes(q);
        const matchesRecruiter = s.Recruiter && s.Recruiter.toLowerCase().includes(q);
        const matchesSkill = s.Primary_Skill && s.Primary_Skill.toLowerCase().includes(q);
        const matchesBranch = s.Branch && s.Branch.toLowerCase().includes(q);
        if (!matchesID && !matchesRecruiter && !matchesSkill && !matchesBranch) return false;
      }

      return true;
    });
  }, [filters, searchTerm]);

  // Dynamically calculate analytics from filtered students
  const analyticsData = useMemo(() => {
    return calculateAnalytics(filteredStudents);
  }, [filteredStudents]);

  // Handle drill-down branch click from charts
  const handleSelectBranch = (branchName) => {
    if (!branchName) {
      setFilters(prev => ({ ...prev, branch: 'All' }));
    } else {
      setFilters(prev => ({ ...prev, branch: branchName }));
      setActiveTab('branch');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        totalRecords={studentsData.length}
        filteredCount={filteredStudents.length}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Global Interactive Filter Bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
        onReset={handleResetFilters}
        activeCount={activeFilterCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          kpis={analyticsData.kpis}
        />

        {/* Center Main Workspace Container */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center glass-card rounded-2xl border border-gray-800 space-y-3">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-bold text-white">No Matching Placement Records</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                No student profiles match your current filter selections. Try adjusting or resetting your active global filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <OverviewView 
                  data={analyticsData} 
                  onSelectBranch={handleSelectBranch} 
                  onNavigateTab={setActiveTab} 
                />
              )}

              {activeTab === 'branch' && (
                <BranchPerformanceView 
                  data={analyticsData} 
                  selectedBranch={filters.branch !== 'All' ? filters.branch : null}
                  onSelectBranch={handleSelectBranch}
                />
              )}

              {activeTab === 'skillgap' && (
                <SkillGapView data={analyticsData} />
              )}

              {activeTab === 'recruiter' && (
                <RecruiterPackageView data={analyticsData} />
              )}

              {activeTab === 'readiness' && (
                <StudentReadinessView data={analyticsData} />
              )}

              {activeTab === 'insights' && (
                <InsightsActionsView data={analyticsData} />
              )}

              {activeTab === 'rawdata' && (
                <RawDataTable 
                  students={filteredStudents} 
                  onSelectStudent={setSelectedStudent} 
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}
