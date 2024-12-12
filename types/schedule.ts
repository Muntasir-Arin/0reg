export interface Course {
    name: string;
    section: string;
    room: string;
    type: 'theory' | 'lab';
  }
  
export interface ScheduleCell {
    timeSlot: string;
    day: string;
    course: Course | null;
  }
  
  