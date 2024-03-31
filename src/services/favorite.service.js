import createApiClient from "./api.service";
class AuthService {
    constructor(baseUrl = "/api/favorite") {
        this.api = createApiClient(baseUrl);
    }
    async add(userId, bookId) {
        return (await this.api.post("/add", { userId, bookId })).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(userId, bookId) {
        return (await this.api.post("/delete", { userId, bookId })).data;
    }
}
export default new AuthService();