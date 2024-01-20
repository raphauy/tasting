import { Command, Link } from "lucide-react"
import { Metadata } from "next"

import getSession, { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { UserAuthForm } from "./user-auth-form"

export default async function AuthenticationPage() {
  const user= await getCurrentUser()
  const role= user?.role
  console.log("login: " + role)  
  if (role === "admin")
    redirect("/admin")
  else {
    return <div>You are not authorized to access this page</div>
  }

    return (
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-10 bg-background text-muted-foreground p-10 rounded-xl">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Identificación de usuarios
          </h1>
        </div>
        <UserAuthForm />
      </div>
)
  }