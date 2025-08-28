import AboutSection from '@/components/AboutSection'
import WideImageScroller from '@/components/InfiniteImageScroller'
import React from 'react'

export default function page() {
  return (
    <>
      <AboutSection/>
      <WideImageScroller/>
      <div className="mb-10 w-full ">
            <div className=" p-8 bg-gradient-to-r from-blue-900 to-blue-950 text-white text-center shadow-lg">
              <h4 className="text-2xl font-semibold">
                Build, learn, and lead with AIChE NIT Rourkela
              </h4>
              <p className="mt-2 text-blue-100">
                Workshops • Plant Visits • Research Circles • Case Competitions • Outreach
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <a
                  href="/events"
                  className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold bg-yellow-400 text-blue-950 hover:bg-yellow-500 transition"
                >
                  Explore Events
                </a>
                <a
                  href="/join"
                  className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold border border-yellow-400/70 text-yellow-300 hover:bg-yellow-400/10 transition"
                >
                  Join the Chapter
                </a>
              </div>
            </div>
      </div>
    </>
  )
}
