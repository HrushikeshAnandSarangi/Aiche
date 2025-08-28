export interface Event {
  id: number
  title: string
  description: string
  story: string
  impact: string
  date: string
  time: string
  location: string
  category: string
  academicYear: string
  attendees: number
  image: string
  status: "upcoming" | "completed"
  highlights: string[]
  registrationLink?: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

export const eventsData: Event[] = [
  {
    id: 1,
    title: "Chemical Process Design Workshop",
    description: "Hands-on workshop covering fundamentals of chemical process design using industry-standard software.",
    story:
      "In the heart of our state-of-the-art Chemical Engineering Lab, students embark on a transformative journey from theoretical knowledge to practical mastery. This intensive workshop bridges the gap between classroom learning and real-world application, where every simulation tells a story of innovation.",
    impact:
      "Over 200 students have launched successful careers in process engineering after attending this workshop, with many now leading major industrial projects worldwide.",
    date: "2024-03-15",
    time: "10:00 AM - 4:00 PM",
    location: "Chemical Engineering Lab",
    category: "Workshop",
    academicYear: "2023-24",
    attendees: 45,
    image: "/chemical-engineering-workshop-laboratory-equipment.png",
    status: "upcoming",
    registrationLink: "https://forms.google.com/workshop-registration",
    highlights: [
      "Industry-standard ASPEN Plus software training",
      "Real plant case studies from IOCL and ONGC",
      "Hands-on reactor design simulation",
      "Certificate from AIChE International",
    ],
    testimonial: {
      quote:
        "This workshop completely changed my perspective on chemical engineering. The practical approach helped me land my dream job at Reliance Industries.",
      author: "Priya Sharma",
      role: "Process Engineer, Reliance Industries (Batch 2022)",
    },
  },
  {
    id: 2,
    title: "Industry Expert Lecture Series",
    description:
      "Distinguished professionals from leading chemical companies share insights on current industry trends.",
    story:
      "Every month, our auditorium transforms into a nexus of knowledge where industry titans share their wisdom. These aren't just lectures—they're glimpses into the future of chemical engineering, told by those who are shaping it.",
    impact:
      "This series has directly influenced curriculum updates and research directions, keeping NIT Rourkela at the forefront of chemical engineering education.",
    date: "2024-02-28",
    time: "2:00 PM - 5:00 PM",
    location: "Main Auditorium",
    category: "Lecture",
    academicYear: "2023-24",
    attendees: 120,
    image: "/professional-lecture-auditorium-presentation.png",
    status: "completed",
    highlights: [
      "Guest speakers from Fortune 500 companies",
      "Interactive Q&A sessions",
      "Networking opportunities with industry leaders",
      "Career guidance and mentorship programs",
    ],
    testimonial: {
      quote:
        "The insights shared by Dr. Rajesh Kumar from ITC changed my research direction completely. Now I'm working on sustainable packaging solutions.",
      author: "Amit Patel",
      role: "PhD Scholar, Chemical Engineering",
    },
  },
  {
    id: 3,
    title: "ChemE Quiz Competition",
    description: "Test your knowledge in chemical engineering concepts, processes, and current developments.",
    story:
      "The annual ChemE Quiz is more than a competition—it's a celebration of intellectual curiosity. Teams battle through rounds of challenging questions, from fundamental thermodynamics to cutting-edge nanotechnology applications.",
    impact:
      "Winners have gone on to represent India in international chemical engineering competitions, bringing global recognition to NIT Rourkela.",
    date: "2024-04-10",
    time: "6:00 PM - 8:00 PM",
    location: "Seminar Hall",
    category: "Competition",
    academicYear: "2023-24",
    attendees: 80,
    image: "/quiz-competition-students-chemical-engineering.png",
    status: "upcoming",
    registrationLink: "https://forms.google.com/quiz-registration",
    highlights: [
      "Multi-round elimination format",
      "Questions from Nobel Prize-winning research",
      "Cash prizes worth ₹50,000",
      "Direct entry to national competitions",
    ],
    testimonial: {
      quote:
        "Winning the ChemE Quiz boosted my confidence tremendously. It prepared me for the technical interviews at Microsoft Research.",
      author: "Sneha Reddy",
      role: "Research Scientist, Microsoft (Batch 2021)",
    },
  },
  {
    id: 4,
    title: "Plant Visit to IOCL Refinery",
    description: "Educational visit to understand real-world applications of chemical engineering principles.",
    story:
      "Standing before the towering distillation columns of IOCL Paradip, students witness the magnificent scale of chemical engineering in action. Every pipe, every valve tells a story of precision, safety, and innovation that textbooks can never fully capture.",
    impact:
      "These visits have inspired 15+ students to pursue careers in petroleum refining, with several now holding key positions in major oil companies.",
    date: "2023-11-20",
    time: "8:00 AM - 6:00 PM",
    location: "IOCL Refinery, Paradip",
    category: "Field Trip",
    academicYear: "2022-23",
    attendees: 35,
    image: "/industrial-refinery-chemical-plant-visit.png",
    status: "completed",
    highlights: [
      "Guided tour by senior plant engineers",
      "Live process demonstrations",
      "Safety protocol training",
      "Interaction with plant management",
    ],
    testimonial: {
      quote: "Seeing the actual refinery operations made everything click. The scale and complexity were mind-blowing!",
      author: "Rohit Kumar",
      role: "Process Engineer, BPCL (Batch 2023)",
    },
  },
  {
    id: 5,
    title: "Research Paper Presentation",
    description: "Students present their research findings in various domains of chemical engineering.",
    story:
      "Our conference room buzzes with excitement as young researchers present groundbreaking work. From sustainable biofuels to advanced materials, each presentation represents months of dedication and the promise of tomorrow's innovations.",
    impact:
      "Student research presented here has led to 25+ publications in international journals and 5 patent applications.",
    date: "2024-05-15",
    time: "9:00 AM - 12:00 PM",
    location: "Conference Room",
    category: "Research",
    academicYear: "2023-24",
    attendees: 60,
    image: "/research-presentation-students-academic-conference.png",
    status: "upcoming",
    registrationLink: "https://forms.google.com/research-presentation",
    highlights: [
      "Peer-reviewed research presentations",
      "Faculty mentorship program",
      "Best paper awards",
      "Publication opportunities",
    ],
    testimonial: {
      quote: "Presenting my research here gave me the confidence to pursue a PhD at MIT. The feedback was invaluable.",
      author: "Kavya Nair",
      role: "PhD Student, MIT (Batch 2022)",
    },
  },
  {
    id: 6,
    title: "Alumni Networking Meet",
    description: "Connect with successful alumni working in top chemical companies worldwide.",
    story:
      "Once a year, our halls echo with stories of success as alumni return to share their journeys. From startup founders to corporate leaders, each conversation plants seeds of inspiration in the minds of current students.",
    impact:
      "This network has facilitated 100+ job placements and mentorship relationships, creating a global community of NIT Rourkela chemical engineers.",
    date: "2023-09-25",
    time: "5:00 PM - 8:00 PM",
    location: "Alumni Hall",
    category: "Networking",
    academicYear: "2022-23",
    attendees: 90,
    image: "/professional-networking-alumni-meeting.png",
    status: "completed",
    highlights: [
      "Alumni from 20+ countries",
      "One-on-one mentorship sessions",
      "Career guidance workshops",
      "Startup pitch presentations",
    ],
    testimonial: {
      quote:
        "Meeting alumni working at Google and Tesla opened my eyes to possibilities I never imagined. Now I'm working on AI applications in chemical processes.",
      author: "Arjun Singh",
      role: "AI Research Engineer, Tesla (Batch 2023)",
    },
  },
]

export const academicYears = ["All Years", "2023-24", "2022-23", "2021-22", "2020-21"]

export const categories = ["All", "Workshop", "Lecture", "Competition", "Field Trip", "Research", "Networking"]

export const categoryColors = {
  Workshop: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  Lecture: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  Competition: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  "Field Trip": "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
  Research: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  Networking: "bg-orange-50 text-orange-700 hover:bg-orange-100",
}
