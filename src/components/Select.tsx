type SelectProps = React.ComponentPropsWithoutRef<"select">

const Select = ({ children, id, className, value, onChange }: SelectProps) => {
  return (
    <select
      id={id}
      value={value ?? ""}
      className={`${
        className ?? ""
      } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`.trimStart()}
      onChange={onChange}
    >
      <option value="">Select Option</option>
      {children}
    </select>
  )
}

export default Select
