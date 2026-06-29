import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const roadmapData = [
  {
    step: 1,
    title: 'IT Foundations',
    modules: [
      { id: 'module-01', title: 'Getting Started with Linux', link: '/modules/module-01/lesson-01' },
      { id: 'module-02', title: 'Linux Administration', link: '/modules/module-02/lesson-01' },
      { id: 'module-03', title: 'Linux Internals', link: '/modules/module-03/lesson-01' },
      { id: 'module-04', title: 'Networking Fundamentals', link: '/modules/module-04/lesson-01' },
      { id: 'module-05', title: 'Version Control with Git', link: '/modules/module-05/lesson-01' },
    ]
  },
  {
    step: 2,
    title: 'Core Platform Engineering',
    modules: [
      { id: 'module-06', title: 'Containers & Docker', link: '/modules/module-06/lesson-01' },
      { id: 'module-07', title: 'Security Fundamentals', link: '/modules/module-07/lesson-01' },
    ]
  },
  {
    step: 3,
    title: 'Cloud & Infrastructure Automation',
    modules: [
      { id: 'module-08', title: 'Infrastructure as Code (Terraform)', link: '/modules/module-08/lesson-01' },
      { id: 'module-09', title: 'Cloud Platforms & Architecture', link: '/modules/module-09/lesson-01' },
    ]
  },
  {
    step: 4,
    title: 'Containerization & Orchestration',
    modules: [
      { id: 'module-10', title: 'Kubernetes Engineering', link: '/modules/module-10/lesson-01-kubernetes-architecture' },
      { id: 'module-11', title: 'CI/CD Pipelines & Automation', link: '/modules/module-11/lesson-01' },
    ]
  },
  {
    step: 5,
    title: 'Observability & Reliability',
    modules: [
      { id: 'module-12', title: 'Observability (Prometheus & Grafana)', link: '/modules/module-12/lesson-01' },
      { id: 'module-13', title: 'Site Reliability Engineering (SRE)', link: '/modules/module-13/lesson-01' },
    ]
  },
  {
    step: 6,
    title: 'AI Infrastructure',
    modules: [
      { id: 'module-14', title: 'AI Infrastructure & LLM Serving', link: '/modules/module-14/lesson-01' },
      { id: 'module-15', title: 'MLOps & Vector Databases', link: '/modules/module-15/lesson-01' },
    ]
  },
  {
    step: 7,
    title: 'Enterprise Platform Engineering',
    modules: [
      { id: 'module-16', title: 'Internal Developer Platforms (IDPs)', link: '/modules/module-16/lesson-01' },
      { id: 'module-17', title: 'Advanced Systems & Scaling', link: '/modules/module-17/lesson-01' },
    ]
  },
  {
    step: 8,
    title: 'Capstone Projects',
    modules: [
      { id: 'module-18', title: 'Capstone Portfolio', link: '/modules/module-18/lesson-01' },
    ]
  },
  {
    step: 9,
    title: 'Interview & Career Preparation',
    modules: [
      { id: 'module-19', title: 'Career & System Design', link: '/modules/module-19/lesson-01' },
    ]
  }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Learning Plan - Platform Engineering Course</title>
      </Head>
      <div className="flex min-h-screen bg-[#fafafa] font-sans text-slate-900">
        
        {/* Left Sidebar */}
        <div className="w-64 border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col bg-white overflow-y-auto z-10 hidden md:flex">
          {/* Logo */}
          <div className="p-4 pt-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-black text-white px-2 py-1 text-xs font-bold rounded">AI</div>
              <span className="font-bold text-lg tracking-tight">AI Tutor</span>
            </div>
            <div className="text-xs text-slate-500 mb-6">by roadmap.sh</div>
            <div className="text-[11px] text-slate-400">Your personalized learning companion for any topic</div>
          </div>

          {/* Create with AI */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between text-sm text-slate-700 hover:text-black cursor-pointer py-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span>Create with AI</span>
              </div>
              <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="border-l-2 border-black ml-4">
              <div className="py-2 pl-4 text-sm font-medium text-black bg-slate-50">Plan</div>
              <div className="py-2 pl-4 text-sm text-slate-500 hover:text-black cursor-pointer">Course</div>
              <div className="py-2 pl-4 text-sm text-slate-500 hover:text-black cursor-pointer">Guide</div>
              <div className="py-2 pl-4 text-sm text-slate-500 hover:text-black cursor-pointer">Roadmap</div>
              <div className="py-2 pl-4 text-sm text-slate-500 hover:text-black cursor-pointer">Quiz</div>
            </div>
            
            <div className="px-4 mt-6">
              <div className="flex items-center justify-between text-sm text-slate-700 hover:text-black cursor-pointer py-2 mb-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <span>My Learning</span>
                </div>
                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-black cursor-pointer py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  <span>Ask AI Tutor</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-black cursor-pointer py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                  <span>Roadmap Chat</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-black cursor-pointer py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  <span>Staff Picks</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-black cursor-pointer py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span>Community</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Upgrade Box */}
          <div className="mx-4 mb-4 p-4 rounded-xl bg-[#fdf5e6] border border-[#f3e1bd]">
            <div className="flex items-center gap-1.5 font-bold text-[#b47a16] mb-2 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" /></svg>
              Upgrade
            </div>
            <p className="text-xs text-[#a37119] mb-4 font-medium leading-relaxed pr-2">
              Get access to all features and benefits of the AI Tutor.
            </p>
            <div className="h-1 bg-[#f3e1bd] rounded-full mb-2">
              <div className="h-1 bg-[#dcb15b] rounded-full w-[12%]"></div>
            </div>
            <div className="text-[10px] text-[#a37119] font-medium">12% of the daily limit used</div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-sm">
                <img src="https://github.com/aloysiuspattath.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-slate-800">ALOYSIUS THOMAS</div>
                <div className="text-[10px] text-slate-500">Free User</div>
              </div>
            </div>
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-64">
          <div className="max-w-[800px] mx-auto py-12 px-6 sm:px-8 md:py-16">
            
            {/* Header */}
            <div className="mb-12">
              <div className="text-[13px] text-slate-400 mb-2 font-medium">Learning Plan</div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight tracking-tight">
                Platform Engineering and AI Infrastructure Career Path
              </h1>
              <div className="text-sm text-slate-500 mb-6 font-medium">
                9 steps. 19 courses
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Revise Plan
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Remove Plan
                </button>
              </div>
            </div>

            {/* Steps Container */}
            <div className="space-y-10">
              {roadmapData.map((stage) => (
                <div key={stage.step}>
                  {/* Step Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 border-b border-slate-200 pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#0f172a] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Step {stage.step}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{stage.title}</h2>
                    </div>
                    <span className="text-[13px] text-slate-400 font-medium">{stage.modules.length} courses</span>
                  </div>

                  {/* Courses List */}
                  <div className="space-y-2">
                    {stage.modules.map((module, index) => (
                      <Link href={module.link} key={module.id} className="block group">
                        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500 group-hover:bg-slate-200 transition-colors">
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">
                              {module.title}
                            </span>
                          </div>
                          <div className="text-slate-300 group-hover:text-slate-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center text-xs text-slate-400 font-medium pb-8">
              &copy; {new Date().getFullYear()} Platform Engineering Course
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
