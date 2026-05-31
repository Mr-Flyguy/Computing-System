const express = require("express");
const path = require("path");
const calculation_type_router = require("./routes/calculation_type");
const calculation_type_store = require("./models/calculation_type_store");

const app = express();
const PORT = 3000;

const data_file_path = path.join(__dirname, "data/calculation-types.json");

calculation_type_store.init(data_file_path);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/calculation_type", calculation_type_router);

app.get("/", (req, res) => {
    res.json({ message: "API для типов вычислений работает" });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
