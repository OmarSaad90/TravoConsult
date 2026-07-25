'use client';

import { useEffect, useRef } from 'react';

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

/**
 * Renders a video with a solid black background as if it had real alpha
 * transparency. Standard mp4/H.264 has no alpha channel, so the black is
 * baked into every frame; this reads each frame into a canvas and forces
 * near-black pixels transparent, with a short feather so the cutout edge
 * isn't jagged. Works against any background color (unlike CSS blend-mode
 * tricks like `screen`, which only remove black over a dark destination).
 */
export function ChromaKeyVideo({
  src,
  className,
  threshold = 30,
}: {
  src: string;
  className?: string;
  threshold?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current as VideoWithFrameCallback | null;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let handle: number;
    let cancelled = false;

    const drawFrame = () => {
      if (!video.videoWidth || !video.videoHeight) return;
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;
      const feather = threshold; // fade band above the hard cutoff

      for (let i = 0; i < data.length; i += 4) {
        const luma = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (luma <= threshold) {
          data[i + 3] = 0;
        } else if (luma < threshold + feather) {
          data[i + 3] = Math.round(((luma - threshold) / feather) * 255);
        }
      }

      ctx.putImageData(frame, 0, 0);
    };

    // Users who've asked for reduced motion get a single static, chroma-keyed
    // frame instead of the perpetually animating, color-shifting video.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const drawOnceReady = () => {
        if (cancelled) return;
        drawFrame();
        video.pause();
      };
      if (video.readyState >= 2) {
        drawOnceReady();
      } else {
        video.addEventListener('loadeddata', drawOnceReady, { once: true });
      }
      return () => {
        cancelled = true;
        video.removeEventListener('loadeddata', drawOnceReady);
      };
    }

    const loop = () => {
      if (cancelled) return;
      drawFrame();
      if (typeof video.requestVideoFrameCallback === 'function') {
        handle = video.requestVideoFrameCallback(loop);
      } else {
        handle = requestAnimationFrame(loop);
      }
    };

    if (typeof video.requestVideoFrameCallback === 'function') {
      handle = video.requestVideoFrameCallback(loop);
    } else {
      handle = requestAnimationFrame(loop);
    }

    return () => {
      cancelled = true;
      if (typeof video.cancelVideoFrameCallback === 'function') {
        video.cancelVideoFrameCallback(handle);
      } else {
        cancelAnimationFrame(handle);
      }
    };
  }, [threshold]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      />
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
    </>
  );
}
