import HeroSectionTextHover from '@/components/animata/hero/HeroSectionText'
import { Globe } from '@/components/magicui/globe'
import React from 'react'
import { cn } from '@/lib/utils'

export default function Page() {
  return (
    <section
      aria-label="AIChE NIT Rourkela landing hero"
      className={cn(
        'top-14',
        'relative min-h-screen w-full overflow-hidden',
        // brighter pastel-yellow radial wash
        'bg-[radial-gradient(1400px_700px_at_50%_0%,rgba(253,224,71,0.35),transparent_70%)]', // yellow-400
        'bg-clip-padding'
      )}
    >
      {/* Subtle grid for structure */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
          'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]',
          'bg-[size:40px_40px]'
        )}
      />

      {/* Yellow gradient wash */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
          'bg-[radial-gradient(800px_420px_at_20%_25%,rgba(253,224,71,0.25),transparent_65%),radial-gradient(900px_480px_at_80%_35%,rgba(254,249,195,0.35),transparent_65%)]',
          'mix-blend-color opacity-80'
        )}
      />

      {/* Noise */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
          'bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1.2px)]',
          'bg-[size:12px_12px] opacity-35'
        )}
      />

      {/* Orbit rings (now yellow-tinted) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative h-[70vmin] w-[70vmin]">
          <div className="absolute inset-0 rounded-full border border-yellow-400/40 animate-[spin_28s_linear_infinite] motion-reduce:animate-none" />
          <div className="absolute inset-0 rounded-full border border-yellow-300/35 scale-90 animate-[spin_44s_linear_infinite] motion-reduce:animate-none" />
          <div className="absolute inset-0 rounded-full border border-yellow-200/30 scale-75 animate-[spin_36s_linear_infinite_reverse] motion-reduce:animate-none" />
        </div>
      </div>

      {/* Extra glowing yellow orbs for atmosphere */}
      <div aria-hidden>
        <div className="absolute top-[15%] left-[20%] h-32 w-32 rounded-full bg-yellow-300/30 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] right-[25%] h-40 w-40 rounded-full bg-yellow-200/25 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] right-[15%] h-24 w-24 rounded-full bg-amber-200/25 blur-2xl animate-[pulse_7s_ease-in-out_infinite]" />
      </div>

      {/* Globe */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10 flex items-center justify-center',
          '[mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,1)_55%,rgba(0,0,0,0.35)_75%,transparent_95%)]',
          'mix-blend-multiply',
          '[filter:drop-shadow(0_0_40px_rgba(253,224,71,0.35))_drop-shadow(0_0_20px_rgba(254,249,195,0.25))]'
        )}
        aria-hidden="true"
      >
        <Globe />
      </div>

      {/* Foreground content with warm vignette */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4">
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0',
            'bg-[radial-gradient(700px_350px_at_50%_60%,rgba(255,253,240,0.9),transparent_70%)]',
            'md:bg-[radial-gradient(900px_450px_at_50%_60%,rgba(255,253,240,0.9),transparent_70%)]',
            'opacity-80'
          )}
        />
        <HeroSectionTextHover />
      </div>
    </section>
  )
}
