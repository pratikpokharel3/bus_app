import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import axios from "api/index"
import { useAppSelector, useAppDispatch } from "store/hooks"
import { storeBookingInfo, storeFromBusDeparture } from "store/bookingSlice"

import Card from "components/Card"
import Heading1 from "components/Heading1"
import PrimaryButton from "components/PrimaryButton"

const BookingPayment = () => {
  const [loading, setLoading] = useState(false)

  const { booking_info: bookingInfo } = useAppSelector(
    (state) => state.bookingInfo
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (bookingInfo === null) {
    return <Navigate to="/bookings" replace />
  }

  async function handlePayment() {
    try {
      setLoading(true)

      const resp = await axios.post("user/bookings", {
        departure_id: bookingInfo?.bus_departure?.id,
        seats_booked: bookingInfo?.selected_seats
      })

      alert(resp.data.message)
      setLoading(false)
      navigate("/bookings", {
        replace: true
      })

      dispatch(storeBookingInfo(null))
      dispatch(storeFromBusDeparture(false))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card className="grow">
      <Heading1>Booking Information</Heading1>

      <div className="mt-3 grid grid-cols-3 gap-y-5">
        <div>
          <div className="font-semibold">Bus Name</div>
          {bookingInfo?.bus_departure?.bus.bus_name}
        </div>

        <div>
          <div className="font-semibold">Source-Destination</div>
          {bookingInfo?.bus_departure?.bus_route.source_location.district}-
          {bookingInfo?.bus_departure?.bus_route.destination_location.district}
        </div>

        <div>
          <div className="font-semibold">Total Tickets Booked</div>
          {bookingInfo?.selected_seats.length}
        </div>

        <div>
          <div className="font-semibold">Seats Booked</div>
          {bookingInfo?.selected_seats.toString().split(",").join(", ")}
        </div>

        <div>
          <div className="font-semibold">Departure DateTime</div>
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
          }).format(new Date(bookingInfo?.bus_departure?.departure_datetime!))}
        </div>

        <div>
          <div className="font-semibold">Total Amount</div>
          Rs.{" "}
          {new Intl.NumberFormat().format(
            Math.round(bookingInfo?.booking_details?.total_amount!)
          )}
        </div>

        <div>
          <div className="font-semibold">VAT</div>
          Rs.{" "}
          {new Intl.NumberFormat().format(
            Math.round(bookingInfo?.booking_details?.vat!)
          )}
        </div>

        <div>
          <div className="font-semibold">Grand Total</div>
          Rs.{" "}
          {new Intl.NumberFormat().format(
            Math.round(bookingInfo?.booking_details?.grand_total!)
          )}
        </div>

        <div className="col-span-3">
          <PrimaryButton loading={loading} onClick={handlePayment}>
            Pay Now
          </PrimaryButton>
        </div>
      </div>
    </Card>
  )
}

export default BookingPayment
