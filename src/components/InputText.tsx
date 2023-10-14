type InputTextProps = React.ComponentPropsWithoutRef<"input">

const InputText = ({ className, value, onChange, ...rest }: InputTextProps) => {
  return (
    <input
      {...rest}
      value={value ?? ""}
      className={`${
        className ?? ""
      } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`.trimStart()}
      onChange={onChange}
    />
  )
}

export default InputText
