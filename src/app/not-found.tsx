export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center p-8">
        <div className="text-7xl mb-6 opacity-80">🔍</div>
        <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-dark-400 dark:text-dark-500 mb-8">
          The page you are looking for doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-neon-pink hover:bg-neon-pink-light text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
