'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
              Application Error
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Something went wrong with the application.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors mr-4"
            >
              Try again
            </button>
            <a
              href="/"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
