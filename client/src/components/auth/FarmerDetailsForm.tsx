import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import TagInput from "../ui/TagInput"

function FarmerDetailsForm() {

  const navigate = useNavigate()

  const [isPending, setIsPending] = useState(false)
  const [govtSchemes, setGovtSchemes] = useState<string[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isPending) return

    try {
      setIsPending(true)
      // Extract form data
      const formData = new FormData(event.currentTarget)
      const rawData = Object.fromEntries(formData)

      // Customize the data before using it
      const customData = {
        location: {
          state: rawData.state,
          district: rawData.district
        },
        DOB: rawData.dob,
        name: rawData.name,
        email: rawData.email,
        phone: rawData.phone,
        landOwnership: rawData.landOwnership,
        farmingExperience: rawData.farmingExperience,
        governmentSchemes: rawData.governmentSchemes
      }

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/farmer`, customData)

      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Farmer details saved successfully",
          variant: "default"
        })
      }

      navigate("/auth/signup", { replace: true })

    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form className="space-y-2 w-full min-w-96" method="post" onSubmit={handleSubmit}>
      <Input className="w-full" type="text" name="name" placeholder="Enter your name" id="name" />
      <Input className="w-full" type="tel" name="phone" placeholder="Enter your phone number" id="phone" />
      <Input className="w-full" type="date" name="dob" placeholder="Enter your Date of Birth" id="dob" />
      <Input className="w-full" type="number" name="farmingExperience" placeholder="Enter your farming experience" id="farmingExperience" />
      <Input className="w-full" type="number" name="landOwnership" placeholder="Enter how many acres land you own" id="landOwnership" />
      <TagInput onChange={setGovtSchemes} value={govtSchemes} placeholder="Enter government schemes name" id="governmentSchemes" />
      <div className="flex gap-1">
        <Input className="w-full" type="text" name="State" placeholder="Enter your state" id="State" />
        <Input className="w-full" type="text" name="District" placeholder="Enter your destrict" id="Destrict" />
      </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}

export default FarmerDetailsForm
