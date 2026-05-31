const express = require("express");
const path = require("path");
const calculation_type_router = require("./routes/calculation_type");
const calculation_type_store = require("./models/calculation_type_store");

const app = express();
const PORT = 3000;

app.set("etag", false);

function disable_calculation_type_cache(req, res, next) {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    next();
}

const data_file_path = path.join(__dirname, "data/calculation-types.json");

calculation_type_store.init(data_file_path);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/calculation_type", disable_calculation_type_cache, calculation_type_router);

app.get("/", (req, res) => {
    res.json({ message: "API для типов вычислений работает" });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
