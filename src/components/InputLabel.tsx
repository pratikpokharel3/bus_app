type LabelProps = React.ComponentPropsWithoutRef<"label">

const InputLabel = ({ className, children, ...rest }: LabelProps) => {
  return (
    <label
      {...rest}
      className={`${
        className ?? ""
      } mb-2 block text-sm font-medium text-gray-900`.trimStart()}
    >
      {children}
    </label>
  )
}

export default InputLabel
