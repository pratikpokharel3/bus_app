import { MouseEvent, Dispatch, SetStateAction } from "react"

type PaginatinProps = {
  previousPageUrl: string | null
  nextPageUrl: string | null
  handlePrevUrl: Dispatch<SetStateAction<string | null>>
  handleNextPageUrl: Dispatch<SetStateAction<string | null>>
}

const Pagination = ({
  previousPageUrl,
  nextPageUrl,
  handlePrevUrl,
  handleNextPageUrl
}: PaginatinProps) => {
  function onPageChange(e: MouseEvent<HTMLAnchorElement>, type: string) {
    e.preventDefault()

    if (type === "prev") {
      return handlePrevUrl()
    }
  }

  return (
    <div className="flex">
      <a
        href={previousPageUrl ?? "#"}
        className={`${
          previousPageUrl ?? "pointer-events-none !bg-gray-200"
        } mr-3 flex h-8 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700`.trimStart()}
        onClick={(e) => onPageChange(e, "prev")}
      >
        <svg
          className="mr-2 h-3.5 w-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Previous
      </a>

      <a
        href={nextPageUrl ?? "#"}
        className={`${
          nextPageUrl ?? "pointer-events-none !bg-gray-200"
        } mr-3 flex h-8 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700`.trimStart()}
        onClick={(e) => onPageChange(e, "next")}
      >
        Next
        <svg
          className="ml-2 h-3.5 w-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  )
}

export default Pagination
