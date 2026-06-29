"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { SITE } from "@/lib/site"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative pt-8 pb-20 md:py-28 sm:pt-2 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-block mb-6">
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">Get In Touch</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-8 text-shadow-gold">Visit Us</h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-24 bg-primary/50" />
            <div className="w-2 h-2 bg-primary rotate-45" />
            <div className="h-px w-24 bg-primary/50" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            We&apos;d love to see you — walk-ins welcome, reservations encouraged on weekends
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 text-primary flex items-center justify-center border border-primary/30">
                  <MapPin size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">Address</h3>
                  <div className="h-px w-12 bg-primary mb-3" />
                  <p className="text-muted-foreground text-lg">{SITE.address.line1}</p>
                  <p className="text-muted-foreground text-lg">{SITE.address.line2}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 text-primary flex items-center justify-center border border-primary/30">
                  <Phone size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">Phone</h3>
                  <div className="h-px w-12 bg-primary mb-3" />
                  <p className="text-muted-foreground text-lg">{SITE.phone}</p>
                  <p className="text-sm text-muted-foreground mt-2">Call for reservations</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 text-primary flex items-center justify-center border border-primary/30">
                  <Mail size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">Email</h3>
                  <div className="h-px w-12 bg-primary mb-3" />
                  <p className="text-muted-foreground text-lg">{SITE.email}</p>
                  <p className="text-sm text-muted-foreground mt-2">We&apos;ll get back to you soon</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 text-primary flex items-center justify-center border border-primary/30">
                  <Clock size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">Hours</h3>
                  <div className="h-px w-12 bg-primary mb-3" />
                  <div className="space-y-2 text-muted-foreground text-lg">
                    {SITE.hours.detail.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-10 bg-card/50 backdrop-blur-sm border-primary/20">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4 text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Thanks for reaching out. We&apos;ll be in touch shortly.
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-3xl font-bold mb-8 text-foreground">Send Us a Message</h3>
                <div className="h-px w-20 bg-primary mb-8" />
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full bg-background/50 border-primary/20 focus:border-primary h-14 text-lg"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      required
                      className="w-full bg-background/50 border-primary/20 focus:border-primary h-14 text-lg"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-background/50 border-primary/20 focus:border-primary h-14 text-lg"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      required
                      className="w-full min-h-40 bg-background/50 border-primary/20 focus:border-primary text-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-medium tracking-wide glow-gold transition-all duration-300 hover:scale-105"
                  >
                    Send Message
                  </Button>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
