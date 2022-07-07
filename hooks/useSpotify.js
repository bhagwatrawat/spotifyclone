import React, { useEffect } from 'react'
import { useSession ,signIn} from 'next-auth/react';
import spotifyApi from '../lib/spotify'
function useSpotify() {
     const {data:session,status} =useSession();
     useEffect(()=>{
        if(session){
            if(session.error==="RefreshAcessTokenError"){
                signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);
        }
     },[session])
  return spotifyApi
}

export default useSpotify