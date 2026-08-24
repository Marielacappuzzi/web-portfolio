"use client";

import Image from "next/image";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Mat } from "./Mat";
import {
  FullscreenIcon,
  PauseIcon,
  PlayIcon,
  SoundOffIcon,
  SoundOnIcon,
} from "./Icon";
import { cn } from "@/lib/cn";

interface VideoPlayerProps {
  /** Path under /public, e.g. "/video/jesus-en-proceso.mp4". */
  src: string;
  /** Still frame. Carries the frame before the file is touched. */
  poster?: string;
  /** What is shown, for screen readers and as the accessible name. */
  label: string;
  aspect?: string;
  caption?: string;
  bare?: boolean;
  className?: string;
}

/** Seconds as m:ss. Nothing here runs long enough to need hours. */
function timecode(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

/**
 * The video player.
 *
 * Controls sit **below** the frame, never over it. Floating controls need a
 * scrim to stay legible, and a scrim means darkening the artwork to make
 * interface readable — the exact inversion this site is built to avoid. Under
 * the frame they read as a caption line, cost the work nothing, and never
 * cover a face.
 *
 * Nothing autoplays and nothing loops: these are pieces of footage with a
 * beginning and an end, offered rather than imposed. The file is not touched
 * until the viewer presses play — `preload="metadata"` fetches the duration
 * and stops, so a page with several clips still costs almost nothing.
 *
 * Keyboard: space or K toggles, arrows seek five seconds, M mutes, F goes
 * fullscreen. The progress bar is a real range input, so it is draggable,
 * focusable and announced without any of that being rebuilt by hand.
 */
export function VideoPlayer({
  src,
  poster,
  label,
  aspect = "aspect-video",
  caption,
  bare = false,
  className,
}: VideoPlayerProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = useCallback(() => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      setStarted(true);
      void el.play();
    } else {
      el.pause();
    }
  }, []);

  const seekBy = useCallback((delta: number) => {
    const el = video.current;
    if (!el) return;
    el.currentTime = Math.min(
      Math.max(el.currentTime + delta, 0),
      el.duration || 0,
    );
  }, []);

  const toggleMute = useCallback(() => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = wrapper.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  }, []);

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    // Let the range input keep its own arrow keys.
    if ((event.target as HTMLElement).tagName === "INPUT") return;

    switch (event.key) {
      case " ":
      case "k":
        event.preventDefault();
        toggle();
        break;
      case "ArrowRight":
        event.preventDefault();
        seekBy(5);
        break;
      case "ArrowLeft":
        event.preventDefault();
        seekBy(-5);
        break;
      case "m":
        toggleMute();
        break;
      case "f":
        toggleFullscreen();
        break;
    }
  }

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setDuration(el.duration);
    const onEnded = () => setPlaying(false);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnded);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  const frame = (
    <div
      ref={wrapper}
      onKeyDown={onKeyDown}
      className="flex flex-col bg-fg-strong/4.5 focus-within:outline-none"
    >
      <div className={cn("relative w-full overflow-hidden", aspect)}>
        <video
          ref={video}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          aria-label={label}
          onClick={toggle}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        />

        {/* The poster stays put until the first play, so the frame is never
            blank while the browser is still fetching metadata. */}
        {!started && poster ? (
          <Image
            src={poster}
            alt={label}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            quality={90}
            className="pointer-events-none object-cover"
          />
        ) : null}

        {!playing ? (
          <button
            type="button"
            onClick={toggle}
            aria-label={started ? "Reanudar el video" : "Reproducir el video"}
            className="group absolute inset-0 flex items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full",
                "border border-white/70 bg-black/25 text-white",
                "transition-transform duration-500 ease-out-quart",
                "group-hover:scale-110 group-focus-visible:scale-110",
                "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              )}
            >
              <PlayIcon width={22} height={22} className="ml-[3px]" />
            </span>
          </button>
        ) : null}
      </div>

      {/* Progress, then the controls. Both under the frame, never over it. */}
      <label className="sr-only" htmlFor={`seek-${src}`}>
        Avance del video
      </label>
      <input
        id={`seek-${src}`}
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={time}
        onChange={(event) => {
          const el = video.current;
          if (el) el.currentTime = Number(event.target.value);
        }}
        style={{ backgroundSize: `${progress}% 100%` }}
        className={cn(
          "h-[3px] w-full cursor-pointer appearance-none bg-rule",
          "bg-gradient-to-r from-fg-strong to-fg-strong bg-no-repeat",
          "focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current",
          "[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-[3px]",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-fg-strong",
          "[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-[3px]",
          "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-fg-strong",
        )}
      />

      <div className="flex items-center gap-md px-sm py-2xs">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="text-fg-strong transition-opacity duration-300 hover:opacity-60"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <p className="font-sans text-2xs tabular-nums tracking-wide text-fg-muted">
          {timecode(time)} / {timecode(duration)}
        </p>

        <div className="ml-auto flex items-center gap-md">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Activar el sonido" : "Silenciar"}
            aria-pressed={muted}
            className="text-fg-strong transition-opacity duration-300 hover:opacity-60"
          >
            {muted ? <SoundOffIcon /> : <SoundOnIcon />}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Pantalla completa"
            className="text-fg-strong transition-opacity duration-300 hover:opacity-60"
          >
            <FullscreenIcon />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <figure className={cn("w-full", className)}>
      {bare ? frame : <Mat>{frame}</Mat>}
      {caption ? (
        <figcaption className="mt-sm font-sans text-xs text-fg-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
