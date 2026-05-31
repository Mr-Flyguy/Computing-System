class Ajax {
    get(url, params = {}) {
        const full_url = this._build_url(url, params);

        return this._send(full_url, {
            method: "GET"
        });
    }

    post(url, data) {
        return this._send(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    patch(url, data) {
        return this._send(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    delete(url) {
        return this._send(url, {
            method: "DELETE"
        });
    }

    _build_url(url, params) {
        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && String(value).trim() !== "") {
                query.append(key, value);
            }
        });

        const query_string = query.toString();
        return query_string ? `${url}?${query_string}` : url;
    }

    _send(url, options) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.open(options.method, url, true);
            xhr.timeout = 10000;

            Object.entries(options.headers || {}).forEach(([header, value]) => {
                xhr.setRequestHeader(header, value);
            });

            xhr.onload = () => {
                const response_text = xhr.responseText;
                let data = null;

                try {
                    data = response_text ? JSON.parse(response_text) : null;
                } catch (error) {
                    console.error("Ошибка разбора JSON:", error);
                }

                resolve({
                    data,
                    status: xhr.status
                });
            };

            xhr.onerror = () => resolve({ data: null, status: 0 });
            xhr.ontimeout = () => resolve({ data: null, status: 0 });

            xhr.send(options.body || null);
        });
    }
}

export const ajax = new Ajax();
