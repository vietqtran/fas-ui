import instance from "./_axios_instance";

const END_POINT = {
    GET_ALL_Grade: 'grade',
    CREATE_Grade: 'grade',
    GET_Grade_BY_ID: 'grade',
    GET_Grade_BY_MAJOR: 'grade/major',
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

export const getAllGradeByCourseAndTerm = (courseId: string, termId: string) => {
    return instance.get(`/${END_POINT.GET_ALL_Grade}/course/${courseId}/term/${termId}`);
}

export const createGrade = (data: GradeInformation) => {
    return instance.post(`/${END_POINT.CREATE_Grade}`, data);
}

export const updateGrade = (id: string, data: GradeInformation) => {
    return instance.put(`/${END_POINT.UPDATE_Grade}/${id}`, data);
}

export const deleteGradeById = (id: string) => {
    return instance.put(`/${END_POINT.DELETE_Grade}/${id}`);
}

export const getGradeByID = (id: string) => {
    return instance.get(`/${END_POINT.GET_Grade_BY_ID}/${id}`);
}

export const addStudentToGrade = (studentId: string, gradeId: string) => {
    return instance.put(`/grade/${gradeId}/assign/${studentId}`);
}

export const deleteStudentToGrade = (studentId: string, gradeId: string) => {
    return instance.put(`/grade/${gradeId}/unAssign/${studentId}`);
}

export const getGradeByMajor = (id: string) => {
    return instance.get(`/${END_POINT.GET_Grade_BY_MAJOR}/${id}`);
}