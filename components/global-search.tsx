"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command"
import { Search } from 'lucide-react'
import { predefinedCourses, Course, CourseSchedule } from "@/data/courses"
import { DialogTitle } from "@radix-ui/react-dialog"

interface GlobalSearchProps {
  onAddCourse: (course: Course) => void
}

export function GlobalSearch({ onAddCourse }: GlobalSearchProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const formatSchedule = (schedule: CourseSchedule[]): string => {
    return schedule.map(s => `${s.day} ${s.time} (${s.type})`).join(', ')
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search courses...
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <CommandInput placeholder="Search courses..." />
        <CommandList>
          <CommandEmpty>No courses found.</CommandEmpty>
          <CommandGroup heading="Courses">
            {predefinedCourses.map((course) => (
              <CommandItem
                key={`${course.courseCode}-${course.section}`}
                value={`${course.courseCode} ${course.section}`}
                onSelect={() => {
                  setOpen(false)
                }}
              >
                <div className="flex flex-col w-full">
  <div className="flex justify-between items-center">

      <span className="font-bold">{course.courseCode}</span>
      <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Section: {course.section}</span>
      <button
        className="p-1 hover:bg-muted-background rounded-full"
        onClick={(e) => {
          e.preventDefault()
          onAddCourse(course)
          setOpen(false)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 text-primary hover:text-primary-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      </div>
  </div>
  <div className="text-sm text-muted-foreground">
    Faculty: {course.faculty} | Program: {course.program} | Credit: {course.credit}
  </div>
  <div className="text-sm">
    Schedule: {formatSchedule(course.schedule)}
  </div>
  <div className="text-sm">
    Seats: {course.seatRemaining} remaining ({course.seatBooked}/{course.totalSeat} booked)
  </div>
  <div className="text-sm">
    Exam Date: {course.examDate}
  </div>
</div>

              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

