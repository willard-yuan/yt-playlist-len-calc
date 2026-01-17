"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Video } from "lucide-react"

interface ThumbnailImageProps {
  src: string
  alt: string
  videoId: string
  className?: string
  imgClassName?: string
}

export function ThumbnailImage({ src: initialSrc, alt, videoId, className, imgClassName }: ThumbnailImageProps) {
  const [src, setSrc] = useState(initialSrc);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setSrc(initialSrc);
    setRetryCount(0);
    setIsLoading(true);
    setHasError(false);
  }, [initialSrc]);

  const handleError = () => {
    if (retryCount >= 3) {
        setHasError(true);
        setIsLoading(false);
        return;
    }

    const nextRetry = retryCount + 1;
    setRetryCount(nextRetry);

    if (nextRetry === 1) {
       // First fallback: Try HQ Default from standard domain
       setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    } else if (nextRetry === 2) {
       // Second fallback: Try User suggested domain/format
       setSrc(`https://img.youtube.com/vi/${videoId}/0.jpg`);
    } else {
       // Final fallback: Low res default
       setSrc(`https://i.ytimg.com/vi/${videoId}/default.jpg`);
    }
  };

  const handleLoad = () => {
      setIsLoading(false);
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-muted", className)}>
        {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        )}
        
        {hasError ? (
             <div className="flex flex-col h-full items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                <Video className="h-12 w-12 mb-2" />
                <p className="text-xs">Load Failed</p>
            </div>
        ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={src} 
              alt={alt} 
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300", 
                isLoading ? "opacity-0" : "opacity-100",
                imgClassName
              )}
              onError={handleError}
              onLoad={handleLoad}
            />
        )}
    </div>
  );
}
