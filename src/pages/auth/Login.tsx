import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import axios from "api/index"
import { useErrors } from "helpers/useErrors"
import { storeUser, storeKYCInfo } from "store/userSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { storeBookingInfo, storeFromBusDeparture } from "store/bookingSlice"

import Card from "components/Card"
import Error from "components/Error"
import InputText from "components/InputText"
import InputLabel from "components/InputLabel"
import PrimaryButton from "components/PrimaryButton"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverErrors, setServerErrors] = useState<string[]>([])

  const fromBusDeparture = useAppSelector(
    (state) => state.bookingInfo.from_bus_departure
  )

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function handleLogIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setServerErrors([])
      setLoading(true)

      await axios.get("/sanctum/csrf-cookie")
      const resp = await axios.post("/login", {
        email,
        password
      })

      dispatch(storeUser(resp.data.user))
      dispatch(storeKYCInfo(resp.data.kyc_info))

      if (fromBusDeparture) {
        const isKYCVerified = resp.data.kyc_info.is_kyc_verified

        if (isKYCVerified) {
          navigate("/bookings/payment", {
            replace: true
          })
          return
        }

        alert(
          "Your KYC is not verified. Please update your profile information to get verified. Your booking details has been cleared for now."
        )

        navigate("/profile", {
          replace: true
        })

        dispatch(storeBookingInfo(null))
        dispatch(storeFromBusDeparture(false))
        return
      }

      navigate("/")
    } catch (err) {
      setLoading(false)
      const errors = useErrors(err)
      setServerErrors(errors)
    }
  }

  return (
    <div className="mx-auto flex w-3/4 items-start justify-between">
      <img src="src/assets/img3.jpg" className="w-1/2" alt="Bus Image" />

      <Card className="w-1/3">
        <form method="POST" onSubmit={handleLogIn}>
          {serverErrors.length !== 0 && (
            <Error className="mb-3" errors={serverErrors} />
          )}

          <div>
            <InputLabel htmlFor="email">Email</InputLabel>

            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <InputLabel htmlFor="password">Password</InputLabel>

            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <PrimaryButton className="mt-8" loading={loading}>
            Log In
          </PrimaryButton>

          <div className="mt-8 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold underline">
              Click Here!
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login
