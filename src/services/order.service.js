import createApiClient from "./api.service";
class OrderService {
    constructor(baseUrl = "/api/borrow") {
        this.api = createApiClient(baseUrl);
    }
    async add(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async post(id) {
        return (await this.api.post(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}
export default new OrderService();