import React from 'react'
import Card from './Card'

interface Movie {
  id: number
  poster_path?: string
  title?: string
  name?: string
  overview: string
  release_date?: string
  first_air_date?: string
  vote_average: number
}

interface ResultsProps {
  results: Movie[]
}

export default function Results({ results }: ResultsProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {results.map((result) => (
          <Card key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}
