# IMDb Clone

A movie and TV discovery application built with Next.js App Router, TypeScript, Tailwind CSS, and TMDB.

## Overview

This project lets users:

- Browse trending and top-rated content
- Filter the home feed by genre type (movies, TvSeries, and more)
- Search across movie and TV data
- Explore dedicated Movies and TV pages with pagination
- Open detail pages with trailers, cast, reviews, and related content
- Switch between light and dark themes

Data is fetched from TMDB using server-side requests with caching/revalidation.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- next-themes
- TMDB API

## Project Structure

```text
IMDb-clone/
  public/
  src/
    app/
      about/page.tsx
      api/
        search/route.ts
        todays-pick/route.ts
      genres/page.tsx
      movies/page.tsx
      movies/[id]/page.tsx
      search/[searchTerm]/page.tsx
      todays-picks/page.tsx
      tv/page.tsx
      tv/[id]/page.tsx
      layout.tsx
      page.tsx
    Components/
      Details/
      Card.tsx
      Header.tsx
      Navbar.tsx
      Results.tsx
      Search.tsx
      WatchNowClient.tsx
      PlayerModal.tsx
      ui/button.tsx
    lib/
      tmdb-api.ts
```

## Environment Variables

Create a `.env.local` file in the project root.

Required:

- `API_KEY`: TMDB API key (server-side)

Optional fallback used by the data layer:

- `NEXT_PUBLIC_API_KEY`

Example:

```env
API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_API_KEY=your_tmdb_api_key_here
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set environment variables in `.env.local`.

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production app
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix lint issues
- `npm run type-check` - Run TypeScript type checks
- `npm run analyze` - Build with bundle analysis flag
- `npm run export` - Attempt static export (`next export`)

## Pages and Routing

### Main Pages

- / - Home feed with dynamic genre filters and discover results
- /about - Project overview and purpose
- /genres - Genre explorer for movie and TV categories
- /movies - Dedicated movie listing with sorting and pagination
- /tv - Dedicated TV listing with sorting and pagination
- /todays-picks - Daily curated picks for quick discovery
- /search/[searchTerm] - Search results for user-entered terms

### Detail Experience

Both detail pages share the same enhanced layout and content strategy:

- Large hero section with backdrop, poster, metadata, and cleaned synopsis
- Watch Now action with popup trailer modal
- Structured sections for cast, reviews, and related media
- Responsive layout optimized for mobile, tablet, and desktop

### Detail Pages

- /movies/[id] - Full movie details including runtime, rating, genres, cast, reviews, and trailer
- /tv/[id] - Full TV details including seasons, rating, genres, cast, reviews, and trailer

### Home Query Filters

Home supports `genre` query values such as:

- `fetchTrending`
- `fetchTopRated`
- `movies`
- `TvSeries`

Example:

- `/?genre=movies`
- `/?genre=TvSeries`

## Pagination Behavior

Pagination is currently enabled on:

- `/movies`
- `/tv`
- Home feed when `genre=movies` or `genre=TvSeries`

Genre explorer (`/genres`) currently loads a single page of popular results.

## API Endpoints

- `GET /api/search` - Search endpoint used by the app
- `GET /api/todays-pick` - Returns daily picks payload

## Data Layer Notes

Core TMDB utilities are in `src/lib/tmdb-api.ts`.

Implemented helpers include:

- `getMoviesList`
- `getTvList`
- `discoverMovies`
- `discoverTv`
- `getTrending`
- `getDetails` (with appended videos, credits, recommendations, similar, and reviews)
- `getVideos`
- `search`

## UI Notes

- Uses reusable UI components in `src/Components`
- Trailer playback is handled via modal (`WatchNowClient` + `PlayerModal`)
- Theme switching is handled with `next-themes`

## Deployment

Recommended: Vercel

1. Import the repository in Vercel
2. Add environment variables (`API_KEY` at minimum)
3. Deploy

## Disclaimer

This project uses data from The Movie Database (TMDB) API. Ensure your usage complies with TMDB terms.
