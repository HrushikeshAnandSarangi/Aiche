import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="bg-blue-950 text-white py-16" aria-labelledby="site-footer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="site-footer-heading" className="sr-only">Footer</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Logo and Description - Left */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/Aiche-logo.svg"
                alt="AIChE NIT Rourkela logo"
                height={124}
                width={124}
                priority
              />
              <div>
                <p className="text-xl font-bold text-white">AIChE</p>
                <p className="text-sm text-gray-400">NIT Rourkela</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Empowering the next generation of chemical engineers through innovation, collaboration, and real-world
              impact. Join us in shaping the future of chemical engineering at NIT Rourkela.
            </p>

            <address className="not-italic space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                <span>NIT Rourkela, Odisha, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                <a href="mailto:aiche@nitrkl.ac.in" className="hover:text-yellow-400 transition-colors">
                  aiche@nitrkl.ac.in
                </a>
              </div>
            </address>
          </div>

          {/* Quick Links - Middle */}
          <nav className="lg:mx-auto" aria-label="Quick links">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link href="/about" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  About Us
                </Link>
                <Link href="/team" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Our Team
                </Link>
                <Link href="/events" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Events
                </Link>
                <Link href="/blogs" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Blogs
                </Link>
              </div>
            </div>
          </nav>

          {/* Social Links - Right */}
          <div className="lg:ml-auto">
            <h3 className="text-lg font-semibold text-white mb-6">Connect With Us</h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">Follow us on social media for updates and insights</p>
              <div className="flex space-x-4" aria-label="Social media">
                <a
                  href="https://facebook.com/aichenitrourkela"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AIChE NIT Rourkela on Facebook"
                  className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" aria-hidden="true" />
                </a>
                <a
                  href="https://twitter.com/aichenitrourkela"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AIChE NIT Rourkela on Twitter/X"
                  className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white" aria-hidden="true" />
                </a>
                <a
                  href="https://instagram.com/aichenitrourkela"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AIChE NIT Rourkela on Instagram"
                  className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com/company/aichenitrourkela"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AIChE NIT Rourkela on LinkedIn"
                  className="w-10 h-10 bg-slate-800 hover:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} AIChE NIT Rourkela. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
