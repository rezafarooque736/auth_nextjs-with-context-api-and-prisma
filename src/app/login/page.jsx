"use client"

import { useState } from "react";
import styles from "./Page.module.css"
import { getUserApi } from "@/services/api";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getUserApi(email, password);
    if (data) {
      router.push("/secret")
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login