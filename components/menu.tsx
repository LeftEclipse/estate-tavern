"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { IMAGES } from "@/lib/site"

export function Menu() {
  const [activeTab, setActiveTab] = useState("food")
  const [isAnimating, setIsAnimating] = useState(false)

  const foodItems = [
    {
      name: "Traditional Irish Stew",
      description: "Tender lamb, potatoes, carrots, and herbs in rich gravy",
      price: "289 Kč",
    },
    {
      name: "Fish & Chips",
      description: "Beer-battered cod with hand-cut chips and mushy peas",
      price: "259 Kč",
    },
    {
      name: "Shepherd's Pie",
      description: "Ground lamb with vegetables, topped with creamy mashed potatoes",
      price: "269 Kč",
    },
    {
      name: "Bangers & Mash",
      description: "Irish sausages with mashed potatoes and onion gravy",
      price: "239 Kč",
    },
    {
      name: "Corned Beef & Cabbage",
      description: "Slow-cooked corned beef with cabbage, carrots, and potatoes",
      price: "299 Kč",
    },
    {
      name: "Boxty",
      description: "Traditional Irish potato pancakes with various fillings",
      price: "219 Kč",
    },
  ]

  const drinks = [
    {
      name: "Guinness Draught",
      description: "The perfect pint, poured to perfection",
      price: "89 Kč",
    },
    {
      name: "Irish Whiskey Flight",
      description: "Sample three premium Irish whiskeys",
      price: "249 Kč",
    },
    {
      name: "Irish Coffee",
      description: "Hot coffee, Irish whiskey, sugar, and cream",
      price: "129 Kč",
    },
    {
      name: "Craft Beer Selection",
      description: "Rotating selection of local and Irish craft beers",
      price: "79–119 Kč",
    },
    {
      name: "Signature Cocktails",
      description: "Irish-inspired cocktails crafted by our bartenders",
      price: "139 Kč",
    },
    {
      name: "Wine Selection",
      description: "Curated wines from around the world",
      price: "99–159 Kč",
    },
  ]

  return (
    <section id="menu" className="relative py-20 md:py-28 sm:pt-2 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.woodTexture} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-muted/50 to-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">From the Kitchen</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-8 text-shadow-gold">Our Menu</h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-24 bg-primary/50" />
            <div className="w-2 h-2 bg-primary rotate-45" />
            <div className="h-px w-24 bg-primary/50" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            Hearty Irish classics, cooked the way they should be
          </p>
        </div>

        <Tabs
          defaultValue="food"
          className="max-w-6xl mx-auto"
          value={activeTab}
          onValueChange={(value) => {
            if (value !== activeTab) {
              setIsAnimating(true)
              setTimeout(() => {
                setActiveTab(value)
                setTimeout(() => {
                  setIsAnimating(false)
                }, 50)
              }, 300)
            }
          }}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-16 bg-transparent border border-primary/20 p-0 rounded-none h-14">
            <TabsTrigger
              value="food"
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground font-medium tracking-wide transition-all duration-300 rounded-none h-full py-3 m-0 border-0"
            >
              Food
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground font-medium tracking-wide transition-all duration-300 rounded-none h-full py-3 m-0 border-0"
            >
              Drinks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="relative">
            <div
              className={`transition-all duration-500 ease-in-out ${activeTab === "food" && !isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"}`}
            >
              <div className="mb-12 max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-12">
                  <img
                    src={IMAGES.irishStew}
                    alt="Traditional Irish Cuisine"
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ${activeTab === "food" && !isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  >
                    <h3 className="text-white text-3xl md:text-4xl font-serif font-bold mb-2">Authentic Irish Cuisine</h3>
                    <p className="text-white/90 text-lg">Traditional recipes, honest portions, made from scratch</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {foodItems.map((item, index) => (
                  <Card
                    key={index}
                    className={`p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 ${
                      activeTab === "food" && !isAnimating
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-2xl font-bold text-foreground">{item.name}</h3>
                      <span className="text-primary font-bold text-xl">{item.price}</span>
                    </div>
                    <div className="h-px w-full bg-primary/20 mb-4" />
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drinks" className="relative">
            <div
              className={`transition-all duration-500 ease-in-out ${activeTab === "drinks" && !isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"}`}
            >
              <div className="mb-12 max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-12">
                  <img
                    src={IMAGES.beerTaps}
                    alt="Craft Beer & Whiskey Selection"
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ${activeTab === "drinks" && !isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  >
                    <h3 className="text-white text-3xl md:text-4xl font-serif font-bold mb-2">Drinks at the Bar</h3>
                    <p className="text-white/90 text-lg">Craft beers, fine whiskeys, and properly made cocktails</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {drinks.map((item, index) => (
                  <Card
                    key={index}
                    className={`p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 ${
                      activeTab === "drinks" && !isAnimating
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-2xl font-bold text-foreground">{item.name}</h3>
                      <span className="text-primary font-bold text-xl">{item.price}</span>
                    </div>
                    <div className="h-px w-full bg-primary/20 mb-4" />
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
