"use client"

import { useContext, useEffect } from "react"
import { UserContext } from "@/context/userContext"
import { useRouter } from "next/navigation"

const SecretPage = () => {
  const router = useRouter();
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [])
  return (
    <div>SecretPage</div>
  )
}

export default SecretPage