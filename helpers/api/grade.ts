import instance from "./_axios_instance";

const END_POINT = {
    GET_ALL_Grade: 'grade',
    CREATE_Grade: 'grade',
    GET_Grade_BY_ID: 'grade',
    UPDATE_Grade: 'grade/update',
    DELETE_Grade: 'grade/delete',
    GET_ALL_Grade_BY_Course: "grade/course",
}

export const getAllGrade = () => {
    return instance.get(`/${END_POINT.GET_ALL_Grade}`)
}

export const getAllGradeByCourse = (courseId: string) => {
    return instance.get(`/${END_POINT.GET_ALL_Grade_BY_Course}/${courseId}`);
}
