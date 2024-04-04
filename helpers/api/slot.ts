import instance from "./_axios_instance";

const END_POINT = {
    GET_ALL_SLOT: "slot",
    GET_SLOT_BY_ID: "slot",
    CREATE_SLOT: "slot",
    UPDATE_SLOT: "slot/update",
    DELETE_SLOT: "slot/delete",
};


export const getAllSlots = () => {
    return instance.get(`/${END_POINT.GET_ALL_SLOT}`);
};

export const addSlot = (data: SlotInformation) => {
    return instance.post(`/${END_POINT.CREATE_SLOT}`, data);
}

export const updateSlot = (id: string, data: SlotInformation) => {
    return instance.put(`/${END_POINT.UPDATE_SLOT}/${id}`, data);
}

export const deleteSlot = (id: string) => {
    return instance.put(`/${END_POINT.DELETE_SLOT}/${id}`);
}

export const getSlotById = (id: string) => {
    return instance.get(`/${END_POINT.GET_SLOT_BY_ID}/${id}`);
}