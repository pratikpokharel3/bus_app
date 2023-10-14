import Spinner from "./Spinner"

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean
}

const PrimaryButton = ({
  children,
  className,
  type = "submit",
  loading,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={loading}
      className={`${
        className ?? ""
      } w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300`.trimStart()}
      onClick={onClick}
    >
      {loading && <Spinner className="mx-auto !h-5 !w-5" />}

      {!loading && <>{children}</>}
    </button>
  )
}

export default PrimaryButton
