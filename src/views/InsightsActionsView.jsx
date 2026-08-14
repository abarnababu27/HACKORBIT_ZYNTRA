import React, { useState } from 'react';
import { Lightbulb, Sparkles, Filter, Printer, Copy, Check } from 'lucide-react';
import InsightCard from '../components/InsightCard';

export default function InsightsActionsView({ data }) {
  const { insights } = data;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Branch Performance', 'Skill Gap Intelligence', 'Student Readiness', 'Recruiter & Package'];

  const filteredInsights = selectedCategory === 'All' 
    ? insights 
    : insights.filter(i => i.category === selectedCategory);

  const handleCopyActionPlan = () => {
    const text = insights.map((i, idx) => `
# INSIGHT ${idx + 1}: ${i.title} (${i.category})
1. DATA: ${i.data}
2. ANALYSIS: ${i.analysis}
3. INSIGHT: ${i.insight}
4. ACTION: ${i.action}
`).join('\n---\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-orange-950/80 to-purple-950/80 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Action Center: DATA → ANALYSIS → INSIGHT → ACTION
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-2">
            Strategic Insights & Intervention Roadmap
          </h2>
          <p className="text-xs text-gray-300 max-w-2xl mt-1 leading-relaxed">
            Data-backed recommendations computed directly from student performance metrics to maximize campus placement rates and close critical skill gaps.
          </p>
        </div>

        <button
          onClick={handleCopyActionPlan}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Action Plan!' : 'Copy Executive Report'}</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.length > 0 ? (
          filteredInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))
        ) : (
          <div className="p-8 rounded-2xl glass-card border border-gray-800 text-center space-y-2">
            <Lightbulb className="w-8 h-8 text-gray-500 mx-auto" />
            <p className="text-sm font-semibold text-gray-300">No insights found in this category.</p>
            <p className="text-xs text-gray-500">Try selecting 'All' to view all strategic insights.</p>
          </div>
        )}
      </div>
    </div>
  );
}
