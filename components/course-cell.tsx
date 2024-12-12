import { Course } from "@/types/schedule"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from 'lucide-react'

interface CourseCellProps {
  course: Course | null;
  onDelete: () => void;
  onEdit: () => void;
}

export function CourseCell({ course, onDelete, onEdit }: CourseCellProps) {
  if (!course) {
    return (
      <div className="h-full w-full p-1 hover:bg-accent/50 cursor-pointer transition-colors">
        <div className="h-full w-full border-2 border-dashed border-accent/50 rounded-md flex items-center justify-center text-muted-foreground text-xs">
          Add Course
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full p-1 group">
      <div className="h-full w-full rounded-md bg-accent/50 p-2 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-xs">{course.name}</h3>
          <p className="text-xs text-muted-foreground">Section: {course.section}</p>
          <p className="text-xs text-muted-foreground">Type: {course.type}</p>
        </div>
        <p className="text-xs text-muted-foreground">Room: {course.room}</p>
      </div>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <Button
          variant="secondary"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <Edit className="h-3 w-3" />
        </Button>
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

