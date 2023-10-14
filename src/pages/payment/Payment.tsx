import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { v4 as uuid } from "uuid"

import axios from "api/index"
import { Payment as TPayment } from "utilities/data_types"

import Card from "components/Card"
import Heading1 from "components/Heading1"
import Spinner from "components/Spinner"

const Payment = () => {
  const [loading, setLoading] = useState(true)
  const [paymentList, setPaymentList] = useState<TPayment[]>([])

  useEffect(() => {
    getBookings()
  }, [])

  async function getBookings() {
    try {
      const url = `user/payments?page=1`
      const resp = await axios.get(url)

      setPaymentList(resp.data.data)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card className="grow">
      <Heading1>My Payments</Heading1>

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
                  Bank Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Paid Amount
                </th>

                <th scope="col" className="px-6 py-3">
                  Payment DateTime
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {paymentList.length === 0 && (
                <tr className="border-b bg-white">
                  <td colSpan={4} className="py-5 text-center">
                    No payments found.
                  </td>
                </tr>
              )}

              {paymentList.map((payment) => (
                <tr className="border-b bg-white" key={uuid()}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                  >
                    {payment.bank.bank_name}
                  </th>

                  <td className="px-6 py-4">
                    Rs.{" "}
                    {new Intl.NumberFormat().format(
                      Math.round(payment.paid_amount)
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    }).format(new Date(payment.created_at))}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/bookings/${payment.booking_id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View Booking
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

export default Payment
