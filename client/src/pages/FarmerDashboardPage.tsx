import AssistantElement from "@/components/general/AssistantElement"
import News from "@/components/general/News"
import Weather from "@/components/general/Weather"
function DashboardPage() {

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