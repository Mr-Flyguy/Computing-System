class RequestUrls {
    constructor() {
        this.baseUrl = "";
    }

    getRequests(filters = {}) {
        const params = new URLSearchParams();

        if (filters.title && filters.title.trim()) {
            params.set("title", filters.title.trim());
        }

        if (filters.type && filters.type.trim()) {
            params.set("type", filters.type.trim());
        }

        if (params.toString() === "") {
            return `${this.baseUrl}/requests`;
        }

        return `${this.baseUrl}/requests?${params.toString()}`;
    }

    getRequestById(id) {
        return `${this.baseUrl}/requests/${id}`;
    }

    createRequest() {
        return `${this.baseUrl}/requests`;
    }

    updateRequestById(id) {
        return `${this.baseUrl}/requests/${id}`;
    }

    removeRequestById(id) {
        return `${this.baseUrl}/requests/${id}`;
    }
}

export const requestUrls = new RequestUrls();
