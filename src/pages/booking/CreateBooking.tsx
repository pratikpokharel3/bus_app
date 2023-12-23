import { useState, useEffect, FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { v4 as uuid } from "uuid"

import axios from "api/index"
import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  BookingDetails,
  storeBookingInfo,
  storeFromBusDeparture
} from "store/bookingSlice"
import { BusDeparture } from "utilities/data_types"
import { toPasalCase } from "helpers/usePascalCase"
import { useScrollToElement } from "helpers/useScrollToElement"

import Card from "components/Card"
import Alert from "components/Alert"
import Spinner from "components/Spinner"
import Heading2 from "components/Heading2"

import PrimaryButton from "components/PrimaryButton"

const Booking = () => {
  const [loading, setLoading] = useState(true)
  const [departureInfo, setDepartureInfo] = useState<BusDeparture | null>(null)
  const [seatsBookedList, setSeatBookedList] = useState<string[]>([])
  const [seatList, setSeatList] = useState<string[][]>([])
  const [selectedSeatList, setSelectedSeatList] = useState<string[]>([])
  const [confirmBookingLoading, setConfirmBookingLoading] = useState(false)
  const [bookingInfo, setBookingInfo] = useState<BookingDetails | null>(null)
  const [isTicketAlreadyBooked, setIsTicketAlreadyBooked] = useState(false)
  const [message, setMessage] = useState("")
  const [payNowLoading, setPayNowLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const departureId = searchParams.get("departure_id")

  const user = useAppSelector((state) => state.user.user)
  const kycInfo = useAppSelector((state) => state.user.kyc_info)

  useEffect(() => {
    if (departureId === null) {
      setLoading(false)
      return
    }

    getDepatureInfo()
  }, [])

  async function getDepatureInfo() {
    try {
      const resp = await axios.get(`bus_departures/${departureId}`)

      setDepartureInfo(resp.data.bus_departure)
      setSeatBookedList(resp.data.seats_booked)
      setSeatList(resp.data.seat_planning)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  function handleSelectedSeats(seatNumber: string) {
    if (user && !kycInfo?.is_kyc_verified) {
      return
    }

    if (seatsBookedList.includes(seatNumber)) {
      return
    }

    setBookingInfo(null)

    if (selectedSeatList.includes(seatNumber)) {
      setSelectedSeatList((prevSeats) =>
        prevSeats.filter((seat) => seat !== seatNumber)
      )
      return
    }

    setSelectedSeatList((prevSeats) => [...prevSeats, seatNumber])
  }

  async function confirmBooking() {
    if (selectedSeatList.length === 0) {
      return
    }

    try {
      setBookingInfo(null)
      setIsTicketAlreadyBooked(false)
      setMessage("")
      setConfirmBookingLoading(true)

      const resp = await axios.post("ticket_booking_detail", {
        departure_id: departureInfo?.id,
        seats_booked: selectedSeatList
      })

      setMessage(resp.data.message)

      if ("seats_already_booked" in resp.data) {
        setIsTicketAlreadyBooked(true)
        setConfirmBookingLoading(false)
        return
      }

      setBookingInfo(resp.data)
      setConfirmBookingLoading(false)
      useScrollToElement("booking_section")
    } catch (e) {
      console.error(e)
    }
  }

  async function handlePayment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      if (user === null) {
        dispatch(
          storeBookingInfo({
            bus_departure: departureInfo,
            booking_details: bookingInfo,
            selected_seats: selectedSeatList
          })
        )

        dispatch(storeFromBusDeparture(true))

        navigate("/login", {
          replace: true
        })

        return
      }

      setPayNowLoading(true)

      const resp = await axios.post("user/bookings", {
        departure_id: departureInfo?.id,
        seats_booked: selectedSeatList
      })

      alert(resp.data.message)

      setDepartureInfo(null)
      setSeatBookedList([])
      setSeatList([])
      setSelectedSeatList([])
      setBookingInfo(null)
      setIsTicketAlreadyBooked(false)
      setMessage("")
      setPayNowLoading(false)

      getDepatureInfo()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {loading && (
        <div className="mt-10 flex grow justify-center">
          <Spinner />
        </div>
      )}

      {!loading && departureInfo && (
        <Card className="mx-auto mb-10 w-3/4 grow">
          <Heading2>Departure Information</Heading2>

          <div className="mt-3 grid grid-cols-3 gap-y-5">
            <div>
              Bus Name
              <div className="font-semibold">{departureInfo.bus.bus_name}</div>
            </div>

            <div>
              Bus Route
              <div className="font-semibold">
                {departureInfo.bus_route.source_location.district}-
                {departureInfo.bus_route.destination_location.district}
              </div>
            </div>

            <div>
              Bus Plate Number
              <div className="font-semibold">
                {departureInfo.bus.bus_plate_number}
              </div>
            </div>

            <div>
              Departure DateTime
              <div className="font-semibold">
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true
                }).format(new Date(departureInfo.departure_datetime))}
              </div>
            </div>

            <div>
              Seats Booked
              <div className="font-semibold">
                {departureInfo.total_tickets ?? "0"} out of{" "}
                {departureInfo.bus.total_seats}
              </div>
            </div>

            <div>
              Departure Status
              <div className="font-semibold">
                {toPasalCase(departureInfo.departure_status)}
              </div>
            </div>
          </div>

          {user && (
            <>
              {kycInfo?.is_kyc_verified && (
                <Alert className="mt-8" variant="info">
                  If you have already booked tickets, you can check your booking
                  details{" "}
                  <Link className="font-semibold underline" to="/bookings">
                    here
                  </Link>
                  .
                </Alert>
              )}

              {!kycInfo?.is_kyc_verified && (
                <Alert className="mt-8" variant="rejected">
                  {kycInfo?.message}
                </Alert>
              )}
            </>
          )}

          {departureInfo.departure_status === "not_started" && (
            <>
              <div className="mt-12 border-t pt-8">
                <div className="text-center">
                  <Heading2>Bus Seat Planning</Heading2>
                  <div className="mt-1">Select Seats Below for Booking</div>
                </div>

                <div className="mt-8 flex justify-center gap-x-3">
                  <div className="h-8 w-8 bg-green-600"></div>
                  <div>Already Booked</div>
                </div>

                <div className="mx-auto mt-10 w-1/2 border py-5">
                  <div>
                    <div className="border-b" style={{ width: "24%" }}></div>
                    <div className="mt-5 pl-4">Bus Door</div>
                    <div
                      className="mt-5 border-b"
                      style={{ width: "24%" }}
                    ></div>
                  </div>

                  <div
                    className={`${
                      user && !kycInfo?.is_kyc_verified
                        ? "pointer-events-none"
                        : ""
                    } mx-auto mt-8 px-10`.trimStart()}
                  >
                    {seatList.map((seat) => (
                      <div
                        className="mt-5 flex justify-between gap-x-5"
                        key={uuid()}
                      >
                        <div
                          className={`${
                            seatsBookedList.includes(seat[0])
                              ? "bg-green-600 text-white"
                              : ""
                          } 
                    ${
                      selectedSeatList.includes(seat[0])
                        ? "bg-gray-600 text-white"
                        : ""
                    } flex w-[16%] items-center justify-center border py-3 text-center hover:cursor-pointer`.trimStart()}
                          onClick={() => handleSelectedSeats(seat[0])}
                        >
                          {seat[0]}
                        </div>

                        <div
                          className={`${
                            seatsBookedList.includes(seat[1])
                              ? "bg-green-600 text-white"
                              : ""
                          } 
                    ${
                      selectedSeatList.includes(seat[1])
                        ? "bg-gray-600 text-white"
                        : ""
                    } flex w-[16%] items-center justify-center border py-3 text-center hover:cursor-pointer`.trimStart()}
                          onClick={() => handleSelectedSeats(seat[1])}
                        >
                          {seat[1]}
                        </div>

                        <div
                          className={`${
                            seatsBookedList.includes(seat[2])
                              ? "bg-green-600 text-white"
                              : ""
                          }  ${
                            selectedSeatList.includes(seat[2])
                              ? "bg-gray-600 text-white"
                              : ""
                          } flex w-[16%] items-center justify-center border py-3 text-center hover:cursor-pointer`.trimStart()}
                          onClick={() => handleSelectedSeats(seat[2])}
                        >
                          {seat[2]}
                        </div>

                        <div
                          className={`${
                            seatsBookedList.includes(seat[3])
                              ? "bg-green-600 text-white"
                              : ""
                          }  ${
                            selectedSeatList.includes(seat[3])
                              ? "bg-gray-600 text-white"
                              : ""
                          } flex w-[16%] items-center justify-center border py-3 text-center hover:cursor-pointer`.trimStart()}
                          onClick={() => handleSelectedSeats(seat[3])}
                        >
                          {seat[3]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSeatList.length !== 0 && (
                  <div className="mt-12 text-center">
                    <div className="font-xl font-semibold">Seats Selected:</div>
                    {selectedSeatList.join(", ")}
                  </div>
                )}

                {isTicketAlreadyBooked && (
                  <Alert className="mx-auto mt-12 w-3/4" variant="rejected">
                    {message}
                  </Alert>
                )}

                {!user && (
                  <div className="mx-auto mt-12 w-3/4 text-center">
                    <PrimaryButton
                      type="button"
                      loading={confirmBookingLoading}
                      onClick={confirmBooking}
                    >
                      Confirm Booking
                    </PrimaryButton>
                  </div>
                )}

                {user && kycInfo?.is_kyc_verified && (
                  <div className="mx-auto mt-12 w-3/4 text-center">
                    <PrimaryButton
                      type="button"
                      loading={confirmBookingLoading}
                      onClick={confirmBooking}
                    >
                      Confirm Booking
                    </PrimaryButton>
                  </div>
                )}
              </div>

              <div id="booking_section"></div>

              {bookingInfo && (
                <>
                  <div className="mt-10 border-t pt-5">
                    <Heading2>Booking Information</Heading2>

                    <div className="mt-2 grid grid-cols-3 gap-y-5">
                      <div>
                        <div>Seats Booked</div>
                        <div className="font-semibold">
                          {selectedSeatList.join(", ")}
                        </div>
                      </div>

                      <div>
                        <div>Seat Per Price</div>
                        <div className="font-semibold">
                          Rs.{" "}
                          {new Intl.NumberFormat().format(
                            Math.round(bookingInfo.seat_per_price)
                          )}
                        </div>
                      </div>

                      <div>
                        <div>Total Amount</div>
                        <div className="font-semibold">
                          Rs.{" "}
                          {new Intl.NumberFormat().format(
                            Math.round(bookingInfo.total_amount)
                          )}
                        </div>
                      </div>

                      <div>
                        <div>VAT (13%)</div>
                        <div className="font-semibold">
                          {" "}
                          Rs.{" "}
                          {new Intl.NumberFormat().format(
                            Math.round(bookingInfo.vat)
                          )}
                        </div>
                      </div>

                      <div>
                        <div>Grand Total:</div>
                        <div className="font-semibold">
                          Rs.{" "}
                          {new Intl.NumberFormat().format(
                            Math.round(bookingInfo.grand_total)
                          )}
                        </div>
                      </div>
                    </div>

                    <form method="POST" onSubmit={handlePayment}>
                      <input
                        name="departure_id"
                        type="hidden"
                        value={departureInfo.id}
                      />
                      <input
                        name="seats_booked"
                        type="hidden"
                        value={selectedSeatList}
                      />

                      <div className="mx-auto w-3/4">
                        <PrimaryButton
                          className="mt-10"
                          loading={payNowLoading}
                        >
                          Pay Now
                        </PrimaryButton>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </>
          )}
        </Card>
      )}

      {/* {!loading && !departureInfo && (
        <div className="mt-5 text-center">
          <div className="mb-1">404 Error | Bus departure not found.</div>

          <Link to="/" className=" font-medium text-blue-600 underline">
            Go to Homepage
          </Link>
        </div>
      )} */}
    </>
  )
}

export default Booking
