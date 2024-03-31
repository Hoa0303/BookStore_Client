import createApiClient from "./api.service";
class AuthService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/register", data)).data;
    }
    async login(email, password) {
        return (await this.api.post("/login", { email, password })).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new AuthService();