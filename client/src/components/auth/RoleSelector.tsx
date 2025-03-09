import { Link } from "react-router-dom"

function RoleSelector() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-zinc-900">Select your role</h1>
      <div className="flex flex-col space-y-1 w-72">
        <Link to="/auth/signup/details?role=farmer" className="text-center bg-zinc-200 hover:bg-green-500 text-zinc-900 font-semibold transition-colors duration-300 py-2 px-4 rounded">Farmer</Link>
        <Link to="/auth/signup/details?role=consumer" className="text-center bg-zinc-200 hover:bg-blue-500 text-zinc-900 font-semibold transition-colors duration-300 py-2 px-4 rounded">Buyer</Link>
      </div>
    </div>
  )
}

export default RoleSelector