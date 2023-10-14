import { Outlet } from "react-router-dom"

import Appbar from "pages/components/Appbar"
import Footer from "pages/components/Footer"

const GuestLayout = () => {
  return (
    <>
      <Appbar />

      <main className="my-10 grow">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export default GuestLayout
