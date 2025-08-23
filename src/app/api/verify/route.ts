import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json({ 
      status: 'error',
      message: 'API_KEY environment variable not found',
      hasApiKey: false
    }, { status: 500 });
  }

  try {
    // Test the API key with a simple request
    const testUrl = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;
    const response = await fetch(testUrl);
    
    if (!response.ok) {
      return NextResponse.json({
        status: 'error',
        message: `TMDB API returned ${response.status}: ${response.statusText}`,
        hasApiKey: true,
        apiKeyValid: false
      }, { status: 500 });
    }

    const data = await response.json();
    
    return NextResponse.json({
      status: 'success',
      message: 'API key is working correctly',
      hasApiKey: true,
      apiKeyValid: true,
      tmdbConfig: {
        secure_base_url: data.images?.secure_base_url || 'Not available'
      }
    });

  } catch (error) {
    console.error('API verification error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to verify API key',
      hasApiKey: true,
      apiKeyValid: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
