"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { TransitionLink } from "@/components/TransitionLink" // ✅ import our transition-aware link

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Team", href: "/team" },
    { name: "Events", href: "/events" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  const isActiveItem = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-white/5 to-purple-50/10"></div>

      <div className="relative max-w-7xl mx-auto px-2 lg:px-2">
        <div className="flex justify-between items-center h-20">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <TransitionLink
                key={item.name}
                href={item.href}
                className={`
                  relative px-3 py-1.5 font-sans  font-medium rounded-lg
                  transition-all duration-300 group backdrop-blur-sm
                  ${
                    isActiveItem(item.href)
                      ? "text-gray-800  "
                      : "text-gray-700 hover:text-gray-800 "
                  }
                `}
              >
                <span className="relative z-10">{item.name}</span>

                {isActiveItem(item.href) && (
                  <div className="absolute inset-0 rounded-lg "></div>
                )}

                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <span
                  className={`
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full
                  bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-300
                  ${isActiveItem(item.href) ? "w-4" : "w-0 group-hover:w-4"}
                `}
                ></span>
              </TransitionLink>
            ))}
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <div className="relative group">
              <div className="w-full h-full rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Image src="/Aiche-logo.svg" height={32} width={64} alt="Aiche Logo" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-200/20 to-purple-200/20 opacity-20 blur-lg scale-110 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-2xl font-bold text-gray-800 leading-none">aichenitrkl.</span>
            </div>
          </div>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <TransitionLink
              href="/contact"
              className={`
                relative px-3 py-1.5 font-sans  font-medium rounded-lg
                transition-all duration-300 group backdrop-blur-sm
                ${
                  isActiveItem("/contact")
                    ? "text-gray-800"
                    : "text-gray-700 hover:text-gray-800"
                }
              `}
            >
              <span className="relative z-10">Contact</span>

              {isActiveItem("/contact") && (
                <div className="absolute inset-0 rounded-lg "></div>
              )}

              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <span
                className={`
                absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full
                bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-300
                ${isActiveItem("/contact") ? "w-4" : "w-0 group-hover:w-4"}
              `}
              ></span>
            </TransitionLink>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-800 hover:bg-white/15 backdrop-blur-sm rounded-xl p-3 transition-all duration-300"
            >
              <div className="relative">
                {isOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`
          md:hidden absolute top-full left-0 right-0 overflow-hidden
          transition-all duration-300
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-white/5 to-purple-50/10"></div>
            <div className="relative px-6 py-6 space-y-1">
              {[...navItems, { name: "Contact", href: "/contact" }].map((item, index) => (
                <TransitionLink
                  key={item.name}
                  href={item.href}
                  className={`
                    block px-5 py-3 font-sans text-base font-medium rounded-xl
                    transition-all duration-300 backdrop-blur-sm
                    ${
                      isActiveItem(item.href)
                        ? "text-gray-800 bg-white/20 shadow-sm"
                        : "text-gray-700 hover:text-gray-800 hover:bg-white/15"
                    }
                  `}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? "fade-in 0.3s ease-out forwards" : "none",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    {isActiveItem(item.href) && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    )}
                  </span>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
