class Ajax {
    async get(url) {
        return this._send(url, {
            method: "GET"
        });
    }

    async post(url, data) {
        return this._send(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    async patch(url, data) {
        return this._send(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    async delete(url) {
        return this._send(url, {
            method: "DELETE"
        });
    }

    async _send(url, options) {
        try {
            const response = await fetch(url, options);
            const response_text = await response.text();

            return {
                data: response_text ? JSON.parse(response_text) : null,
                status: response.status
            };
        } catch (error) {
            console.error("Ошибка выполнения запроса:", error);

            return {
                data: null,
                status: 0
            };
        }
    }
}

export const ajax = new Ajax();
