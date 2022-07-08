import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "./../atoms/playlistAtom";
import Song from './song';

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="pr-4 pl-2 lg:pr-[100px] lg:pl-[100px]  ">
      {playlist?.tracks.items.map((track,i) => (
        <Song key={track.track.id} track={track} order={i}/>
      ))}
    </div>
  );
}

export default Songs;
