export interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  bio: string
  linkedin?: string
  email?: string
  isMentor?: boolean
}

export const teamMembers: TeamMember[] = [
  {
    id: "mentor-1",
    name: "Prof . Sujit Sen",
    position: "Faculty Advisor",
    image: "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756414723/WhatsApp_Image_2025-08-29_at_02.26.26_d16b6803_l0vbci.jpg",
    bio: "Professor of Chemical Engineering with 15+ years of experience in process optimization and student mentorship.",
    linkedin: "https://linkedin.com/in/dr-rajesh-kumar",
    email: "rajesh.kumar@nitrkl.ac.in",
    isMentor: true,
  },
  {
    id: "president",
    name: "Sumeeth Kumar Mallick",
    position: "President",
    image: "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403526/WhatsApp_Image_2025-08-28_at_18.47.03_65a5767c_k2ughj.jpg",
    bio: "Leading AIChE NIT Rourkela with vision for innovation and excellence in chemical engineering education.",
    linkedin: "https://linkedin.com/in/sumeeth-mallick",
    email: "sumeeth@nitrkl.ac.in",
  },
  {
    id: "secretary-1",
    name: "Lokesh Dash",
    position: "Secretary",
    image: "/organized-student-secretary-chemical-engineering.png",
    bio: "Ensuring smooth operations and coordination of all chapter activities and events.",
    linkedin: "https://linkedin.com/in/lokesh-dash",
    email: "lokesh@nitrkl.ac.in",
  },
  {
    id: "treasurer",
    name: "Shrinmaya Mallick",
    position: "Treasurer",
    image: "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403456/IMG_20250516_172509_cxfc49.jpg",
    bio: "Managing chapter finances and ensuring transparent resource allocation for all initiatives.",
    linkedin: "https://linkedin.com/in/shrinmaya-mallick",
    email: "shrinmaya@nitrkl.ac.in",
  },
  {
    id: "research-head",
    name: "Arpita Priyadarshini",
    position: "Research and Development Head",
    image: "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403527/WhatsApp_Image_2025-08-28_at_11.07.18_af620d63_vsamch.jpg",
    bio: "Spearheading research initiatives and fostering innovation in chemical engineering projects.",
    linkedin: "https://linkedin.com/in/arpita-priyadarshini",
    email: "arpita@nitrkl.ac.in",
  },
  {
    id: "content-head",
    name: "Jayathri Kakarla",
    position: "Content Head",
    image: "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403534/WhatsApp_Image_2025-08-28_at_17.39.33_cac47c35_jxx5ru.jpg",
    bio: "Creating engaging content and managing communication strategies for the chapter.",
    linkedin: "https://linkedin.com/in/jayathri-kakarla",
    email: "jayathri@nitrkl.ac.in",
  },
  {
    id: "secretary-2",
    name: "Swaynsu Mohanty",
    position: "Secretary",
    image: "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403529/WhatsApp_Image_2025-08-28_at_14.33.22_e73d5203_hm2u48.jpg",
    bio: "Supporting administrative functions and maintaining chapter documentation.",
    linkedin: "https://linkedin.com/in/swaynsu-mohanty",
    email: "swaynsu@nitrkl.ac.in",
  },
  {
    id: "vp-design",
    name: "Rutuparna Routray",
    position: "Vice-President and Design Head",
    image: "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403526/WhatsApp_Image_2025-08-28_at_14.33.52_69bff342_qib9ce.jpg",
    bio: "Leading design initiatives and supporting presidential duties with creative vision.",
    linkedin: "https://linkedin.com/in/rutuparna-routray",
    email: "rutuparna@nitrkl.ac.in",
  },
  {
    id: "relations-head",
    name: "Spandan Mohanty",
    position: "General Relations Head",
    image: "/friendly-student-relations-coordinator-networking.png",
    bio: "Building strong relationships with industry partners and alumni network.",
    linkedin: "https://linkedin.com/in/spandan-mohanty",
    email: "spandan@nitrkl.ac.in",
  },
  {
    id: "web-head",
    name: "Hrushikesh Anand Sarangi",
    position: "Web Development Head",
    image: "/tech-savvy-student-web-developer-programming.png",
    bio: "Developing and maintaining digital platforms for enhanced chapter presence.",
    linkedin: "https://linkedin.com/in/hrushikesh-sarangi",
    email: "hrushikesh@nitrkl.ac.in",
  },
]
