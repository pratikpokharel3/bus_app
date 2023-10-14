import { v4 as uuid } from "uuid"

type ErrorProps = React.ComponentPropsWithoutRef<"div"> & {
  errors: string[]
}

const Error = ({ errors, className }: ErrorProps) => {
  return (
    <div
      className={`${className} rounded-lg bg-red-400 px-3 py-2 text-sm text-white`.trimStart()}
    >
      {errors.map((error) => (
        <div key={uuid()}>{error}</div>
      ))}
    </div>
  )
}

export default Error
