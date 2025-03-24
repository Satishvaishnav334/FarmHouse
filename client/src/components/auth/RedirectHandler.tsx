import { toast } from "@/hooks/use-toast"
import { useUser } from "@clerk/clerk-react"
import axios, { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function RedirectHandler() {

  const [isFetching, setIsFetching] = useState(true)

  const navigate = useNavigate()
  const user = useUser().user

  useEffect(() => {
    async function fetchData() {
      try {
        if (!user) {
          navigate("/auth/signin")
          return
        }
        setIsFetching(true)

        const email = user.primaryEmailAddress?.emailAddress
        if (!email) {
          navigate("/auth/signin", { replace: true })
          return
        }

        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/v1/users/get/${email}`)
        if (res.status !== 201) {
          navigate("/auth/signin", { replace: true })
          return
        }
        toast({
          title: "Success",
          description: "User logged in successfully",
          variant: "default"
        })

        if(res.data.data.isFarmer){
          navigate("/dashboard/farmer", { replace: true })
        } else {
          navigate("/dashboard", { replace: true })
        }

      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data?.error === "User with this email does not exist") {
            const role = localStorage.getItem("role")
            if (!role) {
              toast({
                title: "Role not found, please select your role",
              })
              navigate("/auth/signup/roles", { replace: true })
              return
            }
            navigate(`/auth/signup/details?role=${role}`, { replace: true })
          } else {
            toast({
              title: "Error",
              description: error.response?.data?.error || "Something went wrong",
              variant: "destructive"
            })
            console.log(error)
          }
        } else {
          console.log(error)
        }
      } finally {
        setIsFetching(false)
      }
    }
    fetchData()
  }, [user, navigate])

  return (
    <div>
      <h1 className="text-zinc-900 text-xl">{isFetching ? "Fetching user Details" : "Redirecting"}</h1>
      <Loader2 className="animate-spin text-2xl mx-auto mt-6" />
    </div>
  )
}

export default RedirectHandler