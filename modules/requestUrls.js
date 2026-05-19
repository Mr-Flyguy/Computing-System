class RequestUrls {
    constructor() {
        this.baseUrl = this.getBaseUrl();
    }

    getBaseUrl() {
        if (typeof window === "undefined" || !window.location) {
            return "";
        }

        if (window.location.port === "3000") {
            return "";
        }

        if (window.location.protocol === "file:") {
            return "http://localhost:3000";
        }

        return `${window.location.protocol}//${window.location.hostname}:3000`;
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
