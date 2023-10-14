import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import axios from "api/index"
import { useErrors } from "helpers/useErrors"
import { storeUser, storeKYCInfo } from "store/userSlice"
import { useAppDispatch } from "store/hooks"

import Card from "components/Card"
import Error from "components/Error"
import InputText from "components/InputText"
import InputLabel from "components/InputLabel"
import PrimaryButton from "components/PrimaryButton"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverErrors, setServerErrors] = useState<string[]>([])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setLoading(true)

      await axios.get("/sanctum/csrf-cookie")
      const resp = await axios.post("/register", {
        name,
        email,
        password
      })

      dispatch(storeUser(resp.data.user))
      dispatch(storeKYCInfo(resp.data.kyc_info))
      setLoading(false)
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
        <form method="POST" onSubmit={registerUser}>
          {serverErrors.length !== 0 && (
            <Error className="mb-3" errors={serverErrors} />
          )}

          <div>
            <InputLabel htmlFor="name">Name</InputLabel>

            <InputText
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <InputLabel htmlFor="email">Email</InputLabel>

            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <InputLabel htmlFor="password">Password</InputLabel>

            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <PrimaryButton className="mt-8" loading={loading}>
            Register
          </PrimaryButton>

          <div className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline">
              Click Here!
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Register
