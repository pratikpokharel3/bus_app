import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AxiosError } from "axios"

import axios from "api/index"
import { useAppDispatch } from "store/hooks"
import { storeUser, storeKYCInfo } from "store/userSlice"

import Spinner from "components/Spinner"

function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function getUserInfo() {
    try {
      const resp = await axios.get("/user")

      if (resp.data.is_user_logged_in) {
        dispatch(storeUser(resp.data.user))
        dispatch(storeKYCInfo(resp.data.kyc_info))
      }

      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          navigate("/login")
        }

        return Promise.reject(error)
      }
    )

    getUserInfo()
  }, [])

  return loading ? (
    <div className="grid grow place-items-center">
      <Spinner />
    </div>
  ) : (
    <Outlet />
  )
}

export default App
