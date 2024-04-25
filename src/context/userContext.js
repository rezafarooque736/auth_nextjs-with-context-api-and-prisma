"use client"

import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false)

  const getUser = async () => {

    const res = await fetch("/api/me")
    const data = await res.json()
    if (data) setUser(true)
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
