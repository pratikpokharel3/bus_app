import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import axios from "api/index"
import { Booking } from "utilities/data_types"

import Card from "components/Card"
import Spinner from "components/Spinner"
import Heading1 from "components/Heading1"
import PrimaryButton from "components/PrimaryButton"

const BookingDetail = () => {
  const [loading, setLoading] = useState(true)
  const [bookingInfo, setBookingInfo] = useState<Booking | null>(null)
  const [cancelBookingLoading, setCancelBookingLoading] = useState(false)
  const [downloadInvoiceLoading, setDownloadInvoiceLoading] = useState(false)

  const { bookingId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function getBookingDetails() {
      try {
        const resp = await axios.get(`user/bookings/${bookingId}`)
        setBookingInfo(resp.data)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }

    getBookingDetails()
  }, [])

  async function cancelBooking() {
    try {
      setCancelBookingLoading(true)

      const resp = await axios.delete(`/user/bookings/${bookingId}`)
      alert(resp.data.message)
      setCancelBookingLoading(false)
      navigate("/bookings", {
        replace: true
      })
    } catch (e) {
      console.error(e)
    }
  }

  async function downloadInvoice() {
    try {
      setDownloadInvoiceLoading(true)

      const resp = await axios.get(`/user/bookings/${bookingId}/invoice`, {
        responseType: "arraybuffer"
      })

      let blob = new Blob([resp.data], {
        type: "application/pdf"
      })

      let link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)
      link.download = "booking_invoice.pdf"
      link.click()

      setDownloadInvoiceLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card className="grow">
      <div className="flex justify-between">
        <Heading1>Booking Information</Heading1>

        {!loading && (
          <div className="flex w-1/2 items-start gap-x-3">
            <PrimaryButton
              type="button"
              loading={cancelBookingLoading}
              onClick={cancelBooking}
            >
              Cancel Booking
            </PrimaryButton>

            <PrimaryButton
              type="button"
              loading={downloadInvoiceLoading}
              onClick={downloadInvoice}
            >
              Download Invoice
            </PrimaryButton>
          </div>
        )}
      </div>

      {loading && (
        <div className="mt-5 flex justify-center">
          <Spinner />
        </div>
      )}

      {!loading && bookingInfo && (
        <div className="mt-5 grid grid-cols-3 gap-y-5">
          <div>
            <div className="font-semibold">Bus Name</div>
            {bookingInfo.bus_departure.bus.bus_name}
          </div>

          <div>
            <div className="font-semibold">Source-Destination</div>
            {bookingInfo.bus_departure.bus_route.source_location.district}-
            {bookingInfo.bus_departure.bus_route.destination_location.district}
          </div>

          <div>
            <div className="font-semibold">Total Tickets Booked</div>
            {bookingInfo.total_tickets}
          </div>

          <div>
            <div className="font-semibold">Seats Booked</div>
            {bookingInfo.seats_booked.split(",").join(", ")}
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
            }).format(new Date(bookingInfo.bus_departure.departure_datetime))}
          </div>

          <div>
            <div className="font-semibold">Booked Date</div>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true
            }).format(new Date(bookingInfo.created_at))}
          </div>

          <div>
            <div className="font-semibold">Total Amount</div>
            Rs.{" "}
            {new Intl.NumberFormat().format(
              Math.round(bookingInfo.total_amount)
            )}
          </div>

          <div>
            <div className="font-semibold">VAT</div>
            Rs. {new Intl.NumberFormat().format(Math.round(bookingInfo.vat))}
          </div>

          <div>
            <div className="font-semibold">Grand Total</div>
            Rs.{" "}
            {new Intl.NumberFormat().format(
              Math.round(bookingInfo.grand_total)
            )}
          </div>

          <div>
            <div className="font-semibold">Bank Name (Payment Method)</div>
            {bookingInfo.bank.bank_name}
          </div>
        </div>
      )}
    </Card>
  )
}

export default BookingDetail
