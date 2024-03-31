import createApiClient from "./api.service";
class AuthService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }
    async add(data) {
        return (await this.api.post("/add", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(userId, bookId) {
        return (await this.api.post("/delete", { userId, bookId })).data;
    }
    async deleteCart(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new AuthService();