import { Navigate } from "react-router-dom"

import { useAppSelector } from "store/hooks"

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.user.user)

  if (user === null) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
