interface AssignScheduleInformation {
    assignRequestDTO: {
        weekdays: string[];
        gradeId: string;
        courseId: string;
        termId: string;
    }
    activityRequestDTO: {
        roomId: string;
        slotId: string;
        assignId: string;
        instructorId: string;
    }
  }
  