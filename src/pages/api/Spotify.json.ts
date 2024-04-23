// api/spotify.js


export async function getToken() {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(import.meta.env.SPOTIFY_CLIENT_ID + ':' + import.meta.env.SPOTIFY_CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}


export async function getTopData(type: string, accessToken: string) {
    const url = `https://api.spotify.com/v1/me/top/${type}?offset=5&limit=5&time_range=short_term`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data from Spotify API');
    }
  
    const data = await response.json();
  
    return data;
  }
  