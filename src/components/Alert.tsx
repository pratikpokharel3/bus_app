import { useState, useEffect } from "react"

type AlertProps = React.ComponentPropsWithoutRef<"div"> & {
  variant: string
}

const Alert = ({ children, variant, className }: AlertProps) => {
  const [activeClass, setActiveClass] = useState("")

  function setClass() {
    const info = "border-t-4 text-blue-800 border-blue-300 bg-blue-50"
    const pending = "border-t-4 text-orange-800 border-orange-300 bg-orange-50"
    const accepted = " border-t-4 text-green-800 border-green-300 bg-green-50"
    const rejected = "border-t-4 text-red-800 border-red-300 bg-red-50"

    if (variant === "info") {
      setActiveClass(info)
    } else if (variant === "pending") {
      setActiveClass(pending)
    } else if (variant === "accepted") {
      setActiveClass(accepted)
    } else {
      setActiveClass(rejected)
    }
  }

  useEffect(() => {
    setClass()
  }, [variant])

  return (
    <div
      id="alert"
      role="alert"
      className={`${activeClass} ${className ?? ""} flex p-4`.trimStart()}
    >
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        className="h-5 w-5 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        ></path>
      </svg>

      <div className="ml-3 text-sm font-medium">{children}</div>
    </div>
  )
}

export default Alert
