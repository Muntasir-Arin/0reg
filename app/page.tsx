"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AddEditCourseDialog } from "@/components/add-edit-course-dialog"
import { CourseCell } from "@/components/course-cell"
import { Course, ScheduleCell } from "@/types/schedule"
import { Download } from 'lucide-react'
import domtoimage from 'dom-to-image'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

const timeSlots = [
  "08:00-09:20",
  "09:30-10:50",
  "11:00-12:20",
  "12:30-01:50",
  "02:00-03:20",
  "03:30-04:50",
  "05:00-06:20",
]

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleCell[]>([])
  const [selectedCell, setSelectedCell] = useState<ScheduleCell | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const scheduleRef = useRef<HTMLDivElement>(null)

  const handleCellClick = (timeSlot: string, day: string) => {
    setSelectedCell({ timeSlot, day, course: null })
    setDialogOpen(true)
  }

  const handleAddEditCourse = (course: Course) => {
    if (selectedCell) {
      setSchedule((prev) => {
        const existingIndex = prev.findIndex(
          (cell) =>
            cell.timeSlot === selectedCell.timeSlot && cell.day === selectedCell.day
        )
        if (existingIndex >= 0) {
          return prev.map((cell, index) =>
            index === existingIndex ? { ...cell, course } : cell
          )
        }
        return [...prev, { ...selectedCell, course }]
      })
      setDialogOpen(false)
    }
  }

  const handleDeleteCourse = (timeSlot: string, day: string) => {
    setSchedule((prev) =>
      prev.filter(
        (cell) => !(cell.timeSlot === timeSlot && cell.day === day)
      )
    )
  }

  const handleEditCourse = (timeSlot: string, day: string) => {
    const cellToEdit = schedule.find(
      (cell) => cell.timeSlot === timeSlot && cell.day === day
    )
    if (cellToEdit) {
      setSelectedCell(cellToEdit)
      setDialogOpen(true)
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    const [sourceDay, sourceTime] = source.droppableId.split('-')
    const [destDay, destTime] = destination.droppableId.split('-')

    if (sourceDay === destDay && sourceTime !== destTime) {
      setSchedule((prev) => {
        const courseToMove = prev.find(
          (cell) => cell.day === sourceDay && cell.timeSlot === sourceTime
        )
        if (!courseToMove) return prev

        const updatedSchedule = prev.filter(
          (cell) => !(cell.day === sourceDay && cell.timeSlot === sourceTime)
        )

        return [
          ...updatedSchedule,
          { ...courseToMove, timeSlot: destTime }
        ]
      })
    }
  }

  const downloadAsImage = async () => {
    if (!scheduleRef.current || isDownloading) return
    
    try {
      setIsDownloading(true)
      
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
        bgcolor: '#ffffff',
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
      setIsDownloading(false)
    }
  }

  return (
    <div className="p-2 md:p-6 max-w-full mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 space-y-2 md:space-y-0">
        <h1 className="text-xl md:text-2xl font-bold">Class Schedule</h1>
        <Button 
          onClick={downloadAsImage} 
          className="w-full md:w-auto"
          disabled={isDownloading}
        >
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? 'Downloading...' : 'Download Schedule'}
        </Button>
      </div>
      <div
        ref={scheduleRef}
        className="rounded-lg border bg-white text-black shadow-sm"
      >
        <div className="overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-[auto_repeat(7,1fr)] min-w-[800px]">
              <div className="p-2 font-medium border-b border-r text-xs md:text-sm">Time/Day</div>
              {days.map((day) => (
                <div key={day} className="p-2 font-medium border-b text-center text-xs md:text-sm">
                  {day}
                </div>
              ))}
              {timeSlots.map((timeSlot) => (
                <React.Fragment key={timeSlot}>
                  <div className="p-2 font-medium border-b border-r whitespace-nowrap text-xs md:text-sm">
                    {timeSlot}
                  </div>
                  {days.map((day) => {
                    const cell = schedule.find(
                      (c) => c.timeSlot === timeSlot && c.day === day
                    )
                    return (
                      <Droppable key={`${day}-${timeSlot}`} droppableId={`${day}-${timeSlot}`}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="border-b border-r h-20 md:h-24"
                            onClick={() => !cell?.course && handleCellClick(timeSlot, day)}
                          >
                            {cell?.course && (
                              <Draggable draggableId={`${day}-${timeSlot}`} index={0}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <CourseCell
                                      course={cell.course}
                                      onClick={() => {}}
                                      onDelete={() => handleDeleteCourse(timeSlot, day)}
                                      onEdit={() => handleEditCourse(timeSlot, day)}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
      <AddEditCourseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddEditCourse}
        initialData={selectedCell?.course || undefined}
      />
    </div>
  )
}

