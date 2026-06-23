import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-sans">
      {/* Gradient overlay orbs for visual depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <main className="relative z-10 flex flex-1 w-full max-w-3xl flex-col gap-12 py-16 px-8 sm:px-16">
        {/* Profile + Headline */}
        <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl flex-shrink-0">
            <Image
              src="https://img.saysdont.com/images/etienne_wcf.jpeg"
              alt="Etienne Philippe Jacquot"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Etienne Philippe Jacquot
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Systems Administrator, DevOps Engineer, & AI Solutions Architect at the{" "}
              <a href="https://www.asc.upenn.edu" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline underline-offset-2">Annenberg School for Communication</a>
              , at the <a href="https://www.upenn.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline underline-offset-2">University of Pennsylvania</a>{" "}
            </p>
          </div>
        </section>

        {/* Details */}
        <section className="flex flex-col gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-300">
              Education
            </h2>
            <ul className="list-disc list-inside text-zinc-200 flex flex-col gap-1">
              <li>
                Bachelor in {" "}
                <a href="https://web.sas.upenn.edu/philosophyclassof2020/etienne-jacquot/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline underline-offset-2">Philosophy</a>{" "}
                (BA) from UPenn College of Arts & Sciences
              </li>
              <li>
                Master in {" "}
                <a href="https://www.law.upenn.edu/live/news/18529-penn-carey-law-commencement-2026" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline underline-offset-2">Law</a>{" "}
                (ML) from Penn Carey Law
              </li> 
            </ul>
          </div>
        </section>

        {/* Links */}
        <section className="flex flex-wrap gap-3 text-sm font-medium">
          <a
            href="https://github.com/atnjqt/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-zinc-200 hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            @atnjqt
          </a>
          <a
            href="https://www.linkedin.com/in/etienne-jacquot-2808a5365/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-zinc-200 hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            @etienne-jacquot
          </a>
          <a
            href="mailto:jacquot.etienne@gmail.com"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-zinc-200 hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            jacquot.etienne@gmail.com
          </a>
        </section>
      </main>
    </div>
  );
}
