type CardProps = React.ComponentPropsWithoutRef<"div">

const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div
      {...rest}
      className={`${
        className ?? ""
      } rounded-lg border border-gray-200 bg-white p-6 shadow`.trimStart()}
    >
      {children}
    </div>
  )
}

export default Card
