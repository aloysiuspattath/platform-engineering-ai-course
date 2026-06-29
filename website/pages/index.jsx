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
          <div className="p-4 pt-6 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-black text-white px-2 py-1 text-xs font-bold rounded">PE</div>
              <span className="font-bold text-lg tracking-tight">Platform Eng</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2">Comprehensive curriculum for modern infrastructure.</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="border-l-2 border-black ml-4">
              <Link href="/" className="block py-2 pl-4 text-sm font-medium text-black bg-slate-50">Curriculum</Link>
            </div>
            
            <div className="px-4 mt-4">
              <div className="space-y-1">
                <Link href="/modules/module-01/lesson-01" className="flex items-center gap-2 text-sm text-slate-500 hover:text-black transition-colors py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <span>Start Learning</span>
                </Link>
                <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-black cursor-pointer py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  <span>Hands-On Labs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-black cursor-pointer py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span>Capstone Projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-black cursor-pointer py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                  <span>Quizzes</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <a href="https://github.com/platform-engineering-course" className="flex items-center gap-2 text-sm text-slate-500 hover:text-black transition-colors py-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </nav>
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
                <Link href="/modules/module-01/lesson-01" className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-black rounded shadow-sm hover:bg-slate-800 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Start Learning
                </Link>
                <a href="https://github.com/platform-engineering-course" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded shadow-sm hover:bg-slate-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Source Code
                </a>
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
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500 group-hover:bg-slate-200 group-hover:text-black transition-colors">
                              {index + 1}
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-black transition-colors">
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
