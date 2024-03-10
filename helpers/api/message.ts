import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
    CREATE_MESSAGE: "messages",
    GET_ALL_MESSAGE: "messages",
    DELETE_MESSAGE: "messages"
};

export const getAllMessage = (chatId: string) => {
    return instance.get(`/${END_POINT.GET_ALL_MESSAGE}/chat/${chatId}`);
}

export const addMessage = (studentId: string, chatId: string, data: MessageInformation) => {
    return instance.post(`/${END_POINT.CREATE_MESSAGE}/student/${studentId}/chat/${chatId}`, data);
};

export const deleteMessage = (messageId: string) => {
    return instance.put(`/${END_POINT.CREATE_MESSAGE}/${messageId}`);
}