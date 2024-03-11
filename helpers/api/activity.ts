import instance from "./_axios_instance";

const END_POINT = {
    GET_ACTIVITY_BY_ID: "activity",
    UPDATE_ACTIVITY: "activity",
    GET_ACTIVITY_BY_ASSIGN: "activity/assign",
    FIND_ACTIVITY_FOR_STUDENT: "activity/student",
};


export const getActivityById = (activity: string) => {
    return instance.get(`/${END_POINT.GET_ACTIVITY_BY_ID}/${activity}`);
};

export const getActivityByAssign = (assignId: string) => {
    return instance.get(`/${END_POINT.GET_ACTIVITY_BY_ASSIGN}/${assignId}`);
};

export const getStudentActivityByWeekYear = (assignId: string) => {
    return instance.get(`/${END_POINT.FIND_ACTIVITY_FOR_STUDENT}/${assignId}`);
};

export const updateActivity = (id: string, data: ActivityInformation) => {
    return instance.put(`/${END_POINT.UPDATE_ACTIVITY}/${id}`, data);
};


