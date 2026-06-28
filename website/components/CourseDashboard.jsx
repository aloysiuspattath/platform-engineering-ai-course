export function CourseDashboard() {
  const modules = [
    { id: 'module-01', display: 'MOD-01', title: 'Getting Started with Linux', difficulty: 'Beginner', time: '2h', color: 'bg-blue-500', progress: '100%' },
    { id: 'module-02', display: 'MOD-02', title: 'Linux Administration', difficulty: 'Beginner', time: '3h', color: 'bg-emerald-500', progress: '100%' },
    { id: 'module-03', display: 'MOD-03', title: 'Linux Internals', difficulty: 'Intermediate', time: '4h', color: 'bg-amber-500', progress: '100%' },
    { id: 'module-04', display: 'MOD-04', title: 'Networking Fundamentals', difficulty: 'Intermediate', time: '3h', color: 'bg-indigo-500', progress: '100%' },
    { id: 'module-05', display: 'MOD-05', title: 'Version Control & CI/CD', difficulty: 'Intermediate', time: '4h', color: 'bg-purple-500', progress: '100%' },
    { id: 'module-06', display: 'MOD-06', title: 'Containerization & Docker', difficulty: 'Intermediate', time: '5h', color: 'bg-sky-500', progress: '100%' },
    { id: 'module-07', display: 'MOD-07', title: 'DevSecOps & Security', difficulty: 'Advanced', time: '5h', color: 'bg-red-500', progress: '100%' },
    { id: 'module-08', display: 'MOD-TF', title: 'Infrastructure as Code', difficulty: 'Advanced', time: '6h', color: 'bg-blue-500', progress: '100%' },
    { id: 'module-09', display: 'MOD-CLOUD', title: 'Cloud Platforms Architecture', difficulty: 'Advanced', time: '6h', color: 'bg-emerald-500', progress: '100%' },
    { id: 'module-10', display: 'MOD-K8S', title: 'Kubernetes Engineering', difficulty: 'Advanced', time: '8h', color: 'bg-amber-500', progress: '100%' },
    { id: 'module-11', display: 'MOD-CICD', title: 'CI/CD Pipelines & GitOps', difficulty: 'Advanced', time: '5h', color: 'bg-indigo-500', progress: '100%' },
    { id: 'module-12', display: 'MOD-OBS', title: 'Observability & Monitoring', difficulty: 'Advanced', time: '5h', color: 'bg-purple-500', progress: '100%' },
    { id: 'module-13', display: 'MOD-SRE', title: 'Site Reliability Engineering', difficulty: 'Advanced', time: '5h', color: 'bg-sky-500', progress: '100%' },
    { id: 'module-14', display: 'MOD-AI', title: 'AI Infra & LLM Serving', difficulty: 'Expert', time: '8h', color: 'bg-red-500', progress: '100%' },
    { id: 'module-15', display: 'MOD-MLOPS', title: 'MLOps & Vector Databases', difficulty: 'Expert', time: '6h', color: 'bg-blue-500', progress: '100%' },
    { id: 'module-16', display: 'MOD-IDP', title: 'Internal Developer Platforms', difficulty: 'Expert', time: '6h', color: 'bg-emerald-500', progress: '100%' },
    { id: 'module-17', display: 'MOD-ADV', title: 'Advanced Systems & Scaling', difficulty: 'Expert', time: '6h', color: 'bg-amber-500', progress: '100%' },
    { id: 'module-18', display: 'MOD-CAP', title: 'Production Platform Capstone', difficulty: 'Expert', time: '10h', color: 'bg-indigo-500', progress: '100%' },
    { id: 'module-19', display: 'MOD-CAR', title: 'System Design Interview Prep', difficulty: 'Expert', time: '4h', color: 'bg-purple-500', progress: '100%' },
  ];

  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Learning Roadmap</h2>
        <span className="text-sm font-medium text-slate-500">19 / 19 Modules Completed</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map(mod => (
          <a key={mod.id} href={`/modules/${mod.id}/${mod.id === 'module-10' ? 'lesson-01-kubernetes-architecture' : 'lesson-01'}`} className="group block p-6 rounded-2xl bg-slate-50 dark:bg-darkcard border border-slate-200 dark:border-darkborder hover:border-primary dark:hover:border-primary transition-all shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 text-xs font-semibold text-white rounded-md shadow-sm ${mod.color}`}>
                {mod.display}
              </span>
              <div className="flex gap-2">
                <span className="text-xs font-medium px-2.5 py-1 bg-white dark:bg-[#0b0c10] rounded-md border border-slate-200 dark:border-darkborder">
                  {mod.difficulty}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 bg-white dark:bg-[#0b0c10] rounded-md border border-slate-200 dark:border-darkborder flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {mod.time}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{mod.title}</h3>
            <div className="w-full bg-slate-200 dark:bg-darkbg rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full transition-all duration-1000" style={{ width: mod.progress }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
