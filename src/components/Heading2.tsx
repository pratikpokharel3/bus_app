type Heading2Props = React.ComponentPropsWithoutRef<"div">

const Heading2 = ({ children, className, ...rest }: Heading2Props) => {
  return (
    <div
      {...rest}
      className={`${className ?? ""} text-xl font-bold`.trimStart()}
    >
      {children}
    </div>
  )
}

export default Heading2
