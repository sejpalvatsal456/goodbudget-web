import { useState, type FormEvent } from "react";

export default function Login() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    // console.log(username, password);
    const res = await fetch(`${API_URL}/test`, {
      method: "GET"
    });
    console.log(await res.json());
  }

  return (
    <div className="bg-[#e0e5ec] w-[100vw] h-[100vh] flex justify-center items-center">
      <div className=" bg-[#e0e5ec] p-8 w-[50vw] min-h-[50vh] rounded-2xl shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]">
        <h1 className="text-center text-2xl mb-10 font-semibold">Login</h1>

        {/* Neumorphic Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-3 mb-4 bg-[#e0e5ec] rounded-lg 
            shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] 
            outline-none text-gray-700 placeholder-gray-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-[#e0e5ec] rounded-lg 
            shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] 
            outline-none text-gray-700 placeholder-gray-500"
        />

        {/* Neumorphic Button (Raised) */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-5 p-3 bg-[#e0e5ec] rounded-lg 
            shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] 
            hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] 
            transition-all duration-300 text-gray-700 font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
