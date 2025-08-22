# Deployment Checklist for Vercel

## Pre-deployment Checklist

### ✅ Code Quality
- [x] All ESLint errors fixed
- [x] TypeScript compilation successful
- [x] Production build successful
- [x] All components properly typed
- [x] No console.log statements in production code

### ✅ Configuration Files
- [x] `next.config.mjs` optimized for production
- [x] `vercel.json` configuration added
- [x] `package.json` scripts updated
- [x] `.env.example` file created
- [x] `.gitignore` properly configured

### ✅ Environment Variables
- [ ] TMDB API key obtained
- [ ] Environment variables set in Vercel dashboard:
  - `NEXT_PUBLIC_TMDB_API_KEY`
  - `NEXT_PUBLIC_TMDB_BASE_URL`
  - `NEXT_PUBLIC_IMAGE_DOMAIN`

### ✅ Performance Optimizations
- [x] Image optimization configured
- [x] Compression enabled
- [x] Source maps disabled for production
- [x] Cache headers configured
- [x] Security headers added

## Deployment Steps

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in the dashboard
   - Click "Deploy"

### Option 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

## Post-deployment Checklist

- [ ] Website loads correctly
- [ ] Search functionality works
- [ ] Movie/TV show details load properly
- [ ] Dark/Light mode toggle works
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable (Lighthouse score)
- [ ] Error pages display correctly
- [ ] API endpoints respond properly

## Environment Variables Required

Add these in your Vercel dashboard:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_IMAGE_DOMAIN=image.tmdb.org
```

## Performance Tips

- Images are automatically optimized by Next.js
- API responses are cached for better performance
- Static pages are pre-rendered at build time
- SEO meta tags are included for better search visibility

## Troubleshooting

### Common Issues:
1. **API Key Missing**: Ensure TMDB API key is set in environment variables
2. **Image Loading Issues**: Check image domain configuration
3. **Build Failures**: Run `npm run build` locally first
4. **Type Errors**: Run `npm run type-check` to identify TypeScript issues

### Support Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
