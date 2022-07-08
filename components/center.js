import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import {shuffle} from 'lodash'
import { useRecoilState } from 'recoil';
import { playlistIdState,playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './songs';
import { signOut } from 'next-auth/react';
const colors=[
  "from-blue-500",
  "from-blue-600",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-orange-500",
  "from-purple-500",
  "from-pink-500",
  "from-indigo-500",
  "from-teal-500",
  "from-gray-500",
]

function Center() {
  const spotifyApi= useSpotify()
    const {data:session} = useSession(); 
    const [color,setColor]=useState(null);
    const [playlistId,setPlaylistId]=useRecoilState(playlistIdState)
    const [playlist,setPlaylist]=useRecoilState(playlistState)
    useEffect(()=>{
      setColor(shuffle(colors).pop());
    },[playlistId])

    useEffect(()=>{
        
        spotifyApi.getPlaylist(playlistId).then(res=>{
          setPlaylist(res.body);
        })
        .catch(err=>{
          console.log('something went wrong',err);
        })
    },[spotifyApi,playlistId])
    console.log(playlist)
  return (
    <div className=" flex-grow text-white h-screen overflow-y-scroll">
        <header className="absolute top-2 right-8 bg-black text-white rounded-full">
            <div onClick={()=>signOut()} className="flex items-center   space-x-6 opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2">
                <img  className="h-8 w-8 rounded-full"src={session?.user.image}/>
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className="h-5 w-5" />
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} p-8 h-80 text-white`}>
          <img className="h-44 w-44 shadow-2xl" src={playlist?.images[0]?.url} alt=""/>
          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
          </div>
        </section>
        <Songs/>
    </div>
  )
}

export default Center