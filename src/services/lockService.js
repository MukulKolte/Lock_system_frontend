import api from "./api";

export const getLockStatus = async () => {
    const response = await api.get("/lock");

    return response.data;
};

export const lockSystem = async () => {
    const response = await api.post("/lock/lock");

    return response.data;
};

export const unlockSystem = async () => {
    const response = await api.post("/lock/unlock");

    return response.data;
};