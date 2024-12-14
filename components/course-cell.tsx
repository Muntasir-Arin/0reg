import { Course } from "@/data/courses"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

interface CourseCellProps {
  course: Course | null;
  scheduleType: "theory" | "lab" | null;
  onDelete: () => void;
  onClickBlank: () => void;
  timeSlot: String;
  day: String;
}

export function CourseCell({ course, scheduleType, onDelete, onClickBlank, timeSlot, day }: CourseCellProps) {
  if (!course) {
    return (
      <div className="h-20"
            key={`${timeSlot}-${day}`}
                onClick={() => onClickBlank()}>
      <div className="h-full w-full p-1">
        <div 
          className="h-full w-full border-2 border-dashed border-accent/50 rounded-md flex items-center justify-center text-muted-foreground text-xs"
          data-downloading="false"
        >
          <span className="download-hide opacity-55">Add Course</span>
        </div>
      </div> </div>
    )
  }

  return (
    <div className="relative h-full w-full p-1 group ">
      <div className="h-full w-full rounded-md bg-background p-2 flex flex-col justify-center text-center border border-white/10">
          <h3 className="font-medium text-sm">{course.courseCode} [{course.section}]</h3>
        <p className="text-xs text-muted-foreground">Faculty: {course.faculty}</p>
      </div>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="destructive"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => { 
            e.stopPropagation()
            onDelete()
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

