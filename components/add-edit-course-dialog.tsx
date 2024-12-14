import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Course } from "@/data/courses"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"

const formSchema = z.object({
  courseCode: z.string().min(1, "Course code is required"),
  section: z.string().min(1, "Section is required"),
  faculty: z.string().min(1, "Faculty is required"),
  scheduleType: z.enum(['theory', 'lab']),
})

interface AddEditCourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Course, scheduleType: "theory" | "lab") => void
  initialData?: Course
  scheduleType?: "theory" | "lab" | null
}

export function AddEditCourseDialog({ open, onOpenChange, onSubmit, initialData, scheduleType }: AddEditCourseDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseCode: initialData?.courseCode || "",
      section: initialData?.section || "",
      faculty: initialData?.faculty || "",
      scheduleType: scheduleType || "theory",
    },
  })

  useEffect(() => {
    if (open && initialData) {
      form.reset({
        courseCode: initialData.courseCode,
        section: initialData.section,
        faculty: initialData.faculty,
        scheduleType: scheduleType || "theory",
      })
    }
  }, [open, initialData, scheduleType, form])

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(
      {
        ...initialData,
        courseCode: data.courseCode,
        section: data.section,
        faculty: data.faculty,
      } as Course,
      data.scheduleType
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="lg:max-w-[425px] transition-all duration-200">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Course' : 'Add Course'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter section" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter faculty" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Type</FormLabel>
                  <FormControl>
                    <Tabs
                      value={field.value}
                      onValueChange={field.onChange}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="theory">Theory</TabsTrigger>
                        <TabsTrigger value="lab">Lab</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">{initialData ? 'Update Course' : 'Add Course'}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

