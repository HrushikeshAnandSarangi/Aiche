export interface BlogPost {
  id: string
  title: string
  author: string
  readTime: string
  image: string
  size: "large" | "medium" | "small"
  link: string
  excerpt: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Revolutionizing Chemical Processes with AI and Machine Learning",
    author: "Dr. Priya Sharma",
    readTime: "8 min read",
    image: "/ai-chemical-engineering-laboratory.png",
    size: "large",
    link: "/blogs/ai-chemical-processes",
    excerpt:
      "Discover how artificial intelligence is transforming traditional chemical engineering processes and creating new possibilities for innovation.",
  },
  {
    id: "2",
    title: "From Lab to Industry: Scaling Chemical Innovations",
    author: "Dr. Anita Patel",
    readTime: "10 min read",
    image: "/chemical-plant-industrial-scaling.png",
    size: "small",
    link: "/blogs/lab-to-industry-scaling",
    excerpt:
      "Learn about the challenges and strategies involved in scaling chemical innovations from laboratory research to industrial production.",
  },
  {
    id: "3",
    title: "Student Research Spotlight: Breakthrough in Polymer Science",
    author: "Arjun Mehta",
    readTime: "5 min read",
    image: "/polymer-research-laboratory-students.png",
    size: "small",
    link: "/blogs/polymer-science-breakthrough",
    excerpt:
      "Highlighting groundbreaking research by our students in polymer science and its potential applications in various industries.",
  },
  {
    id: "4",
    title: "Sustainable Engineering: Green Chemistry in Practice",
    author: "Prof. Rajesh Kumar",
    readTime: "6 min read",
    image: "/green-chemistry-sustainable-laboratory.png",
    size: "medium",
    link: "/blogs/green-chemistry-practice",
    excerpt:
      "Exploring sustainable engineering practices and how green chemistry principles are being implemented in modern chemical processes.",
  },
  {
    id: "5",
    title: "The Future of Energy: Chemical Engineering Solutions",
    author: "Dr. Vikram Singh",
    readTime: "9 min read",
    image: "/renewable-energy-chemical-engineering.png",
    size: "large",
    link: "/blogs/future-energy-solutions",
    excerpt:
      "Examining how chemical engineering is driving innovations in renewable energy and sustainable power generation technologies.",
  },
  {
    id: "6",
    title: "Career Paths in Chemical Engineering: Alumni Success Stories",
    author: "Alumni Committee",
    readTime: "7 min read",
    image: "/chemical-engineers-professional-success.png",
    size: "medium",
    link: "/blogs/alumni-success-stories",
    excerpt:
      "Inspiring stories from our alumni who have made significant contributions to the field of chemical engineering across various industries.",
  },
]
