"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { teamMembers, type TeamMember } from "@/data/team-data"
import { Linkedin, Mail, Users, Award } from "lucide-react"
import clsx from "clsx"

export default function CoreTeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const mentor = teamMembers.find((m) => m.isMentor)
  const executiveMembers = teamMembers.filter((m) => !m.isMentor)

  // ✅ Set President as default expanded
  useEffect(() => {
    const president = executiveMembers.find((m) => m.position === "President")
    if (president) setExpandedId(president.id)
  }, [executiveMembers])

  return (
    <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-neutral-50 via-amber-50/40 to-white">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900">
              Meet Our <span className="text-amber-600">Core Team</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-neutral-700 max-w-prose mx-auto">
            Passionate leaders driving innovation and excellence in chemical engineering
          </p>
        </div>

        {/* Mentor */}
        {mentor && (
          <div className="mb-14 sm:mb-20">
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-800">Faculty Mentor</h3>
            </div>
            <div className="flex justify-center">
              <Card className="w-full max-w-sm bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-5">
                    <div className="w-36 h-36 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden ring-4 ring-amber-200">
                      <Image
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs px-3 py-0.5">
                      Mentor
                    </Badge>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-1">{mentor.name}</h4>
                  <p className="text-amber-700 font-medium mb-2">{mentor.position}</p>
                  <p className="text-sm text-neutral-700">{mentor.bio}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Executive heading */}
        <div className="mb-6 sm:mb-10">
          <h3 className="text-center text-xl sm:text-2xl font-semibold text-neutral-800">
            Executive Body <span className="text-amber-700">2025–2026</span>
          </h3>
        </div>

        {/* Executive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
          {executiveMembers.map((member) => {
            const isExpanded = expandedId === member.id

            return (
              <Card
                key={member.id}
                onClick={() => setSelectedMember(member)} // click opens modal
                className={clsx(
                  "w-full max-w-[22rem] col-span-1 row-span-1 md:col-span-2 lg:col-span-2 bg-white border border-amber-200 shadow-sm cursor-pointer overflow-hidden",
                  isExpanded && "md:col-span-4 md:row-span-2 lg:col-span-4 lg:row-span-2 shadow-lg",
                )}
              >
                <CardContent className="flex flex-col items-center text-center h-full p-6">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div
                      className={clsx(
                        "mx-auto rounded-full overflow-hidden ring-2 ring-amber-200",
                        isExpanded ? "w-36 h-36 sm:w-40 sm:h-40" : "w-28 h-28 sm:w-32 sm:h-32",
                      )}
                    >
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {member.position === "President" && (
                      <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs">
                        President
                      </Badge>
                    )}
                  </div>

                  {/* Text */}
                  <h4 className="font-bold text-neutral-900 mb-1 text-lg">{member.name}</h4>
                  <p className="text-amber-700 font-medium text-sm mb-2">{member.position}</p>

                  {/* Details only for expanded */}
                  {isExpanded && (
                    <p className="text-sm text-neutral-600 max-w-prose mx-auto">{member.bio}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Modal */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
            onClick={() => setSelectedMember(null)}
          >
            <Card
              className="w-full sm:max-w-md sm:rounded-xl sm:shadow-xl bg-white rounded-t-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-6 text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden ring-4 ring-amber-200 mb-5">
                  <Image
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">{selectedMember.name}</h3>
                <p className="text-amber-700 font-medium mb-2">{selectedMember.position}</p>
                <p className="text-sm text-neutral-700 mb-5 max-w-prose mx-auto">{selectedMember.bio}</p>
                <Button
                  onClick={() => setSelectedMember(null)}
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto"
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
