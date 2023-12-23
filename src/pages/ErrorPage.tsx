import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="grid min-h-screen place-items-center text-center">
      <div>
        <div className="text-xl">404 | Page Not Found</div>

        <div className="mt-1">
          The page you are looking for doesn't exists or is not available at the
          moment.
        </div>

        <div className="mt-3">
          <Link
            to="/"
            className="text-base font-medium text-blue-600 hover:underline"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
