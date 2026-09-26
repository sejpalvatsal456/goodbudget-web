import { useState } from "react"
import Header from "./components/header";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(
    {
      user_id: "",
      user_name: "Vatsal",
      user_email: "sejpalvatsal@gmail.com",
      user_username: "vatsal123"
    }
  );

  return (
    <>
      <Header name={isLogin && user ? user.user_name : "User"} isLogin={isLogin} />
    </>
  )
}

export default App
