import Spotify from "@auth/core/providers/spotify";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    Spotify({
      clientId: import.meta.env.SPOTIFY_CLIENT_ID,
      clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET,
      scope: "user-top-read",
      authorizeUrl: "https://accounts.spotify.com/authorize",
      tokenUrl: "https://accounts.spotify.com/api/token",
      redirectUri: "http://localhost:3000/auth/callback",
      reponseType: "code",
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
});
