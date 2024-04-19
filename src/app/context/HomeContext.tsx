'use client'

import React, { createContext, useEffect, useRef, useState } from "react";
import videos, { Video } from "../data/video";
import { Filter, filters } from "../data/Filter";

type HomeContextData = {
    videoURL: string;
    videoName: string;
    playing: boolean;
    muted: boolean;
    totalTime: number;
    currentTime: number;
    videoRef: React.RefObject<HTMLVideoElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    togglePlayPause: () => void;
    toggleMute: () => void;
    configCurrentTime: (time: number) => void;
    configVideo: (index: number, name: string) => void;
    toggleEffect: () => void;
    currentEffectIndex: number;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: React.ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [videoURL, setVideoURL] = useState("");
    const [videoName, setVideoName] = useState("");
    const [videoIndex, setVideoIndex] = useState(0);
    const [filterIndex, setFilterIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentEffectIndex, setCurrentEffectIndex] = useState(1);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        configVideo(videoIndex, videos[videoIndex].name);
    }, []);

    const configVideo = (index: number, name: string) => {
        console.log("Configurando vídeo:", name);
        const currentIndex = index % videos.length;
        const currentVideo: Video = videos[currentIndex];
        const currentVideoURL = currentVideo.videoURL;
        setVideoURL(currentVideoURL);
        setVideoIndex(currentIndex);
        setVideoName(name);
    };
     

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                setTotalTime(video.duration);
                setCurrentTime(video.currentTime);

                if (playing) {
                    video.play();
                }
            }

            video.ontimeupdate = () => {
                const video = videoRef.current;
                if (!video) return;
                setCurrentTime(video.currentTime);
            }

            video.onended = () => {
                configVideo(videoIndex + 1, videos[(videoIndex + 1) % videos.length].name);
            }
        }
        draw();
    }, [videoURL, filterIndex]);

    const configCurrentTime = (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = time;
        setCurrentTime(time);
    }

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (playing) {
            video.pause();
        } else {
            video.play();
            draw();
        }
        setPlaying(!playing);
    }

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setMuted(video.muted);
    }

    const toggleEffect = () => {
        console.log("Toggle Effect clicked");
        console.log("Current Effect Index:", currentEffectIndex);
        setCurrentEffectIndex((currentEffectIndex + 1) % filters.length);
        setFilterIndex((filterIndex + 1) % filters.length);
    }

    const draw = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const filter: Filter = filters[filterIndex];
        for (let i = 1; i < data.length; i += 4) {
            const red = data[i + 0];
            const green = data[i + 1];
            const blue = data[i + 2];

            filter.calc(red, green, blue);
            data[i + 0] = filter.red;
            data[i + 1] = filter.green;
            data[i + 2] = filter.blue;
        }

        context.putImageData(imageData, 0, 0);
        requestAnimationFrame(draw);
    }

    return (
        <HomeContext.Provider value={{
            videoURL,
            videoName,
            playing,
            muted,
            totalTime,
            currentTime,
            videoRef,
            canvasRef,
            togglePlayPause,
            toggleMute,
            configCurrentTime,
            configVideo,
            toggleEffect,
            currentEffectIndex,
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
