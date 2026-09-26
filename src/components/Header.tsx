import { Link } from "react-router-dom"

interface HeaderProps {
  name: string,
  isLogin: boolean
}

export default function Header({ name, isLogin }: HeaderProps) {
  return (
    <div className="m-4 flex justify-between">
      <h1 className='text-3xl font-semibold'>Hi, {name}</h1>
      {
        !isLogin
        ? (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer hover:bg-blue-400"
          >Login</Link>
        )
        : <a className="bg-red-500 px-4 py-2 rounded text-white cursor-pointer hover:bg-red-400">Logout</a>
      }
    </div>
  )
}
