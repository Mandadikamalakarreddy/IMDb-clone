export default function TvDetailLoading() {
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 pb-20 animate-pulse">
      <div className="h-[70vh] w-full bg-dark-200 dark:bg-dark-800" />

      <div className="max-w-7xl mx-auto px-5 mt-12 space-y-8">
        <div className="h-10 w-52 rounded-xl bg-dark-200 dark:bg-dark-700" />
        <div className="h-64 w-full rounded-2xl bg-dark-200 dark:bg-dark-700" />
        <div className="h-10 w-56 rounded-xl bg-dark-200 dark:bg-dark-700" />
        <div className="h-64 w-full rounded-2xl bg-dark-200 dark:bg-dark-700" />
      </div>
    </div>
  );
}
