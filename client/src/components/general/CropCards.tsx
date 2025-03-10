"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

const crops = [
  {
    id: 1,
    name: "Organic Curn",
    farmer: {
      name: "Henil Shah",
      image: "/", //Farmer photo
    },
    price: "₹ 40/kg",
    location: "Ludhiana, Punjab",
    image: "/Curn.webp",
  },
  {
    id: 2,
    name: "Paddy Rice",
    farmer: {
      name: "Satish Kumar",
      image: "/placeholder.svg?height=40&width=40",
    },
    price: "₹ 30/kg",
    location: "Patna, Bihar",
    image: "/paddy-rice.jpg",
  },
  {
    id: 3,
    name: "Wheat Grain",
    farmer: {
      name: "Dhavnit Monpara",
      image: "/placeholder.svg?height=40&width=40",
    },
    price: "₹ 40/kg",
    location: "Amritsar, Punjab",
    image: "/wheat_grain.jpg",
  },
  {
    id: 4,
    name: "Cotton ",
    farmer: {
      name: "Chandan",
      image: "/placeholder.svg?height=40&width=40",
    },
    price: "₹ 200/kg",
    location: "Nagpur, Maharashtra",
    image: "/cotton.jpeg",
  },
  {
    id: 5,
    name: "Sunflower Seeds",
    farmer: {
      name: "Ujjwal",
      image: "/placeholder.svg?height=40&width=40",
    },
    price: "₹ 400/kg",
    location: "Salinas, CA",
    image: "/Sunflower.jpg",
  },
  {
    id: 6,
    name: "Butternut Squash",
    farmer: {
      name: "Mohit",
      image: "/placeholder.svg?height=40&width=40",
    },
    price: "$99/each",
    location: "San Diego, CA",
    image: "/butternut-squash.jpeg",
  },
  {
    id: 1,
    name: "Organic Curn",
    farmer: {
      name: "Henil Shah",
      image: "/", //Farmer photo
    },
    price: "₹ 40/kg",
    location: "Ludhiana, Punjab",
    image: "/Curn.webp",
  },
  {
    id: 2,
    name: "Paddy Rice",
    farmer: {
      name: "Satish Kumar",
      image: "/placeholder.svg?height=40&width=40",
    },
    price: "₹ 30/kg",
    location: "Patna, Bihar",
    image: "/paddy-rice.jpg",
  },
  {
    id: 3,
    name: "Wheat Grain",
    farmer: {
      name: "Dhavnit Monpara",
      image: "/placeholder.svg?height=40&width=40",
    },
    price: "₹ 40/kg",
    location: "Amritsar, Punjab",
    image: "/wheat_grain.jpg",
  },
]

export default function CropCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = direction === "left" ? -container.offsetWidth / 2 : container.offsetWidth / 2
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      setShowLeftButton(container.scrollLeft > 0)
      setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  return (
    <div className="relative">
      {showLeftButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {crops.map((crop) => (
          <Card key={crop.id} className="min-w-[280px] max-w-[280px] flex flex-col">
            <div className="relative h-40 overflow-hidden rounded-t-lg">
              <img src={crop.image || "/placeholder.svg"} alt={crop.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="pt-4 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{crop.name}</h3>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {crop.price}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {crop.location}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center w-full">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={crop.farmer.image} alt={crop.farmer.name} />
                  <AvatarFallback>{crop.farmer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{crop.farmer.name}</p>
                  <p className="text-xs text-muted-foreground">Farmer</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {showRightButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
    </div>
  )
}

