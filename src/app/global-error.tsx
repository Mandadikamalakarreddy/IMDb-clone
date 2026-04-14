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
      <body className="bg-dark-50 dark:bg-dark-900">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-3xl font-bold text-red-400 mb-4">
              Application Error
            </h2>
            <p className="text-dark-400 dark:text-dark-300 mb-8">
              Something went wrong with the application.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-neon-pink hover:bg-neon-pink-light text-white rounded-xl font-semibold transition-all duration-300 text-sm"
              >
                Try again
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-semibold transition-all duration-300 text-sm"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
