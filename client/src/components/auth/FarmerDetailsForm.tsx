import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { toast } from "@/hooks/use-toast"
import axios, { AxiosError } from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import TagInput from "../ui/TagInput"
import { Loader2 } from "lucide-react"
import { useUser } from "@clerk/clerk-react"
import { Textarea } from "../ui/textarea"
import { ConsumerDetails, FarmerDetails } from "@/lib/types"
import useProfileStore from "@/store/profileStore"

function FarmerDetailsForm() {

  const navigate = useNavigate()
  const user = useUser().user
  const { profile } = useProfileStore()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const role = searchParams.get("role")
  if (!role) {
    navigate("/auth/redirect", { replace: true })
  }

  const initialStateForFarmer: FarmerDetails = {
    location: {
      state: "",
      district: ""
    },
    isFarmer: true,
    DOB: "",
    pinCode: "",
    address: "",
    theme: profile.theme,
    name: user?.fullName || user?.firstName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: user?.primaryPhoneNumber?.phoneNumber || "",
    landOwnership: "",
    farmingExperience: "",
    governmentSchemes: []
  }

  const initialStateForConsumer: ConsumerDetails = {
    name: user?.fullName || user?.firstName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    theme: profile.theme,
    isFarmer: false
  }

  const [isPending, setIsPending] = useState(false)
  const [userDetails, setUserDetails] = useState<FarmerDetails | ConsumerDetails>(role === "farmer" ? initialStateForFarmer : initialStateForConsumer)

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault()
    if (isPending) return

    try {

      if (!user) {
        navigate("/auth/signin", { replace: true })
        return
      }

      setIsPending(true)

      let parsedUserDetails;

      if (typeof userDetails === "object" && "isFarmer" in userDetails && userDetails.isFarmer === false) {
        parsedUserDetails = userDetails
      } else if (typeof userDetails === "object" && "isFarmer" in userDetails && userDetails.isFarmer === true) {
        parsedUserDetails = {
          ...userDetails,
          DOB: new Date(userDetails.DOB),
          pinCode: Number(userDetails.pinCode),
          landOwnership: Number(userDetails.landOwnership),
          farmingExperience: Number(userDetails.farmingExperience),
        }
      }

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/users`, parsedUserDetails, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URI
        }
      })

      if (res.status !== 201) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive"
        })
        return
      }

      localStorage.removeItem("role")
      if (res.data.data.isFarmer) {
        navigate("/dashboard/farmer", { replace: true })
      } else {
        navigate("/dashboard", { replace: true })
      }

    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error || "Something went wrong"
        toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive"
        })
        if (errorMsg === "User with this email already exists") {
          localStorage.removeItem("role")
          navigate("/auth/redirect", { replace: true })
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive"
        })
        console.log(error)
      }
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    if (typeof userDetails === "object" && "isFarmer" in userDetails && userDetails.isFarmer === false) {
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (typeof userDetails === "object" && "isFarmer" in userDetails && userDetails.isFarmer === false) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">Setting up your account</h2>
        <Loader2 className="animate-spin text-2xl mt-6" />
      </div>
    )
  }

  return (
    <form className="space-y-2 w-full min-w-96 text-zinc-600" method="post" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Farmer Details</h2>
      <Input className="w-full" type="text" name="name" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} placeholder="Enter your name" id="name" />
      <Input className="w-full" type="tel" name="phone" value={userDetails.phone} onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} placeholder="Enter your phone number" id="phone" />
      <Input className="w-full" type="date" name="dob" value={userDetails.DOB} onChange={(e) => setUserDetails({ ...userDetails, DOB: e.target.value })} placeholder="Enter your Date of Birth" id="dob" />
      <Textarea className="w-full" name="address" value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} placeholder="Enter your address" id="address" />
      <Input className="w-full" type="number" name="pincode" value={userDetails.pinCode} onChange={(e) => setUserDetails({ ...userDetails, pinCode: e.target.value })} placeholder="Enter your pincode" id="pincode" />
      <Input className="w-full" type="number" name="farmingExperience" value={userDetails.farmingExperience} onChange={(e) => setUserDetails({ ...userDetails, farmingExperience: e.target.value })} placeholder="Enter your farming experience" id="farmingExperience" />
      <Input className="w-full" type="number" name="landOwnership" value={userDetails.landOwnership} onChange={(e) => setUserDetails({ ...userDetails, landOwnership: e.target.value })} placeholder="Enter how many acres land you own" id="landOwnership" />
      <TagInput onChange={(e) => setUserDetails({ ...userDetails, governmentSchemes: e })} value={userDetails.governmentSchemes} placeholder="Enter government schemes name" id="governmentSchemes" />
      <div className="flex gap-1">
        <Input
          className="w-full"
          type="text"
          name="state"
          placeholder="Enter your state"
          id="state"
          value={userDetails.location.state}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              location: { ...userDetails.location, state: e.target.value },
            })
          }
        />
        <Input
          className="w-full"
          type="text"
          name="district"
          placeholder="Enter your district"
          id="district"
          value={userDetails.location.district}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              location: { ...userDetails.location, district: e.target.value },
            })
          }
        />
      </div>

      <Button type="submit" className="w-full text-zinc-100">{isPending ? <Loader2 className="animate-spin" /> : "Submit"}</Button>
    </form>
  )
}

export default FarmerDetailsForm
