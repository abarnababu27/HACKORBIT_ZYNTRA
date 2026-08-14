/**
 * Analytics Engine for Placement Skill-Gap Hub
 * Computes all metrics dynamically from student records dataset
 */

export function calculateAnalytics(students = []) {
  const totalStudents = students.length;
  
  if (totalStudents === 0) {
    return getEmptyAnalytics();
  }

  const placedStudents = students.filter(s => s.Placement_Status === 'Placed');
  const unplacedStudents = students.filter(s => s.Placement_Status === 'Not Placed');
  const placedCount = placedStudents.length;
  const unplacedCount = unplacedStudents.length;
  const placementRate = parseFloat(((placedCount / totalStudents) * 100).toFixed(1));

  // Package LPA statistics (only for placed students)
  const packages = placedStudents.map(s => s.Package_LPA).filter(p => typeof p === 'number' && p > 0);
  const avgPackage = packages.length > 0 
    ? parseFloat((packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(2)) 
    : 0;
  const highestPackage = packages.length > 0 ? parseFloat(Math.max(...packages).toFixed(2)) : 0;
  const lowestPackage = packages.length > 0 ? parseFloat(Math.min(...packages).toFixed(2)) : 0;

  // -------------------------------------------------------------
  // 1. BRANCH PERFORMANCE
  // -------------------------------------------------------------
  const branchesMap = {};
  students.forEach(s => {
    const b = s.Branch;
    if (!branchesMap[b]) {
      branchesMap[b] = {
        branch: b,
        total: 0,
        placed: 0,
        unplaced: 0,
        packages: [],
        aptitudeSum: 0,
        techSum: 0,
        commSum: 0,
        skillGaps: { 'High Gap': 0, 'Moderate Gap': 0, 'Low Gap': 0, 'Strong': 0 },
        internshipCount: 0,
        certSum: 0
      };
    }
    const item = branchesMap[b];
    item.total += 1;
    if (s.Placement_Status === 'Placed') {
      item.placed += 1;
      if (typeof s.Package_LPA === 'number') item.packages.push(s.Package_LPA);
    } else {
      item.unplaced += 1;
    }
    item.aptitudeSum += (s.Aptitude_Score || 0);
    item.techSum += (s.Technical_Score || 0);
    item.commSum += (s.Communication_Score || 0);
    if (s.Skill_Gap_Level) {
      item.skillGaps[s.Skill_Gap_Level] = (item.skillGaps[s.Skill_Gap_Level] || 0) + 1;
    }
    if (s.Internship_Completed === 'Yes') item.internshipCount += 1;
    item.certSum += (s.Certifications || 0);
  });

  const branchPerformance = Object.values(branchesMap).map(b => {
    const rate = parseFloat(((b.placed / b.total) * 100).toFixed(1));
    const avgPkg = b.packages.length > 0 
      ? parseFloat((b.packages.reduce((acc, val) => acc + val, 0) / b.packages.length).toFixed(2))
      : 0;
    const maxPkg = b.packages.length > 0 ? parseFloat(Math.max(...b.packages).toFixed(2)) : 0;
    return {
      branch: b.branch,
      total: b.total,
      placed: b.placed,
      unplaced: b.unplaced,
      rate,
      avgPackage: avgPkg,
      highestPackage: maxPkg,
      avgAptitude: parseFloat((b.aptitudeSum / b.total).toFixed(1)),
      avgTech: parseFloat((b.techSum / b.total).toFixed(1)),
      avgComm: parseFloat((b.commSum / b.total).toFixed(1)),
      skillGaps: b.skillGaps,
      internshipRate: parseFloat(((b.internshipCount / b.total) * 100).toFixed(1)),
      avgCertifications: parseFloat((b.certSum / b.total).toFixed(1))
    };
  });

  // Sort branch ranking by placement rate descending
  const branchRanking = [...branchPerformance].sort((a, b) => b.rate - a.rate || b.avgPackage - a.avgPackage);

  // -------------------------------------------------------------
  // 2. PLACEMENT TREND BY ACADEMIC YEAR
  // -------------------------------------------------------------
  const yearMap = {};
  students.forEach(s => {
    const y = s.Academic_Year;
    if (!yearMap[y]) {
      yearMap[y] = { year: y, total: 0, placed: 0, unplaced: 0, packages: [] };
    }
    yearMap[y].total += 1;
    if (s.Placement_Status === 'Placed') {
      yearMap[y].placed += 1;
      if (typeof s.Package_LPA === 'number') yearMap[y].packages.push(s.Package_LPA);
    } else {
      yearMap[y].unplaced += 1;
    }
  });

  const placementTrend = Object.values(yearMap)
    .sort((a, b) => a.year.localeCompare(b.year))
    .map(y => ({
      year: y.year,
      total: y.total,
      placed: y.placed,
      unplaced: y.unplaced,
      rate: parseFloat(((y.placed / y.total) * 100).toFixed(1)),
      avgPackage: y.packages.length > 0 
        ? parseFloat((y.packages.reduce((a, b) => a + b, 0) / y.packages.length).toFixed(2)) 
        : 0
    }));

  // -------------------------------------------------------------
  // 3. SKILL GAP INTELLIGENCE
  // -------------------------------------------------------------
  const skillGapCounts = { 'High Gap': 0, 'Moderate Gap': 0, 'Low Gap': 0, 'Strong': 0 };
  students.forEach(s => {
    if (s.Skill_Gap_Level && skillGapCounts[s.Skill_Gap_Level] !== undefined) {
      skillGapCounts[s.Skill_Gap_Level] += 1;
    }
  });

  const skillGapDistribution = Object.keys(skillGapCounts).map(level => ({
    level,
    count: skillGapCounts[level],
    percentage: parseFloat(((skillGapCounts[level] / totalStudents) * 100).toFixed(1))
  }));

  const skillMap = {};
  students.forEach(s => {
    const sk = s.Primary_Skill || 'Unspecified';
    if (!skillMap[sk]) {
      skillMap[sk] = {
        skill: sk,
        total: 0,
        placed: 0,
        unplaced: 0,
        packages: [],
        aptitudeSum: 0,
        techSum: 0,
        commSum: 0,
        skillGaps: { 'High Gap': 0, 'Moderate Gap': 0, 'Low Gap': 0, 'Strong': 0 }
      };
    }
    const item = skillMap[sk];
    item.total += 1;
    if (s.Placement_Status === 'Placed') {
      item.placed += 1;
      if (typeof s.Package_LPA === 'number') item.packages.push(s.Package_LPA);
    } else {
      item.unplaced += 1;
    }
    item.aptitudeSum += (s.Aptitude_Score || 0);
    item.techSum += (s.Technical_Score || 0);
    item.commSum += (s.Communication_Score || 0);
    if (s.Skill_Gap_Level) {
      item.skillGaps[s.Skill_Gap_Level] = (item.skillGaps[s.Skill_Gap_Level] || 0) + 1;
    }
  });

  const skillPerformance = Object.values(skillMap).map(sk => {
    const rate = parseFloat(((sk.placed / sk.total) * 100).toFixed(1));
    const avgPkg = sk.packages.length > 0 
      ? parseFloat((sk.packages.reduce((a, b) => a + b, 0) / sk.packages.length).toFixed(2)) 
      : 0;
    return {
      skill: sk.skill,
      total: sk.total,
      placed: sk.placed,
      unplaced: sk.unplaced,
      rate,
      avgPackage: avgPkg,
      avgAptitude: parseFloat((sk.aptitudeSum / sk.total).toFixed(1)),
      avgTech: parseFloat((sk.techSum / sk.total).toFixed(1)),
      avgComm: parseFloat((sk.commSum / sk.total).toFixed(1)),
      skillGaps: sk.skillGaps,
      highGapPct: parseFloat((((sk.skillGaps['High Gap'] || 0) / sk.total) * 100).toFixed(1))
    };
  });

  // Priority skills needing improvement (high gap % or low placement rate)
  const prioritySkills = [...skillPerformance].sort((a, b) => b.highGapPct - a.highGapPct || a.rate - b.rate);

  // -------------------------------------------------------------
  // 4. RECRUITER & PACKAGE ANALYTICS
  // -------------------------------------------------------------
  const recruiterMap = {};
  placedStudents.forEach(s => {
    const r = s.Recruiter;
    if (!r || r === 'None') return;
    if (!recruiterMap[r]) {
      recruiterMap[r] = {
        recruiter: r,
        count: 0,
        packages: [],
        skillsMap: {}
      };
    }
    recruiterMap[r].count += 1;
    if (typeof s.Package_LPA === 'number') recruiterMap[r].packages.push(s.Package_LPA);
    const sk = s.Primary_Skill;
    if (sk) {
      recruiterMap[r].skillsMap[sk] = (recruiterMap[r].skillsMap[sk] || 0) + 1;
    }
  });

  const recruiterStats = Object.values(recruiterMap).map(r => {
    const avgPkg = r.packages.length > 0 
      ? parseFloat((r.packages.reduce((a, b) => a + b, 0) / r.packages.length).toFixed(2)) 
      : 0;
    const maxPkg = r.packages.length > 0 ? parseFloat(Math.max(...r.packages).toFixed(2)) : 0;
    const minPkg = r.packages.length > 0 ? parseFloat(Math.min(...r.packages).toFixed(2)) : 0;
    const topSkills = Object.entries(r.skillsMap)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    return {
      recruiter: r.recruiter,
      count: r.count,
      avgPackage: avgPkg,
      maxPackage: maxPkg,
      minPackage: minPkg,
      topSkills,
      skillsBreakdown: r.skillsMap
    };
  }).sort((a, b) => b.count - a.count);

  // Package Distribution Buckets
  const packageBuckets = {
    '< 4 LPA': 0,
    '4 - 6 LPA': 0,
    '6 - 8 LPA': 0,
    '8 - 10 LPA': 0,
    '> 10 LPA': 0
  };

  placedStudents.forEach(s => {
    const p = s.Package_LPA;
    if (p < 4) packageBuckets['< 4 LPA'] += 1;
    else if (p >= 4 && p < 6) packageBuckets['4 - 6 LPA'] += 1;
    else if (p >= 6 && p < 8) packageBuckets['6 - 8 LPA'] += 1;
    else if (p >= 8 && p <= 10) packageBuckets['8 - 10 LPA'] += 1;
    else packageBuckets['> 10 LPA'] += 1;
  });

  const packageDistribution = Object.keys(packageBuckets).map(range => ({
    range,
    count: packageBuckets[range],
    percentage: placedCount > 0 ? parseFloat(((packageBuckets[range] / placedCount) * 100).toFixed(1)) : 0
  }));

  // -------------------------------------------------------------
  // 5. STUDENT READINESS ANALYTICS
  // -------------------------------------------------------------
  const calcProfileAvg = (arr) => {
    if (arr.length === 0) return { apt: 0, tech: 0, comm: 0, certs: 0, internshipPct: 0 };
    const apt = arr.reduce((acc, s) => acc + (s.Aptitude_Score || 0), 0) / arr.length;
    const tech = arr.reduce((acc, s) => acc + (s.Technical_Score || 0), 0) / arr.length;
    const comm = arr.reduce((acc, s) => acc + (s.Communication_Score || 0), 0) / arr.length;
    const certs = arr.reduce((acc, s) => acc + (s.Certifications || 0), 0) / arr.length;
    const intern = arr.filter(s => s.Internship_Completed === 'Yes').length;
    return {
      apt: parseFloat(apt.toFixed(1)),
      tech: parseFloat(tech.toFixed(1)),
      comm: parseFloat(comm.toFixed(1)),
      certs: parseFloat(certs.toFixed(1)),
      internshipPct: parseFloat(((intern / arr.length) * 100).toFixed(1))
    };
  };

  const placedProfile = calcProfileAvg(placedStudents);
  const unplacedProfile = calcProfileAvg(unplacedStudents);
  const overallProfile = calcProfileAvg(students);

  const withInternship = students.filter(s => s.Internship_Completed === 'Yes');
  const withoutInternship = students.filter(s => s.Internship_Completed === 'No');
  const internshipImpact = {
    withInternship: {
      total: withInternship.length,
      placed: withInternship.filter(s => s.Placement_Status === 'Placed').length,
      rate: withInternship.length > 0 ? parseFloat(((withInternship.filter(s => s.Placement_Status === 'Placed').length / withInternship.length) * 100).toFixed(1)) : 0
    },
    withoutInternship: {
      total: withoutInternship.length,
      placed: withoutInternship.filter(s => s.Placement_Status === 'Placed').length,
      rate: withoutInternship.length > 0 ? parseFloat(((withoutInternship.filter(s => s.Placement_Status === 'Placed').length / withoutInternship.length) * 100).toFixed(1)) : 0
    }
  };

  const readinessTiers = { High: 0, Moderate: 0, NeedsWork: 0 };
  students.forEach(s => {
    const score = (s.Aptitude_Score || 0) * 0.3 + (s.Technical_Score || 0) * 0.35 + (s.Communication_Score || 0) * 0.25 + (s.Internship_Completed === 'Yes' ? 5 : 0) + Math.min((s.Certifications || 0) * 2.5, 5);
    if (score >= 70) readinessTiers.High += 1;
    else if (score >= 50) readinessTiers.Moderate += 1;
    else readinessTiers.NeedsWork += 1;
  });

  const insights = generateInsights({
    totalStudents,
    placedCount,
    unplacedCount,
    placementRate,
    avgPackage,
    highestPackage,
    branchRanking,
    skillPerformance,
    prioritySkills,
    recruiterStats,
    internshipImpact,
    skillGapDistribution,
    placedProfile,
    unplacedProfile
  });

  return {
    kpis: {
      totalStudents,
      placedStudents: placedCount,
      unplacedStudents: unplacedCount,
      placementRate,
      avgPackage,
      highestPackage,
      lowestPackage
    },
    branchPerformance,
    branchRanking,
    placementTrend,
    skillGapDistribution,
    skillPerformance,
    prioritySkills,
    recruiterStats,
    packageDistribution,
    studentReadiness: {
      placedProfile,
      unplacedProfile,
      overallProfile,
      internshipImpact,
      readinessTiers
    },
    insights
  };
}

function generateInsights(data) {
  const insightsList = [];

  // 1. Branch Placement Bottleneck
  if (data.branchRanking.length > 0) {
    const lowestBranch = data.branchRanking[data.branchRanking.length - 1];
    const topBranch = data.branchRanking[0];
    const gap = (topBranch.rate - lowestBranch.rate).toFixed(1);

    insightsList.push({
      id: 'branch-gap',
      type: 'warning',
      category: 'Branch Performance',
      title: `Placement Deficit in ${lowestBranch.branch} Branch`,
      data: `Placement Rate: ${lowestBranch.branch} (${lowestBranch.rate}%, ${lowestBranch.placed}/${lowestBranch.total} placed) vs ${topBranch.branch} (${topBranch.rate}%). Gap: ${gap}%.`,
      analysis: `${lowestBranch.branch} has an unplaced count of ${lowestBranch.unplaced} students out of ${lowestBranch.total}, with average technical score of ${lowestBranch.avgTech}/100 and communication score of ${lowestBranch.avgComm}/100.`,
      insight: `Branch-specific skill misalignment and lower campus recruiter drives for ${lowestBranch.branch} hinder placement conversion compared to top branches.`,
      action: `Establish dedicated technical bootcamps for ${lowestBranch.branch} students and mandate industry-aligned project mentoring before drive dates.`
    });
  }

  // 2. High Priority Skill Gap Alert
  if (data.prioritySkills.length > 0) {
    const worstSkill = data.prioritySkills[0];
    insightsList.push({
      id: 'skill-gap-alert',
      type: 'critical',
      category: 'Skill Gap Intelligence',
      title: `High Skill Gap Identified in ${worstSkill.skill}`,
      data: `${worstSkill.highGapPct}% of students specializing in '${worstSkill.skill}' fall under 'High Gap' classification. Placement rate: ${worstSkill.rate}%.`,
      analysis: `Students with primary skill ${worstSkill.skill} average ${worstSkill.avgTech} in Technical evaluation and ${worstSkill.avgComm} in Communication.`,
      insight: `${worstSkill.skill} is critical for software engineering and analytical roles, but student practical execution lags behind recruiter expectations.`,
      action: `Deploy mandatory hands-on project labs and 4-week certification courses in ${worstSkill.skill}.`
    });
  }

  // 3. Internship Impact on Placement Success
  if (data.internshipImpact) {
    const withRate = data.internshipImpact.withInternship.rate;
    const withoutRate = data.internshipImpact.withoutInternship.rate;
    const diff = (withRate - withoutRate).toFixed(1);

    insightsList.push({
      id: 'internship-impact',
      type: 'success',
      category: 'Student Readiness',
      title: `Internships Drive +${diff}% Higher Placement Success`,
      data: `Placement Rate with Internship: ${withRate}% (${data.internshipImpact.withInternship.placed}/${data.internshipImpact.withInternship.total}) vs Without Internship: ${withoutRate}%.`,
      analysis: `Industry internship experience enhances problem solving confidence and technical round pass rates.`,
      insight: `Top recruiters heavily prioritize candidates with verified practical project experience.`,
      action: `Institute mandatory summer internship programs or university-backed industry project labs for 3rd year students.`
    });
  }

  // 4. Recruiter Preference & High LPA Opportunities
  if (data.recruiterStats.length > 0) {
    const topRecruiter = data.recruiterStats[0];
    const highestPkgRecruiter = [...data.recruiterStats].sort((a, b) => b.maxPackage - a.maxPackage)[0];

    insightsList.push({
      id: 'recruiter-analysis',
      type: 'info',
      category: 'Recruiter & Package',
      title: `Top Recruiter Volume (${topRecruiter.recruiter}) & Peak Package Offer (${highestPkgRecruiter.maxPackage} LPA)`,
      data: `${topRecruiter.recruiter} leads hiring volume with ${topRecruiter.count} placed students (Avg ${topRecruiter.avgPackage} LPA). Peak offer: ${highestPkgRecruiter.maxPackage} LPA by ${highestPkgRecruiter.recruiter}.`,
      analysis: `Primary skills demanded by top recruiters include: ${topRecruiter.topSkills.slice(0, 3).join(', ')}.`,
      insight: `High-paying recruiters (> 8 LPA) heavily screen for advanced competencies in Python, ML, SQL, and Cloud.`,
      action: `Align placement training tracks to mirror the technical screening patterns of ${topRecruiter.recruiter} and ${highestPkgRecruiter.recruiter}.`
    });
  }

  // 5. Profile Gap: Placed vs Unplaced
  if (data.placedProfile && data.unplacedProfile) {
    const techGap = (data.placedProfile.tech - data.unplacedProfile.tech).toFixed(1);
    const commGap = (data.placedProfile.comm - data.unplacedProfile.comm).toFixed(1);

    insightsList.push({
      id: 'profile-gap',
      type: 'warning',
      category: 'Student Readiness',
      title: `Technical & Communication Score Differentials`,
      data: `Placed Profile: Tech Avg ${data.placedProfile.tech}, Comm Avg ${data.placedProfile.comm}. Unplaced Profile: Tech ${data.unplacedProfile.tech}, Comm ${data.unplacedProfile.comm}.`,
      analysis: `Unplaced candidates possess baseline aptitude (${data.unplacedProfile.apt}), but drop performance in technical assessments (-${techGap} points) and verbal communication (-${commGap} points).`,
      insight: `Technical round elimination is the single largest factor preventing eligible candidates from converting interview calls into job offers.`,
      action: `Conduct intensive 1-on-1 technical mock interviews and communication workshops for unplaced students.`
    });
  }

  return insightsList;
}

function getEmptyAnalytics() {
  return {
    kpis: { totalStudents: 0, placedStudents: 0, unplacedStudents: 0, placementRate: 0, avgPackage: 0, highestPackage: 0, lowestPackage: 0 },
    branchPerformance: [],
    branchRanking: [],
    placementTrend: [],
    skillGapDistribution: [],
    skillPerformance: [],
    prioritySkills: [],
    recruiterStats: [],
    packageDistribution: [],
    studentReadiness: {
      placedProfile: { apt: 0, tech: 0, comm: 0, certs: 0, internshipPct: 0 },
      unplacedProfile: { apt: 0, tech: 0, comm: 0, certs: 0, internshipPct: 0 },
      overallProfile: { apt: 0, tech: 0, comm: 0, certs: 0, internshipPct: 0 },
      internshipImpact: { withInternship: { total: 0, placed: 0, rate: 0 }, withoutInternship: { total: 0, placed: 0, rate: 0 } },
      readinessTiers: { High: 0, Moderate: 0, NeedsWork: 0 }
    },
    insights: []
  };
}
