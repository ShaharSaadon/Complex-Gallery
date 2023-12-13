import { httpService } from "./http.service.js";

const STORAGE_KEY = "painting";

export const paintingService = {
    query,
    getById,
    update,
};

async function query() {
    return httpService.get(STORAGE_KEY);
}

async function update(painting) {
    return httpService.put(`${STORAGE_KEY}/${painting._id}`, painting);
}

async function getById(paintingId) {
    return httpService.get(`${STORAGE_KEY}/${paintingId}`);
}
