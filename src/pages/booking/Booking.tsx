import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { v4 as uuid } from "uuid"

import axios from "api/index"
import { Booking } from "utilities/data_types"

import Card from "components/Card"
import Pagination from "components/Pagination"
import Heading1 from "components/Heading1"
import Spinner from "components/Spinner"

const Bookings = () => {
  const [loading, setLoading] = useState(true)
  const [bookingList, setBookingList] = useState<Booking[]>([])
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null)
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)

  useEffect(() => {
    getBookings()
  }, [])

  async function getBookings() {
    try {
      const url = `/user/bookings?page=1`
      const resp = await axios.get(url)

      setBookingList(resp.data.data)
      setPrevPageUrl(resp.data.prev_page_url)
      setNextPageUrl(resp.data.next_page_url)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card className="grow">
      <Heading1>My Bookings</Heading1>

      {loading && (
        <div className="mt-5 flex justify-center">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div className="relative mt-4 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Source-Destination
                </th>

                <th scope="col" className="px-6 py-3">
                  Bus Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Departure DateTime
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {bookingList.length === 0 && (
                <tr className="border-b bg-white">
                  <td colSpan={4} className="py-5 text-center">
                    No bookings found.
                  </td>
                </tr>
              )}

              {bookingList.map((booking) => (
                <tr className="border-b bg-white" key={uuid()}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                  >
                    {booking.bus_departure.bus_route.source_location.district}-
                    {
                      booking.bus_departure.bus_route.destination_location
                        .district
                    }
                  </th>

                  <td className="px-6 py-4">
                    {booking.bus_departure.bus.bus_name}
                  </td>

                  <td className="px-6 py-4">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    }).format(
                      new Date(booking.bus_departure.departure_datetime)
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/bookings/${booking.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <div className="mt-6 flex justify-center">
        <Pagination
          previousPageUrl={prevPageUrl}
          nextPageUrl={nextPageUrl}
          handlePrevUrl={setPrevPageUrl}
          handleNextPageUrl={setNextPageUrl}
        />
      </div> */}
    </Card>
  )
}

export default Bookings
