import NextAuth from "next-auth"
import spotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token){
  try{
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const {body:refreshedToken} = await spotifyApi.refreshAccessToken()
    console.log("refreshed token is ",refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now+refreshedToken.expires_in*1000,
      refreshToken: refreshedToken.refresh_token??token.refreshToken,
    }
  }
  catch(e){
    return {
      ...token,
      error: "RefreshAcessTokenError",
    }
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    spotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization:LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  // to include access token and refresh token 
  pages:{
    signIn:'/login',
  },
  callbacks:{
     async jwt({token,user,account}){
      // initial sign in
      if(account && user){
        return {
          ...token,
          accessToken:account.access_token,
          refreshToken:account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at*1000,
        }
      }
      // if access token is not expired
      if(Date.now()<token.accessTokenExpires){
        console.log("existing access  token is valid")
        return token
      }
      console.log("acess token has expired");
      //refresh token
      return await refreshAccessToken(token)
     },
     async session({session,token}){
      session.user.accessToken=token.accessToken;
      session.user.refreshToken=token.refreshToken;
      session.user.username=token.username;
      
      return session;

     }
  }
})