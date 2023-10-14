import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import GuestLayout from "layouts/GuestLayout"
import SemiGuestLayout from "layouts/SemiGuestLayout"
import AppLayout from "layouts/AppLayout"
import Home from "pages/home/Home"
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"
import Booking from "../pages/booking/Booking"
import CreateBooking from "pages/booking/CreateBooking"
import BookingDetail from "pages/booking/BookingDetail"
import Payment from "pages/payment/Payment"
import BookingPayment from "pages/payment/BookingPayment"
import Profile from "pages/profile/Profile"

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/bookings/create",
            element: <CreateBooking />
          }
        ]
      },
      {
        element: <SemiGuestLayout />,
        children: [
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/register",
            element: <Register />
          }
        ]
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/bookings",
            element: <Booking />
          },
          {
            path: "/bookings/:bookingId",
            element: <BookingDetail />
          },
          {
            path: "/payments",
            element: <Payment />
          },
          {
            path: "/bookings/payment",
            element: <BookingPayment />
          },
          {
            path: "/profile",
            element: <Profile />
          }
        ]
      }
    ]
  }
])
