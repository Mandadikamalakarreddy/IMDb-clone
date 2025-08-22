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
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((result) => (
          <Card key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}
