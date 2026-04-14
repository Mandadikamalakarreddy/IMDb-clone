export default function MoviesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="h-10 w-56 rounded-xl bg-dark-200 dark:bg-dark-700" />
        <div className="h-12 w-60 rounded-xl bg-dark-200 dark:bg-dark-700" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 15 }).map((_, idx) => (
          <div key={idx} className="aspect-[2/3] rounded-2xl bg-dark-200 dark:bg-dark-700" />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <div className="h-10 w-28 rounded-lg bg-dark-200 dark:bg-dark-700" />
        <div className="h-6 w-36 rounded-md bg-dark-200 dark:bg-dark-700" />
        <div className="h-10 w-28 rounded-lg bg-dark-200 dark:bg-dark-700" />
      </div>
    </div>
  );
}
