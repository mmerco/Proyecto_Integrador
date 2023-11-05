import express from "express";

const app = express();
const PORT = 4000;

app.use(express.static("public"));

app.get("/ping", (req, res) => res.send("pong"));

app.listen(PORT, () =>
  console.log(`Server corriendo en http://localhost:${PORT}`)
);
