import { useState, useEffect, useRef } from "react"

import { Icon } from "@mdi/react"
import { mdiChevronDown } from "@mdi/js"

type DropdownProps = React.ComponentPropsWithoutRef<"div"> & {
  text: string
}

const Dropdown = ({ children, text }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener("click", closeDropdown)
    return () => {
      window.removeEventListener("click", closeDropdown)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center gap-x-1">
        <span className="font-semibold">{text}</span>
        <Icon path={mdiChevronDown} style={{ width: 20, height: 20 }}></Icon>
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 w-40 origin-top-right transform rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-transform ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
        style={{ transformOrigin: "top right" }}
      >
        <div className="py-1" onClick={() => setIsOpen(false)}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
