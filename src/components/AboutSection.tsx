"use client"

interface AboutSectionProps {
  className?: string
}

type Pillar = { title: string; description: string }
type Initiative = { title: string; description: string }
type Achievement = {
  title: string
  description: string
  year?: string
  referenceUrl?: string
  referenceLabel?: string
}

export default function AboutSection({ className = "" }: AboutSectionProps) {
  const aboutContent = {
    header: {
      title: "About AIChE NIT Rourkela",
      tagline:
        "Advancing chemical engineering at NIT Rourkela through hands-on learning, research culture, industry exposure, and community impact.",
    },
    quickNav: [
      { id: "about", label: "About Us" },
      { id: "history", label: "Our History" },
      { id: "mission", label: "Mission & Pillars" },
      { id: "initiatives", label: "Key Initiatives" },
      { id: "achievements", label: "Achievements" },
      { id: "faq", label: "FAQ" },
    ],
    about: {
      title: "About Us",
      paragraphs: [
        `AIChE NIT Rourkela is a student-driven chapter that helps learners turn classroom fundamentals into real-world problem solving. We bring together undergraduates, postgraduates, research scholars, and alumni to collaborate on projects that span process design, sustainability, safety, bio-systems, data-driven optimization, and materials.`,
        `We curate experiences—talks, workshops, plant visits, case challenges, research circles, and outreach—so members build technical depth and professional confidence. Mentorship and peer learning are core to our culture.`,
        `Our community is inclusive and interdisciplinary. Whether you’re passionate about process simulation, decarbonization, or chem-e entrepreneurship, you’ll find pathways to learn, contribute, and lead.`,
      ],
      highlights: [
        "Hands-on workshops (Aspen/HYSYS, Python for ChemE, MATLAB)",
        "Plant visits & safety-first field exposure",
        "Case competitions & ideathons",
        "Research reading groups & poster sessions",
        "Outreach & STEM engagement",
      ],
    },
    history: {
      title: "Our History",
      paragraphs: [
        `AIChE—the American Institute of Chemical Engineers—founded in 1908, is the global home of chemical engineers. Student chapters worldwide extend that mission by connecting academics, industry, and community.`,
        `At NIT Rourkela, our chapter builds on that legacy with events that emphasize process safety, sustainability, and impact—strengthening the bridge between classroom learning and industry expectations.`,
      ],
    },
    mission: {
      title: "Mission",
      paragraph:
        "Empower students to apply chemical engineering responsibly—through practical skill-building, ethical leadership, and collaborative projects that create measurable value for industry and society.",
      pillarsTitle: "Our Pillars",
      pillars: [
        {
          title: "Practical Skills",
          description:
            "Simulation, data, and design thinking to translate theory into robust, testable solutions.",
        },
        {
          title: "Safety & Ethics",
          description:
            "Process safety, sustainability, and integrity built into every activity and decision.",
        },
        {
          title: "Community & Mentorship",
          description:
            "Peer learning, alumni guidance, and inclusive spaces that help every member thrive.",
        },
        {
          title: "Industry & Research",
          description:
            "Talks, visits, internships, and research circles that align learning with real needs.",
        },
      ] as Pillar[],
    },
    initiatives: {
      title: "Key Initiatives",
      items: [
        {
          title: "Tech Workshops",
          description:
            "Bootcamps on Aspen/HYSYS, MATLAB, Python for data & optimization, and process control basics.",
        },
        {
          title: "Plant Visits & Safety",
          description:
            "Structured exposure to unit operations, HAZOP mindset, SOPs, and safety culture in action.",
        },
        {
          title: "Sustainability Track",
          description:
            "Projects on waste minimization, energy efficiency, LCA thinking, and decarbonization ideas.",
        },
        {
          title: "Case & Design Challenges",
          description:
            "Fast-paced competitions, Chem-E problems, and ideathons to test knowledge under constraints.",
        },
        {
          title: "Research Circles",
          description:
            "Reading groups, lightning talks, and poster sessions that encourage early research practice.",
        },
        {
          title: "Outreach & School Engagement",
          description:
            "STEM demos and mentorship to inspire the next generation of problem-solvers.",
        },
      ] as Initiative[],
    },
    achievements: {
      title: "Achievements",
      list: [
        {
          title: "Outstanding Student Chapter Award",
          description:
            "Recognized for program quality, professionalism, and wide-ranging community engagement.",
          year: "2019–2020",
        },
        {
          title: "Outstanding Student Chapter Award",
          description:
            "Repeat recognition for sustained excellence in events, member development, and AIChE programs.",
          year: "2020–2021",
        },
        {
          title: "International ChemE Jeopardy – Champions",
          description:
            "Team AIChE NITR clinched the international title after rigorous rounds on core & safety.",
          year: "2020–2021",
        },
        {
          title: "Donald F. & Mildred Topp Othmer Scholarship",
          description:
            "Prestigious AIChE scholarship awarded for academic excellence and impactful chapter service.",
          year: "2019–2020",
        },
        {
          title: "AIChE International Student Chapter Leadership Award",
          description:
            "Honors exemplary leadership and service—earned by chapter leadership.",
          year: "2019–2020",
        },
        {
          title: "Sophomore Academic Excellence Award",
          description:
            "Awarded to top-performing sophomore AIChE student members—two recipients from our chapter.",
          year: "2019–2020",
        },
        {
          title: "Leadership Development Travel Grant",
          description:
            "International grant to chapter leadership recognizing initiative, commitment, and impact.",
          year: "2018–2019",
        },
      ] as Achievement[],
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "Who can join?",
          a: "Students across years and disciplines interested in chemical engineering are welcome. Beginners are encouraged—events often start from fundamentals.",
        },
        {
          q: "Do I need prior software experience?",
          a: "No. Our workshops are beginner-friendly, then ramp to intermediate with practice tasks and mentorship.",
        },
        {
          q: "How do I get involved in projects?",
          a: "Watch for calls in workshops and research circles; form teams, pitch ideas to mentors, and iterate with checkpoints.",
        },
      ],
    },
  }

  return (
    <section className={`relative top-20 ${className}`}>
      {/* HERO */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="container mx-auto px-6 max-w-6xl py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              {aboutContent.header.title}
            </h2>
            <div className="w-28 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-6 rounded-full" />
            <p className="text-lg sm:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
              {aboutContent.header.tagline}
            </p>

            {/* Quick in-page nav */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {aboutContent.quickNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-blue-900/30 border border-yellow-400/40 text-yellow-200 hover:bg-yellow-400/10 hover:border-yellow-400 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* About Us */}
          <div className="relative -mt-10 mb-16" id="about">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-blue-100">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-6 text-center">
                {aboutContent.about.title}
              </h3>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8 rounded-full" />
              <div className="prose prose-lg max-w-none">
                {aboutContent.about.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {p}
                  </p>
                ))}
              </div>

              {/* Highlights chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {aboutContent.about.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-sm font-medium rounded-full px-3 py-1 bg-yellow-100 text-blue-900 border border-yellow-200"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* History */}
          <div className="mb-16" id="history">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-blue-100">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-6 text-center">
                {aboutContent.history.title}
              </h3>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8 rounded-full" />
              <div className="prose prose-lg max-w-none">
                {aboutContent.history.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Pillars */}
          <div className="mb-16" id="mission">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-blue-100">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-4 text-center">
                {aboutContent.mission.title}
              </h3>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8 rounded-full" />
              <p className="text-gray-700 leading-relaxed mb-10 text-lg text-center max-w-3xl mx-auto">
                {aboutContent.mission.paragraph}
              </p>

              <h4 className="text-xl font-semibold text-blue-950 mb-5 text-center">
                {aboutContent.mission.pillarsTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutContent.mission.pillars.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-blue-100 hover:border-yellow-400 transition-colors p-6 shadow-sm"
                  >
                    <div className="text-base font-semibold text-blue-950">{p.title}</div>
                    <p className="mt-2 text-gray-700 leading-relaxed text-sm">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Initiatives */}
          <div className="mb-20" id="initiatives">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-3xl p-10 border border-yellow-200">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-8 text-center">
                {aboutContent.initiatives.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutContent.initiatives.items.map((it, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/70 backdrop-blur p-6 border border-yellow-200 shadow-sm hover:shadow-md transition"
                  >
                    <div className="text-lg font-semibold text-blue-950">{it.title}</div>
                    <p className="mt-2 text-gray-700 leading-relaxed text-sm">{it.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements (timeline) */}
          <div className="mb-24" id="achievements">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-blue-100">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-6 text-center">
                {aboutContent.achievements.title}
              </h3>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-10 rounded-full" />

              <ul className="relative pl-6">
                <span
                  aria-hidden="true"
                  className="absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-yellow-400 to-yellow-500"
                />
                {aboutContent.achievements.list.map((a, i) => (
                  <li
                    key={i}
                    className="relative mb-8 last:mb-0 rounded-2xl border border-blue-100 hover:border-yellow-400 transition-colors"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[9px] top-6 h-4 w-4 rounded-full bg-yellow-400 ring-4 ring-white"
                    />
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <h4 className="text-2xl font-semibold text-blue-950">{a.title}</h4>
                        {a.year && (
                          <span className="text-xs font-semibold tracking-wide text-blue-900 bg-yellow-100 px-3 py-1 rounded-full">
                            {a.year}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-gray-700 leading-relaxed">{a.description}</p>
                      {a.referenceUrl && a.referenceLabel && (
                        <a
                          href={a.referenceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-3 text-sm font-medium text-yellow-700 hover:text-yellow-800 hover:underline"
                        >
                          {a.referenceLabel} ↗
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16" id="faq">
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-blue-100">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-6 text-center">
                {aboutContent.faq.title}
              </h3>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8 rounded-full" />
              <div className="space-y-4">
                {aboutContent.faq.items.map(({ q, a }, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-blue-100 p-5 hover:border-yellow-400 transition-colors"
                  >
                    <summary className="cursor-pointer list-none text-blue-950 font-semibold">
                      {q}
                      <span className="float-right text-yellow-600 group-open:rotate-45 transition-transform">＋</span>
                    </summary>
                    <p className="mt-3 text-gray-700">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}

        </div>
      </div>
    </section>
  )
}
