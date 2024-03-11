import instance from "./_axios_instance";

const END_POINT = {
  GET_ACTIVITY_BY_ID: "activity",
  UPDATE_ACTIVITY: "activity/update",
  GET_ACTIVITY_BY_ASSIGN: "activity/assign",
  FIND_ACTIVITY_FOR_STUDENT: "activity/student",
  FIND_ACTIVITY_FOR_INSTRUCTOR: "activity/instructor",
};

export const getActivityById = (activity: string) => {
  return instance.get(`/${END_POINT.GET_ACTIVITY_BY_ID}/${activity}`);
};

export const getActivityByAssign = async (assignId: string) => {
  return await instance.get(`/${END_POINT.GET_ACTIVITY_BY_ASSIGN}/${assignId}`);
};

export const getStudentActivityByWeekYear = (
  studentId: string,
  week: number,
  year: number
) => {
  return instance.get(
    `/${END_POINT.FIND_ACTIVITY_FOR_STUDENT}/${studentId}?week=${week}&year=${year}`
  );
};

export const updateActivity = (id: string, data: ActivityInformation) => {
  return instance.put(`/${END_POINT.UPDATE_ACTIVITY}/${id}`, data);
};

export const getInstructorActivityByWeekYear = (instructorId: string,
  week: number,
  year: number) => {
  return instance.get(`/${END_POINT.FIND_ACTIVITY_FOR_INSTRUCTOR}/${instructorId}?week=${week}&year=${year}`);
}


