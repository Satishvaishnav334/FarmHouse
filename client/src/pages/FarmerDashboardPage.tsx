import AssistantElement from "@/components/general/AssistantElement"
import News from "@/components/general/News"
import Weather from "@/components/general/Weather"
import { toast } from "@/hooks/use-toast"
import useProfileStore from "@/store/profileStore"
import { useUser } from "@clerk/clerk-react"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function DashboardPage() {

  const { setProfile } = useProfileStore()

  const [loading, setLoading] = useState(true)

  const user = useUser().user
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          navigate("/auth/signin")
          return
        }
        setLoading(true)

        const email = user.primaryEmailAddress?.emailAddress
        if (!email) {
          navigate("/auth/redirect", { replace: true })
          return
        }

        const res = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/v1/users/${email}`)
        if (res.status !== 201) {
          navigate("/auth/signin", { replace: true })
          return
        }

        const userData = res.data.data
        if (!userData) {
          navigate("/auth/redirect", { replace: true })
          return
        }

        setProfile(userData)

      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error || "Something went wrong"
          if (errorMsg === "User with this email does not exist") {
            const role = localStorage.getItem("role")
            if (!role) {
              toast({
                title: "Role not found, please select your role",
              })
              navigate("/auth/signup/roles", { replace: true })
              return
            }
            navigate(`/auth/signup/details?role=${role}`, { replace: true })
            return
          } else {
            toast({
              title: "Error",
              description: errorMsg,
              variant: "destructive"
            })
            console.log(error)
          }
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive"
          })
          console.log(error)
          navigate("/auth/redirect", { replace: true })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate, setProfile, user])

  if (loading) return (
    <div className="flex fixed h-screen w-screen z-[100] flex-col items-center justify-center text-center">
      <div className="loading-bar h-2 w-full bg-blue-500"></div>
    </div>
  )

  return (
    <div className="flex flex-row justify-around">
      <News />
      <AssistantElement />
      {/* <Weather lat={40.7128} lon={-74.0060}/> */}
      <Weather />
    </div>
  )
}

export default DashboardPage