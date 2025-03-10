import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronRight, Leaf, Sun, Droplets, ShoppingBasket, Phone, Mail, MapPin } from "lucide-react"
import Container from "@/components/general/Container"
import CropCards from "@/components/general/CropCards"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col mt-3">
     <Container>
       <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[60vh] w-full overflow-hidden bg-green-300 p-6 rounded-lg">
            {/* <img src="" alt="" /> */}
            <div className="absolute inset-0" />
            <div className="container relative z-10 flex h-full flex-col items-start justify-center gap-4 text-gray-800">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Fresh From Our Fields To Your Table
              </h1>
              <p className="max-w-2xl text-lg md:text-xl">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero cupiditate ex quo ratione ducimus quam ut necessitatibus impedi
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Shop Our Products
                </Button>
                <Button size="lg" variant="outline" className="border-[#303030] text-gray-800 bg-white/20">
                  Visit The Farm
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5">
           <CropCards/>
        </div>

        {/* About Section */}
        <section id="about" className="py-16 md:py-10 bg-green-100 md:p-10 rounded-md">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About Green Acres Farm</h2>
                <p className="text-muted-foreground mb-4">
                  For over 35 years, our family has been dedicated to growing the finest organic produce using
                  sustainable farming practices that protect our land for future generations.
                </p>
                <p className="text-muted-foreground mb-6">
                  We believe in farming that works with nature, not against it. Our commitment to organic methods means
                  you get the healthiest, most flavorful food possible.
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Our Story <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Farm</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Organic</h3>
                <p className="text-muted-foreground">
                  We never use synthetic pesticides or fertilizers. Just natural, organic growing methods.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
                <p className="text-muted-foreground">
                  Our farming methods focus on soil health, water conservation, and biodiversity.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Locally Grown</h3>
                <p className="text-muted-foreground">
                  From our farm to your table - reducing food miles and ensuring maximum freshness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Farm Services</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Farm Tours",
                  description:
                    "Experience life on a working organic farm with guided tours for individuals and groups.",
                },
                {
                  title: "CSA Program",
                  description: "Join our Community Supported Agriculture program for weekly boxes of seasonal produce.",
                },
                {
                  title: "Farm-to-Table Events",
                  description: "Enjoy special dining events featuring meals prepared with ingredients from our farm.",
                },
                {
                  title: "Educational Workshops",
                  description: "Learn about organic gardening, sustainable farming, and food preservation.",
                },
                {
                  title: "Pick-Your-Own",
                  description: "Visit during harvest season to pick your own berries, apples, and pumpkins.",
                },
                {
                  title: "Farm Store",
                  description: "Shop our selection of fresh produce, eggs, preserves, and local artisanal products.",
                },
              ].map((service, index) => (
                <div key={index} className="rounded-lg border p-6 bg-card">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="link" className="p-0 text-green-600 hover:text-green-700">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-green-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to taste the difference?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Visit our farm store, join our CSA program, or order online for local delivery or pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Order Online
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Visit The Farm
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about our products, services, or want to arrange a visit? Get in touch with us!
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@greenacresfarm.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">123 Farm Road, Countryside, State 12345</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-medium mb-2">Farm Hours</h3>
                  <p className="text-muted-foreground">Monday - Saturday: 9am - 5pm</p>
                  <p className="text-muted-foreground">Sunday: 10am - 4pm</p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=800&width=1200" alt="Farm location" className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold">Green Acres Farm</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Organic farming with sustainable practices since 1985.
              </p>
              <div className="flex gap-4">{/* Social media icons would go here */}</div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#about" className="text-sm text-muted-foreground hover:text-green-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#products" className="text-sm text-muted-foreground hover:text-green-600">
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link to="#services" className="text-sm text-muted-foreground hover:text-green-600">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="#contact" className="text-sm text-muted-foreground hover:text-green-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-green-600">
                    Farm Tours
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-green-600">
                    CSA Program
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-green-600">
                    Farm-to-Table Events
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-green-600">
                    Educational Workshops
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to receive updates on seasonal products and farm events.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Green Acres Farm. All rights reserved.</p>
          </div>
        </div>
      </footer>
     </Container>
    </div>
  )
}

