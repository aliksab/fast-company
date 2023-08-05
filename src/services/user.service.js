import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    getOne: async (payload) => {
        const { data } = await httpService.get(userEndpoint + payload._id, payload);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserID());
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(userEndpoint + localStorageService.getUserID(), payload);
        console.log(data);
    }
};

export default userService;