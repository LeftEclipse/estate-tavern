import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Menu } from "@/components/menu"
import { Gallery } from "@/components/gallery"
import { Events } from "@/components/events"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Events />
      <Contact />
      <Footer />
    </main>
  )
}
