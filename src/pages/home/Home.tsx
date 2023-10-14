import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import axios from "api/index"
import { BusDeparture } from "utilities/data_types"
import { useScrollToElement } from "helpers/useScrollToElement"

import AboutBus from "./components/AboutBus"
import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"

import Heading1 from "components/Heading1"
import PrimaryButton from "components/PrimaryButton"

const Home = () => {
  const [busDepartureList, setBusDepartureList] = useState<BusDeparture[]>([])

  useEffect(() => {
    axios
      .get("bus_departures")
      .then((resp) => setBusDepartureList(resp.data.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <div className="ml-40 grid grid-cols-2 place-items-start items-center pt-20">
        <div>
          <div className="text-6xl font-medium">Book Bus Tickets</div>

          <div className="mt-3 text-5xl text-gray-400">Easily. Securely.</div>

          <PrimaryButton
            className="mt-7"
            onClick={() => useScrollToElement("bus_departures", 170)}
          >
            Book Now
          </PrimaryButton>
        </div>

        <img src="src\assets\img1.png" alt="Bus Image" />
      </div>

      <div className="mx-auto mt-44 w-3/4">
        <Heading1 className="text-center" id="bus_departures">
          Bus Departures
        </Heading1>

        <div className="relative mt-5 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3" scope="col">
                  Bus Name
                </th>

                <th className="px-6 py-3" scope="col">
                  Source-Destination
                </th>

                <th className="px-6 py-3" scope="col">
                  Departure DateTime
                </th>

                <th className="px-6 py-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {busDepartureList.length !== 0 &&
                busDepartureList.map((busDeparture) => (
                  <tr key={uuidv4()}>
                    <th
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                      scope="row"
                    >
                      {busDeparture.bus.bus_name}
                    </th>

                    <td className="px-6 py-4">
                      {busDeparture.bus_route.source_location.district}-
                      {busDeparture.bus_route.destination_location.district}
                    </td>

                    <td className="px-6 py-4">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                      }).format(new Date(busDeparture.departure_datetime))}
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        className="text-blue-600 hover:underline"
                        to={`bookings/create?departure_id=${busDeparture.id}`}
                      >
                        Book Now
                      </Link>
                    </td>
                  </tr>
                ))}

              {busDepartureList.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-5 text-center">
                    No bus departures found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AboutBus />

      <AboutUs />

      <ContactUs />
    </div>
  )
}

export default Home
