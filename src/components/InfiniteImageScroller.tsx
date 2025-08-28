"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface WideImageScrollerProps {
  images?: string[]
  autoplayInterval?: number
  showControls?: boolean
  className?: string
}

export default function WideImageScroller({
  images = [
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756413102/b203098b-a1e2-4fa8-839d-81b6f1f49554_yjr2yp.jpg",
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756413100/1305b09a-1569-46a8-aac3-56333cff3d95_lqaymv.jpg",
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403305/a886da2e-64e0-42c5-9362-7ef359cf38db_1_hvjit4.jpg",
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756402973/63a1f884-c685-4789-91da-010c1e63d00e_s8zwkv.jpg",
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756402971/0d04083a-fcf1-49fe-8a57-be7a3b343602_pjlzki.jpg"

  ],
  autoplayInterval = 3000,
  showControls = true,
  className = "",
}: WideImageScrollerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }
  }

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying || isPaused) return

    const interval = setInterval(nextImage, autoplayInterval)
    return () => clearInterval(interval)
  }, [isPlaying, isPaused, nextImage, autoplayInterval])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          prevImage()
          break
        case "ArrowRight":
          nextImage()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextImage, prevImage])

  // Calculate visible images (current + adjacent)
  const getVisibleImages = () => {
    const visibleImages = []
    const totalImages = images.length

    // Show 5 images: 2 before, current, 2 after
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalImages) % totalImages
      visibleImages.push({
        index,
        src: images[index],
        position: i,
        isCenter: i === 0,
      })
    }

    return visibleImages
  }

  const visibleImages = getVisibleImages()

  return (
    <div className={`relative w-full py-10 ${className}`}>
      {/* Main Container - Full width */}
      <div
        ref={containerRef}
        className={`relative ${isMobile ? "h-[300px]" : "h-[500px]"} w-full overflow-hidden bg-black/5 rounded-2xl`}
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {visibleImages.map(({ index, src, position, isCenter }) => {
            // Calculate positioning and styling based on position
            const translateX = position * (isMobile ? 280 : 400)
            const scale = isCenter ? 1 : 0.7
            const opacity = isCenter ? 1 : 0.4
            const blur = isCenter ? 0 : 8
            const zIndex = isCenter ? 10 : 5 - Math.abs(position)

            return (
              <div
                key={`${index}-${position}`}
                className="absolute transition-all duration-700 ease-out cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex,
                }}
                onClick={() => !isCenter && goToImage(index)}
              >
                <div
                  className={`relative ${isMobile ? "w-[280px] h-[200px]" : "w-[600px] h-[400px]"} rounded-xl overflow-hidden shadow-2xl`}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={isCenter}
                    sizes={isCenter ? "600px" : "400px"}
                  />

                  {/* Overlay for non-center images */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation Controls */}
        {showControls && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm border-white/50 text-gray-700 hover:text-gray-900 transition-all duration-300 z-20 shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm border-white/50 text-gray-700 hover:text-gray-900 transition-all duration-300 z-20 shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Mobile Navigation Hint */}
        {isMobile && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Swipe to navigate
          </div>
        )}

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-yellow-200 to-amber-500 transition-all duration-300 ease-linear"
            style={{
              width: isPlaying && !isPaused ? "100%" : "0%",
              animation: isPlaying && !isPaused ? `progress ${autoplayInterval}ms linear infinite` : "none",
            }}
          />
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-3 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            className={`${isMobile ? "w-2.5 h-2.5" : "w-2.5 h-2.5"} rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "bg-gradient-to-r from-yellow-500 to-orange-300  shadow-lg"
                : "bg-gray-300/70 hover:bg-gray-400/90 hover:scale-110"
            }`}
            onClick={() => goToImage(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 text-sm text-gray-500">
        <p>
          {isMobile
            ? "Swipe left or right • Tap side images to navigate"
            : "Use arrow keys or click arrows • Click side images to navigate • Hover to pause"}
        </p>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}