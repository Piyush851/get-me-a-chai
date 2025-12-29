"use client"
import { useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import GoogleIcon from "@/components/icons/GoogleIcon"
import GithubIcon from "@/components/icons/GithubIcon"
import FacebookIcon from "@/components/icons/FacebookIcon"
import LinkedInIcon from "@/components/icons/LinkedInIcon"


const Login = () => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    document.title = "Login - Get Me A Chai"

    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  return (
    <div className="text-white py-14 container mx-auto">
      <h1 className="font-bold text-3xl text-center mb-8">
        Login to get your fans to support you
      </h1>

      <div className="flex flex-col gap-3 items-center">
        {/* Google */}
        <button className="social-btn">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        {/* LinkedIn */}
        <button className="social-btn">
          <LinkedInIcon />
          <span>Continue with LinkedIn</span>
        </button>

        {/* Facebook */}
        <button className="social-btn">
          <FacebookIcon />
          <span>Continue with Facebook</span>
        </button>

        {/* GitHub */}
        <button
          onClick={() => signIn("github")}
          className="social-btn"
        >
          <GithubIcon />
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  )
}

export default Login
