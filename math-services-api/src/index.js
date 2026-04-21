const express = require("express");
const path = require("path");
const service_requests_router = require("./routes/service-requests");
const service_requests_service = require("./services/serviceRequestsService");

const app = express();
const PORT = 3000;

const data_file_path = path.join(__dirname, "data/service-requests.json");
service_requests_service.init(data_file_path);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("API для услуг вычислений работает");
});

app.use("/service-requests", service_requests_router);

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
