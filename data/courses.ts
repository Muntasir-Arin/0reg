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
  
export const predefinedCourses: Course[] = [
  {
    courseCode: "ACT201",
    program: "BBA",
    faculty: "SHO",
    credit: 3.0,
    section: "01",
    schedule: [
      {
        day: "Su",
        time: "02:00 PM-03:20 PM",
        room: "12H-36C",
        type: "theory",
      },
      {
        day: "Tu",
        time: "02:00 PM-03:20 PM",
        room: "12H-36C",
        type: "lab",
      }
    ],
    totalSeat: 24,
    seatBooked: 26,
    seatRemaining: -2,
    examDate: "10/10/2023",
  },
  {
    courseCode: "CSE101",
    program: "BSc",
    faculty: "FAS",
    credit: 3.0,
    section: "02",
    schedule: [
      {
        day: "Mo",
        time: "11:00 AM-12:20 PM",
        room: "5H-12B",
        type: "theory",
      },
      {
        day: "We",
        time: "11:00 AM-12:20 PM",
        room: "5H-12B",
        type: "theory",
      },
      {
        day: "Th",
        time: "02:00 PM-03:20 PM",
        room: "3H-Lab2",
        type: "lab",
      }
    ],
    totalSeat: 30,
    seatBooked: 28,
    seatRemaining: 2,
    examDate: "15/12/2023",
  },
  {
    courseCode: "ENG102",
    program: "BA",
    faculty: "JKS",
    credit: 2.0,
    section: "01",
    schedule: [
      {
        day: "Mo",
        time: "09:00 AM-10:20 AM",
        room: "2H-15A",
        type: "theory",
      },
      {
        day: "We",
        time: "09:00 AM-10:20 AM",
        room: "2H-15A",
        type: "theory",
      }
    ],
    totalSeat: 20,
    seatBooked: 18,
    seatRemaining: 2,
    examDate: "05/11/2023",
  },
  {
    courseCode: "PHY101",
    program: "BSc",
    faculty: "LKR",
    credit: 4.0,
    section: "01",
    schedule: [
      {
        day: "Tu",
        time: "10:30 AM-12:30 PM",
        room: "3H-05B",
        type: "theory",
      },
      {
        day: "Th",
        time: "10:30 AM-12:30 PM",
        room: "3H-05B",
        type: "theory",
      },
      {
        day: "Fr",
        time: "01:00 PM-02:30 PM",
        room: "3H-Lab1",
        type: "lab",
      }
    ],
    totalSeat: 25,
    seatBooked: 25,
    seatRemaining: 0,
    examDate: "20/12/2023",
  },
  {
    courseCode: "MAT121",
    program: "BSc",
    faculty: "AMR",
    credit: 3.0,
    section: "02",
    schedule: [
      {
        day: "Mo",
        time: "08:30 AM-09:50 AM",
        room: "1H-23A",
        type: "theory",
      },
      {
        day: "We",
        time: "08:30 AM-09:50 AM",
        room: "1H-23A",
        type: "theory",
      }
    ],
    totalSeat: 28,
    seatBooked: 27,
    seatRemaining: 1,
    examDate: "12/12/2023",
  },
  {
    courseCode: "ECO201",
    program: "BBA",
    faculty: "MSH",
    credit: 3.0,
    section: "01",
    schedule: [
      {
        day: "Sa",
        time: "10:00 AM-11:20 AM",
        room: "4H-11B",
        type: "theory",
      },
      {
        day: "Mo",
        time: "10:00 AM-11:20 AM",
        room: "4H-11B",
        type: "theory",
      }
    ],
    totalSeat: 22,
    seatBooked: 20,
    seatRemaining: 2,
    examDate: "18/12/2023",
  }
];

  