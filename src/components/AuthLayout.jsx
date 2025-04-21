"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import LoginPopup from "./LoginPopup"

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (!authentication && authStatus !== authentication) {
      return
    }
  }, [authStatus, authentication, navigate])

  if (authentication && authStatus !== authentication) {
    return <LoginPopup />
  }

  return loader ? (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#051622] to-[#072331]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#1e3a47] border-t-[#00ed64] rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-white">Loading...</h1>
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}
