import { Outlet } from "react-router-dom"

import ProtectedRoutes from "layouts/ProtectedRoutes"

import Appbar from "pages/components/Appbar"
import Footer from "pages/components/Footer"
import SideNavigation from "pages/components/SideNavigation"

const AppLayout = () => {
  return (
    <ProtectedRoutes>
      <Appbar />

      <main className="mx-auto my-10 flex w-3/4 grow items-start gap-x-10">
        <SideNavigation />

        <Outlet />
      </main>

      <Footer />
    </ProtectedRoutes>
  )
}

export default AppLayout
