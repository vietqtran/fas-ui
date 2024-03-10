interface AssignScheduleInformation {
    assignRequestDTO: {
        weekdays: string[];
        gradeId: string;
        courseId: string;
    }
    activityRequestDTO: {
        roomId: string;
        slotId: string;
        assignId: string;
        instructorId: string;
    }
  }
  