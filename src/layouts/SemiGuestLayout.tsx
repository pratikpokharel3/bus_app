import { Outlet } from "react-router-dom"

import SemiProtectedRoutes from "layouts/SemiProtectedRoutes"

import Appbar from "pages/components/Appbar"
import Footer from "pages/components/Footer"

const SemiGuestLayout = () => {
  return (
    <SemiProtectedRoutes>
      <Appbar />

      <main className="my-10 grow">
        <Outlet />
      </main>

      <Footer />
    </SemiProtectedRoutes>
  )
}

export default SemiGuestLayout
