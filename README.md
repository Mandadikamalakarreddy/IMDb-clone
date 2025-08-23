# 🎬 IMDb Clone - Movie & TV Show Discovery App

<div align="center">
  
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)

</div>

<div align="center">
  <p>A modern, feature-rich movie and TV show discovery application built with cutting-edge web technologies. Explore trending content, search through vast databases, and discover your next favorite entertainment.</p>
</div>

---

## ✨ Features

### 🎯 Core Features
- **🎬 Browse Movies & TV Shows** - Explore popular and trending content
- **🔍 Advanced Search** - Find movies and shows with intelligent search
- **📺 Today's Picks** - Curated daily recommendations for movies and TV shows
- **🎭 Genre Filtering** - Discover content by specific genres
- **📱 Fully Responsive** - Perfect experience on all devices
- **🌙 Dark/Light Mode** - Eye-friendly theme switching
- **⚡ Performance Optimized** - Fast loading with Next.js optimization

### 🚀 Advanced Features
- **Daily Content Rotation** - Fresh picks every day with seeded randomization
- **Detailed Content Pages** - Comprehensive information about movies and TV shows
- **Real-time Search** - Instant search results as you type
- **Loading States** - Beautiful skeleton loading animations
- **Error Handling** - Graceful error management with retry options
- **SEO Optimized** - Search engine friendly with proper meta tags

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 14 | React framework with App Router |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **API** | TMDB API | Movie and TV show data |
| **Theme** | next-themes | Dark/Light mode switching |
| **Deployment** | Vercel | Serverless deployment platform |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm**
- **TMDB API Key** (free at [TMDB](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mandadikamalakarreddy/IMDb-clone.git
   cd IMDb-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Create environment file
   cp .env.example .env.local
   ```

4. **Configure Environment Variables**
   Add your TMDB API key to `.env.local`:
   ```env
   API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
📦 IMDb-clone/
├── 📁 public/                 # Static assets
│   ├── next.svg
│   └── vercel.svg
├── 📁 src/
│   ├── 📁 app/               # App Router (Next.js 13+)
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── Providers.tsx    # Context providers
│   │   ├── 📁 about/        # About page
│   │   ├── 📁 api/          # API routes
│   │   │   ├── 📁 genres/   # Genre endpoints
│   │   │   ├── 📁 search/   # Search endpoints
│   │   │   └── 📁 todays-pick/ # Daily picks API
│   │   ├── 📁 genres/       # Genre pages
│   │   ├── 📁 movies/       # Movie detail pages
│   │   ├── 📁 search/       # Search result pages
│   │   ├── 📁 theme/        # Theme components
│   │   ├── 📁 toDaysPicks/  # Today's picks page
│   │   └── 📁 tv/           # TV show detail pages
│   ├── 📁 assets/           # Project assets
│   │   └── background.jpg
│   └── 📁 Components/       # Reusable components
│       ├── Card.tsx         # Content card component
│       ├── GenreSelector.tsx
│       ├── Header.tsx       # Main header
│       ├── LoadingComponents.tsx
│       ├── MenuItems.tsx
│       ├── Navbar.tsx       # Navigation bar
│       ├── NavItems.tsx
│       ├── Results.tsx      # Results grid
│       ├── Search.tsx       # Search component
│       ├── theme-toggle-button.tsx
│       └── 📁 ui/           # UI components
│           └── button.tsx
├── 📄 next.config.mjs       # Next.js configuration
├── 📄 tailwind.config.ts    # Tailwind configuration
├── 📄 tsconfig.json         # TypeScript configuration
└── 📄 package.json          # Project dependencies
```

---

## 🔗 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/search?q={query}` | GET | Search movies and TV shows |
| `/api/genres` | GET | Get available genres |
| `/api/todays-pick` | GET | Get daily curated picks |

---

## 🎨 Key Pages & Features

### 🏠 Home Page
- Featured trending movies and TV shows
- Quick navigation to different sections
- Responsive hero section

### 🔍 Search Functionality
- Real-time search across movies and TV shows
- Debounced input for performance
- Combined results display

### 📅 Today's Picks
- **Daily Rotation**: New picks every day using date-based seeding
- **Toggle View**: Switch between movies and TV shows
- **Top 5 Selection**: Curated from trending content
- **Beautiful Cards**: Rich metadata display

### 🎭 Genre Pages
- Filter content by specific genres
- Grid layout with infinite scrolling potential
- Category-specific browsing

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mandadikamalakarreddy/IMDb-clone)

**Manual Deployment:**

1. **Fork this repository**
2. **Connect to Vercel**
   - Import your repository to Vercel
   - Configure build settings (auto-detected)
3. **Set Environment Variables**
   ```env
   API_KEY=your_production_tmdb_api_key
   ```
4. **Deploy!** 🎉

### Other Platforms
- **Netlify**: Connect repository and set build command `npm run build`
- **Railway**: One-click deploy with environment variables
- **Docker**: Use the provided Dockerfile for containerization

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | TMDB API key for data fetching | ✅ Yes |
| `NEXT_PUBLIC_TMDB_BASE_URL` | TMDB API base URL | Optional |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | TMDB image base URL | Optional |

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "✨ Add amazing feature"
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### 📝 Contribution Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add proper documentation for new features
- Test your changes thoroughly
- Update README if needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[The Movie Database (TMDB)](https://www.themoviedb.org/)** - For providing comprehensive movie and TV show data
- **[Next.js Team](https://nextjs.org/)** - For the incredible React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Vercel](https://vercel.com/)** - For seamless deployment and hosting

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Mandadikamalakarreddy/IMDb-clone?style=social)
![GitHub forks](https://img.shields.io/github/forks/Mandadikamalakarreddy/IMDb-clone?style=social)
![GitHub issues](https://img.shields.io/github/issues/Mandadikamalakarreddy/IMDb-clone)
![GitHub license](https://img.shields.io/github/license/Mandadikamalakarreddy/IMDb-clone)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Mandadikamalakarreddy">Kamalakar Reddy</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
