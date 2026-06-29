"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin, Phone, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SITE } from "@/lib/site"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#gallery", label: "Gallery" },
    { href: "#events", label: "Events" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-xl shadow-2xl border-b border-primary/20" : "bg-transparent"
        } ${isMobileMenuOpen ? "hidden md:block" : ""}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl md:text-3xl font-serif font-bold text-primary tracking-wide hover:text-primary/80 transition-colors"
            >
              <Image
                src="/logo.svg"
                alt={`${SITE.name} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
              {SITE.name}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium tracking-wider text-sm uppercase relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <Link href="/reservation">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-medium tracking-wide glow-gold transition-all duration-300 hover:scale-105">
                  Reserve
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground hover:text-primary transition-colors z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Background overlay with blur */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          
          {/* Menu Content */}
          <div className="relative h-full w-full flex flex-col px-6 py-8 overflow-y-auto">
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between mb-12">
              <Link
                href="/"
                className="flex items-center gap-3 text-2xl font-serif font-bold text-primary tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/logo.svg"
                  alt={`${SITE.name} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
                {SITE.name}
              </Link>
              <button
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 mb-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-primary transition-colors font-medium py-2 tracking-wider uppercase text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              <Link href="/reservation" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-6 font-medium tracking-wide text-base">
                  Reserve Table
                </Button>
              </Link>
              <Link href="#menu" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-6 font-medium tracking-wide text-base">
                  Explore Menu
                </Button>
              </Link>
              <Link href="/reservation" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full py-6 font-medium tracking-wide text-base bg-transparent"
                >
                  Reserve Your Table
                </Button>
              </Link>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-4 mb-8 text-white/80">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary" size={18} />
                <span className="text-sm">{SITE.address.full}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" size={18} />
                <span className="text-sm">{SITE.phone}</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-auto mb-8 flex flex-col items-center gap-2 text-white">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <ChevronDown size={24} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
