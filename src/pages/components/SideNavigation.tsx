import { Link, useLocation } from "react-router-dom"
import Icon from "@mdi/react"
import { mdiBookmark, mdiCreditCard, mdiAccount } from "@mdi/js"

import Card from "components/Card"

const SideNavigation = () => {
  const location = useLocation()

  return (
    <Card className="px-0 py-4">
      <Link to="/bookings">
        <div
          className={`${
            location.pathname === "/bookings" ? "bg-gray-100" : ""
          } flex items-center gap-x-2 px-5 py-3 hover:cursor-pointer hover:bg-gray-100`.trimStart()}
        >
          <Icon path={mdiBookmark} style={{ width: 20, height: 20 }}></Icon>
          My Bookings
        </div>
      </Link>

      <Link to="/payments">
        <div
          className={`${
            location.pathname === "/payments" ? "bg-gray-100" : ""
          } flex items-center gap-x-2 px-5 py-3 hover:cursor-pointer hover:bg-gray-100`.trimStart()}
        >
          <Icon path={mdiCreditCard} style={{ width: 20, height: 20 }}></Icon>
          My Payments
        </div>
      </Link>

      <Link to="/profile">
        <div
          className={`${
            location.pathname === "/profile" ? "bg-gray-100" : ""
          } flex items-center gap-x-2 px-5 py-3 hover:cursor-pointer hover:bg-gray-100`.trimStart()}
        >
          <Icon path={mdiAccount} style={{ width: 20, height: 20 }}></Icon>
          My Profile
        </div>
      </Link>
    </Card>
  )
}

export default SideNavigation
