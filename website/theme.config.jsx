export default {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src="/logo.png" alt="Platform Engineering Logo" width="32" height="32" style={{ borderRadius: '6px' }} />
      <strong style={{ fontSize: '1.2rem', letterSpacing: '-0.02em', fontWeight: 700 }}>Platform Engineering</strong>
    </div>
  ),
  project: {
    link: 'https://github.com/platform-engineering-course',
  },
  docsRepositoryBase: 'https://github.com/platform-engineering-course/tree/main/website',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Platform Engineering'
    }
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  toc: {
    float: true,
    title: "On This Page"
  },
  footer: {
    text: (
      <div className="w-full flex flex-col gap-8 py-10 px-6 md:px-8 bg-gradient-to-b from-transparent to-slate-50/80 dark:to-slate-900/80 rounded-2xl mb-8 mt-12 border border-slate-200 dark:border-slate-800/60 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <span className="text-slate-900 dark:text-white font-bold text-xl flex items-center gap-3 tracking-tight">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              Platform Engineering
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              An open-source, comprehensive curriculum designed to transform beginners into highly skilled Platform Engineers and AI Infrastructure experts.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-slate-900 dark:text-white tracking-wide text-sm uppercase">Resources</span>
            <nav className="flex flex-col gap-2.5 text-sm text-slate-500 dark:text-slate-400">
              <a href="https://github.com/platform-engineering-course/tree/main/website" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Documentation</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Course Syllabus</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Discord Community</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Contributing</a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-semibold text-slate-900 dark:text-white tracking-wide text-sm uppercase">Connect</span>
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a href="https://github.com/aloysiuspattath" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300 shadow-sm" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/aloysius-pattath/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#0A66C2] hover:text-white dark:hover:bg-[#0A66C2] dark:hover:text-white transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-200 dark:bg-slate-800/80 my-4"></div>
        
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            © {new Date().getFullYear()} Aloysius Pattath. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Designed with</span>
            <svg className="w-3.5 h-3.5 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>by AI for the Community</span>
          </div>
        </div>
      </div>
    )
  },
}
