"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Users, MapPin, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"

type TableStatus = "available" | "selected" | "reserved" | "unavailable"

interface Table {
  id: string
  number: number
  capacity: number
  status: TableStatus
  position: { x: number; y: number }
}

export default function ReservationPage() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [guests, setGuests] = useState<string>("")
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock table layout - represents a pub floor plan
  const [tables, setTables] = useState<Table[]>([
    { id: "1", number: 1, capacity: 2, status: "available", position: { x: 10, y: 10 } },
    { id: "2", number: 2, capacity: 4, status: "available", position: { x: 30, y: 10 } },
    { id: "3", number: 3, capacity: 2, status: "available", position: { x: 50, y: 10 } },
    { id: "4", number: 4, capacity: 6, status: "available", position: { x: 70, y: 10 } },
    { id: "5", number: 5, capacity: 4, status: "reserved", position: { x: 10, y: 30 } },
    { id: "6", number: 6, capacity: 2, status: "available", position: { x: 30, y: 30 } },
    { id: "7", number: 7, capacity: 4, status: "available", position: { x: 50, y: 30 } },
    { id: "8", number: 8, capacity: 8, status: "available", position: { x: 70, y: 30 } },
    { id: "9", number: 9, capacity: 2, status: "available", position: { x: 20, y: 50 } },
    { id: "10", number: 10, capacity: 4, status: "available", position: { x: 40, y: 50 } },
    { id: "11", number: 11, capacity: 6, status: "available", position: { x: 60, y: 50 } },
    { id: "12", number: 12, capacity: 2, status: "unavailable", position: { x: 80, y: 50 } },
  ])

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
    "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
  ]

  const handleTableClick = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId)
    if (table && (table.status === "available" || table.status === "selected")) {
      // Reset previously selected table
      setTables((prev) =>
        prev.map((t) => (t.status === "selected" ? { ...t, status: "available" } : t))
      )
      // Set new selected table
      setTables((prev) =>
        prev.map((t) => (t.id === tableId ? { ...t, status: "selected" } : t))
      )
      setSelectedTable(tableId)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !guests || !selectedTable) {
      return
    }
    setIsSubmitted(true)
  }

  const getTableColor = (status: TableStatus) => {
    switch (status) {
      case "available":
        return "bg-primary/20 border-primary/40 hover:bg-primary/30 cursor-pointer"
      case "selected":
        return "bg-primary border-primary shadow-lg scale-110 cursor-pointer glow-gold"
      case "reserved":
        return "bg-muted border-muted-foreground/30 opacity-50 cursor-not-allowed"
      case "unavailable":
        return "bg-destructive/20 border-destructive/40 opacity-50 cursor-not-allowed"
      default:
        return "bg-card border-border"
    }
  }

  const availableTables = tables.filter(
    (t) => t.status === "available" || t.status === "selected"
  )
  const filteredTables = guests
    ? availableTables.filter((t) => t.capacity >= parseInt(guests))
    : availableTables

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-4xl font-serif mb-4 text-foreground">
                See You at {SITE.name}!
              </CardTitle>
              <CardDescription className="text-lg mb-8">
                Your table is booked. We look forward to welcoming you.
              </CardDescription>
              <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{date && format(date, "PPP")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Table:</span>
                    <span className="font-medium">
                      Table {tables.find((t) => t.id === selectedTable)?.number}
                    </span>
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setDate(undefined)
                  setTime("")
                  setGuests("")
                  setSelectedTable(null)
                  setFormData({ name: "", email: "", phone: "", specialRequests: "" })
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                Make Another Reservation
              </Button>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
                Book Your Table
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-8 text-shadow-gold">
              Make a Reservation
            </h1>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-24 bg-primary/50" />
              <div className="w-2 h-2 bg-primary rotate-45" />
              <div className="h-px w-24 bg-primary/50" />
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
              Pick your date, choose a table, and we&apos;ll have everything ready for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Booking Details */}
              <div className="space-y-8">
                {/* Date Selection */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-serif">
                      <CalendarIcon className="w-6 h-6 text-primary" />
                      Select Date
                    </CardTitle>
                    <CardDescription>Choose your preferred date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-14 text-lg bg-background/50 border-primary/20",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </Card>

                {/* Time Selection */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-serif">
                      <Clock className="w-6 h-6 text-primary" />
                      Select Time
                    </CardTitle>
                    <CardDescription>Choose your preferred time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="w-full h-14 text-lg bg-background/50 border-primary/20">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Number of Guests */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-serif">
                      <Users className="w-6 h-6 text-primary" />
                      Number of Guests
                    </CardTitle>
                    <CardDescription>How many people will be joining?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="w-full h-14 text-lg bg-background/50 border-primary/20">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Customer Information */}
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">Your Information</CardTitle>
                    <CardDescription>We'll use this to confirm your reservation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                        className="h-14 text-lg bg-background/50 border-primary/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        required
                        className="h-14 text-lg bg-background/50 border-primary/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base mb-2 block">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+420 777 212 491"
                        required
                        className="h-14 text-lg bg-background/50 border-primary/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialRequests" className="text-base mb-2 block">
                        Special Requests
                      </Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) =>
                          setFormData({ ...formData, specialRequests: e.target.value })
                        }
                        placeholder="Dietary restrictions, celebrations, etc."
                        className="min-h-24 text-lg bg-background/50 border-primary/20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Table Selection */}
              <div className="space-y-8">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-serif">
                      <MapPin className="w-6 h-6 text-primary" />
                      Select Your Table
                    </CardTitle>
                    <CardDescription>
                      {guests
                        ? `Tables available for ${guests} ${parseInt(guests) === 1 ? "guest" : "guests"}`
                        : "Select number of guests first"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Table Legend */}
                    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-background/30 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-primary/40 bg-primary/20" />
                        <span className="text-sm text-muted-foreground">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-primary bg-primary glow-gold" />
                        <span className="text-sm text-muted-foreground">Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-muted-foreground/30 bg-muted opacity-50" />
                        <span className="text-sm text-muted-foreground">Reserved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-destructive/40 bg-destructive/20 opacity-50" />
                        <span className="text-sm text-muted-foreground">Unavailable</span>
                      </div>
                    </div>

                    {/* Table Floor Plan */}
                    <div className="relative bg-background/30 rounded-lg border-2 border-primary/20 p-8 min-h-[500px]">
                      {/* Bar Area */}
                      <div className="absolute top-0 left-0 right-0 h-16 bg-primary/10 border-b-2 border-primary/30 rounded-t-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-primary uppercase tracking-wider">
                          Bar
                        </span>
                      </div>

                      {/* Tables Grid */}
                      <div className="relative mt-20 grid grid-cols-4 gap-8">
                        {filteredTables.map((table) => (
                          <div
                            key={table.id}
                            onClick={() => handleTableClick(table.id)}
                            className={cn(
                              "relative transition-all duration-300 rounded-lg border-2 p-4 flex flex-col items-center justify-center",
                              getTableColor(table.status)
                            )}
                          >
                            <div className="text-center">
                              <div className="text-lg font-bold mb-1">Table {table.number}</div>
                              <div className="text-xs text-muted-foreground">
                                {table.capacity} {table.capacity === 1 ? "seat" : "seats"}
                              </div>
                            </div>
                            {table.status === "selected" && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {filteredTables.length === 0 && guests && (
                        <div className="flex items-center justify-center h-full text-center">
                          <div>
                            <p className="text-muted-foreground text-lg mb-2">
                              No tables available for {guests} {parseInt(guests) === 1 ? "guest" : "guests"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Please try a different number of guests
                            </p>
                          </div>
                        </div>
                      )}

                      {!guests && (
                        <div className="flex items-center justify-center h-full text-center">
                          <p className="text-muted-foreground text-lg">
                            Select number of guests to see available tables
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedTable && (
                      <div className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                        <p className="text-sm font-medium text-primary">
                          Selected: Table {tables.find((t) => t.id === selectedTable)?.number} (
                          {tables.find((t) => t.id === selectedTable)?.capacity}{" "}
                          {tables.find((t) => t.id === selectedTable)?.capacity === 1
                            ? "seat"
                            : "seats"}
                          )
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-8 text-lg font-medium tracking-wide glow-gold transition-all duration-300 hover:scale-105"
                >
                  Confirm Reservation
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}

