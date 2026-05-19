const express = require("express");
const fs = require("fs");
const path = require("path");
const requests_router = require("./routes/requests");
const requests_service = require("./services/requestsService");

const app = express();
const PORT = 3000;

const data_file_path = path.join(__dirname, "data/requests.json");
const frontend_public_path = path.resolve(__dirname, "../../public");
const frontend_index_path = path.join(frontend_public_path, "index.html");
const has_frontend_build = fs.existsSync(frontend_index_path);

requests_service.init(data_file_path);

app.use(express.json());

if (has_frontend_build) {
    app.use(express.static(frontend_public_path));
}

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/requests", requests_router);

app.get("/", (req, res) => {
    if (has_frontend_build) {
        return res.sendFile(frontend_index_path);
    }

    return res.send("API для заявок на вычисления работает");
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
