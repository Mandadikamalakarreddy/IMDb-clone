'use client'

export default function DebugPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Deployment Debug Information</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
        <div className="space-y-2">
          <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
          <p><strong>API Key Present:</strong> {process.env.API_KEY ? 'Yes' : 'No'}</p>
          <p><strong>Vercel Environment:</strong> {process.env.VERCEL ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">API Test</h2>
        <p className="mb-4">Check if the TMDB API is working:</p>
        <button 
          onClick={async () => {
            try {
              const response = await fetch('/api/verify');
              const data = await response.json();
              alert(JSON.stringify(data, null, 2));
            } catch (error) {
              alert('API test failed: ' + error);
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test API Connection
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Deployment Instructions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">For Vercel Deployment:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
              <li>Go to your Vercel dashboard</li>
              <li>Select your project</li>
              <li>Go to Settings → Environment Variables</li>
              <li>Add: <code className="bg-gray-100 px-1">API_KEY</code> with your TMDB API key</li>
              <li>Redeploy your project</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
