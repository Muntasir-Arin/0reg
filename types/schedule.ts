export interface CourseSchedule {
  day: string;
  time: string;
  room: string;
  type: "theory" | "lab";
}

export interface Course {
  courseCode: string;
  program: string;
  faculty: string;
  credit: number;
  section: string;
  schedule: CourseSchedule[];
  totalSeat: number;
  seatBooked: number;
  seatRemaining: number;
  examDate: string;
}

export interface ScheduleCell {
  timeSlot: string;
  day: string;
  course: Course | null;
  scheduleType: "theory" | "lab" | null;
}
