"use client"

import React, { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { CourseCell } from "@/components/course-cell"
import { GlobalSearch } from "@/components/global-search"
import { ShareDialog } from "@/components/share-dialog"
import { Layout } from "@/components/layout"
import { Course, CourseSchedule } from "@/data/courses"
import { Download } from 'lucide-react'
import domtoimage from 'dom-to-image'
import { AddEditCourseDialog } from "@/components/add-edit-course-dialog"

const timeSlots = [
  "08:00 AM-09:20 AM", "09:30 AM-10:50 AM", "11:00 AM-12:20 PM", "12:30 PM-01:50 PM",
  "02:00 PM-03:20 PM", "03:30 PM-04:50 PM", "05:00 PM-06:20 PM"
]

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

interface ScheduleCell {
  timeSlot: string;
  day: string;
  course: Course | null;
  scheduleType: "theory" | "lab" | null;
}

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleCell[]>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCell, setEditingCell] = useState<ScheduleCell | null>(null)

  const hideDownloadElements = useCallback(() => {
    const elements = document.querySelectorAll('.download-hide')
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none'
      }
    })
  }, [])

  const showDownloadElements = useCallback(() => {
    const elements = document.querySelectorAll('.download-hide')
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = ''
      }
    })
  }, [])

  const handleDeleteCourse = useCallback((timeSlot: string, day: string) => {
    setSchedule((prev) =>
      prev.filter(
        (cell) => !(cell.timeSlot === timeSlot && cell.day === day)
      )
    )
  }, [])

  const handleAddCourseFromSearch = useCallback((course: Course) => {
    const dayMapping: Record<string, string> = {
      Su: "Sunday",
      Mo: "Monday",
      Tu: "Tuesday",
      We: "Wednesday",
      Th: "Thursday",
      Fr: "Friday",
      Sa: "Saturday",
    }
  
    course.schedule.forEach(slot => {
      const timeSlot = slot.time
  
      if (timeSlot) {
        console.log(timeSlot)
        const fullDay = dayMapping[slot.day] // Convert day abbreviation to full name
        if (fullDay) {
          setSchedule(prev => [
            ...prev,
            { timeSlot, day: fullDay, course, scheduleType: slot.type }
          ])
          
        }
      }
    })
  }, [timeSlots, days])
  

  const handleCellClick = useCallback((timeSlot: string, day: string) => {
    const existingCell = schedule.find(
      (c) => c.timeSlot === timeSlot && c.day === day
    )
    setEditingCell(existingCell || { timeSlot, day, course: null, scheduleType: null })
    setDialogOpen(true)
  }, [schedule])

  const handleAddEditCourse = useCallback((course: Course, scheduleType: "theory" | "lab") => {
    if (editingCell) {
      setSchedule((prev) => {
        const existingIndex = prev.findIndex(
          (cell) =>
            cell.timeSlot === editingCell.timeSlot && cell.day === editingCell.day
        )
        if (existingIndex >= 0) {
          return prev.map((cell, index) =>
            index === existingIndex ? { ...cell, course, scheduleType } : cell
          )
        }
        return [...prev, { ...editingCell, course, scheduleType }]
      })
      setDialogOpen(false)
      setEditingCell(null)
    }
  }, [editingCell])

  const downloadAsImage = useCallback(async () => {
    if (!scheduleRef.current || isDownloading) return
    
    try {
      setIsDownloading(true)
      hideDownloadElements()
      
      const element = scheduleRef.current
      
      const originalStyle = {
        overflow: element.style.overflow,
        width: element.style.width,
        height: element.style.height,
        position: element.style.position,
      }
      
      element.style.overflow = 'visible'
      element.style.width = 'auto'
      element.style.height = 'auto'
      element.style.position = 'relative'
      
      const scrollContainer = element.querySelector('.overflow-x-auto')
      if (scrollContainer instanceof HTMLElement) {
        scrollContainer.style.overflow = 'visible'
        scrollContainer.style.width = 'auto'
      }
      
      const dataUrl = await domtoimage.toPng(element, {
        bgcolor: '#011126',
        style: {
          transform: 'none',
        },
        width: element.scrollWidth,
        height: element.scrollHeight,
      })
      
      element.style.overflow = originalStyle.overflow
      element.style.width = originalStyle.width
      element.style.height = originalStyle.height
      element.style.position = originalStyle.position
      
      if (scrollContainer instanceof HTMLElement) {
        scrollContainer.style.overflow = 'auto'
        scrollContainer.style.width = '100%'
      }
      
      const link = document.createElement('a')
      link.download = 'class-schedule.png'
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to download schedule:', error)
    } finally {
      showDownloadElements()
      setIsDownloading(false)
    }
  }, [hideDownloadElements, showDownloadElements, isDownloading])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 download-hide">
            <h1 className="text-2xl font-bold text-white">Class Schedule</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto download-hide">
              <Button 
                onClick={downloadAsImage} 
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isDownloading}
              >
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? 'Downloading...' : 'Download'}
              </Button>
              <ShareDialog />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center download-hide">
            <GlobalSearch onAddCourse={handleAddCourseFromSearch} />
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full sm:w-auto px-5"
              size="sm"
            >
              Smart Scheduler
            </Button>
          </div>

          <div
            className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-white shadow-sm"
          >
            <div ref={scheduleRef}>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-[auto_repeat(7,1fr)] min-w-[1000px]">
                <div className="p-2 px-9 font-medium border-b border-r border-white/10 text-xs md:text-sm text-center">
                  Time/Day
                </div>
                {days.map((day) => (
                  <div key={day} className="p-2 px-9 font-medium border-b border-white/10 text-center text-xs md:text-sm">
                    {day}
                  </div>
                ))}
                {timeSlots.map((timeSlot) => (
                  <React.Fragment key={timeSlot}>
                    <div className="p-2 text-center font-medium border-b border-r border-white/10 whitespace-nowrap text-xs md:text-sm">
                      {timeSlot}
                    </div>
                    {days.map((day) => {
                      const cell = schedule.find(
                        (c) => c.timeSlot === timeSlot && c.day === day
                      )
                      return (
                        <div
                          key={`${timeSlot}-${day}`}
                          className="border-b border-r border-white/10 h-20"
                          
                        >
                          <CourseCell
                            course={cell?.course ?? null}
                            scheduleType={cell?.scheduleType ?? null}
                            timeSlot = {timeSlot}
                            day ={day}
                            onDelete={() => handleDeleteCourse(timeSlot, day)}
                            onClickBlank={() => handleCellClick(timeSlot, day)}
                          />
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <AddEditCourseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddEditCourse}
        initialData={editingCell?.course}
        scheduleType={editingCell?.scheduleType}
      />
    </Layout>
  )
}

