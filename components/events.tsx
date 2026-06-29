"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Music, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { IMAGES } from "@/lib/site"

export function Events() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const events = [
    {
      title: "Live Irish Music",
      day: "Every Friday & Saturday",
      time: "8:00 PM - 11:00 PM",
      description: "Traditional Irish folk music with local musicians",
      icon: Music,
    },
    {
      title: "Trivia Night",
      day: "Every Wednesday",
      time: "7:00 PM - 9:00 PM",
      description: "Test your knowledge, win prizes, and enjoy a pint on us",
      icon: Users,
    },
    {
      title: "St. Patrick's Day Celebration",
      day: "March 17th",
      time: "All Day",
      description: "Special menu, live music, and festivities all day long",
      icon: Calendar,
    },
    {
      title: "Sunday Brunch",
      day: "Every Sunday",
      time: "10:00 AM - 2:00 PM",
      description: "Full Irish breakfast and brunch specials",
      icon: Clock,
    },
  ]

  return (
    <section id="events" ref={sectionRef} className="relative py-20 md:py-28 sm:pt-2 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.eventSpace} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-block mb-6">
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">Entertainment</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-8 text-shadow-gold">
            Events & Celebrations
          </h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-24 bg-primary/50" />
            <div className="w-2 h-2 bg-primary rotate-45" />
            <div className="h-px w-24 bg-primary/50" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            There&apos;s always something happening at the pub
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {events.map((event, index) => (
            <Card
              key={index}
              className={`p-10 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 text-primary flex items-center justify-center border border-primary/30">
                  <event.icon size={32} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-3xl font-bold mb-4 text-foreground">{event.title}</h3>
                  <div className="flex flex-col gap-2 mb-4">
                    <p className="font-medium text-primary text-lg tracking-wide">{event.day}</p>
                    <p className="text-muted-foreground tracking-wide">{event.time}</p>
                  </div>
                  <div className="h-px w-full bg-primary/20 mb-4" />
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-primary/20 p-12">
            <h3 className="font-serif text-3xl font-bold mb-4 text-foreground">Private Events</h3>
            <div className="h-px w-20 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Got a birthday, work do, or family gathering? Our back room fits up to 40 guests — get in touch and
              we&apos;ll sort the rest.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-base font-medium tracking-wide glow-gold transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#contact">Inquire About Private Events</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
