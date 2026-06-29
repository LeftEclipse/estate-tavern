import { Facebook, Instagram } from "lucide-react"
import { SITE } from "@/lib/site"

export function Footer() {
  return (
    <footer className="relative bg-black text-foreground py-16 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-3xl font-bold mb-6 text-primary">{SITE.name}</h3>
            <div className="h-px w-16 bg-primary mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              Authentic Irish hospitality in the heart of Ostrava since {SITE.established}.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg tracking-wide text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors tracking-wide">
                  About
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-primary transition-colors tracking-wide">
                  Menu
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-primary transition-colors tracking-wide">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors tracking-wide">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg tracking-wide text-foreground">Hours</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="tracking-wide">{SITE.hours.weekdays}</li>
              <li className="tracking-wide">{SITE.hours.weekend}</li>
              <li className="tracking-wide">{SITE.hours.sunday}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg tracking-wide text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 border border-primary/30 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 border border-primary/30 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
