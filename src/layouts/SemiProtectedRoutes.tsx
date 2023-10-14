import { Navigate } from "react-router-dom"

import { useAppSelector } from "store/hooks"

type SemiProtectedRouteProps = {
  children: React.ReactNode
}

const SemiProtectedRoute = ({ children }: SemiProtectedRouteProps) => {
  const user = useAppSelector((state) => state.user.user)
  const bookingInfo = useAppSelector((state) => state.bookingInfo.booking_info)

  if (user !== null && bookingInfo === null) {
    return <Navigate to="/" replace />
  }

  return children
}

export default SemiProtectedRoute
