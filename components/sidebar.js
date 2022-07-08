import React, { useEffect, useState } from "react";
import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from "@heroicons/react/outline";
import {useSession,signOut} from 'next-auth/react';
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from "recoil";
import { playlistIdState } from '../atoms/playlistAtom';
function Sidebar() {
  const spotifyApi= useSpotify();
  const {data:session,status} =useSession();
  const [playlists,setPlaylists]=useState([]);
  const [playlistId,setPlaylistId]=useRecoilState(playlistIdState)
  useEffect(()=>{
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then(res=>{
        setPlaylists(res.body.items);
        console.log(res);
      })
      console.log("hello")
    }
  },[session,spotifyApi]);

  console.log(playlistId)
  return (
    <div>
      <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 space-y-4  overflow-y-scroll h-screen 
       sm:max-w-[12rem] lg:max-w-[15rem] pb-36">
        <button className="flex space-x-2 items-center hover:text-white">
          <HomeIcon className="h- w-5" />
          <p>Home</p>
        </button>
        <button className="flex space-x-2 items-center hover:text-white">
          <SearchIcon className="h- w-5" />
          <p>Search</p>
        </button>
        <button className="flex space-x-2 items-center hover:text-white">
          <LibraryIcon className="h- w-5" />
          <p>Your Library</p>
        </button>
        <hr className=" border-gray-900"/>

        <button className="flex space-x-2 items-center hover:text-white">
          <PlusCircleIcon className="h- w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex space-x-2 items-center hover:text-white">
          <HeartIcon className="h- w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex space-x-2 items-center hover:text-white">
          <RssIcon className="h- w-5" />
          <p>Your episodes</p>
        </button>
        <hr className=" border-gray-900"/>

        {/* playlists */}
        {playlists.map((playlist)=>(
            <p key={playlist.id} onClick={()=>setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">{playlist.name}</p>
        ))}
      
      </div>
    </div>
  );
}

export default Sidebar;
