type TextAreaProps = React.ComponentPropsWithoutRef<"textarea">

const TextArea = ({ className, ...rest }: TextAreaProps) => {
  return (
    <textarea
      {...rest}
      className={`block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
    ></textarea>
  )
}

export default TextArea
