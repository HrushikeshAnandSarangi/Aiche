"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Quote,
  Star,
  TrendingUp,
  Filter,
  X,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  eventsData,
  academicYears,
  categories,
  categoryColors,
} from "@/data/events-data"

type SortKey = "Newest" | "Oldest" | "Most Attended" | "Upcoming First"

export function EventsSection() {
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<SortKey>("Upcoming First")
  const [query, setQuery] = useState("")

  const now = new Date()

  const getCategoryColor = (category: string) => {
    return (
      categoryColors[category as keyof typeof categoryColors] ||
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    )
  }

  const getStatusColor = (status: string) => {
    return status === "upcoming"
      ? "bg-emerald-100 text-emerald-800"
      : "bg-gray-100 text-gray-600"
  }

  const toggleEventExpansion = (eventId: number) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  const clearFilters = () => {
    setSelectedYear("All Years")
    setSelectedCategory("All")
    setQuery("")
    setSortBy("Upcoming First")
  }

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase()

    const filtered = eventsData.filter((event) => {
      const yearMatch =
        selectedYear === "All Years" || event.academicYear === selectedYear
      const categoryMatch =
        selectedCategory === "All" || event.category === selectedCategory
      const searchMatch =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        (event.story?.toLowerCase().includes(q) ?? false) ||
        (event.impact?.toLowerCase().includes(q) ?? false) ||
        event.highlights?.some((h: string) => h.toLowerCase().includes(q))
      return yearMatch && categoryMatch && searchMatch
    })

    const sorted = [...filtered].sort((a, b) => {
      const da = new Date(a.date).getTime()
      const db = new Date(b.date).getTime()
      switch (sortBy) {
        case "Newest":
          return db - da
        case "Oldest":
          return da - db
        case "Most Attended":
          return (b.attendees ?? 0) - (a.attendees ?? 0)
        case "Upcoming First":
        default: {
          const isUpcomingA = new Date(a.date) >= now
          const isUpcomingB = new Date(b.date) >= now
          if (isUpcomingA && !isUpcomingB) return -1
          if (!isUpcomingA && isUpcomingB) return 1
          return isUpcomingA ? da - db : db - da
        }
      }
    })

    return sorted
  }, [selectedYear, selectedCategory, query, sortBy, now])

  const stats = useMemo(() => {
    const total = eventsData.length
    const upcoming = eventsData.filter((e) => new Date(e.date) >= now).length
    const yearCount =
      selectedYear === "All Years"
        ? total
        : eventsData.filter((e) => e.academicYear === selectedYear).length
    const catCount =
      selectedCategory === "All"
        ? total
        : eventsData.filter((e) => e.category === selectedCategory).length
    return { total, upcoming, yearCount, catCount }
  }, [selectedYear, selectedCategory, now])

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-yellow-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
              Journey
            </span>{" "}
            Through Events
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Hands-on workshops, industry sessions, plant visits, and competitions
            that shape tomorrow’s chemical engineers.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-slate-500" />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Academic Year" />
              </SelectTrigger>
              <SelectContent>
                {academicYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-500" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-slate-500" />
            <Select value={sortBy} onValueChange={(v: SortKey) => setSortBy(v)}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Upcoming First">Upcoming First</SelectItem>
                <SelectItem value="Newest">Newest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Most Attended">Most Attended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              placeholder="Search events..."
              className="pl-9 w-64"
            />
          </div>

          {/* Clear Button */}
          <Button variant="outline" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1.5" />
            Clear
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredAndSorted.map((event) => (
            <Card
              key={event.id}
              className={cn(
                "group hover:shadow-xl transition-all duration-300 border-0 shadow-md",
                "hover:scale-[1.02] hover:-translate-y-1",
                "bg-white/80 backdrop-blur-sm overflow-hidden",
                expandedEvent === event.id && "ring-2 ring-yellow-200"
              )}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-slate-600 line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {expandedEvent === event.id && (
                  <div className="space-y-4 mb-4 p-4 bg-yellow-50/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">The Story</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {event.story}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Impact & Legacy
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {event.impact}
                      </p>
                    </div>

                    {event.highlights?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Key Highlights
                        </h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {event.highlights.map(
                            (highlight: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <Star className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                                {highlight}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {event.testimonial && (
                      <div className="border-l-4 border-yellow-200 pl-4">
                        <Quote className="h-4 w-4 text-yellow-600 mb-2" />
                        <p className="text-sm text-slate-600 italic mb-2">
                          "{event.testimonial.quote}"
                        </p>
                        <p className="text-xs text-slate-500">
                          — {event.testimonial.author}, {event.testimonial.role}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              </CardContent>

              <CardFooter className="pt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleEventExpansion(event.id)}
                  className="flex-1"
                >
                  {expandedEvent === event.id ? "Show Less" : "Learn More"}
                </Button>
                {event.registrationLink ? (
                  <Button
                    size="sm"
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                    onClick={() =>
                      window.open(event.registrationLink, "_blank")
                    }
                  >
                    Register
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Details
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSorted.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <Calendar className="h-12 w-12 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No events found
            </h3>
            <p className="text-slate-600">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
