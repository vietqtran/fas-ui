import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
    ATTENDANCE: "attendance/update",
};

export const updateAttendance = (id:string, data: any) => {
    return instance.put(`/${END_POINT.ATTENDANCE}/${id}`, data);
};