"use client"

import type React from "react"
import { useCallback, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type TitleSpriteSrc = string

interface HeroCardProps {
  className?: string
  logoSrc?: string
  titleSpriteSources?: TitleSpriteSrc[] // only images around the heading
  emojiPool?: string[] // emojis for the subtitle
  titleSpriteCount?: number // how many image sprites to show
  emojiSpriteCount?: number // how many emoji sprites to show
}

type Rect = { x: number; y: number; w: number; h: number }

function expandRect(r: Rect, pad: number): Rect {
  return { x: r.x - pad, y: r.y - pad, w: r.w + pad * 2, h: r.h + pad * 2 }
}

function pointInRect(x: number, y: number, r: Rect) {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generatePositions(count: number, container: Rect, avoid: Rect[], padding = 16, maxTriesPerPoint = 50) {
  const result: { left: number; top: number; rotate: number; scale: number }[] = []
  const avoidExpanded = avoid.map((r) => expandRect(r, padding))

  for (let i = 0; i < count; i++) {
    let tries = 0
    let placed = false
    while (tries++ < maxTriesPerPoint && !placed) {
      const left = random(container.x, container.x + container.w)
      const top = random(container.y, container.y + container.h)
      const hitsNoFly = avoidExpanded.some((r) => pointInRect(left, top, r))
      if (!hitsNoFly) {
        result.push({
          left,
          top,
          rotate: random(-14, 14),
          scale: random(1, 1.25),
        })
        placed = true
      }
    }
  }
  return result
}

const HeroSectionTextHover: React.FC<HeroCardProps> = ({
  className,
  logoSrc = "/Aiche-logo.svg",
  titleSpriteSources = [
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756402971/0d04083a-fcf1-49fe-8a57-be7a3b343602_pjlzki.jpg",
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756402973/63a1f884-c685-4789-91da-010c1e63d00e_s8zwkv.jpg",
    "https://res.cloudinary.com/dk6m1qejk/image/upload/v1756403305/a886da2e-64e0-42c5-9362-7ef359cf38db_1_hvjit4.jpg",
  ],
  emojiPool = ["🧪", "⚗️", "🔬", "🧬", "⚛️", "📊", "🧠", "🔥", "💧"],
  titleSpriteCount = 5,
  emojiSpriteCount = 8,
}) => {
  // Refs to compute “no-fly zones”
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const subtitleRef = useRef<HTMLDivElement | null>(null)

  // Hover state
  const [titleActive, setTitleActive] = useState(false)
  const [subtitleActive, setSubtitleActive] = useState(false)

  // Positions (absolute px within the section)
  const [titlePositions, setTitlePositions] = useState<
    { left: number; top: number; rotate: number; scale: number; src: string }[]
  >([])
  const [emojiPositions, setEmojiPositions] = useState<
    { left: number; top: number; rotate: number; scale: number; emoji: string }[]
  >([])

  const pickSources = useMemo(() => {
    // Ensure enough unique images for the title
    const bag = [...titleSpriteSources]
    while (bag.length < titleSpriteCount) bag.push(...titleSpriteSources)
    return bag.slice(0, titleSpriteCount)
  }, [titleSpriteSources, titleSpriteCount])

  const handleTitleHover = useCallback(() => {
    const section = sectionRef.current?.getBoundingClientRect()
    const title = titleRef.current?.getBoundingClientRect()
    if (!section || !title) return

    const container: Rect = { x: 0, y: 0, w: section.width, h: section.height }

    // No-fly: title area so sprites don’t overlap the heading text
    const avoid: Rect[] = [
      { x: title.left - section.left, y: title.top - section.top, w: title.width, h: title.height },
    ]

    const pos = generatePositions(titleSpriteCount, container, avoid, 28).map((p, i) => ({
      ...p,
      src: pickSources[i % pickSources.length],
    }))

    setTitlePositions(pos)
    setTitleActive(true)
  }, [pickSources, titleSpriteCount])

  const handleSubtitleHover = useCallback(() => {
    const section = sectionRef.current?.getBoundingClientRect()
    const title = titleRef.current?.getBoundingClientRect()
    const subtitle = subtitleRef.current?.getBoundingClientRect()
    if (!section || !title || !subtitle) return

    const container: Rect = { x: 0, y: 0, w: section.width, h: section.height }

    // No-fly: both title and subtitle to prevent clash with readable text
    const avoid: Rect[] = [
      { x: title.left - section.left, y: title.top - section.top, w: title.width, h: title.height },
      { x: subtitle.left - section.left, y: subtitle.top - section.top, w: subtitle.width, h: subtitle.height },
    ]

    const pos = generatePositions(emojiSpriteCount, container, avoid, 20).map((p) => ({
      ...p,
      emoji: emojiPool[Math.floor(Math.random() * emojiPool.length)],
    }))

    setEmojiPositions(pos)
    setSubtitleActive(true)
  }, [emojiPool, emojiSpriteCount])

  const clearTitle = () => setTitleActive(false)
  const clearSubtitle = () => setSubtitleActive(false)

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative w-full min-h-[75vh] md:min-h-[85vh] py-12 md:py-16  to-blue-50/30",
        className,
      )}
      aria-label="AIChE NIT Rourkela Chapter hero"
    >
      {/* Sprite canvas (behind content, but visible) */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 transition-all duration-500 ease-out",
          titleActive || subtitleActive ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Title image sprites */}
        {titleActive &&
          titlePositions.map((p, i) => (
            <div
              key={`ts-${i}`}
              className="absolute"
              style={{
                left: p.left,
                top: p.top,
                transform: `translate(-50%, -50%) rotate(${p.rotate}deg) scale(${p.scale})`,
                transition: "all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              <Image
                src={p.src || "/placeholder.svg"}
                alt="sprite"
                width={64}
                height={64}
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 select-none drop-shadow-lg filter"
                draggable={false}
                priority={false}
              />
            </div>
          ))}

        {/* Subtitle emoji sprites */}
        {subtitleActive &&
          emojiPositions.map((p, i) => (
            <div
              key={`es-${i}`}
              className="absolute text-2xl sm:text-3xl md:text-4xl drop-shadow-sm"
              style={{
                left: p.left,
                top: p.top,
                transform: `translate(-50%, -50%) rotate(${p.rotate}deg) scale(${p.scale})`,
                transition: "all 450ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                animationDelay: `${i * 80}ms`,
              }}
            >
              {p.emoji}
            </div>
          ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="relative h-28 w-auto md:h-32 drop-shadow-sm" aria-hidden="true">
          <Image
            src={logoSrc || "/placeholder.svg"}
            width={420}
            height={120}
            alt="AIChE Logo"
            className="h-28 w-auto md:h-32 select-none"
            priority
          />
        </div>

        <div
          ref={titleRef}
          className="inline-block cursor-pointer"
          onMouseEnter={handleTitleHover}
          onMouseLeave={clearTitle}
        >
          <h1 className="text-balance font-black leading-[0.9] tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-sm">
            AIChE NIT ROURKELA
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="mt-4 cursor-pointer"
          onMouseEnter={handleSubtitleHover}
          onMouseLeave={clearSubtitle}
        >
          <p className="mx-auto max-w-4xl text-pretty text-lg text-slate-700 sm:text-xl md:text-2xl leading-relaxed font-medium">
            Innovate with{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
              Chemical Engineering
            </span>{" "}
            to create{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
              real-world impact
            </span>{" "}
            at NIT Rourkela.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/join"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <span className="relative z-10">Join the Chapter</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <a
            href="/events"
            className="group rounded-full border-2 border-slate-300 bg-white/80 backdrop-blur-sm px-8 py-4 font-semibold text-slate-800 shadow-md transition-all duration-300 hover:border-slate-400 hover:bg-white hover:shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Explore Events
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeroSectionTextHover
