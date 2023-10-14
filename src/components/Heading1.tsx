type Heading1Props = React.ComponentPropsWithoutRef<"div">

const Heading1 = ({ children, className, ...rest }: Heading1Props) => {
  return (
    <div
      {...rest}
      className={`${className ?? ""} text-2xl font-bold`.trimStart()}
    >
      {children}
    </div>
  )
}

export default Heading1
