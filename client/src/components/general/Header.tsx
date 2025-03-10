import { useAuth, UserButton } from "@clerk/clerk-react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import ThemeToggler from "./ThemeToggler"
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About us" },
];

function Header() {
  const navigate = useNavigate()
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      <nav className="fixed h-16 z-50 bg-zinc-100 dark:bg-zinc-900 border-b-2 border-gray-200 dark:border-gray-800 px-32 top-0 left-0 w-full flex justify-between items-center p-4">
        <div className="flex justify-center items-center gap-6">
        <Link to="/">
          <img className="h-14 w-14" src="/logo.webp" alt="logo" />
        </Link>
        <ul className="flex gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-semibold ${isActive ? "text-zinc-950 dark:text-zinc-100" : "text-gray-600 hover:text-green-400"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>
        </div>
        <div className="flex gap-4">
        <div>
          <input className="p-2 bg-transparent border-2 rounded-md" type="search" name="" id="" placeholder="Search crops" />
        </div>
          <ThemeToggler />
          {(isLoaded && isSignedIn)
            ? <UserButton />
            : (isLoaded
              ?
              <div className="flex space-x-2">
                <Link to="/auth/signin" className="border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 px-3 py-1 rounded-sm transition-colors cursor-pointer">Log In</Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <span className="block bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 px-3 py-1 rounded-sm transition-colors cursor-pointer">Register</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      navigate("/auth/signup")
                      localStorage.setItem("role", "farmer")
                    }}>Farmer</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      navigate("/auth/signup")
                      localStorage.setItem("role", "consumer")
                    }}>Consumer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              : <Loader2 className="w-6 h-6 animate-spin" />
            )
          }
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  )
}

export default Header