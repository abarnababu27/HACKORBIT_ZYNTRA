import React, { useState, useMemo } from 'react';
import { Table, Download, ArrowUpDown, ChevronLeft, ChevronRight, Eye, Search } from 'lucide-react';

export default function RawDataTable({ students, onSelectStudent }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortField, setSortField] = useState('Student_ID');
  const [sortOrder, setSortOrder] = useState('asc');
  const [tableSearch, setTableSearch] = useState('');

  // Filtered and Sorted Records
  const processedRecords = useMemo(() => {
    let result = [...students];

    if (tableSearch) {
      const q = tableSearch.toLowerCase();
      result = result.filter(s => 
        (s.Student_ID && s.Student_ID.toLowerCase().includes(q)) ||
        (s.Branch && s.Branch.toLowerCase().includes(q)) ||
        (s.Recruiter && s.Recruiter.toLowerCase().includes(q)) ||
        (s.Primary_Skill && s.Primary_Skill.toLowerCase().includes(q)) ||
        (s.Academic_Year && s.Academic_Year.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      const mult = sortOrder === 'asc' ? 1 : -1;
      if (valA < valB) return -1 * mult;
      if (valA > valB) return 1 * mult;
      return 0;
    });

    return result;
  }, [students, tableSearch, sortField, sortOrder]);

  const totalPages = Math.ceil(processedRecords.length / pageSize) || 1;
  const paginatedRecords = processedRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Pure Native CSV Export (zero external runtime dependencies)
  const handleExportCSV = () => {
    if (processedRecords.length === 0) return;
    const headers = Object.keys(processedRecords[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));

    for (const row of processedRecords) {
      const values = headers.map(header => {
        const val = row[header];
        const escaped = ('' + (val !== null && val !== undefined ? val : '')).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'studentsData_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Table Controls Header */}
      <div className="p-4 rounded-2xl glass-card border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Table className="w-5 h-5 text-blue-400" />
            <span>Complete Candidate Placement Records ({processedRecords.length})</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Displaying verified local <code className="text-emerald-400 font-mono">studentsData.json</code> records.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Table Search */}
          <div className="relative w-full md:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => { setTableSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search table records..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Export to CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-800 glass-card">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-gray-800/90 text-gray-400 font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Student_ID')}>
                <div className="flex items-center gap-1">Student ID <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Academic_Year')}>
                <div className="flex items-center gap-1">AY <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Branch')}>
                <div className="flex items-center gap-1">Branch <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Gender')}>
                <div className="flex items-center gap-1">Gender <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Placement_Status')}>
                <div className="flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Recruiter')}>
                <div className="flex items-center gap-1">Recruiter <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Package_LPA')}>
                <div className="flex items-center gap-1">LPA <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Primary_Skill')}>
                <div className="flex items-center gap-1">Primary Skill <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Aptitude_Score')}>
                <div className="flex items-center gap-1">Apt <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Technical_Score')}>
                <div className="flex items-center gap-1">Tech <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Communication_Score')}>
                <div className="flex items-center gap-1">Comm <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('Skill_Gap_Level')}>
                <div className="flex items-center gap-1">Skill Gap <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/80 bg-gray-900/40">
            {paginatedRecords.map((s) => {
              const isPlaced = s.Placement_Status === 'Placed';
              return (
                <tr 
                  key={s.Student_ID}
                  onClick={() => onSelectStudent(s)}
                  className="hover:bg-gray-800/60 transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-white">{s.Student_ID}</td>
                  <td className="py-2.5 px-3 text-gray-400 font-mono">{s.Academic_Year}</td>
                  <td className="py-2.5 px-3 font-semibold text-blue-400">{s.Branch}</td>
                  <td className="py-2.5 px-3 text-gray-400">{s.Gender}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isPlaced ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {s.Placement_Status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-gray-200">{s.Recruiter}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-300">
                    {isPlaced ? `${s.Package_LPA} LPA` : '-'}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-purple-300">{s.Primary_Skill}</td>
                  <td className="py-2.5 px-3 font-mono">{s.Aptitude_Score}</td>
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-semibold">{s.Technical_Score}</td>
                  <td className="py-2.5 px-3 font-mono">{s.Communication_Score}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                      s.Skill_Gap_Level === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      s.Skill_Gap_Level === 'Low Gap' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      s.Skill_Gap_Level === 'Moderate Gap' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {s.Skill_Gap_Level}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <button className="text-gray-400 hover:text-blue-400 p-1">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="p-4 rounded-2xl glass-card border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-1 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>Showing {Math.min((currentPage - 1) * pageSize + 1, processedRecords.length)} to {Math.min(currentPage * pageSize, processedRecords.length)} of {processedRecords.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono font-semibold text-gray-200">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
