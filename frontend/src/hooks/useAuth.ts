import { useNavigate } from "@tanstack/react-router"
import { useQuery } from "react-query"

import {
  type Body_login_login_access_token as AccessToken,
  LoginService,
  type UserOut,
  UsersService,
} from "../client"

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const navigate = useNavigate()
  const { data: user, isLoading } = useQuery<UserOut | null, Error>(
    "currentUser",
    UsersService.usersReadUserMe,
    {
      enabled: isLoggedIn(),
    },
  )

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginLoginAccessToken({
      formData: data,
    })
    localStorage.setItem("access_token", response.access_token)
    navigate({ to: "/" })
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    navigate({ to: "/login" })
    window.location.reload();
  }

  return { login, logout, user, isLoading }
}

export { isLoggedIn }
export default useAuth
