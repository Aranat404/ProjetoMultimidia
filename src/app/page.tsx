'use client'

import React, { useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay, FaLightbulb, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import videos, { Video } from './data/video';
import { convertTimeToString } from "./utils/Utils";

export default function Home() {
  const {
    videoName,
    videoURL,
    playing,
    muted,
    togglePlayPause,
    toggleMute,
    totalTime,
    currentTime,
    videoRef,
    configCurrentTime,
    configVideo,
    toggleEffect,
    currentEffectIndex
  } = useContext(HomeContext);

  const currentVideo = videos.find((video) => video.name === videoName);

  const videoDescription = currentVideo ? currentVideo.description : '';
  const videoDescription2 = currentVideo ? currentVideo.description2 : '';
  const videoDescription3 = currentVideo ? currentVideo.description3 : '';
  const videoDescription4 = currentVideo ? currentVideo.description4 : '';
  const videoDescription5 = currentVideo ? currentVideo.description5 : '';
  const videoDescription6 = currentVideo ? currentVideo.description6 : '';
  const videoDescription7 = currentVideo ? currentVideo.description7 : '';
  const videoDescription8 = currentVideo ? currentVideo.description8 : '';
  const videoDescription9 = currentVideo ? currentVideo.description9 : '';
  const videoDescription10 = currentVideo ? currentVideo.description10 : '';

  const filterClass = `filter-${currentEffectIndex}`;

  return (
    <main className="main-content mx-auto w-[80%] mt-2 flex flex-col">
      
      <h1 className="tube-cine-title">Tube Cine</h1>

      <div className="w-full flex">
        <div className="w-[65%] relative">
          <div className="video-container relative" style={{ width: '100%' }}>
            <video className={`w-full ${filterClass}`} ref={videoRef} src={videoURL} playsInline muted={muted}></video> 
            <div className="controls bg-black absolute bottom-0 left-0 right-0 flex items-center justify-between p-4">
              <div className="flex items-center">
                <button className="play-pause-button text-white mr-2" onClick={togglePlayPause}>
                  {playing ? <FaPause /> : <FaPlay />}
                </button>
                <button className="volume-button text-white" onClick={toggleMute}>
                  {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </div>
              <input className="time-slider flex-grow h-4"
                type="range"
                min={0}
                max={totalTime}
                value={currentTime}
                onChange={(e) => configCurrentTime(Number(e.target.value))}
              />
              <span className="time-display text-white ml-2 mr-2">
                {convertTimeToString(currentTime)}:{convertTimeToString(totalTime)}
              </span>
              <FaLightbulb className="lightbulb-icon" onClick={toggleEffect} />
            </div>
          </div>
          <div className="video-name">{videoName}</div>
          
          <div className="video-description">{videoDescription10}</div>
          <div className="video-description">{videoDescription10}</div>
          <div className="video-description">{videoDescription}</div>
          <div className="video-description">{videoDescription2}</div>
          <div className="video-description">{videoDescription10}</div>
          <div className="video-description">{videoDescription3}</div>
          <div className="video-description">{videoDescription4}</div>
          <div className="video-description">{videoDescription5}</div>
          <div className="video-description">{videoDescription6}</div>
          <div className="video-description">{videoDescription7}</div>
          <div className="video-description">{videoDescription8}</div>
          <div className="video-description">{videoDescription9}</div>
        </div>
        <div className="w-[35%] h-[100vh]">
          {videos.map((video: Video, index) => (
            <button className="video-thumbnail mr-4 mb-4" onClick={() => configVideo(index, video.name)} key={index}>
              <img className="h-[200px]" src={video.imageURL} alt={`Thumbnail ${index}`} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '200px' }}></div>
    </main>
  );
}
