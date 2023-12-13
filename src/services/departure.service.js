import { httpService } from "./http.service.js";

const STORAGE_KEY = "departure";

export const departureService = {
    query,
    getById,
    update,
};

async function query() {
    return httpService.get(STORAGE_KEY);
}

async function update(departure) {
    return httpService.put(`${STORAGE_KEY}/${departure._id}`, departure);
}

async function getById(departureId) {
    return httpService.get(`${STORAGE_KEY}/${departureId}`);
}
