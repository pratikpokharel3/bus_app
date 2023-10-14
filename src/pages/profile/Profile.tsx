import { useState, useEffect, FormEvent } from "react"
import { v4 as uuid } from "uuid"

import axios from "api/index"
import { useErrors } from "helpers/useErrors"
import { storeUser, storeKYCInfo } from "store/userSlice"
import { useAppDispatch } from "store/hooks"
import { Bank, User, KYCInfo, Location } from "utilities/data_types"

import Card from "components/Card"
import Alert from "components/Alert"
import Error from "components/Error"
import Select from "components/Select"
import Spinner from "components/Spinner"
import Heading1 from "components/Heading1"
import Heading2 from "components/Heading2"
import InputText from "components/InputText"
import InputLabel from "components/InputLabel"
import PrimaryButton from "components/PrimaryButton"

type UserProfile = {
  kyc_info: KYCInfo
  user: User & {
    bank: {
      bank_id?: string
      customer_id?: string
      account_number?: string
    }
  }
}

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [buttonLoader, setButtonLoader] = useState(false)
  const [profileInfo, setProfileInfo] = useState<UserProfile | null>(null)
  const [locationList, setLocationList] = useState<Location[]>([])
  const [bankList, setBankList] = useState<Bank[]>([])
  const [serverErrors, setServerErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  useEffect(() => {
    getProfileInfo()
    getLocations()
    getBanks()
  }, [])

  async function getProfileInfo() {
    try {
      const resp = await axios.get("/user/profile")

      setProfileInfo({
        kyc_info: resp.data.kyc_info,
        user: resp.data.user
      })

      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  async function getLocations() {
    try {
      const resp = await axios.get("/locations")
      setLocationList(resp.data)
    } catch (err) {
      console.error(err)
    }
  }

  async function getBanks() {
    try {
      const resp = await axios.get("/banks")
      setBankList(resp.data)
    } catch (err) {
      console.error(err)
    }
  }

  async function updateProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setServerErrors([])
      setButtonLoader(true)

      const { name, email, gender, phone_number, location_id } =
        profileInfo?.user!

      const bank_id = profileInfo?.user.bank?.bank_id ?? ""
      const account_number = profileInfo?.user.bank?.account_number ?? ""

      const resp = await axios.post("/user/profile", {
        name,
        email,
        gender,
        phone_number,
        location_id,
        bank_id,
        account_number
      })

      setButtonLoader(false)
      alert(resp.data.message)
      dispatch(storeUser(resp.data.user))
      dispatch(storeKYCInfo(resp.data.kyc_info))
      getProfileInfo()
    } catch (err) {
      setButtonLoader(false)
      const errors = useErrors(err)
      setServerErrors(errors)
    } finally {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  return (
    <Card className="grow">
      <Heading1>My Profile</Heading1>

      {loading && (
        <div className="mt-5 flex justify-center">
          <Spinner />
        </div>
      )}

      {!loading && profileInfo && (
        <>
          <Alert
            className="mt-5"
            variant={
              profileInfo.kyc_info?.is_kyc_verified ? "accepted" : "rejected"
            }
          >
            {profileInfo.kyc_info?.message}
          </Alert>

          <form
            method="POST"
            className="mt-3 grid grid-cols-2 gap-5"
            onSubmit={updateProfile}
          >
            {serverErrors.length !== 0 && (
              <Error className="col-span-2 mt-2" errors={serverErrors} />
            )}

            <div>
              <InputLabel htmlFor="name">Name</InputLabel>

              <InputText
                id="name"
                type="text"
                value={profileInfo.user.name}
                onChange={(e) =>
                  setProfileInfo((prev) => {
                    const obj = Object.assign({}, prev)
                    obj.user.name = e.target.value
                    return obj
                  })
                }
              />
            </div>

            <div>
              <InputLabel htmlFor="email">Email</InputLabel>

              <InputText
                id="email"
                type="email"
                value={profileInfo.user.email}
                onChange={(e) =>
                  setProfileInfo((prev) => {
                    const obj = Object.assign({}, prev)
                    obj.user.email = e.target.value
                    return obj
                  })
                }
              />
            </div>

            <div>
              <InputLabel htmlFor="gender">Gender</InputLabel>

              <Select
                id="gender"
                value={profileInfo.user.gender}
                onChange={(e) =>
                  setProfileInfo((prev) => {
                    const obj = Object.assign({}, prev)
                    obj.user.gender = e.target.value
                    return obj
                  })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </Select>
            </div>

            <div>
              <InputLabel htmlFor="phone_number">Phone Number</InputLabel>

              <InputText
                type="text"
                id="phone_number"
                value={profileInfo.user.phone_number}
                onChange={(e) =>
                  setProfileInfo((prev) => {
                    const obj = Object.assign({}, prev)
                    obj.user.phone_number = e.target.value
                    return obj
                  })
                }
              />
            </div>

            <div>
              <InputLabel htmlFor="location_id">Location</InputLabel>

              <Select
                id="location_id"
                value={profileInfo.user.location_id}
                onChange={(e) =>
                  setProfileInfo((prev) => {
                    const obj = Object.assign({}, prev)
                    obj.user.location_id = e.target.value
                    return obj
                  })
                }
              >
                {locationList.map((location) => (
                  <option key={uuid()} value={location.id}>
                    {location.district}
                  </option>
                ))}
              </Select>
            </div>

            <Heading2 className="col-span-2 mt-3">Bank Information</Heading2>

            <div className="-mt-2">
              <InputLabel htmlFor="bank_id">Bank Name</InputLabel>

              <Select
                id="bank_id"
                value={profileInfo.user.bank?.bank_id}
                onChange={(e) =>
                  setProfileInfo((prev) => {
                    let obj = Object.assign({}, prev)

                    if (obj.user.bank === null) {
                      obj.user.bank = {}
                    }

                    obj.user.bank.bank_id = e.target.value
                    return obj
                  })
                }
              >
                {bankList.map((bank) => (
                  <option key={uuid()} value={bank.id}>
                    {bank.bank_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="-mt-2">
              <InputLabel htmlFor="account_number">Account Number</InputLabel>

              <InputText
                id="account_number"
                type="text"
                value={profileInfo.user.bank?.account_number}
                onChange={(e) =>
                  setProfileInfo((prev) => {
                    let obj = Object.assign({}, prev)

                    if (obj.user.bank === null) {
                      obj.user.bank = {}
                    }

                    obj.user.bank.account_number = e.target.value
                    return obj
                  })
                }
              />
            </div>

            <PrimaryButton className="col-span-2 mt-5" loading={buttonLoader}>
              Update Profile
            </PrimaryButton>
          </form>
        </>
      )}
    </Card>
  )
}

export default Profile
