"use client"

import { useEffect, useRef } from "react"
import Hls from "hls.js"
import "plyr/dist/plyr.css"

export default function VideoPlayer({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        let hls: Hls | null = null
        let player: { destroy: () => void } | null = null
        let cancelled = false

        const setup = async () => {
            const { default: Plyr } = await import("plyr")
            if (cancelled) return

            player = new Plyr(video, {
                controls: [
                    "play-large",
                    "play",
                    "progress",
                    "current-time",
                    "mute",
                    "volume",
                    "settings",
                    "fullscreen"
                ]
            })

            if (Hls.isSupported()) {
                hls = new Hls()
                hls.loadSource(src)
                hls.attachMedia(video)
                return
            }

            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = src
                return
            }

            video.src = src
        }

        setup().catch((error) => {
            console.error("Failed to initialize video player", error)
        })

        return () => {
            cancelled = true
            player?.destroy()
            hls?.destroy()
            video.removeAttribute("src")
            video.load()
        }
    }, [src])

    return (
        <div className="relative w-full h-full overflow-hidden rounded-xl border border-gray-700/80 bg-gray-950 shadow-2xl">
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-black/40 via-transparent to-black/50" />

            <video
                ref={videoRef}
                className="h-full w-full object-contain bg-black"
                playsInline
            />

            <style jsx global>{`
                .plyr {
                    height: 100%;
                    --plyr-color-main: #dc2626;
                    --plyr-video-control-color-hover: #ffffff;
                    --plyr-video-control-background-hover: rgba(220, 38, 38, 0.9);
                    --plyr-range-fill-background: #dc2626;
                    --plyr-menu-background: #0f172a;
                    --plyr-menu-color: #e2e8f0;
                    --plyr-tooltip-background: #dc2626;
                    --plyr-tooltip-color: #ffffff;
                }

                .plyr--video .plyr__control--overlaid {
                    background: rgba(220, 38, 38, 0.92);
                    box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
                }

                .plyr--video .plyr__controls {
                    background: linear-gradient(to top, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.35));
                    border-top: 1px solid rgba(148, 163, 184, 0.2);
                }

                .plyr--fullscreen:hover .plyr__controls,
                .plyr--fullscreen:focus-within .plyr__controls {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                    pointer-events: auto !important;
                }
            `}</style>
        </div>
    )
}
