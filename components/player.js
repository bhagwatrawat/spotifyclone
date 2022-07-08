import React, { useCallback, useEffect } from 'react'
import {debounce} from 'lodash'
import useSpotify from '../hooks/useSpotify';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtoms';
import UseSongInfo from '../hooks/useSongInfo';
import {  SwitchHorizontalIcon ,VolumeUpIcon as VolumeDownIcon, ReplyIcon, VolumeUpIcon  } from '@heroicons/react/outline';
import { FastForwardIcon,RewindIcon, PauseIcon, PlayIcon} from '@heroicons/react/solid';

function Player() {
    const spotifyApi= useSpotify()
    const {data:session,status}=useSession();
    const [currentTrackId,setCurrentTrackId]=useRecoilState(currentTrackIdState);
    const [isPlaying,setIsPlaying]=useRecoilState(isPlayingState);
    const [volume,setVolume]=useState()
    const songInfo=UseSongInfo();

    const fetchCurrentSong=()=>{
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(res=>{
                const id=res.body?.item?.id
                setCurrentTrackId(id)
                
            })
            spotifyApi.getMyCurrentPlayingTrack().then(res=>{
                setIsPlaying(res.body?.is_playing);
            })
        }
    }
    const handlePlayPause=()=>{
        spotifyApi.getMyCurrentPlaybackState().then(res=>{
            if(res.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            }
            else{
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }
    useEffect(()=>{
        if(volume>0 && volume<100){
            debounceAdjustVolume(volume);
        }
    },[volume])
    useEffect(()=>{
        if(spotifyApi.getAccessToken && !currentTrackId){
            fetchCurrentSong()
            setVolume(50)
        }
    },[currentTrackId,spotifyApi,session])
     const debounceAdjustVolume=useCallback(
        debounce((volume)=>{
            spotifyApi.setVolume(volume).catch(err=>{});
        },500),[]
     )
  return (
    <div className="items-center h-16 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-s x-2 md:px-8" >
        <div className="flex items-center space-x-4">
            <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} />
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists[0]?.name}</p>
            </div>
        </div>
        <div className="flex space-x-4 justify-center">
            <SwitchHorizontalIcon className="w-10 h-10 cursor-pointer"/>
            <RewindIcon className="w-10 h-10 cursor-pointer"/>
            {isPlaying?(
                <PauseIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer"/>
            ):(
                <PlayIcon onClick={handlePlayPause} className="w-10 h-10 cursor-pointer"/>
            )}
            <FastForwardIcon className="w-10 h-10 cursor-pointer"/>
            <ReplyIcon className="w-10 h-10 cursor-pointer"/>
        </div>
        <div className="flex space-x-3 items-center md:space-x-4 justify-end">
            <VolumeDownIcon onClick={()=>volume>0 && setVolume(volume-10)} className="w-7 h-7 cursor-pointer"/>
            <input  onChange={e=>setVolume(Number(e.target.value))} className="w-14 md:w-28" type="range" value={volume} min={0} max={100}/>
            <VolumeUpIcon onClick={()=>volume<100 && setVolume(volume+10)}className="w-7 h-7 cursor-pointer"/>
        </div>
    </div>
  )
}

export default Player