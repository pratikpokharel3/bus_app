import { Link, useNavigate } from "react-router-dom"

import axios from "api/index"
import { storeUser, storeKYCInfo } from "store/userSlice"
import { storeBookingInfo, storeFromBusDeparture } from "store/bookingSlice"
import { useAppSelector, useAppDispatch } from "store/hooks"

import Heading1 from "components/Heading1"
import Dropdown from "components/Dropdown"

const Appbar = () => {
  const user = useAppSelector((state) => state.user.user)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function logOut() {
    try {
      await axios.post("/logout")

      dispatch(storeUser(null))
      dispatch(storeKYCInfo(null))
      dispatch(storeBookingInfo(null))
      dispatch(storeFromBusDeparture(false))

      navigate("/login")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <nav className="mx-auto flex w-3/4 items-center justify-between pt-10">
      <Link to="/">
        <Heading1>Araniko Bus Sewa</Heading1>
      </Link>

      {!user && (
        <div className="flex gap-x-4 text-lg">
          <Link to="login">Log In</Link>

          <Link to="register">Register</Link>
        </div>
      )}

      {user && (
        <Dropdown text={user.name}>
          <Link
            to="/bookings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Bookings
          </Link>

          <Link
            to="/payments"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Payments
          </Link>

          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </Link>

          <span
            className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-100"
            onClick={logOut}
          >
            Log Out
          </span>
        </Dropdown>
      )}
    </nav>
  )
}

export default Appbar
